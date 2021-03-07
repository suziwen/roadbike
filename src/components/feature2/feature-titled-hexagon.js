import React from "react"
import styled from "react-emotion"
import { graphql, Link } from "gatsby"
import presets, { colors } from "../../utils/presets"
import {FiGitlab, FiGithub, FiFeather, FiInbox} from "react-icons/fi"
import {FaGrinBeam, FaCannabis,FaUserNinja,FaDropbox, FaUserPlus, FaImages, FaFileMedical, FaConnectdevelop,  FaRocket, FaUserEdit, FaTree, FaExpand, FaHistory, FaShippingFast, FaBookReader, FaCode, FaBeer, FaMarkdown } from 'react-icons/fa'

import { Hexagon, TiledHexagons } from './tiled-hexagons'



const HexagonContainerStyled = styled(`div`)`
  position: absolute;
  bottom: 0;
  right: 0;
`

const iconMap = {
  editor: FaConnectdevelop,
  grammar: FaMarkdown,
  featureCodeGrammar: FaCode,
  mulPreviewLayout: FaBookReader,
  syncScrollPreviewOutline: FaShippingFast,
  fileHistory: FaHistory,
  evernote: FiInbox,
  github: FiGithub,
  gitlab: FiGitlab,
  mulEditorType: FaRocket,
  dropbox: FaDropbox,
  waterMarkFloatPreviewLayout: FaGrinBeam,
  themesEditor: FaCannabis,
  zenPreview: FaExpand,
  zenWriter: FaUserEdit,
  editorOutline: FaTree,
  pptPreview: FaUserNinja,
  pptMulPreview: FaUserPlus,
  imageStore: FaImages,
  store: FaFileMedical,
  other: FiFeather
}

const getIconObj = (item)=>{
  return iconMap[item.id] || iconMap['other']
}

class FeatureTitledHexagon extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activeItemKey: null
    }
    this.handleSelectedNode = this.props.handleSelectedNode
    this.handleActiveNode=this.props.handleActiveNode
    //https://codereview.stackexchange.com/posts/123735/revisions
    //this.featureItems = this.props.nodes.reduce((acc, { data }) => ({ ...acc, [data.data.id]: data.data }), {})
    // x.reduce((acc, obj) => ({ ...acc, [obj.id]: obj }), {})
    this.featureItems = this.props.nodes.filter((n)=>(n.showHexagon === "1")).reduce((acc, obj) => ({ ...acc, [obj.id]: obj }), {})
  }

  handleActiveItem(itemKey){
    const oldItemKey = this.state.activeItemKey
    if (oldItemKey === itemKey) {
       this.setState({
         activeItemKey: null
       })
    } else {
       this.setState({
         activeItemKey: itemKey
       })
    }
  }

  render(){
    const tiles = Object.entries(this.featureItems).map((val, idx)=>{
      const key = val[0]
      const itemObj = val[1]
      const ItemIcon = getIconObj(itemObj)
      const isSelected = this.props.selectedNode === key
      let selectedStyle = {}
      if (this.props.selectedNode === key) {
        selectedStyle = {
          textStyle: {
            color: 'white',
          },
          fill: '#7cebff',
          shadow: '#64c5d6'
        }
      }
      return {
        ...selectedStyle,
        icon: ItemIcon,
        onClick: ()=>{this.handleSelectedNode(this.props.selectedNode ===key ? "": key)},
        onMouseOver:()=>{this.handleActiveNode(key)},
        onMouseLeave:()=>{this.handleActiveNode()},
      }
    })

    return (
      <HexagonContainerStyled>
        <TiledHexagons
        tileSideLengths={20}
        tileGap={2}
        tileBorderRadii={4}
        maxHorizontal={7}
        tileTextStyles={{
          color: '#7cebff'
        }}
        tiles={tiles}
      />
      </HexagonContainerStyled>
        )
  }
}


export default FeatureTitledHexagon
