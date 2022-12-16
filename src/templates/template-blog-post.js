import React from "react"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"
import {MdArrowForward, MdArrowBack} from "react-icons/md"
import Img from "gatsby-image"
import presets, { colors } from "../utils/presets"
import typography, { rhythm, scale, options } from "../utils/typography"
import ProgressIndicator from "../components/progress-indicator"
import Toc from "../components/toc"
import Container from "../components/container"
import TagsSection from "../components/tags-section"
import getLink from "../utils/node-link"
import LeftSidebarButtons from "../components/left-sidebar-buttons"

import Comments from '../components/comments'

class BlogPostTemplate extends React.Component {
  render() {
    const props = this.props
    const location = this.props.location
    const post = this.props.data.storyWriterMarkdown;
    const prev = this.props.pageContext.prev
    const next = this.props.pageContext.next
    const prevNextLinkStyles = {
      "&&": {
        boxShadow: `none`,
        borderBottom: 0,
        fontFamily: options.headerFontFamily.join(`,`),
        fontWeight: `bold`,
        color: colors.gatsby,
      },
    }
    const prevNextLabelStyles = {
      marginTop: 0,
      marginBottom: 0,
      color: colors.gray.calm,
      fontWeight: `normal`,
      ...scale(0),
      lineHeight: 1,
    }
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

    const postHtmlAndCss = `<style>${post.customCss}</style>\n${post.html}`

    return (
      <div css={{
          [presets.Hd]: {
            marginTop: presets.headerHeight,
          },
        }}>
        <Toc location={location} />
        <Container className="post" css={{ paddingBottom: `0` }}>
          <LeftSidebarButtons 
            zipFile={props.data.zipFile}
            pdfFile={props.data.pdfFile}
          />
          <main id={`reach-skip-nav`}>
            {/* Add long list of social meta tags */}
            <Helmet>
              <title>{post.title}</title>
              <meta
                name="description"
                content={
                  post.excerpt
                }
              />

              <meta property="og:description" content={post.excerpt} />
              <meta property="og:title" content={post.title} />
              <meta property="og:type" content="article" />
              <meta
                name="article:published_time"
                content={post.createDate}
              />
            </Helmet>
            <ProgressIndicator
              zipFile={props.data.zipFile}
            />
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
                  {post.updateDate}
                </BioLine>
              </div>
            </section>
            <h1
              css={{
                marginTop: 0,
                [presets.Desktop]: {
                  marginBottom: rhythm(5 / 4),
                },
              }}
            >
              {post.title}
            </h1>
            <section className="post-body">
              <div dangerouslySetInnerHTML={{ __html: postHtmlAndCss }} />
            </section>
            <TagsSection
              tags={post.tags}
            />
          </main>
        </Container>
        <div
          css={{
            borderTop: `1px solid ${colors.ui.light}`,
            marginTop: rhythm(2),
            [presets.Tablet]: {
              marginTop: rhythm(2),
              paddingBottom: rhythm(1),
              paddingTop: rhythm(1),
            },
            [presets.Desktop]: {
              marginTop: rhythm(3),
              paddingBottom: rhythm(2),
              paddingTop: rhythm(2),
            },
          }}
        >
          <Container>
            <div
              css={{ [presets.Phablet]: { display: `flex`, width: `100%` } }}
            >
              <div
                css={{
                  [presets.Phablet]: {
                    width: `50%`,
                  },
                }}
              >
                {prev && (
                  <Link to={getLink(prev)} css={prevNextLinkStyles}>
                    <h4 css={prevNextLabelStyles}>Previous</h4>
                    <span
                      css={{
                        [presets.Tablet]: {
                          marginLeft: `-1rem`,
                        },
                      }}
                    >
                      <MdArrowBack style={{ verticalAlign: `sub` }} />
                      {prev.title}
                    </span>
                  </Link>
                )}
              </div>
              <div
                css={{
                  textAlign: `right`,
                  marginTop: rhythm(1),
                  [presets.Phablet]: { marginTop: 0, width: `50%` },
                }}
              >
                {next && (
                  <Link to={getLink(next)} css={prevNextLinkStyles}>
                    <h4 css={prevNextLabelStyles}>Next</h4>
                    <span
                      css={{
                        [presets.Tablet]: {
                          marginRight: `-1rem`,
                        },
                      }}
                    >
                      {next.title}
                      <MdArrowForward style={{ verticalAlign: `sub` }} />
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </Container>
          <Container>
            <Comments post={post}/>
          </Container>
        </div>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $zipPath: String!, $pdfPath: String!) {
    zipFile: file(absolutePath: {eq: $zipPath}){
      publicURL
    }
    pdfFile: file(absolutePath: {eq: $pdfPath}){
      publicURL
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    storyWriterMarkdown(slug: { eq: $slug }) {
      id
      html
      excerpt
      docType
      title
      customCss
      createDate(formatString: "MMMM DD, YYYY")
      updateDate(formatString: "MMMM DD, YYYY")
      tags
      cover {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid_tracedSVG
            originalImg
          }
        }
      }
      meta {
        title
        tags
      }
    }
  }
`;
