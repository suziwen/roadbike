import React from "react"
import { graphql, withPrefix } from "gatsby"
import Helmet from "react-helmet"
import presets, { colors } from "../utils/presets"
import { rhythm } from "../utils/typography"
import { vP } from "../components/gutters"
import Container from "../components/container"
import MastheadContent from "../components/masthead"
import Ripple from "../components/ripple"
import {
  setupScrollersObserver,
  unobserveScrollers,
} from "../utils/scrollers-observer"

//import "../../static/fonts/Webfonts/xsj/homepage.css"
//import "../fonts/Webfonts/xsj/stylesheet.css"

class IndexRoute extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      rippled: false,
    }
    this.inkRef = React.createRef()
    this.rippleEffect = this.rippleEffect.bind(this)
    this.rippleEnd = this.rippleEnd.bind(this)
  }
  componentDidMount() {
    setupScrollersObserver()
  }

  componentWillUnmount() {
    unobserveScrollers()
  }
  rippleEffect(event){
    const posX = event.pageX
    const posY = event.pageY
    this.setState({
      rippled: true,
      posX,
      posY,
    })
  }
  rippleEnd(){
    //document.location.href = "http://localhost:3000"
    document.location.href = process.env.STORY_WRITER || "http://markdown.xiaoshujiang.com"
  }

  render() {
    return (
        <div css={{ position: `relative` }}>
          <Helmet bodyAttributes={{
            class: "roadbike-home-page",
            style: "overflow:hidden"
          }}>
            <htmlAttributes
              css={{
                overflow: `hidden`
              }}
            />
            <meta name="keywords" content="小书匠, markdown, 笔记, 知识管理"/>
            <meta
              name="Description"
              content="小书匠,不仅仅是一款 markdown 篇辑器,更是一款功能丰富,强大的知识管理工具"
            />
            <link rel="stylesheet" type="text/css" href={withPrefix('/') + "xsjfonts/fontstyles/homepage.css"}/>
          </Helmet>
          <Ripple rippled={this.state.rippled} onEnd={this.rippleEnd} cursorPos={{top: this.state.posY, left: this.state.posX}}/>
          <MastheadContent rippleEffect={this.rippleEffect} />
        </div>
    )
  }
}

export default IndexRoute
