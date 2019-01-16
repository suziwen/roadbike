import React from "react"
import styled from "react-emotion"
import { Link } from "gatsby"

import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"

const ContainerStyled = styled('div')`
  position: fixed;
  right: 20px;
  display: none;
  flex-direction: column;
  ${presets.Tablet}{
    display: flex;
  }
  ${presets.Desktop}{
    display: flex;
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
    return (
    <ContainerStyled>
      {zipURL&&<a href={zipURL}><i className="fas fa-file-archive"></i></a>}
      {pdfURL&&<Link to={pdfURL}><i className="fas fa-file-pdf"></i></Link>}
    </ContainerStyled>
      )
  }
}

export default LeftSidebarButtons

