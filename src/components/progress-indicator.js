import React, { useEffect, useState } from 'react'
import styled from "react-emotion"
import presets, { colors } from "../utils/presets"
import { motion, useViewportScroll } from 'framer-motion'
import {GiFeather} from "react-icons/gi"

const Bar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 3px;
  background: ${colors.ui.border};
  z-index: 999;
  transform-origin: 0;
  ${presets.Desktop} {
    display: none;
  }
`

const UpButton = styled.div`
  cursor: pointer;
  transition: 0.35s opacity;
  position: fixed;
  bottom: 1rem;
  right: 1.5rem;
  height: 48px;
  width: 48px;
  overflow: hidden;
  z-index: 999;
  display: none;
  opacity: ${props => (props.show ? '.5' : '0')};
  pointer-events: ${props => (props.show ? 'auto' : 'none')};
  ${presets.Desktop} {
    display: block;
  }
  :hover {
    opacity: 1;
  }
`

const EditorButton = styled.div`
  cursor: pointer;
  transition: 0.35s opacity;
  position: fixed;
  bottom: 2rem;
  right: 1.5rem;
  height: 48px;
  width: 48px;
  overflow: hidden;
  z-index: 999;
  display: none;
  text-align: center;
  opacity: ${props => (props.show ? '1' : '0')};
  pointer-events: ${props => (props.show ? 'auto' : 'none')};
  ${presets.Desktop} {
    display: block;
  }
  .link {
    color: ${colors.gatsby};
    opacity: .5;
  }
  :hover {
    .link {
      opacity: 1;
    }
  }
`


const SVG = styled.svg`
  #arrow {
    transition: 0.35s all;
    fill: ${colors.gatsby};
    transform: scale(0.22) translate(48px, 48px);
  }

  #progress {
    stroke: ${colors.gatsby};
  }

  #outline {
    stroke: ${colors.ui.light};
  }
`

const ProgressIndicator = (props) => {
  const { zipFile } = props
  const { scrollYProgress } = useViewportScroll()
  const [isVisible, setIsVisible] = useState(false)
  useEffect(
    () => scrollYProgress.onChange(v => setIsVisible(v >= 0.05 && v <= 0.9)),
    [scrollYProgress]
  )

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  let zipURL = ''
  if (typeof window !== 'undefined') {
    zipURL = `http://markdown.xiaoshujiang.com/#xsjzip=${encodeURIComponent(window.location.origin + props.zipFile.publicURL)}`
  }

  return (
    <div>
      <Bar style={{ scaleX: scrollYProgress }} />
      <UpButton show={isVisible} onClick={scrollToTop}>
        <SVG
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 35 35"
          xmlSpace="preserve"
        >
          <path
            id="outline"
            fill="none"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            id="arrow"
            d="M3.352,48.296l28.56-28.328l28.58,28.347c0.397,0.394,0.917,0.59,1.436,0.59c0.52,0,1.04-0.196,1.436-0.59   c0.793-0.787,0.793-2.062,0-2.849l-29.98-29.735c-0.2-0.2-0.494-0.375-0.757-0.475c-0.75-0.282-1.597-0.107-2.166,0.456   L0.479,45.447c-0.793,0.787-0.793,2.062,0,2.849C1.273,49.082,2.558,49.082,3.352,48.296z"
          />
          <motion.path
            fill="none"
            id="progress"
            style={{ pathLength: scrollYProgress }}
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </SVG>
      </UpButton>
      {zipURL && <EditorButton show={!isVisible} >
        <a className="link" href={zipURL} target="_blank">
          <GiFeather  css={{fontSize: '2.5em', verticalAlign: 'text-bottom'}}/>
        </a>
      </EditorButton>
      }
    </div>
  )
}

export default ProgressIndicator
