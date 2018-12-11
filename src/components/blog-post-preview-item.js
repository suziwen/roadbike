import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import typography, { rhythm, scale } from "../utils/typography"
import presets, { colors } from "../utils/presets"
import getLink from "../utils/node-link"

const BlogPostPreviewItem = ({ post, className }) => {
  return (
    <article className={className} css={{ position: `relative` }}>
      <Link to={getLink(post)}>
        <h2>{post.title}</h2>
        <p css={{ fontWeight: `normal` }}>
          {post.excerpt}
        </p>
      </Link>
      <div
        css={{
          display: `flex`,
          alignItems: `center`,
          marginBottom: rhythm(2),
        }}
      >
        <div
          css={{
            display: `inline-block`,
            fontFamily: typography.options.headerFontFamily.join(`,`),
            color: colors.gray.calm,
            ...scale(-2 / 5),
            [presets.Mobile]: {
              ...scale(-1 / 5),
            },
            [presets.Desktop]: {
              ...scale(0),
            },
          }}
        >
          <div>
            {` `}
            on
            {` `}
            {post.updateDate}
          </div>
        </div>
      </div>
      <Link
        to={getLink(post)}
        css={{
          position: `absolute`,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: `hidden`,
          textIndent: `-100%`,
          whiteSpace: `nowrap`,
          zIndex: 0,
          "&&": {
            border: 0,
            boxShadow: `none`,
            "&:hover": {
              background: `none`,
            },
          },
        }}
      >
        Read more
      </Link>
    </article>
  )
}

export const blogPostPreviewFragment = graphql`
  fragment BlogPostPreview_item on StoryWriterMarkdown {
    slug
    title
    docType
    excerpt
    tags
    updateDate(formatString: "DD MMMM, YYYY")
    cover {
      childImageSharp {
        fluid(maxWidth: 180) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    meta {
      title
      tags
    }
  }
`

export default BlogPostPreviewItem
