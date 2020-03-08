import React from "react"
import { graphql, Link } from "gatsby"
import Helmet from "react-helmet"
import get from "lodash/get";

import Container from "../components/container"
import BlogPostPreviewItem from "../components/blog-post-preview-item"
import Pagination from "../components/pagination"

import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import logo from "../monogram.svg"

class BlogPostsIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const siteDescription = get(
      this,
      "props.data.site.siteMetadata.description"
    );
    const siteUrl = get(this, "props.data.site.siteMetadata.siteUrl");
    const posts = get(this, "props.data.allStoryWriterMarkdown.edges");
    const pagesTotal = get(this, "props.pageContext.pagesTotal");
    const currentPage = get(this, "props.pageContext.currentPage");

    return (
        <main
          id={`reach-skip-nav`}
          css={{
            [presets.Tablet]: {
              background: colors.ui.whisper,
              paddingBottom: rhythm(options.blockMarginBottom * 4),
            },
          }}
        >
          <Helmet>
            <title>博客</title>
          </Helmet>
          <Container
            css={{
              [presets.Tablet]: {
                background: `url(${logo})`,
                paddingBottom: `${rhythm(
                  options.blockMarginBottom * 4
                )} !important`,
                backgroundSize: `30px 30px`,
                backgroundRepeat: `no-repeat`,
                backgroundPosition: `bottom center`,
              },
            }}
          >
            {posts.map(({ node }) => (
              <BlogPostPreviewItem
                post={node}
                key={node.slug}
                css={{
                  marginBottom: rhythm(options.blockMarginBottom),
                  [presets.Tablet]: {
                    background: `#fff`,
                    marginBottom: rhythm(options.blockMarginBottom * 4),
                    borderRadius: presets.radiusLg,
                    boxShadow: `0 3px 10px rgba(25, 17, 34, 0.05)`,
                    transition: `transform ${presets.animation.speedDefault} ${
                      presets.animation.curveDefault
                    },  box-shadow ${presets.animation.speedDefault} ${
                      presets.animation.curveDefault
                    }, padding ${presets.animation.speedDefault} ${
                      presets.animation.curveDefault
                    }`,
                    "&:hover": {
                      transform: `translateY(-4px)`,
                      boxShadow: `0 10px 42px rgba(25, 17, 34, 0.1)`,
                    },
                    "&:active": {
                      boxShadow: `0 3px 10px rgba(25, 17, 34, 0.05)`,
                      transform: `translateY(0)`,
                      transition: `transform 50ms`,
                    },
                  },
                  [presets.Desktop]: {},
                  [presets.Hd]: {},
                }}
              />
            ))}
            <Pagination context={this.props.pageContext} />
          </Container>
        </main>
    )
  }
}

export default BlogPostsIndex

export const pageQuery = graphql`
  query IndexQuery($limit: Int, $skip: Int) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allStoryWriterMarkdown(
      limit: $limit
      skip: $skip
      sort: { fields: [updateDate, slug], order: DESC }
      filter: {
        docType: {eq: "blogs"}
      }
    ) {
      edges {
        node {
          listCover: cover{
            childImageSharp{
              fluid(maxWidth: 180) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          ...BlogPostPreview_item
        }
      }
    }
  }
`;
