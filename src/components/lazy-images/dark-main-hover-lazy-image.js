import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

const LazyImage = (props) => {
  // cant pass parameter to staticquery
  // https://github.com/gatsbyjs/gatsby/discussions/10482
  return (<StaticQuery
      query={graphql`
    query {
      image: file(relativePath: { eq: "main/dark_main_hover.png" }, sourceInstanceName: { eq: "assets"}) {
        publicURL
        childImageSharp {
          fluid(maxWidth: 1000){
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
      `}
      render={data => {
      return (
        <Img
          fluid={data.image.childImageSharp.fluid}
        />
      )}}
    />)
}
export default LazyImage
