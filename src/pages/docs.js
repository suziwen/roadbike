import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"

import ContextConsumer from "../components/context"
import Container from "../components/container"
import DocSearchContent from "../components/docsearch-content"
import presets from "../utils/presets"

class IndexRoute extends React.Component {
  render() {
    const props = this.props
    return (
      <ContextConsumer>
        {({data, set})=>{
          return (
              <DocSearchContent>
                <Container className="preview">
                  <Helmet bodyAttributes={{
                    class: "roadbike-docs-page"
                  }}>
                    <title>文档</title>
                  </Helmet>
                  <h1 id="get-started" css={{ marginTop: 0 }}>
                    小书匠文档手册
                  </h1>
                  <p>该文档主要包含了小书匠编辑器支持的所有语法说明及小书匠使用教程。</p>
                  <p>
                    对 markdown 不是很了解的用户，建议详细阅读语法部份里的
                    <Link to="/docs/grammar/common/italic/">标准语法</Link>。
                  </p>
                  
                </Container>
              </DocSearchContent>
          )
        }}
      </ContextConsumer>
    )
  }
}

export default IndexRoute
