import React from "react"
import styled from "react-emotion"
import {MdArrowForward} from "react-icons/md"
import { graphql, Link, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import presets, { colors } from "../../utils/presets"
import { rhythm, options } from "../../utils/typography"
import HomepageSection from "../homepage/homepage-section"
import { PriceIcon} from "../../assets/mobile-nav-icons"

class JOPPInstallFlow extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.img1Ref = React.createRef()
    this.onLoad = this.onLoad.bind(this)
  }
  onLoad(imgRefStr){
    const self = this
    return ()=>{
      const imgRef = self[imgRefStr].current.imageRef.current
      imgRef.setAttribute("data-action", "zoom")
    }
  }
  render(){
    const JOPPInstallStyled = styled('div')`
      display: flex;
      flex-direction: column;
      justify-content: center;
      &>.gatsby-image-wrapper{
        flex: auto;
        margin: .3em;
        border-radius: 0.3125em;
        box-shadow: 0 2px 4px 0 ${colors.gray.light}, 0 2px 10px 0  ${colors.gray.superLight};
      }
      ${presets.Tablet} {
        flex-direction: row;
        align-items: flex-start;
      }
    `
    return (<StaticQuery
      query={graphql`
    query {
      image1: file(relativePath: { eq: "justonepagepdf.png" }, sourceInstanceName: { eq: "assets"}) {
        publicURL
        childImageSharp {
          fluid(maxWidth: 1000){
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
      `}
      render={data => {
      return (
        <JOPPInstallStyled>
          <Img
            fluid={data.image1.childImageSharp.fluid}
            ref={this.img1Ref}
            onLoad={this.onLoad('img1Ref')}
          />
        </JOPPInstallStyled>
      )}}
    />)
  }
}

const JOPPDownloadSection = ()=>{


  return (
    <HomepageSection
      sectionName="Just One Page PDF"
      sectionIcon={PriceIcon}
      inverseStyle={true}
      title={`一款可以将网页快速保存成 PDF 的浏览器插件`}
      links={[{
        to: "https://chromewebstore.google.com/detail/just-one-page-pdf/fgbhbfdgdlojklkbhdoilkdlomoilbpl",
        label: "Chrome 商店安装",
        inverseStyle: true,
        icon: MdArrowForward,
        tag: "href",
        target: "_blank",
      }, {
        to: "https://soft.xiaoshujiang.com/blog/chrome/just_one_page_pdf_integration",
        label: "小书匠会员解锁 JOPP 教程",
        inverseStyle: true,
        icon: MdArrowForward,
        tag: "href",
        target: "_blank",
      }]}
    >
      <JOPPInstallFlow/>
    </HomepageSection>
  )
}

export default JOPPDownloadSection
