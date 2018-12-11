const getLink = (node)=>{
  let link = `/blog/` + node.slug
  if (node.docType === 'docs') {
     link = `/docs/` + node.slug
  } else if (node.docType === 'logs') {
     link = `/logs/` + node.slug
  }
  return link
}
export default getLink
