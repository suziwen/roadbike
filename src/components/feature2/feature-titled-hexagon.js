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

const getIconObj = (item)=>{
  switch(item.id){
    case 'editor':
      return {tag: FaConnectdevelop, type: 'fa'}
    case 'grammar':
      return  {tag: FaMarkdown, type: 'fa'}
    case 'featureCodeGrammar':
      return {tag: FaCode, type: 'fa'}
    case 'mulPreviewLayout':
      return {tag: FaBookReader, type: 'fa'}
    case 'syncScrollPreviewOutline':
      return {tag: FaShippingFast, type: 'fa'}
    case 'fileHistory':
      return {tag: FaHistory, type: 'fa'}
    case 'evernote':
      return {tag: FiInbox, type: 'fi'}
    case 'github':
      return {tag: FiGithub, type: 'fi'}
    case 'gitlab':
      return {tag: FiGitlab, type: 'fi'}
    case 'mulEditorType':
      return {tag: FaRocket, type: 'fa'}
    case 'dropbox':
      return {tag: FaDropbox, type: 'fa'}
    case 'waterMarkFloatPreviewLayout':
      return {tag: FaGrinBeam, type: 'fa'}
    case 'themesEditor':
      return {tag: FaCannabis, type: 'fa'}
    case 'zenPreview':
      return {tag: FaExpand, type: 'fa'}
    case 'zenWriter':
      return {tag: FaUserEdit, type: 'fa'}
    case 'editorOutline':
      return {tag: FaTree, type: 'fa'}
    case 'pptPreview':
      return {tag: FaUserNinja, type: 'fa'}
    case 'pptMulPreview':
      return {tag: FaUserPlus, type:'fa'}
    case 'imageStore':
      return {tag: FaImages,type: 'fa'}
    case 'store':
      return {tag: FaFileMedical, type: 'fa'}
    default:
      return {tag:FiFeather, type: 'fi'}
  }
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
      const iconObj = getIconObj(itemObj)
      const iconClass = 'hex_icon_' + iconObj.type
      const ItemIcon = iconObj.tag
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
        tileSideLengths={30}
        tileGap={2}
        tileBorderRadii={4}
        maxHorizontal={5}
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
