import React, { useEffect, useState} from "react"
import { withPrefix } from "gatsby"

import { Link } from "gatsby"
import {GiFeather, GiStarSwirl, GiCpu} from "react-icons/gi"
import { RiBilibiliFill, RiYoutubeFill } from "react-icons/ri"
import Tilt from 'react-parallax-tilt'

import styled, {keyframes} from "react-emotion"
import { rhythm, scale } from "../utils/typography"
import presets, { colors } from "../utils/presets"
import Button from "./button"
import { vP, vPHd, vPVHd, vPVVHd } from "../components/gutters"
import LetterCloud from "../components/image-cloud"
import LazyImages from './lazy-images'

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

const fadeCornerBtnEffect = keyframes({
  "100%": {
    transform: `scale(1)`,
    opacity: 1,
  }
})


let inMainBtnTime = null

const StartWriteBtn = (props) => {
  const isInMainBtn = props.isInMainBtn;
  return (
<Button large onClick={props.rippleEffect} tag="button" target="_self" overrideCSS={{
          fontFamily: `founderkaiti, "AR PL UKai TW", SimSun, "宋体", Song`,
          position: `relative`,
          textShadow: `3px 3px 7px hsla(0, 2%, 13%, 0.3)`,
          backgroundColor: `rgba(255, 229, 181, 0.5)`,
          background: `rgba(255, 229, 181, 0.5)`,
          color: colors.gray.lightCopy,
          borderRadius: `30% 70% 70% 30% / 30% 30% 70% 70%`,
          boxShadow: `-1px 0px 0 0.2rem rgba(255, 229, 181, 0.39)`,
          overflow: `hidden`,
          "&:hover, &:focus": {
            color: colors.gray.dark,
            backgroundColor: `rgba(255, 229, 181, 1)`,
            backgroundImage: 'none',
            animation: 'none',
          },
          "&::before": {
            content: `""`,
            display: `block`,
            position: `absolute`,
            background: `rgba(255, 255, 255, 0.5)`,
            width: `60px`,
            height: `100%`,
            top: 0,
            filter: `blur(30px)`,
            transform: `translateX(-100px) skewX(-15deg)`,
          },
          "&::after": {
            content: `""`,
            display: `block`,
            position: `absolute`,
            background: `rgba(255, 255, 255, 0.2)`,
            width: `30px`,
            height: `100%`,
            top: 0,
            filter: `blur(5px)`,
            transform: `translateX(-100px) skewX(-15deg)`,
          },
          "&:hover::before,&:hover::after": {
            animation: `${sheenEffect} 1s ease infinite`,
          },
          "&>.crater": {
            position: `absolute`,
            backgroundColor: colors.gray.dark,
            borderRadius: `100%`,
          }

        }} icon={isInMainBtn ? (<GiStarSwirl />):(<GiFeather />)}>
          <span css={{
              transform: `scale(1.5)`,
              margin: `0 1em 0 1.5em`
            }}>
            {isInMainBtn?"如此而已":"开始使用"}
          </span>
          <span className="crater" css={{
            top: `18px`,
            left: `10px`,
            width: `4px`,
            height: `4px`,
          }}></span>
          <span className="crater" css={{
            top: `28px`,
            left: `22px`,
            width: `6px`,
            height: `6px`,
          }}></span>
          <span className="crater" css={{
            top: `10px`,
            left: `25px`,
            width: `8px`,
            height: `8px`,
          }}></span>
          <span className="crater" css={{
            bottom: `10px`,
            right: `25px`,
            width: `8px`,
            height: `8px`,
          }}></span>
          <span className="crater" css={{
            bottom: `28px`,
            right: `22px`,
            width: `6px`,
            height: `6px`,
          }}></span>
          <span className="crater" css={{
            bottom: `18px`,
            right: `10px`,
            width: `4px`,
            height: `4px`,
          }}></span>
        </Button>
  )

}

const BackendCornerBtn = (props) => {
  return (
    <a css={{
      position: `absolute`,
      right: 0,
      top: 0,
      fontSize: `32px`,
      margin: `5px`,
      color: `gray`,
      cursor: `pointer`,
      opacity: 0,
      transform: `scale(0)`,
      animation: `${fadeCornerBtnEffect} .5s .5s forwards`,
      "&:hover": {
        color: `black`,
      },
      }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        props.setIsInFront()
      }}
    >
      <GiCpu style={{
        filter: `drop-shadow(3px 5px 2px rgba(0, 0, 0, 0.4))`
      }}/>
    </a>
  )
}

