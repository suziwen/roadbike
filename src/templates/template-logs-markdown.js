import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { itemListDocs } from "../utils/sidebar/item-list"
import DocSearchContent from "../components/docsearch-content"

import Container from "../components/container"

class DocsTemplate extends React.Component {
  render() {
    const page = this.props.data.storyWriterMarkdown
    const logSidebarItems = this.props.pageContext.logSidebarItems
    const html = page.html
    console.log(itemListDocs)

    return (
      <React.Fragment>
        <Helmet>
          <title>{page.title}</title>
          <meta name="description" content={page.excerpt} />
          <meta property="og:description" content={page.excerpt} />
          <meta property="og:title" content={page.title} />
          <meta property="og:type" content="article" />
        </Helmet>
        <Layout
          location={this.props.location}
          isSidebarDisabled={
            false
          }
          itemList={logSidebarItems}
          enableScrollSync={false}
        >
          <DocSearchContent>
            <Container>
              <h1 css={{ marginTop: 0 }}>
                {page.title}
              </h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />
            </Container>
          </DocSearchContent>
        </Layout>
      </React.Fragment>
    )
  }
}

export default DocsTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    storyWriterMarkdown(slug: { eq: $slug }) {
      html
      title
      excerpt
      slug
    }
  }
`
