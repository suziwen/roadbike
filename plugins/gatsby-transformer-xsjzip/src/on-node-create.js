const fs = require(`fs-extra`)
const grayMatter = require(`gray-matter`)
const crypto = require(`crypto`)
const _ = require(`lodash`)
const AdmZip = require('adm-zip')
const path = require(`path`)
const cheerio = require('cheerio')
const { createFileNode } = require(`gatsby-source-filesystem/create-file-node`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const truncatise = require(`truncatise`)
const {replaceImages, transformImages} = require(`./replace-images`)

const CACHE_DIR = `.cache`
const FS_PLUGIN_DIR = `gatsby-transformer-xsjzip`

const slugs = {}

const fixSlugPath = (slug)=>{
  slug = slug.replace(/\.*/g, '')
  slug = slug.replace(/\/+/g, '/')
  slug = slug.replace(/^\/*|\/*$/g, '')
  return slug
}
const fixDuplateSlug = ({slug, times=0, reporter, node})=>{
  const orignSlug = slug
  if (!!times) {
    slug = slug + '_' + times
  }
  if (times > 20) {
    return slug = orignSlug + '_' + Date.now()
  }
  if (slugs[slug]) {
    reporter.warn(`重复的 slug ${slug}, ${node.absolutePath} 和 ${slugs[slug].absolutePath}`)
    return fixDuplateSlug({slug:orignSlug, times:times + 1, reporter, node})
  }
  return slug
}

const getTableOfContent = ($, slug)=>{
  const result = []
  let preItem = null
  let depth = 1
  $("h1, h2, h3, h4, h5, h6, h7").each((i, he)=>{
    const $he = $(he)
    if (!$he.hasClass("story_title")){
      let $anchorContainer = $he.find('.xsj_anchor')
      if ($anchorContainer.length == 0) {
        $anchorContainer = $he.prev()
      }
      const tagName = he.tagName
      const level = parseInt(tagName.substring(1))
      if ($anchorContainer.length === 1 && $anchorContainer.hasClass('xsj_anchor')){
        const nameEls = $anchorContainer.find(".blank_anchor_name")
        if (nameEls.length === 2) {
          const hash = nameEls[0].attribs.name
          const title = nameEls[1].attribs.name
          const link = `${slug}#${hash}`
          const item = {
            title,
            link,
          }
          if (depth < level) {
            if (preItem === null) {
              result.push(item)
            } else {
              depth += 1
              if (!preItem.items){
                preItem.items = []
              }
              item.parent = preItem
              preItem.items.push(item)
            }
          } else {
            while(depth != level) {
              if (!preItem) {
                depth = level
              } else {
                preItem = preItem.parent
                depth -= 1
              }
            }
            if (preItem && preItem.parent) {
              item.parent = preItem.parent
              preItem.parent.items.push(item)
            } else {
              result.push(item)
            }
          }
          preItem = item
        }
      }
    }
  })
  const removeParentField = (items)=>{
    items.forEach((item)=>{
      delete(item.parent)
      if (item.items) {
        removeParentField(item.items)
      }
    })
  }
  removeParentField(result)
  return result
}

module.exports = async function onCreateNode(
  { node, getNode, loadNodeContent, actions, createNodeId, reporter, store, pathPrefix, cache},
  pluginOptions
) {
  const { createNode, createParentChildLink } = actions
  const programDir = store.getState().program.directory
  const zzz = 0



  // We only care about markdown content.
  if (
    node.internal.mediaType !== `application/zip`
  ) {
    return
  }
  const zip = new AdmZip(node.absolutePath)
  const metaEntry = zip.getEntry("xiaoshujiang.json")
  if (!metaEntry){
    return
  }

  const targetDir = path.join(programDir, CACHE_DIR, FS_PLUGIN_DIR, node.relativeDirectory, node.name)
  zip.extractAllTo(targetDir, true)
  const metaContent = zip.readAsText("xiaoshujiang.json")
  const meta = JSON.parse(metaContent)
  const content = zip.readAsText(meta.main)
  const html = zip.readAsText(meta.main.replace(/\.md$/, '.html'))
  const $ = cheerio.load(html, {decodeEntities: false})
  const styles = []
  $('style').each((index, val)=>{
    const $style = $(val)
    styles.push($style.html())
  })
  const style = styles.join("\n")

  const fileResources = meta.fileResources || []
  const fileNodes = await Promise.all(_.map(fileResources, async (fileResource)=>{
      const fileResourcePath = path.join(targetDir, fileResource.filename)
      const fileNode = await createFileNode(fileResourcePath, createNodeId, {})
      fileNode.internal.description = `${node.internal.description} / ${fileResourcePath}`
      fileNode.parent = node.id
      createNode(fileNode, { name: `gatsby-source-filesystem` })
      createParentChildLink({ parent: node, child: fileNode })
      return fileNode
    })
  )
  const createJsonFileNode = async (meta)=>{
    const  jsonPath = path.join(targetDir, "xiaoshujiang.json")
    const fileNode = await createFileNode(jsonPath, createNodeId, {})
    fileNode.parent = node.id
    fileNode.internal.description = `${node.internal.description} / ${jsonPath}`
    createNode(fileNode, { name: `gatsby-source-filesystem` })
    createParentChildLink({ parent: node, child: fileNode })
    return fileNode
  }
  const jsonNode = await createJsonFileNode(meta)

  $('.story_title').remove()
  $('.story_tags').remove()
  $('#MathJax_SVG_glyphs').parent().css('display', 'none')
  $('#MathJax_SVG_glyphs').parent().parent().css('display', 'none')
  // 对 image 的特殊处理
  const remoteImageNodes = await transformImages({$, cache, store, createNode, createNodeId, parentNode:node, createParentChildLink, reporter, pluginOptions})
  await replaceImages({$, jsonNode, cache, pathPrefix, reporter, fileNodes, remoteImageNodes, pluginOptions})
  //const previewHtml = "<div id='xsj_root_html'><div id='xsj_root_body'>" + $('.html_preview.preview').parent().html() + "</div></div>"
  const previewHtml = $('.html_preview.preview').parent().html()

  try {
    let data = grayMatter(content, pluginOptions)
    const frontmatter = data.data
    // Convert date objects to string. Otherwise there's type mismatches
    // during inference as some dates are strings and others date objects.
    if (data.data) {
      data.data = _.mapValues(data.data, v => {
        if (_.isDate(v)) {
          return v.toJSON()
        } else {
          return v
        }
      })
      if (_.isArray(data.data.tags)){
        data.data.tags = data.data.tags.join(',')
      }
    }

    const xxId = createNodeId(`${jsonNode.id} >>> StoryWriterMarkdown`)
    const markdownNode = {
      id: xxId,
      children: [],
      parent: jsonNode.id,
      internal: {
        content: data.content,
        type: `StoryWriterMarkdown`,
      },
    }

    markdownNode.docType = node.sourceInstanceName? node.sourceInstanceName : `blogs`
    markdownNode.html = previewHtml
    markdownNode.zipPath = node.absolutePath
    markdownNode.title = frontmatter.title || meta.title
    markdownNode.tags = frontmatter.tags || meta.tags
    if (!!markdownNode.tags && typeof(markdownNode.tags) === 'string'){
      markdownNode.tags = markdownNode.tags.split(",")
    }
    markdownNode.customCss = meta.cssText
    markdownNode.css = style
    const slug = frontmatter.slug || meta.slug || createFilePath({node, getNode})
    markdownNode.slug = fixDuplateSlug({slug: fixSlugPath(slug), reporter, node})
    markdownNode.toc = JSON.stringify(getTableOfContent($, markdownNode.slug))
    slugs[markdownNode.slug] = node
    const stringfyDate = (date)=>{
      if (_.isDate(date)){
        date = date.getTime()
      }
      date = new Date(date).toJSON()
      return date
    }
    markdownNode.createDate = stringfyDate(frontmatter.createDate || meta.createDate || Date.now())
    markdownNode.updateDate = stringfyDate(frontmatter.updateDate || meta.updateDate || Date.now())
    markdownNode.cover = frontmatter.cover || meta.cover || null
    if (!!markdownNode.cover) {
      const cover = markdownNode.cover
      const imgReg = /!\[.*\]\((.*)\)/
      const imgMatch = cover.match(imgReg)
      if (imgMatch){
        markdownNode.cover = imgMatch[1]
      }
    }
    const pFragments = []
    $('.html_preview.preview>p').each((i, p)=>{
      pFragments.push($(p).html())
    })

    markdownNode.excerpt = frontmatter.excerpt || meta.excerpt || truncatise(pFragments.join("\n"), {
      TruncateBy: "characters",
      TruncateLength: 140,
      StripHTML: true,
      Strict: true
    })
    markdownNode.meta = {
      title: ``, // always include a title
      ...data.data,
    }

    markdownNode.rawMarkdownBody = data.content

    // Add path to the markdown file path
    if (jsonNode.internal.type === `File`) {
      markdownNode.fileAbsolutePath = jsonNode.absolutePath
    }

    markdownNode.internal.contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(markdownNode))
      .digest(`hex`)

    createNode(markdownNode)
    createParentChildLink({ parent: jsonNode, child: markdownNode })
  } catch (err) {
    reporter.panicOnBuild(
      `Error processing Markdown ${
        jsonNode.absolutePath ? `file ${jsonNode.absolutePath}` : `in node ${jsonNode.id}`
      }:\n
      ${err.message}`
    )
  }
}
