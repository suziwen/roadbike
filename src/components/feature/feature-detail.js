import React from "react"
import styled from "react-emotion"
import posed, { PoseGroup } from 'react-pose'
import GifPlayer from "react-gif-player"
import {FaTimes} from "react-icons/fa"

import "react-gif-player/dist/gifplayer.css"
import presets, { colors } from "../../utils/presets"
import { rhythm, options } from "../../utils/typography"

import resourceGif from "../../assets/feature/resource_pic.gif"
import resourceGifStill from "../../assets/feature/resource_pic.gif.png"
import storeGif from "../../assets/feature/store.gif"
import storeGifStill from "../../assets/feature/store.gif.png"
import editorGif from "../../assets/feature/editor.gif"
import editorGifStill from "../../assets/feature/editor.gif.png"
import floatPreviewGif from "../../assets/feature/rotate_preview_water_preview.gif"
import floatPreviewGifStill from "../../assets/feature/rotate_preview_water_preview.gif.png"
import previewLayoutGif from "../../assets/feature/preview_position.gif"
import previewLayoutGifStill from "../../assets/feature/preview_position.gif.png"
import pptMulScreenGif from "../../assets/feature/ppt_multi_screen_demo.gif"
import pptMulScreenGifStill from "../../assets/feature/ppt_multi_screen_demo.gif.png"
import pptGif from "../../assets/feature/ppt.gif"
import pptGifStill from "../../assets/feature/ppt.gif.png"
import editorThemeGif from "../../assets/feature/editor_theme.gif"
import editorThemeGifStill from "../../assets/feature/editor_theme.gif.png"
import zenWriteGif from "../../assets/feature/zen_write.gif"
import zenWriteGifStill from "../../assets/feature/zen_write.gif.png"
import zenViewGif from "../../assets/feature/zen_view.gif"
import zenViewGifStill from "../../assets/feature/zen_view.gif.png"
import outlineGif from "../../assets/feature/outline.gif"
import outlineGifStill from "../../assets/feature/outline.gif.png"

import featureStyles from "../feature.module.css"


const getGifObj = (key)=>{
  switch(key){
    case 'store':
      return {gif: storeGif, still: storeGifStill}
    case 'imageStore':
      return {gif: resourceGif, still: resourceGifStill}
    case 'pptPreview':
      return {gif: pptGif, still: pptGifStill}
    case 'pptMulPreview':
      return {gif: pptMulScreenGif, still: pptMulScreenGifStill}
    case 'themesEditor':
      return {gif: editorThemeGif, still: editorThemeGifStill}
    case 'zenWriter':
      return {gif: zenWriteGif, still: zenWriteGifStill}
    case 'zenPreview':
      return {gif: zenViewGif, still: zenViewGifStill}
    case 'editorOutline':
      return {gif: outlineGif, still: outlineGifStill}
    case 'waterMarkFloatPreviewLayout':
      return {gif: floatPreviewGif, still: floatPreviewGifStill}
    case 'editor':
      return {gif: editorGif, still: editorGifStill}
    default:
      return null
  }
}

const Modal = posed.div({
  enter: {
    opacity: 1,
    delay: 300,
    transition: {
      default: { duration: 300 }
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 150 }
  }
})

class GifPlayerModal extends React.Component{
  constructor(props, context) {
    super(props, context)
    this.pauseGif = null
  }
  componentDidUpdate(){
    this.pauseGif && this.pauseGif()
  }
  componentWillUnmount() {
    this.pauseGif && this.pauseGif()
    this.pauseGif = null
  }
  render(){
    const gifObj = this.props.gifObj
    return (<GifPlayer
      gif={gifObj.gif}
      still={gifObj.still}
      pauseRef={pause => this.pauseGif = pause}
    />)
  }
}

class FeatureDetail extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.pauseGif = null
  }
  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextStates){
    if (this.props.selectedNode !== nextProps.selectedNode) {
      this.pauseGif && this.pauseGif()
      return true
    }
    return false
  }
  componentWillUnmount() {
    this.pauseGif && this.pauseGif()
    this.pauseGif = null
  }
  render(){
    const node = this.props.selectedNode
    const gifObj = node && getGifObj(node)
    return (
        <PoseGroup>
          {gifObj&&
          <Modal key="modal" className={featureStyles.gif_modal} >
            <div>
              <FaTimes 
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  color: colors.gatsby,
                  zIndex: 10,
                  top: 0,
                  right: '0'
                }}
                onClick={()=>{
                  this.props.handleSelectedNode()
                }}
              />
              <GifPlayerModal gifObj={gifObj}/>
            </div>
          </Modal>}
      </PoseGroup>
    )
  }
}

export default FeatureDetail
