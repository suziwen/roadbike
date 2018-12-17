import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"

import PageWithSidebar from "../components/page-with-sidebar"
import ContextConsumer from "../components/context"
import { itemListDocs } from "../utils/sidebar/item-list"
import DocSearchContent from "../components/docsearch-content"

import Container from "../components/container"

class DocsTemplate extends React.Component {
  render() {
    const page = this.props.data.storyWriterMarkdown
    const props = this.props
    const logSidebarItems = this.props.pageContext.logSidebarItems
    const pageHtmlAndCss = `<style>${page.customCss}</style>\n${page.html}`
    return (
      <ContextConsumer>
        {({data, set})=>{
          return (
            <PageWithSidebar
              disable={false}
              itemList={logSidebarItems}
              location={props.location}
              enableScrollSync={false}
              >
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
            </PageWithSidebar>
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
