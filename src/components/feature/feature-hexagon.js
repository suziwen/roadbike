import React from "react"
import styled from "react-emotion"
import { graphql, Link } from "gatsby"
import presets, { colors } from "../../utils/presets"
import Hexagon from 'react-hexagon'
import HexagonItem from "./hexagon-item"
import {FiGitlab, FiGithub, FiFeather, FiInbox} from "react-icons/fi"
import {FaGrinBeam, FaCannabis,FaUserNinja,FaDropbox, FaUserPlus, FaImages, FaFileMedical, FaConnectdevelop,  FaRocket, FaUserEdit, FaTree, FaExpand, FaHistory, FaShippingFast, FaBookReader, FaCode, FaBeer, FaMarkdown } from 'react-icons/fa'

// hexagon 布局算法取自 https://github.com/web-tiki/responsive-grid-of-hexagons
/**
To **change the number of hexagons per row**, you need to:

### Width of `.hex`
Customize the with of the `.hex` elements with:
```
w = width of the .hex elements in percent
x = the number of hexagons you want on the odd rows (1st, 3rd, 5th...)

w = 100 / x
```

Example for 8 hexagons on odd rows (this means there will be 7 hexagons on even rows):
```
w = 100 / 8 = 12.5%
```

### Indent even rows
The even rows (2nd, 4th,6th...) are indented with `margin-left` on the first hexagon of even rows.

**The selector:**  
You can select that hexagon with the `.hex:nth-child(an+b)` selector (more info on on the `nth-child()` pseudo-class on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)). To determine the selector, you can use this rule:

```
.hex:nth-child(an+b)

x = the number of hexagons on odd rows(1st, 3rd, 5th...)
Y = the number of hexagons on even rows(2nd, 4th, 6th...)
a = x + y
b = x + 1
```

Example for 8 hexagons on odd rows (this means there will be 7 hexagons on even rows):
```
x = 8
y = 7
a = 8 + 7 = 15
b = 8 + 1 = 9

The selector is : .hex:nth-child(15n+9)
```

**Value of margin-left:**  
The value of margin left is **half the width of one hexagon** so for 8 hexagons on odd row :
```
with of hexagons = 12.5% (see "width of .hex")
margin-left = 12.5 / 2 = 6.25%
```
-------------

**/

const generateHexagonContainerStyled = (featureItems)=>{
  const HexagonContainerStyled = styled(`div`)`
  /***https://codepen.io/adamriguez/pen/eRaXeq**/
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 30%;
    margin: 0 auto;
    font-family: sans-serif;
    list-style-type: none;
    & .hex {
      position: relative;
      transition: all 0.5s;
      backface-visibility: hidden;
      will-change: transform;
      transition: all 0.5s;
      height: 100%;
      margin-top: -15px;
      padding-left: 5px;
      transition: transform .5s;
    }
    & .hex:hover {
      transform: scale(1.06);
      cursor: pointer;
    }
    & .hex.hex_active{
      transform: scale(2);
      z-index: 1000;
    }
    & .hex .hex_icon{
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    & .hex .hex_icon_fa path, & .hex .hex_icon_fa line{
      fill: orange;
      stroke: orange;
    }
    & .hex .hex_icon_fi{
      color: orange;
    }



    ${presets.Mobile} and (max-width: 549px) {
      font-size: 8px;
    }

    ${presets.Phablet} and ( max-width: 749px) { /* <- 2-1  hexagons per row */
      padding-bottom: 11.2%;
      font-size: 12px;
      & .hex {
        width: 50%; /* = 100 / 2 */
      }
      & .hex:nth-child(3n+3){ /* first hexagon of even rows */
        margin-left:25%;  /* = width of .hex / 2  to indent even rows */
      }
    }

    ${presets.Tablet} and (max-width: 999px) { /* <- 3-2  hexagons per row */
      padding-bottom: 7.4%;
      font-size: 14px;
      & .hex {
        width: 33.333%; /* = 100 / 3 */
      }
      & .hex:nth-child(5n+4){ /* first hexagon of even rows */
        margin-left:16.666%;  /* = width of .hex / 2  to indent even rows */
      }
    }

    ${presets.Desktop} { /* <- 4-3  hexagons per row */
      padding-bottom: 5.5%;
      font-size: 13px;
      & .hex {
        width: 12.5%; /* = 100 / 8 */
      }
      & .hex:nth-child(15n+9){ /* first hexagon of even rows */
        margin-left:6.25%;  /* = width of .hex / 2  to indent even rows */
      }
    }

  `
  return HexagonContainerStyled
}

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

class FeatureHexagon extends React.Component {
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
    this.HexagonContainerStyled = generateHexagonContainerStyled()
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
    const HexagonContainerStyled = this.HexagonContainerStyled
    return (
      <HexagonContainerStyled>
        {Object.entries(this.featureItems).map((val, idx)=>{
          const key = val[0]
          const itemObj = val[1]
          const iconObj = getIconObj(itemObj)
          const iconClass = 'hex_icon_' + iconObj.type
          const ItemIcon = iconObj.tag
          return (
          <Hexagon 
            className={this.props.selectedNode === key ?"hex hex_active": "hex"} 
            key={idx} 
            style={{stroke: 'orange', fill: 'rgba(255, 165, 0, 0.1)'}}
            onClick={()=>{this.handleSelectedNode(this.props.selectedNode ===key ? "": key)}}
            hexProps={{
              onMouseEnter:()=>{this.handleActiveNode(key)},
              onMouseLeave:()=>{this.handleActiveNode()},
            }}
          >
            <foreignObject className={"foreign-object hex_icon " + iconClass} x="50%" y="50%" style={{overflow: 'visible'}}>
              <ItemIcon style={{width: '50%', height: '50%', transform: 'translate(-50%, -50%)'}}/>
            </foreignObject>
          </Hexagon>
         ) 
        })}
      </HexagonContainerStyled>
    )
  }
}


export default FeatureHexagon
