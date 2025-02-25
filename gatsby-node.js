const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const req = require('require-yml')
const _docSidebarItems = req(`./src/data/sidebars/doc-links.yaml`)
const gitalkOptions = require('./gitalk-options')
const MD5 = require('crypto-js/md5')
const {GitalkPluginHelper} = require('gatsby-plugin-gitalk')

const mergePath = (basePath = '/', path = '')=>{
  let result = "/" + basePath + "/" + path
  result = result.replace(/\/+/g, '/')
  return result
}

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createHash = link => {
  let index = -1
  if (link) index = link.indexOf(`#`)
  return index >= 0 ? link.substr(index + 1) : false
}

// re generate uid,
const generateUid = (uid, uidObj, times=0)=>{
  let tempUid = uid
  if (times > 0 ) {
    tempuid = uid + `_` + times
  }
  if (uidObj[tempUid]) {
    return checkHasUid(uid, uidObj, times + 1)
  } else {
    return tempUid
  }
}

const getPdfPath = (zipPath)=>{
  const pos = zipPath.lastIndexOf('.zip')
  const pdfPath = zipPath.substring(0, pos) + '.pdf'
  return pdfPath
}

const extenditemList = itemList => {
  if (!itemList) {
    return []
  }
  const uidObj = {}
  itemList.forEach(section => {
    if (section && section.link){
      const hash = createHash(section.link)
      if (hash) {
        section.hash = hash
      }
    } 
    section.parentUid = ''
    const uid = generateUid(section.title, uidObj, 0)
    section.uid = uid
    if (section.items) extendItem(section.items, uid, uidObj)
  })
  return itemList
}


const extendItem = (items, parentUid, uidObj) => {
  items.forEach(item => {
    item.hash = createHash(item.link)
    item.parentUid = parentUid
    const uid = generateUid(parentUid + '___' + item.title, uidObj, 0)
    item.uid = uid
    uidObj[uid] = true
    if (item.items) extendItem(item.items, uid, uidObj)
  })
}

