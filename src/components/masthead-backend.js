import React, { useEffect, useState} from "react"
import { withPrefix } from "gatsby"

import { Link } from "gatsby"
import {GiStarSwirl, GiElectric, GiCpu} from "react-icons/gi"
import { RiBilibiliFill, RiYoutubeFill } from "react-icons/ri"
import Tilt from 'react-parallax-tilt'

import styled, {keyframes} from "react-emotion"
import { rhythm, scale } from "../utils/typography"
import presets, { colors } from "../utils/presets"
import Button from "./button"
import { vP, vPHd, vPVHd, vPVVHd } from "../components/gutters"
import LetterCloud from "../components/bit-cloud"

const binaryEffect = keyframes({
  "0%": {
    backgroundPosition: `0 0`,
  },
  "100%": {
    backgroundPosition: `100% 0`,
  }
})

const fadeEffect = keyframes({
  "100%": {
    opacity: 1,
  }
})

const fadeIdiomEffect = keyframes({
  "100%": {
    opacity: 1,
  }
})


const StartWriteBtn = (props) => {
  const isInMainBtn = props.isInMainBtn;
  return (
<Button large onClick={props.rippleEffect} tag="button" target="_self" overrideCSS={{
          fontFamily: 'xsjkt',
          position: `relative`,
          alignSelf: `center`,
          padding: `1rem 1rem`,
          margin: `0 1rem`,
          transition: `all 0.5s ease`,
          background: `#41403E`,
          fontSize: `2rem`,
          letterSpacing: `1px`,
          outline: `none`,
          boxShadow: `20px 38px 34px -26px rgba(0, 0, 0, 0.2)`,
          borderRadius: `255px 15px 225px 15px/15px 225px 15px 255px`,
          border: `dashed 5px #41403E`,

          overflow: `hidden`,
          "&:hover, &:focus": {
            color: colors.gray.dark,
            backgroundColor: `white`,
            backgroundImage: 'none',
            animation: 'none',
            "&>.crater, &>.btn-text": {
              opacity: 0,
            },
            "&>.processer": {
              position: `relative`,
              left: `-3.5em`,
              transform: `scale(1.5)`,
            },
          "&::before, &::after": {
            content: `' '`,
            position: `absolute`,
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            backgroundImage: `url(${withPrefix('/')}imgs/technology/computing.svg)`,
            backgroundSize: `20%`,
            maskImage: `radial-gradient(black, transparent)`,
          },
            "&::before": {
              animation: `${binaryEffect} 3s linear infinite`,
            },
            "&::after": {
              animation: `${binaryEffect} 4s reverse infinite`,
            },
          },
          "&>.crater": {
            position: `absolute`,
            backgroundColor: colors.gray.dark,
            borderRadius: `100%`,
          }

        }} icon={isInMainBtn ? (<GiCpu className="processer" />):(<GiElectric />)}>
          <span className="btn-text" css={{
              transform: `scale(1.5)`,
              color: `white`,
              margin: `0 1em 0 1.5em`
            }}>
            {isInMainBtn?"数字之美":"开始通电"}
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

const FrontendCornerBtn = (props) => {
  return (
    <a css={{
      position: `absolute`,
      left: 0,
      bottom: 0,
      fontSize: `32px`,
      margin: `5px`,
      color: `gray`,
      cursor: `pointer`,
      opacity: 0,
      animation: `${fadeIdiomEffect} .5s .5s forwards`,
      "&:hover": {
        color: `black`,
      },
      }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        props.setIsInFront(true)
      }}
    >
      <GiStarSwirl style={{
        filter: `drop-shadow(3px 5px 2px rgba(0, 0, 0, 0.4))`
      }} />
    </a>
  )
}

const MastheadBackend = (props) => {

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
    setIsInMainBtn(true)
  }

  const mouseLeave = () => {
    setIsInMainBtn(false)
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
    animation: `${fadeIdiomEffect} 1s .3s forwards`,
    textShadow: `4px 4px 0px #000, -4px 0 0px #000,7px 4px 0 #fff;`,
  }}>术<br/>0与1<br/>简约却不简单</span>)

  const cornerBtnStyle = !isInMainBtn && {
    borderBottomLeftRadius: 250,
    boxShadow: `0 0 15px`,
  }
  const pageTransitionStyle = isPageTransition && {
    borderBottomLeftRadius: `max(100VW, 100VH)`,
    opacity: 0,
  }

  return (
  <div
    className="masthead-content"
    css={{
      display: `flex`,
      flexWrap: `wrap-reverse`,
      height: `100vh`,
      width: `100vw`,
      justifyContent: `center`,
      backgroundImage: `url(${withPrefix('/')}imgs/technology/pcb.png)`,
      backgroundSize: `400px 400px`,
      transition: `all 1s`,
      "&:before": {
        content: `' '`,
        position: `absolute`,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `url(${withPrefix('/')}imgs/technology/${isInMainBtn?'pcb-animated': 'pcb'}.svg)`,
        backgroundSize: `1200px 800px`,
        borderBottomLeftRadius: isInMainBtn?0:250,
      },
      ...cornerBtnStyle,
      ...pageTransitionStyle,
    }}
  >
    <div className={`main-image-container`} css={{
      position: `absolute`,
      width: `100VW`,
      height: `100VH`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      pointerEvents: `none`,
      mixBlendMode: `multiply`,
    }}>
      <div css={{
        width: `70%`,
        backgroundImage: `url(${withPrefix('/') + 'imgs/dark_main.png'})`,
        border: `3px solid`,
        borderRadius: `5px`,
        aspectRatio: `1920/1049`,
        backgroundSize: `cover`,
      }}></div>
    </div>
    { !isInMainBtn && !isPageTransition && (<FrontendCornerBtn setIsInFront={ () => {
      if (!isPageTransition) {
        setIsPageTransition(true)
        setTimeout(()=>{
          props.setIsInFront(true)
        }, 600)
      }
    }}/>)}
    <div css={{
      display: `flex`,
      color: `white`,
      flexDirection: `column`,
      justifyContent: `center`,
      alignItems: `center`,
      opacity: 0,
      position: `relative`,
      padding: `40px`,
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
          color: `white`,
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
        backgroundColor: isInMainBtn ? 'black': '',
        borderRadius: isInMainBtn ? '5px': ''
        }}>
        {isInMainBtn? (<li>小书匠，一款本地优先，去中心化，自定义云同步服务的专业数字算术软件。</li>): (<>
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

export default MastheadBackend
