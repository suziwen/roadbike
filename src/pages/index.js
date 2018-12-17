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
import {
  setupScrollersObserver,
  unobserveScrollers,
} from "../utils/scrollers-observer"

//import "../fonts/Webfonts/xsj/stylesheet.css"

class IndexRoute extends React.Component {
  componentDidMount() {
    setupScrollersObserver()
  }

  componentWillUnmount() {
    unobserveScrollers()
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
          <div
            css={{
              display: `flex`,
              flexDirection: `row`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
            }}
          >
            <MastheadContent />
            <MastheadLogo />
            <div
              css={{
                padding: rhythm(presets.gutters.default / 2),
                paddingBottom: 0,
                flex: `0 0 100%`,
                maxWidth: `100%`,
                [presets.Hd]: { padding: vP, paddingTop: 0, paddingBottom: 0 },
              }}
            >
              <main
                id={`reach-skip-nav`}
                css={{
                  display: `flex`,
                  flexDirection: `row`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                }}
              >
              </main>
            </div>
          </div>
        </div>
    )
  }
}

export default IndexRoute
