import React from "react"
import { graphql, withPrefix } from "gatsby"
import Helmet from "react-helmet"

class IndexRoute extends React.Component {
  render() {
    return (
        <div css={{ position: `relative` }}>
          <Helmet>
            <link rel="stylesheet" type="text/css" href={withPrefix('/') + "xsjfonts/fontstyles/homepage.css"}/>
          </Helmet>
          <div>
            <span css={{
              fontFamily: `founderkaiti`,
            }}>从，知识到智慧，先化繁于简，再厚积薄发</span>
          </div>
          <div>
            <span css={{
            }}>小书匠，一款助你将混沌变为有序，令你事半功倍的知识管理软件。</span>
          </div>
          <div>
            <span css={{
              fontFamily: `xsjkt`,
            }}>如此而已，开始使用</span>
          </div>
        </div>
    )
  }
}

export default IndexRoute
