import React from "react"
import styled from "react-emotion"
import { graphql, Link } from "gatsby"
import presets, { colors } from "../../utils/presets"
import Hexagon from 'react-hexagon'
import HexagonItem from "./hexagon-item"


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

class FeatureHexagon extends React.Component {

  render(){
    return (
      <HexagonContainerStyled>
        {[1, 4, 9, 16, 3,2,5,7,8,10,12].map((val, idx)=>{
          return (
          <Hexagon className="hex" key={idx} style={{stroke: 'orange'}}/>
         ) 
        })}
      </HexagonContainerStyled>
    )
  }
}


export default FeatureHexagon
