import React, { useEffect, useState} from "react"
import { withPrefix } from "gatsby"

import { IconContext } from "react-icons"

import styled, {keyframes} from "react-emotion"

import MastheadFrontend from "./masthead-frontend"
import MastheadBackend from "./masthead-backend"

const sheenEffect = keyframes({
  "0%": {
    transform: `translateX(-100px) skewX(-15deg)`,
  },
  "100%": {
    transform: `translateX(300px) skewX(-15deg)`,
  }
})

const fadeEffect = keyframes({
  "100%": {
    opacity: 1,
    transform: `none`,
  }
})

const fadeIdiomEffect = keyframes({
  "100%": {
    opacity: 1,
  }
})

const MastheadContent = (props) => {
  const { rippleEffect } = props
  const [ isInFront, setIsInFront] = useState(true)
  const [ initFrontendBtn, setInitFrontendBtn] = useState(null)
  const backgroundStyle = isInFront ? {
    backgroundImage: `url(${withPrefix('/')}imgs/technology/pcb.png)`,
    backgroundSize: `400px 400px`,
  }: {
  }
  return (
    <IconContext.Provider value={{ size: '2em' }}>
          <div
            css={{
              display: `flex`,
              flexDirection: `row`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              ...backgroundStyle,
            }}
          >
            { isInFront ? (<MastheadFrontend
              initFrontendBtn={initFrontendBtn}
              setInitFrontendBtn={setInitFrontendBtn}
              rippleEffect={rippleEffect}
              setIsInFront={setIsInFront}
            />): (<MastheadBackend
              rippleEffect={rippleEffect}
              setIsInFront={setIsInFront}
            />)}
          </div>
      </IconContext.Provider>
  )
}

export default MastheadContent