const MastheadFrontend = (props) => {

  const NavItem = ({ linkTo, children }) => (
    <li >
      <Link to={linkTo}>
        {children}
      </Link>
    </li>
  )

  const [isGitHub, setIsGitHub] = useState(false)
  const [isInMainBtn, setIsInMainBtn] = useState(false)
  const [isRunStep, setIsRunStep] = useState(false)
  const [isPageTransition, setIsPageTransition] = useState(false)
  const [canShowCornerBtn, setCanShowCornerBtn] = useState(props.initFrontendBtn)

  useEffect(()=> {
    if (window.location.origin == 'https://suziwen.github.io') {
      setIsGitHub(true)
    }
  },[])

  let videoChanel = (
    <li>
      <a href="https://space.bilibili.com/349933393" target="_blank"><RiBilibiliFill size="1em" style={{
        verticalAlign: `text-top`,
        color: `#23ade5`
      }}/>视频</a>
    </li>
  )
  if (isGitHub) {
    videoChanel = (
        <li>
          <a href="https://www.youtube.com/channel/UCVtzhZnlEBxwysgtCAHFBFg" target="_blank"><RiYoutubeFill size="1em" style={{
            verticalAlign: `text-top`,
            color: `#ff0000`
          }}/>视频</a>
        </li>
    )
  }

  const mouseEnter = () => {
    inMainBtnTime = Date.now()
    setIsInMainBtn(true)
  }

  const mouseLeave = () => {
    setIsInMainBtn(false)
    // 在主按钮停留超过 600ms 才触发
    if ( canShowCornerBtn === null && inMainBtnTime && (Date.now() - inMainBtnTime) >= 600) {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      setCanShowCornerBtn(!isMobile)
      props.setInitFrontendBtn(true)
    }
    inMainBtnTime = null
  }


  const idiom1 = (<span css={{
    position: `absolute`,
    bottom: 0,
    display: `inline-block`,
    left: `50%`,
    transform: `translateX(-50%)`,
    opacity: 0,
    fontSize: `.8em`,
    fontFamily: `founderkaiti, "AR PL UKai TW", SimSun, "宋体", Song`,
    textShadow: isInMainBtn?`0px 11px 10px rgba(10, 10, 10, .8)`: '',
    animation: `${fadeIdiomEffect} 1s .3s forwards`,
  }}>从<br/>知识到智慧<br/>先化繁于简，再厚积薄发</span>)

  const cornerBtnStyle = canShowCornerBtn && !isInMainBtn && {
    borderTopRightRadius: 250,
    boxShadow: `0 0 15px`,
  }
  const pageTransitionStyle = isPageTransition && {
    borderTopRightRadius: `max(100VW, 100VH)`,
    opacity: 0,
  }
  return (
  <div
    className={`masthead-content ${isInMainBtn?'masthead-content-inmain-btn':''}`}
    css={{
      display: `flex`,
      flexWrap: `wrap-reverse`,
      height: `100vh`,
      width: `100vw`,
      justifyContent: `center`,
      backgroundColor: `white`,
      transition: `all 1s`,
      ...cornerBtnStyle,
      ...pageTransitionStyle,
    }}
  >
    <div css={{
      position: `absolute`,
      width: `100VW`,
      height: `100VH`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      pointerEvents: `none`,
      mixBlendMode: `multiply`,
    }}>
      <div className="main-image" css={{
        width: isRunStep?'110%':`100%`,
        maxHeight: `100%`,
        transition: `all 5s cubic-bezier(0.6, -0.28, 0, 1.07)`,
        border: `3px solid`,
        borderRadius: `5px`,
        aspectRatio: `1920/1049`,
        backgroundSize: `cover`,
        [presets.Tablet]: {
          width: isRunStep?'110%':`90%`
        },
        [presets.Desktop]: {
          width: isRunStep?'110%':`70%`
        },
      }}>
        <LazyImages.LightMainLazyImage />
      </div>
    </div>
    <div css={{
      position: `absolute`,
      width: `100VW`,
      height: `100VH`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      pointerEvents: `none`,
      zIndex: 10,
    }}>
      <div className="main-image" css={{
        width: isRunStep?'110%':`100%`,
        opacity: isInMainBtn&&!isRunStep? 1: 0,
        maxHeight: `100%`,
        backgroundImage: `url(${withPrefix('/') + 'imgs/light_main.svg'})`,
        transition: isInMainBtn?`opacity 1s ease`: ``,
        aspectRatio: `1920/1049`,
        backgroundSize: `cover`,
        transform: `scale(1.23)`,
        [presets.Tablet]: {
          width: isRunStep?'110%':`90%`
        },
        [presets.Desktop]: {
          width: isRunStep?'110%':`70%`
        },
      }}></div>
    </div>
    {canShowCornerBtn && !isInMainBtn && !isPageTransition && (<BackendCornerBtn setIsInFront={ () => {
      if (!isPageTransition) {
        setIsPageTransition(true)
        setTimeout(()=>{
          props.setIsInFront(false)
        }, 600)
      }
    }}/>)}
    <div css={{
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
      alignItems: `center`,
      opacity: 0,
      padding: `40px`,
      position: `relative`,
      transform: props.initFrontendBtn?`none`:`perspective(800px) rotateX(-50deg) translateY(30px)`,
      animation: `${fadeEffect} .7s .2s forwards`,
    }}>
      <h1
        css={{
          ...scale(0.7),
          position: `relative`,
          lineHeight: 1.1,
          margin: 0,
          marginBottom: `20px`,
          padding: 0,
          textAlign: 'center',
          whiteSpace: `nowrap`,
          width: rhythm(10),
          fontFamily: `webfontxiaoshujiang, "AR PL UKai TW", SimSun, "宋体", Song`,
          //fontSize: `calc(12px + 2vh + 2vw)`,
          [presets.Mobile]: {
            width: rhythm(10),
          },
          fontSize: scale(3 / 5).fontSize,
          "@media (min-width: 350px)": {
            fontSize: scale(5 / 5).fontSize,
          },
          "@media (min-width: 650px)": {
            fontSize: scale(2).fontSize,
            width: rhythm(12),
          },
          [presets.Tablet]: {
            fontSize: scale(2.1).fontSize,
            width: rhythm(14),
          },
          [presets.Hd]: {
            fontSize: scale(2.4).fontSize,
            width: rhythm(16),
          },
          [presets.VHd]: {
            fontSize: scale(2.5).fontSize,
            width: rhythm(18),
          },
          [presets.VVHd]: {
            fontSize: scale(2.6).fontSize,
            width: rhythm(18),
          },
        }}
      >
        {isInMainBtn?idiom1:""}
        <span css={{
          opacity: isInMainBtn?0:1,
          transition: `opacity .5s`
        }}>小书匠</span>
      </h1>
      <ul css={{
        display: 'flex',
        padding: 0,
        margin: 0,
        marginBottom: `60px`,
        listStyle: 'none',
        width: '100%',
        whiteSpace: `nowrap`,
        justifyContent: 'space-between',
        backgroundColor: isInMainBtn ? 'white': '',
        borderRadius: isInMainBtn ? '5px': ''
        }}>
        {isInMainBtn? (<li style={{textDecoration: `green wavy underline`}}>小书匠，一款助你将混沌变为有序，令你事半功倍的知识管理软件。</li>): (<>
        <NavItem linkTo="/docs/">文档</NavItem>
        {videoChanel}
        <NavItem linkTo="/feature/">功能</NavItem>
        <NavItem linkTo="/blog/">文章</NavItem>
        <NavItem linkTo="/logs/">日志</NavItem>
        <NavItem linkTo="/download/">下载</NavItem>
        {/* <li css={styles.li}>
            <Link
              to="/community/"
              css={styles.navItem}
              state={{ filter: `` }}
            >
              Community
            </Link>
          </li> */}
        </>)}
      </ul>
      <div>
        <LetterCloud isInMainBtn={isInMainBtn} isRunStep={isRunStep}/>
        <Tilt perspective={500} onEnter={mouseEnter} onLeave={mouseLeave}
      glareEnable={true}
      glareMaxOpacity={0.75}
      glarePosition="all"
        >
          <StartWriteBtn rippleEffectxx={props.rippleEffect} rippleEffect={(e)=>{
            setIsRunStep(!isRunStep)
            const fakeEvent = {
              pageX: e.pageX,
              pageY: e.pageY
            }
            setTimeout(()=>{
              props.rippleEffect(fakeEvent)
            }, 1300)
          }} isInMainBtn={isInMainBtn}/>
        </Tilt>
      </div>
    </div>
  </div>
)}

export default MastheadFrontend
