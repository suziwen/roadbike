import React from "react"

import { Link } from "gatsby"
import { IconContext } from "react-icons"
import {GiFeather} from "react-icons/gi"
import { RiBilibiliFill } from "react-icons/ri"

import styled, {keyframes} from "react-emotion"
import { rhythm, scale } from "../utils/typography"
import presets, { colors } from "../utils/presets"
import Button from "./button"
import { vP, vPHd, vPVHd, vPVVHd } from "../components/gutters"

const sheenEffect = keyframes({
  "0%": {
    transform: `translateX(-100px) skewX(-15deg)`,
  },
  "100%": {
    transform: `translateX(300px) skewX(-15deg)`,
  }
})


const MastheadContent = (props) => {

  const NavItem = ({ linkTo, children }) => (
    <li >
      <Link to={linkTo}>
        {children}
      </Link>
    </li>
  )


  return (
  <div
    className="masthead-content"
    css={{
      display: `flex`,
      flexWrap: `wrap-reverse`,
      height: `100vh`,
      width: `100vw`,
      justifyContent: `center`,
    }}
  >
    <IconContext.Provider value={{ size: '2em' }}>
    <div css={{
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
      alignItems: `center`,
    }}>
      <h1
        css={{
          ...scale(0.7),
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
        小书匠
      </h1>
      <ul css={{
        display: 'flex',
        padding: 0,
        margin: 0,
        marginBottom: `60px`,
        listStyle: 'none',
        width: '100%',
        justifyContent: 'space-between'
        }}>
        <NavItem linkTo="/docs/">文档</NavItem>
        <li>
          <a href="http://live.bilibili.com/25102154" target="_blank"><RiBilibiliFill size="1em" style={{
            verticalAlign: `text-top`,
            color: `#23ade5`
          }}/>视频</a>
        </li>
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
      </ul>
        <Button large onClick={props.rippleEffect} tag="button" target="_self" overrideCSS={{
          fontFamily: 'smy',
          position: `relative`,
          textShadow: `3px 3px 7px hsla(0, 2%, 13%, 0.3)`,
          backgroundColor: `rgba(255, 229, 181, 0.5)`,
          background: `rgba(255, 229, 181, 0.5)`,
          color: colors.gray.lightCopy,
          borderRadius: `30% 70% 70% 30% / 30% 30% 70% 70%`,
          boxShadow: `-1px 0px 0 0.2rem rgba(255, 229, 181, 0.39)`,
          overflow: `hidden`,
          "&:hover, &:focus": {
            color: colors.gatsby,
            backgroundColor: `rgba(255, 229, 181, 0.5)`,
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

        }} to="http://markdown.xiaoshujiang.com" icon={<GiFeather />}>
          开始写作
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
    </div>
      </IconContext.Provider>
  </div>
)}

export default MastheadContent