const docSidebarItems = extenditemList(_docSidebarItems).map(item => {
  return { ...item, key: `docs` }
})

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions
  const pageSize = 8;

  const docPostTemplate = path.resolve(`src/templates/template-docs-markdown.js`)
  const logPostTemplate = path.resolve(`src/templates/template-logs-markdown.js`)
  const blogPostTemplate = path.resolve(`src/templates/template-blog-post.js`)
  const paginatedPostsTemplate = path.resolve(`src/templates/template-blog-list.js`)
  const tagTemplate = path.resolve(`src/templates/tags.js`)

  const result = await graphql(
      `
        {
          allStoryWriterMarkdown(
            sort: { fields: [updateDate], order: DESC }, limit: 1000
          ) {
            edges {
              node {
                id
                title
                toc
                docType
                docId
                slug
                zipPath
                tags
                createDate(formatString: "x")
                updateDate
                excerpt
              }
            }
          }
        }
      `
    )
    if (result.errors) {
      console.log(result.errors)
      throw result.error
    }

    // Create blog posts pages.
    if (!result.data) {
      throw "no story writer markdown"
      return
    }
    const slugMap = {}
    const posts = result.data.allStoryWriterMarkdown.edges
    const blogPosts = _.filter(result.data.allStoryWriterMarkdown.edges, edge=>{
      const docType = _.get(edge, `node.docType`)
      if (docType === `blogs`) {
        return edge
      }
      return undefined
    })
    const gitalkCreateIssueToken = process.env.GITALK_CREATE_ISSUE_TOKEN
    if (gitalkCreateIssueToken) {
      // 仅更新最近的 10 篇文章 issue 是否需要创建评论,
      // 防止 github api 请求限制超额问题
      for(let index = 0; index < posts.length && index < 10; index++) {
        //如果用户使用了像 github action, 并提供了 创建 issue 的 Token, 就直接先创建 issue
        const post = posts[index]
        const issueOptions = Object.assign({}, gitalkOptions, {
          id: MD5(post.node.slug || post.node.id),
          title: post.node.title,
          description: post.node.excerpt,
          url: 'https://suziwen.github.io' + mergePath('/', post.node.slug),
        }, {
          personalToken: gitalkCreateIssueToken
        })
        await GitalkPluginHelper.createIssue(issueOptions)
        reporter.info(`create issue: ${post.node.title}`)
      }
    }

    posts.forEach((post, index) => {

      const slugKey = '/' + post.node.slug.replace(/^\/*|\/*$/g, '')
      const idKey = '/' + post.node.docId.replace(/^\/*|\/*$/g, '')
      if (post.node.docType === 'logs') {
        slugMap[slugKey] = '/logs/' + post.node.slug + '/'
        slugMap[idKey] = slugMap[slugKey]
      }
      if (post.node.docType === 'docs') {
        slugMap[slugKey] = '/docs/' + post.node.slug + '/'
        slugMap[idKey] = slugMap[slugKey]
      }
      if (post.node.docType === 'blogs') {
        slugMap[slugKey] = '/blog/' + post.node.slug + '/'
        slugMap[idKey] = slugMap[slugKey]
      }
    })

      // Tag pages:
      let tags = [];
      // Iterate through each post, putting all found tags into `tags`
      posts.forEach(edge => {
          if (_.get(edge, "node.tags")) {
              tags = tags.concat(edge.node.tags);
          }
      });
      // Eliminate duplicate tags
      tags = _.uniq(tags);

      // Make tag pages
      tags.forEach(tag => {
          createPage({
              path: `/tags/${_.kebabCase(tag)}/`,
              component: tagTemplate,
              context: {
                  tag,
              },
          });
      });
    
    const logNodes = []
    const logSidebarItems = []
    const visItems = []
    posts.forEach(post => {
      if (post.node.docType === 'logs') {
        logNodes.push(post.node)
        visItems.push({
          id: post.node.id,
          start: parseInt(post.node.createDate),
          title: post.node.title,
          link: encodeURI(`/logs/${post.node.slug}/`),
        })
        logSidebarItems.push({
          title: post.node.title,
          link: encodeURI(`/logs/${post.node.slug}/`),
          hash: false,
          disableExpandAll: true,
          key: 'logs'
        })
      }
      if (post.node.docType === 'docs') {
        createPage({
          path: `/docs/` + post.node.slug + `/`,
          component: docPostTemplate,
          context: {
            slug: post.node.slug,
            zipPath: post.node.zipPath,
            pdfPath: getPdfPath(post.node.zipPath),
            sidebarItems: docSidebarItems
          },
        })
      }
    })
    createRedirect({
      toPath: `/blog/vip/price/flow`,
      fromPath: `/priceflow.html`,
      redirectInBrowser: true,
      isPermanent: true
    })
    createRedirect({
      toPath: `/price`,
      fromPath: `/price.html`,
      redirectInBrowser: true,
      isPermanent: true
    })
    createRedirect({
      toPath: `/feature`,
      fromPath: `/feature.html`,
      redirectInBrowser: true,
      isPermanent: true
    })
    for (const key in slugMap) {
      createRedirect({
        toPath: slugMap[key],
        fromPath: key,
        redirectInBrowser: true,
      })
      createRedirect({
        toPath: slugMap[key],
        fromPath: key + '/',
        redirectInBrowser: true,
      })
    }
    logNodes.forEach((node, index)=>{
      if (index === 0) {
        createPage({
          path: `/logs/`,
          component: logPostTemplate,
          context: {
            id: node.id,
            slug: node.slug,
            zipPath: node.zipPath,
            pdfPath: getPdfPath(node.zipPath),
            visItems: visItems,
            sidebarItems: logSidebarItems
          },
        })
      }
      createPage({
        path: `/logs/` + node.slug + `/`,
        component: logPostTemplate,
        context: {
          id: node.id,
          slug: node.slug,
          zipPath: node.zipPath,
          pdfPath: getPdfPath(node.zipPath),
          visItems: visItems,
          sidebarItems: logSidebarItems
        },
      })
    })

    blogPosts.forEach((post, index) => {
      let related = posts.filter((p) => {
          if(p.node.slug === post.node.slug) {
              return false;
          }

          var filteredTags = post.node.tags.filter((tag) => {
              if(p.node.tags.indexOf(tag) !== -1) {
                  return true;
              }
              return false;
          });
          if(filteredTags && filteredTags.length > 0) {
              return true;
          }

          return false;
      });

      related = _.shuffle(related).slice(0,6);
      const wrapperNode = (node)=>{
        if (node) {
          return {
            title: node.title,
            docType: node.docType,
            slug: node.slug
          }
        }
        return null;
      }
      related = related.map((_node)=>{
        _node = _node && _node.node;
        return wrapperNode(_node);
      });
      let next = index === 0 ? null : blogPosts[index - 1].node
      next = wrapperNode(next);
      let prev =
        index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
      prev = wrapperNode(prev);
      let blogSidebarItems = null
      let enableScrollSync = null
      if (post.node.toc) {
        const _blogSidebarItems = JSON.parse(post.node.toc)
        if (_blogSidebarItems.length > 0) {
          const fixSlug = (items)=>{
            items.forEach((item)=>{
              item.link = encodeURI(`/blog/${item.link}`)
              if (item.items) {
                fixSlug(item.items)
              }
            })
          }
          fixSlug(_blogSidebarItems)
          enableScrollSync = true
          blogSidebarItems = extenditemList(_blogSidebarItems).map(item => {
            return { ...item, key: `blog` }
          })
        }
      }
      //const _blogSidebarItems = JSON.parse(post.node.toc)
     // const blogSidebarItems = extenditemList(_blogSidebarItems).map(item => {
     //   return { ...item, key: `blogs` }
     // })
      createPage({
        path: `/blog/` + post.node.slug + `/`,
        component: blogPostTemplate,
        context: {
          slug: post.node.slug,
          zipPath: post.node.zipPath,
          pdfPath: getPdfPath(post.node.zipPath),
          sidebarItems: blogSidebarItems,
          isSidebarDisabled: true,
          enableScrollSync,
          prev,
          next,
          related
        },
      })
    })

     // pagination blogPost
    const chunkedPosts = _.chunk(blogPosts, pageSize);
    chunkedPosts.forEach((chunk, index) => {
      let path = `/blog/`
      if (index > 0) {
        path = `/blog/page/${index+1}/`
      }
      createPage({
          path: path,
          component: paginatedPostsTemplate,
          context:
              {
                limit: pageSize,
                skip: index * pageSize,
                numPages: Math.ceil(blogPosts.length / pageSize),
                currentPage: index + 1,
              }
          ,
      })
    })
}


exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === `build-javascript`) {
    actions.setWebpackConfig({
      devtool: false,
    })
  }
}


exports.onCreatePage = ({page, actions})=> {
  const { createPage } = actions
  if(page.path.indexOf(`/docs/`) === 0) {
    page.context.sidebarItems = docSidebarItems
    createPage(page)
  } else if (page.path.indexOf(`/logs/`) === 0) {
    createPage(page)
  } else {
    createPage(page)
  }
}


exports.onCreateNode = ({ node, actions, getNodesByType, getNodes }) => {
  const { createNode, createNodeField } = actions
  if (node.internal.type === 'StoryWriterMarkdown') {
    node.haveCover = true
    if (!node.cover) {
      node.haveCover = false
      const fileNodes = getNodesByType('File');
      const coverNodes = fileNodes.filter((node)=>{
        return node.sourceInstanceName == 'covers' && node.extension == 'png';
      });
      const coverNode = coverNodes[getRandomInt(0, coverNodes.length - 1)];
      node.cover = path.relative(path.dirname(node.fileAbsolutePath), coverNode.absolutePath);
    }
  }
}
