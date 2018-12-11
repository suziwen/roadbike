const _ = require(`lodash`)
const path = require(`path`)
const isRelativeUrl = require(`is-relative-url`)
const { isWebUri } = require(`valid-url`)
const { fluid } = require(`gatsby-plugin-sharp`)
const slash = require(`slash`)

const replaceImage = async({$img, imageNode, options, reporter, cache})=>{
  let fluidResult = await fluid({
    file: imageNode,
    args: options,
    reporter,
    cache,
  })
  const fallbackSrc = fluidResult.src
  const srcSet = fluidResult.srcSet
  $img.attr('src', fallbackSrc)
  $img.attr('srcSet', srcSet)
  $img.attr('sizes', fluidResult.sizes)
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
      createNode,
      createNodeId
    })
    if (fileNode) {
      remoteImageNodes[src] = fileNode
    }
  }))
}

const replaceImages = async ({$, jsonNode, cache, pathPrefix, reporter, fileNodes})=> {
  const imageDefaults = {
    maxWidth: 650,
    wrapperStyle: ``,
    backgroundColor: `white`,
    linkImagesToOriginal: true,
    showCaptions: false,
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
        imgs.push({$img, imageNode, imageDefaults, reporter, cache})
      }
    }
  })
  await Promise.all(_.map(imgs, replaceImage))
}
module.exports = replaceImages
