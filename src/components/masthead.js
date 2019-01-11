import React from "react"
import {FiFeather} from "react-icons/fi"

import { rhythm, scale } from "../utils/typography"
import presets, { colors } from "../utils/presets"
import Button from "./button"
import { vP, vPHd, vPVHd, vPVVHd } from "../components/gutters"
import Slider from "./slider"

const MastheadContent = () => (
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
          fontFamily: `"AR PL UKai TW", SimSun, "宋体", Song`,
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
      <Button large tag="href" target="_self" overrideCSS={{fontFamily: 'smy'}} to="http://markdown.xiaoshujiang.com" icon={<FiFeather />}>
        开始写作
      </Button>
    </div>
    <div css={{
      color: colors.accent,
      fontFamily: `"AR PL UKai TW", SimSun, "宋体", Song`,
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
      <div>快来吧</div>
      <div>一起和小书匠享受成长的快乐</div>
    </div>
  </div>
)

const Masthead = () => <MastheadContent />

export default Masthead
