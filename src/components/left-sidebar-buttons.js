import React from "react"
import styled from "react-emotion"
import { Link } from "gatsby"

import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"

// Access to global `localStorage` property must be guarded as it
// fails under iOS private session mode.
var hasLocalStorage = true
var testKey = `gatsbyjs.sidebar.testKey`
var ls
try {
  ls = global.localStorage
  ls.setItem(testKey, `test`)
  ls.removeItem(testKey)
} catch (e) {
  hasLocalStorage = false
}

const ContainerStyled = styled('div')`
  position: fixed;
  right: 20px;
  display: none;
  text-align: right;
  flex-direction: column;
  color: ${colors.ui.border};
  ${presets.Tablet}{
    display: flex;
  }
  ${presets.Desktop}{
    display: flex;
  }
  & .xsj_notice{
    position: absolute;
    margin-right: 1.6em;
    z-index: 1;
    text-align: center;
    padding: 3px;
    width: 200px;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    color: ${colors.gatsby};
    border: 1px solid ${colors.ui.border};
    background-color: ${colors.ui.light};
    font-size: .8em;
    .i_got_it{
      font-size: .6em;
      color: ${colors.ui.border};
    }
    .i_got_it:hover{
      color: ${colors.gatsby};
    }
    i{
      position: absolute;
      top: 50%;
      left: 100%;
      margin-top: -12px;
      width: 12px;
      height: 24px;
      overflow: hidden;
    }
    i:after{
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      left: 0;
      top: 50%;
      transform: translate(-50%,-50%) rotate(-45deg);
      background-color: ${colors.ui.light};
      border: 1px solid ${colors.ui.border};
    }
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
  constructor(props, context) {
    super(props, context)
    this.closeNotice = this.closeNotice.bind(this)
  }

  _readLocalStorage(key) {
    if (hasLocalStorage) {
      return localStorage.getItem(`gatsbyjs:notice:${key}`)
    } else {
      return false
    }
  }

  _writeLocalStorage(state, key) {
    if (hasLocalStorage) {
      localStorage.setItem(`gatsbyjs:notice:${key}`, JSON.stringify(state))
    }
  }
  componentDidMount() {
    if (hasLocalStorage) {
      const xsjHasNoticed = this._readLocalStorage('xsjHasNoticed')
      if (!!xsjHasNoticed){
        this.setState({
          hasNoticed: true
        })
      }
    }
  }
  closeNotice(){
    this._writeLocalStorage(true, 'xsjHasNoticed')
    this.setState({
      hasNoticed: true
    })
  }
  render() {
    const props = this.props
    const state = this.state || {}
    let zipURL = ''
    let pdfURL = ''
    // when  gatsby build , the window will undefined
    if (typeof window !== 'undefined') {
      if (props.zipFile){
        //zipURL = `http://localhost:3000/#xsjzip=${encodeURIComponent(window.location.origin + props.zipFile.publicURL)}`
        zipURL = `http://markdown.xiaoshujiang.com/#xsjzip=${encodeURIComponent(window.location.origin + props.zipFile.publicURL)}`
      }
      if (props.pdfFile){
        pdfURL = `/pdf/#file=${encodeURIComponent(props.pdfFile.publicURL)}`
      }
    }
    if (zipURL || pdfURL){
      return (
      <ContainerStyled>
        {zipURL&&<div css={{position: "relative"}}>
          {!state.hasNoticed&&<div className="xsj_notice">点击这里，可以直接修改当前文件哦
            <div>・ω・</div>
            <div><a href="javascript:void;" onClick={this.closeNotice} className="i_got_it">我知道了</a></div>
            <i></i>
          </div>}
          <a href={zipURL} target="_blank"><span className="icon_tip">修改当前文件</span><i className="fas fa-file-archive"></i></a>
        </div>
        }
        {pdfURL&&<Link to={pdfURL}><span className="icon_tip">查看pdf版本</span><i className="fas fa-file-pdf"></i></Link>}
      </ContainerStyled>
        )
    } else {
      return (
      <ContainerStyled>
      </ContainerStyled>
      )
    }
  }
}

export default LeftSidebarButtons

