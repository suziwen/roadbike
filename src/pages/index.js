import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import presets, { colors } from "../utils/presets"
import { rhythm } from "../utils/typography"
import { vP } from "../components/gutters"
import Container from "../components/container"
import MastheadBg from "../components/story-head-bg"
import MastheadContent from "../components/masthead"
import MastheadLogo from "../components/masthead-logo"
import Ripple from "../components/ripple"
import {
  setupScrollersObserver,
  unobserveScrollers,
} from "../utils/scrollers-observer"

//import "../fonts/Webfonts/xsj/homepage.css"
//import "../fonts/Webfonts/xsj/stylesheet.css"
//

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
    $('body').css({
        display: 'none',
        backgroundColor: '#2F4F4F'
    })
    //document.location.href = "http://localhost:3000"
    document.location.href = "http://markdown.xiaoshujiang.com"
  }

  render() {
//    require(`../fonts/Webfonts/xsj/stylesheet.css`)
    return (
        <div css={{ position: `relative` }}>
          <Helmet>
            <htmlAttributes
              css={{
                overflow: `hidden`
              }}
            />
            <meta
              name="Description"
              content="Blazing fast modern site generator for React. Go beyond static sites: build blogs, ecommerce sites, full-blown apps, and more with Gatsby."
            />
          </Helmet>
          <MastheadBg />
          <Ripple rippled={this.state.rippled} onEnd={this.rippleEnd} cursorPos={{top: this.state.posY, left: this.state.posX}}/>
          <div
            css={{
              display: `flex`,
              flexDirection: `row`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
            }}
          >
            <MastheadContent rippleEffect={this.rippleEffect} curs={{index: 'adfds'}} />
            <MastheadLogo />
          </div>
        </div>
    )
  }
}

export default IndexRoute
