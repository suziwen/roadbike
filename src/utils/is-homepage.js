import { withPrefix } from "gatsby"
const prefixPath = withPrefix('/')

const fixPathname = (prefixPath, pathname)=>{
  const pos = pathname.indexOf(prefixPath)
  if (pos === 0) {
     pathname = pathname.substring(prefixPath.length)
  }
  if (!pathname) pathname = "/"
  return pathname
}
const isHomepage = (pathname)=>{
  pathname = fixPathname(prefixPath, pathname)
  if (/^[\/]*feature/i.test(pathname)) {return true}
  return pathname === `/` || pathname === `/offline-plugin-app-shell-fallback/`
}
export default isHomepage

