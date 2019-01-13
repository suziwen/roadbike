import React from "react"
import {FiFeather} from "react-icons/fi"

import { rhythm, scale } from "../utils/typography"
import presets, { colors } from "../utils/presets"
import Button from "./button"
import { vP, vPHd, vPVHd, vPVVHd } from "../components/gutters"
import Slider from "./slider"

const MastheadContent = (props) => {
  console.log(props)
  return (
  <div
    className="masthead-content"
    css={{
      display: `flex`,
      flexWrap: `wrap-reverse`,
      height: `100vh`,
      width: `100vw`,
      justifyContent: `space-between`,
      padding: vP,
      paddingTop: rhythm(5),
      paddingBottom: rhythm(1),
      flexGrow: `0`,
      flexShrink: `1`,
      [presets.Mobile]: {
        paddingBottom: rhythm(2),
      },
      [presets.Phablet]: {
      },
      [presets.Tablet]: {
        paddingTop: rhythm(5),
      },
      [presets.Desktop]: {
        paddingTop: rhythm(5),
      },
      [presets.Hd]: {
        paddingTop: rhythm(5),
        paddingLeft: vPHd,
        paddingRight: vPHd,
        paddingBottom: rhythm(3),
      },
      [presets.VHd]: {
        paddingTop: rhythm(6),
        paddingLeft: vPVHd,
        paddingRight: vPVHd,
      },
      [presets.VVHd]: {
        paddingLeft: vPVVHd,
        paddingRight: vPVVHd,
      },
    }}
  >
    <div css={{
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
      alignItems: `flex-start`,
    }}>
      <h1
        css={{
          ...scale(0.7),
          color: colors.accent,
          lineHeight: 1.1,
          margin: 0,
          marginBottom: `1.2em`,
          padding: 0,
          whiteSpace: `nowrap`,
          width: rhythm(10),
          fontFamily: `xsjkt, "AR PL UKai TW", SimSun, "宋体", Song`,
          //fontSize: `calc(12px + 2vh + 2vw)`,
          [presets.Mobile]: {
            width: rhythm(10),
          },
          fontSize: scale(3 / 5).fontSize,
          "@media (min-width: 350px)": {
            fontSize: scale(4 / 5).fontSize,
          },
          "@media (min-width: 650px)": {
            fontSize: scale(1).fontSize,
            width: rhythm(12),
          },
          [presets.Tablet]: {
            fontSize: scale(1.1).fontSize,
            width: rhythm(14),
          },
          [presets.Hd]: {
            fontSize: scale(1.4).fontSize,
            width: rhythm(16),
          },
          [presets.VHd]: {
            fontSize: scale(1.5).fontSize,
            width: rhythm(18),
          },
          [presets.VVHd]: {
            fontSize: scale(1.6).fontSize,
            width: rhythm(18),
          },
        }}
      >
        <span>
          <span
            css={{
              [presets.Tablet]: {
                marginRight: rhythm(1 / 8),
              },
            }}
          >
            一款
          </span>
          <Slider
            items={[`专注`, `个性`, `自由`, `开放`, `灵活`]}
            color={colors.lemon}
          />
        </span>
        的写作软件
      </h1>
      <Button large onClick={props.rippleEffect} tag="button" target="_self" overrideCSS={{
        fontFamily: 'smy',
        position: `relative`,
        textShadow: `3px 3px 7px hsla(0, 2%, 13%, 0.3)`,
        backgroundColor: `rgba(255, 229, 181, 0.5)`,
        background: `rgba(255, 229, 181, 0.5)`,
        color: `#ffb238`,
        borderColor: `#ffb238`,
        borderRadius: `30% 70% 70% 30% / 30% 30% 70% 70%`,
        boxShadow: `-1px 0px 0 0.2rem rgba(255, 229, 181, 0.39)`,
        "&:hover, &:focus": {
          color: `#ffb238`,
          borderColor: `#ffb238`,
          backgroundColor: `rgba(255, 229, 181, 0.5)`,
        },
        "&>.crater": {
          position: `absolute`,
          backgroundColor: `#E8CDA5`,
          borderRadius: `100%`,
        }

      }} to="http://markdown.xiaoshujiang.com" icon={<FiFeather />}>
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
    <div css={{
      color: colors.accent,
      fontFamily: `xsjsj, "AR PL UKai TW", SimSun, "宋体", Song`,
      fontSize: `1.2rem`,
      "&>div": {
        whiteSpace: `nowrap`,
        textDecoration: `underline`,
        lineHeight: 2,
        textShadow: `1px 1px 20px hsla(0,100%,100%,0.3)`,
      },
      "&>div:nth-child(even)": {
        marginInlineStart: `2rem`,
      },
      [presets.Phablet]: {
        writingMode: `vertical-rl`,
      },
    }}>
      <div>激发你的写作热情</div>
      <div>促进你的写作时效</div>
      <div>沉淀你的知识宝藏</div>
      <div>开拓你的第二大脑</div>
      <div>就现在</div>
      <div>一起和小书匠</div>
      <div>在文字里，在生活里</div>
      <div>披荆斩棘</div>
      <div>享受成长的快乐</div>
    </div>
  </div>
)}

export default MastheadContent
