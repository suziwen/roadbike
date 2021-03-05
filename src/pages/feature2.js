import React from "react"
import styled from "react-emotion"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import { vP } from "../components/gutters"
import Container from "../components/container"
import { PriceIcon} from "../assets/mobile-nav-icons"
import {MdArrowForward} from "react-icons/md"
import Button from "../components/button"
import FeatureHexagon from "../components/feature/feature-hexagon"
import Mindmap from "../components/feature2/mindmap"
import FeatureDetail from  "../components/feature/feature-detail"




const FeatureDetailStyled = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`



const SvgContainerStyled = styled(`div`)`
  background: ${colors.gatsby};
  background-image: linear-gradient(120deg, ${colors.ui.border} 0%, ${colors.gatsby} 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  & .linkable{
    cursor: pointer;
  }
  & .link--active, & .link--selected {
    stroke-width: 3.5px;
  }
  & .label--active, & .label--selected {
    font-weight: bolder;
    font-size: 20pt!important;
  }
  & .glow{
    text-shadow:
    -1px -1px 3px ${colors.ui.bright},
    -1px  1px 3px ${colors.ui.bright},
    1px -1px 3px ${colors.ui.bright},
    1px  1px 3px ${colors.ui.bright};
  }
  & .xsj_root_text{
    font-family: webfontxiaoshujiang;
    font-weight: bolder;
  }
  & text{
    alignment-baseline: central;
    fill: white;
  }
  & .mindmap_svg path{
    fill: none;
  } 
`


class IndexRoute extends React.Component {
  constructor(props, context) {
    super(props, context)
    const featureItems = this.props.data.allFeaturesCsv.edges.map((n)=>(n.node))
    featureItems.columns = ["id", "parentId", "type", "title", "description", "showHexagon"]
    this.featureItems = featureItems
    this.handleActiveNode = this.handleActiveNode.bind(this)
    this.handleSelectedNode = this.handleSelectedNode.bind(this)
    this.state = {
      activeNode: null,
      selectedNode: null
    }
  }

  handleSelectedNode(key){
    const oldKey = this.state.selectedNode
    if (key !== oldKey) {
      this.setState({
        selectedNode: key
      })
    }
  }
  handleActiveNode(key, type='hover'){
    const oldKey = this.state.activeNode
    if ( oldKey  != key) {
      this.setState({
        activeNode: key
      })
    }
  }
  componentDidMount() {}

  componentWillUnmount() {
  }

  render() {
    const featureItems = this.featureItems
    return (
      <SvgContainerStyled css={{ position: `relative` }}>
        <Helmet bodyAttributes={{
          class: "roadbike-feature-page"
        }}>
          <htmlAttributes
            css={{
              overflow: `hidden`
            }}
          />
          <title>主要功能</title>
          <meta
            name="Description"
            content="小书匠主要功能"
          />
        </Helmet>
        <Mindmap 
          activeNode={this.state.activeNode} 
          selectedNode={this.state.selectedNode}
          handleSelectedNode={this.handleSelectedNode}
          handleActiveNode={this.handleActiveNode}
          nodes={featureItems}
        />
        <FeatureHexagon 
          nodes={featureItems}
          selectedNode={this.state.selectedNode}
          handleSelectedNode={this.handleSelectedNode}
          handleActiveNode={this.handleActiveNode}
        >
        </FeatureHexagon>
        <FeatureDetail 
          nodes={featureItems} 
          selectedNode={this.state.selectedNode}
          handleSelectedNode={this.handleSelectedNode}
        >
        </FeatureDetail>
      </SvgContainerStyled>
    )
  }
}

export default IndexRoute


export const pageQuery = graphql`
  query {
    allFeaturesCsv{
      edges{
        node{
          id
          parentId
          type
          title
          description
          showHexagon
          
        }
      }
    }
  }
`

