import React from "react"
import styled from "react-emotion"
import { graphql, Link } from "gatsby"
import presets, { colors } from "../../utils/presets"
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
  overflow: hidden;
  font-family: sans-serif;
  list-style-type: none;
  & .hex {
    position: relative;
    visibility:hidden;
    outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */
    transition: all 0.5s;
    backface-visibility: hidden;
    will-change: transform;
    transition: all 0.5s;
  }
  & .hex::after{
    content:'';
    display:block;
    padding-bottom: 86.602%;  /* =  100 / tan(60) * 1.5 */
  }
  & .hexIn{
    position: absolute;
    width:96%;
    padding-bottom: 110.851%; /* =  width / sin(60) */
    margin: 2%;
    overflow: hidden;
    visibility: hidden;
    outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */
    -webkit-transform: rotate3d(0,0,1,-60deg) skewY(30deg);
        -ms-transform: rotate3d(0,0,1,-60deg) skewY(30deg);
            transform: rotate3d(0,0,1,-60deg) skewY(30deg);
      transition: all 0.5s;
  }
  & .hexIn * {
    position: absolute;
    visibility: visible;
    outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */
  }
  & .hexLabel {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      text-align: center;
      color: #fff;
      background: #6abf40;
      overflow: hidden;
      -webkit-transform: skewY(-30deg) rotate3d(0,0,1,60deg);
          -ms-transform: skewY(-30deg) rotate3d(0,0,1,60deg);
              transform: skewY(-30deg) rotate3d(0,0,1,60deg);
  }


  /*** HEX CONTENT **********************************************************************/

  & .hex .header {
    width: 100%;
    padding: 5%;
    box-sizing:border-box;
    font-weight: 300;
    color: #F5CE95;
    text-align: center;
    font-size: 1.5em;
    z-index: 1;
  }

  /*** HOVER EFFECT  **********************************************************************/



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
          <HexagonItem key={idx}/>
         ) 
        })}
      </HexagonContainerStyled>
    )
  }
}


export default FeatureHexagon
