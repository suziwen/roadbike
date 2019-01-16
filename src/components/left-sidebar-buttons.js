import React from "react"
import styled from "react-emotion"
import { Link } from "gatsby"

import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"

const ContainerStyled = styled('div')`
  position: fixed;
  right: 20px;
  display: none;
  text-align: right;
  flex-direction: column;
  ${presets.Tablet}{
    display: flex;
  }
  ${presets.Desktop}{
    display: flex;
  }
  & .fas{
    vertical-align: middle;
  }
  & .icon_tip{
    font-size: .7em;
    opacity: 0;
    transition: transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 0.5s ease-out, color 0.1s linear;
    transform: translateX(-1em);
    visibility: hidden;
    background-color: inherit;
    white-space: nowrap;
    border-bottom: 1px dashed;
    display: inline-block;
    margin-right: 10px;
  }
  &:hover .icon_tip{
    opacity: 1;
    transform: none;
    visibility: visible;
  }
`

class LeftSidebarButtons extends React.Component {
  render() {
    const props = this.props
    let zipURL = ''
    let pdfURL = ''
    if (props.zipFile){
      //zipURL = `http://localhost:3000/#xsjzip=${encodeURIComponent(window.location.origin + props.zipFile.publicURL)}`
      zipURL = `http://markdown.xiaoshujiang.com/#xsjzip=${encodeURIComponent(window.location.origin + props.zipFile.publicURL)}`
    }
    if (props.pdfFile){
      pdfURL = `/pdf/#file=${encodeURIComponent(props.pdfFile.publicURL)}`
    }
    if (zipURL || pdfURL){
      return (
      <ContainerStyled>
        {zipURL&&<a href={zipURL}><span className="icon_tip">修改当前文件</span><i className="fas fa-file-archive"></i></a>}
        {pdfURL&&<Link to={pdfURL}><span className="icon_tip">查看pdf版本</span><i className="fas fa-file-pdf"></i></Link>}
      </ContainerStyled>
        )
    } else {
      return ""
    }
  }
}

export default LeftSidebarButtons

