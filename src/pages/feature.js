import React from "react"
import styled from "react-emotion"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import * as d3 from 'd3'
import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import { vP } from "../components/gutters"
import Container from "../components/container"
import { PriceIcon} from "../assets/mobile-nav-icons"
import {MdArrowForward} from "react-icons/md"
import HomepageSection from "../components/homepage/homepage-section"
import Button from "../components/button"
import FeatureHexagon from "../components/feature/feature-hexagon"
import Mindmap from "../components/feature/mindmap"

const SvgContainerStyled = styled(`div`)`
  background: ${colors.gatsby};
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  & .link--active {
    stroke-width: 3.5px;
  }
  & .label--active {
    font-weight: bolder;
    font-size: 20pt!important;
  }
  & .glow{
    text-shadow:
    -1px -1px 3px ${colors.lilac},
    -1px  1px 3px ${colors.lilac},
    1px -1px 3px ${colors.lilac},
    1px  1px 3px ${colors.lilac};
  }
  & text{
    alignment-baseline: central;
    fill: white;
  }
  & path{
    fill: none;
  } 
`


class IndexRoute extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  componentDidMount() {}

  componentWillUnmount() {
  }

  render() {
    return (
      <SvgContainerStyled css={{ position: `relative` }}>
        <Helmet htmlAttributes={{style: 'overflow:hidden;'}}>
          <meta
            name="Description"
            content="小书匠主要功能"
          />
        </Helmet>
        <Mindmap/>
        <FeatureHexagon>
        </FeatureHexagon>
      </SvgContainerStyled>
    )
  }
}

export default IndexRoute


