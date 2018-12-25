import React from "react"
import styled from "react-emotion"
import posed, { PoseGroup } from 'react-pose'
import presets, { colors } from "../../utils/presets"
import { rhythm, options } from "../../utils/typography"

import resourceGif from "../../assets/feature/resource_pic.gif"
import storeGif from "../../assets/feature/store.gif"
import editorGif from "../../assets/feature/editor.gif"
import floatPreviewGif from "../../assets/feature/rotate_preview_water_preview.gif"
import previewLayoutGif from "../../assets/feature/preview_position.gif"
import pptMulScreenGif from "../../assets/feature/ppt_multi_screen_demo.gif"
import pptGif from "../../assets/feature/ppt.gif"
import editorThemeGif from "../../assets/feature/editor_theme.gif"
import zenWriteGif from "../../assets/feature/zen_write.gif"
import zenViewGif from "../../assets/feature/zen_view.gif"
import outlineGif from "../../assets/feature/outline.gif"

import featureStyles from "../feature.module.css"

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

class FeatureDetail extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  render(){
    return (
        <PoseGroup>
          {this.props.selectedNode&&
          <Modal key="modal" className={featureStyles.gif_modal} >
            <div><img src={storeGif} /></div>
          </Modal>}
      </PoseGroup>
    )
  }
}

export default FeatureDetail
