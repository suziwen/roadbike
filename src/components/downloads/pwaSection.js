import React from "react"
import styled from "react-emotion"
import {MdArrowForward} from "react-icons/md"
import { graphql, Link, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import presets, { colors } from "../../utils/presets"
import { rhythm, options } from "../../utils/typography"
import HomepageSection from "../homepage/homepage-section"
import { PriceIcon} from "../../assets/mobile-nav-icons"

class PWAInstallFlow extends React.Component {
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
    const PWAInstallStyled = styled('div')`
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
      image1: file(relativePath: { eq: "pwa-install.png" }, sourceInstanceName: { eq: "assets"}) {
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
        <PWAInstallStyled>
          <Img
            fluid={data.image1.childImageSharp.fluid}
            ref={this.img1Ref}
            onLoad={this.onLoad('img1Ref')}
          />
        </PWAInstallStyled>
      )}}
    />)
  }
}

const PWADownloadSection = ()=>{


  return (
    <HomepageSection
      sectionName="PWA"
      sectionIcon={PriceIcon}
      inverseStyle={true}
      title={`Progressive Web Apps 版本安装`}
      links={[{
        to: "https://markdown.xiaoshujiang.com",
        label: "PWA 安装",
        inverseStyle: true,
        icon: MdArrowForward,
        tag: "href",
        target: "_blank",
      }]}
    >
      <PWAInstallFlow/>
    </HomepageSection>
  )
}

export default PWADownloadSection
