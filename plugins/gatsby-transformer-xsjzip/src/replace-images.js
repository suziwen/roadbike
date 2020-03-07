const _ = require(`lodash`)
const fs = require(`fs-extra`)
const path = require(`path`)
const Url = require(`url`)
const validFilename = require('valid-filename')
const isRelativeUrl = require(`is-relative-url`)
const { isWebUri } = require(`valid-url`)
const { fluid, traceSVG } = require(`gatsby-plugin-sharp`)
const slash = require(`slash`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)


const getParsedPath = function (url) {
    return path.parse(Url.parse(url).pathname);
}


const replaceImage = async({$img, imageNode, options, reporter, cache, isLocal})=>{
  const isBlockImg = $img.parent().parent().hasClass('story_block_image')
  const mediaType = imageNode.internal.mediaType
  let fluidResult = await fluid({
    file: imageNode,
    args: options,
    reporter,
    cache,
  })
  const fallbackSrc = fluidResult.src
  const srcSet = fluidResult.srcSet
  const presentationWidth = fluidResult.presentationWidth
  const presentationHeight = fluidResult.presentationHeight
  const ratio = `${(1 / fluidResult.aspectRatio) * 100}%`
  const svgUri = await traceSVG({
    file: imageNode,
    args: options,
    fileArgs: {},
    reporter,
    cache,
  })
  if (mediaType === 'image/gif' && isBlockImg) {
    const fileName = `${imageNode.name}-${imageNode.internal.contentDigest}${
      imageNode.ext
    }`

    const publicPath = path.join(
      process.cwd(),
      `public`,
      `static`,
      fileName
    )

    if (!fs.existsSync(publicPath)) {
      fs.copy(imageNode.absolutePath, publicPath, err => {
        if (err) {
          console.error(
            `error copying file from ${
              imageNode.absolutePath
            } to ${publicPath}`,
            err
          )
        }
      })
    }
    
    const originalImg = `/static/${fileName}`
    $img.attr('class', 'front_image')
    $img.attr('src', fallbackSrc)
    $img.attr('data-src', originalImg)
    $img.attr('data-still', fallbackSrc)
    // 单引号在 cheerio 里会被强制转换成双引号，造成 svgUri 里的内容不能正常显示，
    // 又不想把 cheerio 里的 decodeEntities: false 
    // 只能把 svgUri 改成 base64 格式》？？
    // https://github.com/cheeriojs/cheerio/issues/720
    // https://github.com/tigt/mini-svg-data-uri
    //
    const spanStr = `<div class="gatsby-wrapper-image" style="display:inline-block;max-width: 100%;width:${presentationWidth}px; margin-left: auto; margin-right: auto;position:relative;"></div>`
    $img.wrap(spanStr)
    $img.before(`<div style="width:100%;display:block;padding-bottom: ${ratio};"></div>`)
    $img.before(`<img class="background_image" src="${svgUri}" style="position: absolute;top:0;left:0;width: 100%;height:100%;object-fit: cover;object-position: center;"/>`)
    $img.attr('style', `max-width: 100%;position: absolute;top:0;left:0;width: 100%;height:100%;object-fit: cover;object-position: center;`)
    const gifPlayerStr = `<div class="gif_player"></div>`
    $img.wrap(gifPlayerStr)
    $img.before(`<div class="play_button"></div>`)
  } else {
    $img.attr('class', 'front_image')
    if (isLocal) {
      $img.attr('src', fallbackSrc)
      $img.attr('srcSet', srcSet)
      $img.attr('sizes', fluidResult.sizes)
    }
    $img.attr('data-action', 'zoom')
    // 单引号在 cheerio 里会被强制转换成双引号，造成 svgUri 里的内容不能正常显示，
    // 又不想把 cheerio 里的 decodeEntities: false 
    // 只能把 svgUri 改成 base64 格式》？？
    // https://github.com/cheeriojs/cheerio/issues/720
    // https://github.com/tigt/mini-svg-data-uri
    //
    const spanStr = `<div class="gatsby-wrapper-image" style="display:inline-block;max-width: 100%;width:${presentationWidth}px; margin-left: auto; margin-right: auto;position:relative;"></div>`
    $img.wrap(spanStr)
    $img.before(`<div style="width:100%;display:block;padding-bottom: ${ratio};"></div>`)
    $img.before(`<img class="background_image" src="${svgUri}" style="position: absolute;top:0;left:0;width: 100%;height:100%;object-fit: cover;object-position: center;"/>`)
    $img.attr('style', `max-width: 100%;position: absolute;top:0;left:0;width: 100%;height:100%;object-fit: cover;object-position: center;`)
  }
}

const transformImages = async({$, cache, store, createNode, createNodeId, parentNode, createParentChildLink, pluginOptions})=>{
  const imgs = []
  $('img').each((index, img)=>{
    const $img = $(img)
    const src = $img.attr('src')
    if (src && !isRelativeUrl(src)){
      if (isWebUri(src)){
        imgs.push($img)
      }
    }
  })
  const remoteImageNodes = {}
  if (pluginOptions.cachedRemoteImages) {
    await Promise.all(_.map(imgs, async($img)=>{
      const src = $img.attr('src')
      const fileInfo = getParsedPath(src)
      if (fileInfo && fileInfo.ext.length < 8 && validFilename(fileInfo.name + fileInfo.ext)){
        const fileNode = await createRemoteFileNode({
          url: src,
          name: 'xsj',
          ext: '.png',
          store,
          cache,
          createNode,
          createNodeId
        })
        if (fileNode) {

          fileNode.parent = parentNode.id
          console.log(`tranform remote image node success`)
          createParentChildLink({ parent: parentNode, child: fileNode })
          remoteImageNodes[src] = fileNode
        }
      }
    }))
  }
  return remoteImageNodes
}

const replaceImages = async ({$, jsonNode, cache, pathPrefix, reporter, fileNodes, remoteImageNodes})=> {
  const imageDefaults = {
    maxWidth: 1024,
    pathPrefix,
    withWebp: false,
  }
  const imgs = []
  $('img').each((index, img)=>{
    const $img = $(img)
    const src = $img.attr('src')
    if (src){
      if (isRelativeUrl(src)){
        const imagePath = slash(path.join(jsonNode.dir, src))
        const imageNode = _.find(fileNodes, (fileNode)=>{
          if (fileNode && fileNode.absolutePath){
            return fileNode.absolutePath === imagePath
          }
        })
        if (imageNode){
          imgs.push({$img, imageNode, options:imageDefaults, reporter, cache, isLocal: true})
        }
      } else {
      if (isWebUri(src)){
        const imageNode = remoteImageNodes[src]
        if (imageNode) {
          imgs.push({$img, imageNode, options:imageDefaults, reporter, cache, isLocal: false})
        }
      }
      }
    }
  })
  await Promise.all(_.map(imgs, replaceImage))
}
exports.replaceImages = replaceImages

exports.transformImages = transformImages
