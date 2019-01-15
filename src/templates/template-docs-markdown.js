import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"

import ContextConsumer from "../components/context"
import DocSearchContent from "../components/docsearch-content"

import Container from "../components/container"

class DocsTemplate extends React.Component {
  render() {
    const props = this.props
    const page = this.props.data.storyWriterMarkdown
    const pageHtmlAndCss = `<style>${page.customCss}</style>\n${page.html}`
    console.log('hhhhhhhhhhhhhh')
    if (props.data.zipFile){
      console.log(props.data.zipFile.publicURL)
    }
    if (props.data.pdfFile) {
      console.log(props.data.pdfFile.publicURL)
    }
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
  query($slug: String!, $zipPath: String!, $pdfPath: String!) {
    zipFile: file(absolutePath: {eq: $zipPath}){
      publicURL
    }
    pdfFile: file(absolutePath: {eq: $pdfPath}){
      publicURL
    }
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
