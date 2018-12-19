const _ = require(`lodash`)
const path = require(`path`)
const isRelativeUrl = require(`is-relative-url`)
const { isWebUri } = require(`valid-url`)
const { fluid, traceSVG } = require(`gatsby-plugin-sharp`)
const slash = require(`slash`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)


const replaceImage = async({$img, imageNode, options, reporter, cache})=>{
  let fluidResult = await fluid({
    file: imageNode,
    args: options,
    reporter,
    cache,
  })
  const originalImg = fluidResult.originalImg
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
  $img.attr('class', 'front_image')
  $img.attr('src', fallbackSrc)
  $img.attr('srcSet', srcSet)
  $img.attr('sizes', fluidResult.sizes)
  // 单引号在 cheerio 里会被强制转换成双引号，造成 svgUri 里的内容不能正常显示，
  // 又不想把 cheerio 里的 decodeEntities: false 
  // 只能把 svgUri 改成 base64 格式》？？
  // https://github.com/cheeriojs/cheerio/issues/720
  // https://github.com/tigt/mini-svg-data-uri
  //
  const spanStr = `<div style="max-width:${presentationWidth}px; margin-left: auto; margin-right: auto;position:relative;"></div>`
  $img.wrap(spanStr)
  $img.before(`<div style="width:100%;display:block;padding-bottom: ${ratio};"></div>`)
  $img.before(`<img class="background_image" src="${svgUri}" style="position: absolute;top:0;left:0;width: 100%;height:100%;object-fit: cover;object-position: center;"/>`)
  $img.attr('style', `opacity: 0;max-width: 100%;position: absolute;top:0;left:0;width: 100%;height:100%;object-fit: cover;object-position: center;`)
  console.log($img.parent().parent().html())
}

const transformImages = async({$, cache, store, createNode, createNodeId})=>{
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
  await Promise.all(_.map(imgs, async($img)=>{
    const src = $img.attr('src')
    const fileNode = await createRemoteFileNode({
      url: src,
      store,
      cache,
      createNode,
      createNodeId
    })
    if (fileNode) {
      console.log(`tranform remote image node success`)
      remoteImageNodes[src] = fileNode
    }
  }))
  return remoteImageNodes
}

const replaceImages = async ({$, jsonNode, cache, pathPrefix, reporter, fileNodes})=> {
  const imageDefaults = {
    maxWidth: 1024,
    pathPrefix,
    withWebp: false,
  }
  const imgs = []
  $('img').each((index, img)=>{
    const $img = $(img)
    const src = $img.attr('src')
    if (src && isRelativeUrl(src)){
      const imagePath = slash(path.join(jsonNode.dir, src))
      const imageNode = _.find(fileNodes, (fileNode)=>{
        if (fileNode && fileNode.absolutePath){
          return fileNode.absolutePath === imagePath
        }
      })
      if (imageNode){
        imgs.push({$img, imageNode, options:imageDefaults, reporter, cache})
      }
    }
  })
  await Promise.all(_.map(imgs, replaceImage))
}
exports.replaceImages = replaceImages

exports.transformImages = transformImages
