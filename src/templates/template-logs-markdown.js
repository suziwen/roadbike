import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"

import ContextConsumer from "../components/context"
import DocSearchContent from "../components/docsearch-content"

import Container from "../components/container"

class DocsTemplate extends React.Component {
  render() {
    const page = this.props.data.storyWriterMarkdown
    const props = this.props
    const pageHtmlAndCss = `<style>${page.customCss}</style>\n${page.html}`
    return (
      <ContextConsumer>
        {({data, set})=>{
          return (
              <React.Fragment>
                <Helmet>
                  <title>{page.title}</title>
                  <meta name="description" content={page.excerpt} />
                  <meta property="og:description" content={page.excerpt} />
                  <meta property="og:title" content={page.title} />
                  <meta property="og:type" content="article" />
                </Helmet>
                  <DocSearchContent>
                    <Container>
                      <h1 css={{ marginTop: 0 }}>
                        {page.title}
                      </h1>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: pageHtmlAndCss,
                        }}
                      />
                    </Container>
                  </DocSearchContent>
              </React.Fragment>
          )
        }}
      </ContextConsumer>
    )
  }
}

export default DocsTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    storyWriterMarkdown(slug: { eq: $slug }) {
      html
      css
      customCss
      title
      excerpt
      slug
    }
  }
`
