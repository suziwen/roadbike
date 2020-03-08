import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "react-emotion"

import typography, { rhythm, scale, options } from "../utils/typography"
import presets, { colors } from "../utils/presets"
import getLink from "../utils/node-link"


const ArticleStyled = styled('article')`
  display: flex;
  flex-direction: column;
  ${presets.Tablet} {
    flex-direction: row;
  }
`

const CoverStyled = styled('div')`
  display: none;
  position: relative;
  pointer-events: none;
  ${presets.Tablet} {
    flex-basis: 180px;
    flex-grow: 0;
    display: block;
  }
`

const WaveStyled = styled(`div`)`
  position: absolute;
  right: 0;
  height: 100%;
  top: 0;
  background: url(/imgs/whitewave2cb.svg);
  z-index: 10;
  background-repeat-y: repeat;
  background-repeat-x: no-repeat;
`

const Wave1Styld = styled(WaveStyled)`
  width: 50px;
`
const Wave2Styld = styled(WaveStyled)`
  width: 60px;
  background-position-y: 50px;
  opacity: .6;
`
const Wave3Styld = styled(WaveStyled)`
  opacity: .3;
  width: 70px;
  background-position-y: 100px;
`
const Wave4Styld = styled(WaveStyled)`
  opacity: .1;
  width: 80px;
  background-position-y: 20px;
`

const ContentStyled = styled(`div`)`
  flex-basis: 100%;
  flex-grow: 0;
  white-space: normal;
  word-break: break-word;
  ${presets.Tablet} {
    flex-basis: calc(100% - 180px);
    padding: ${rhythm(options.blockMarginBottom * 2)};
    padding-left: ${rhythm(options.blockMarginBottom * 3)};
    padding-right: ${rhythm(options.blockMarginBottom * 3)};
    margin-left: ${rhythm(-options.blockMarginBottom * 2)};
    margin-right: ${rhythm(options.blockMarginBottom * 2)};
  }
`

const BlogPostPreviewItem = ({ post, className }) => {
  return (
    <article className={className} css={{ position: `relative` }}>
      <ArticleStyled>
        <CoverStyled>
          <Img fluid={post.cover.childImageSharp.fluid} css={{height: `100%`}}/>
          <Wave1Styld/>
          <Wave2Styld/>
          <Wave3Styld/>
          <Wave4Styld/>
        </CoverStyled>
      <ContentStyled>
      <Link to={getLink(post)}>
        <h2>{post.title}</h2>
        <p css={{
        fontFamily: typography.options.bodyFontFamily.join(`,`),
        textIndent: `2em`,
        fontWeight: `normal` 
        }}>
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
    </ContentStyled>
    </ArticleStyled>
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
    updateDate(formatString: "YYYY-MM-DD")
    cover {
      childImageSharp {
        fluid(maxWidth: 1024) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    meta {
      title
    }
  }
`

export default BlogPostPreviewItem
