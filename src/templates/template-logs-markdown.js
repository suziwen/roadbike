import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"

import ContextConsumer from "../components/context"
import DocSearchContent from "../components/docsearch-content"
import presets, { colors } from "../utils/presets"
import typography, { rhythm, scale, options } from "../utils/typography"

import Container from "../components/container"
import LeftSidebarButtons from "../components/left-sidebar-buttons"

class DocsTemplate extends React.Component {
  render() {
    const page = this.props.data.storyWriterMarkdown
    const props = this.props
    const pageHtmlAndCss = `<style>${page.customCss}</style>\n${page.html}`
    const BioLine = ({ children }) => (
      <p
        css={{
          ...scale(-2 / 5),
          fontFamily: typography.options.headerFontFamily.join(`,`),
          lineHeight: 1.3,
          margin: 0,
          color: colors.gray.calm,
          [presets.Mobile]: {
            ...scale(-1 / 5),
            lineHeight: 1.3,
          },
        }}
      >
        {children}
      </p>
    )
    return (
      <ContextConsumer>
        {({data, set})=>{
          return (
              <React.Fragment>
                <Helmet>
                  <title>升级日志</title>
                  <meta name="description" content={page.excerpt} />
                  <meta property="og:description" content={page.excerpt} />
                  <meta property="og:title" content={page.title} />
                  <meta property="og:type" content="article" />
                </Helmet>
                  <DocSearchContent>
                    <Container css={{minHeight: '100VH',
                      [presets.Hd]: {
                        marginTop: presets.headerHeight,
                      },
                      }}>
                      <section
                        css={{
                          display: `flex`,
                          marginTop: rhythm(-1 / 4),
                          marginBottom: rhythm(1),
                          [presets.Tablet]: {
                            marginTop: rhythm(1 / 2),
                            marginBottom: rhythm(2),
                          },
                        }}
                      >
                        <div
                          css={{
                            flex: `1 1 auto`,
                            marginLeft: rhythm(1 / 2),
                          }}
                        >
                          <BioLine>
                            {page.updateDate}
                          </BioLine>
                        </div>
                      </section>
                      <h1 css={{ marginTop: 0 }}>
                        {page.title}
                      </h1>
                      <LeftSidebarButtons 
                        zipFile={props.data.zipFile}
                        pdfFile={props.data.pdfFile}
                      />
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
      createDate(formatString: "MMMM DD, YYYY")
      updateDate(formatString: "MMMM DD, YYYY")
    }
  }
`
