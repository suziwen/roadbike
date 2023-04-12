import React from "react"
import { graphql, withPrefix } from "gatsby"
import Helmet from "react-helmet"

class IndexRoute extends React.Component {
  render() {
    return (
      <div css={{ position: `relative`, margin: `2em 0 0`, }}>
          <Helmet>
            <link rel="stylesheet" type="text/css" href={withPrefix('/') + "xsjfonts/fontstyles/homepage.css"}/>
          </Helmet>
          <div>
            <span css={{
              fontFamily: `founderkaiti`,
            }}>从，知识到智慧，先化繁于简，再厚积薄发,术，0与1,简约却不简单</span>
          </div>
          <div>
            <span css={{
            }}>小书匠，一款助你将混沌变为有序，令你事半功倍的知识管理软件。小书匠，一款本地优先，去中心化，自定义云同步服务策略的专业数字软件。</span>
          </div>
          <div>
            <span css={{
              fontFamily: `xsjkt`,
            }}>如此而已，开始使用,开始通电，数字之美</span>
          </div>
        </div>
    )
  }
}

export default IndexRoute
