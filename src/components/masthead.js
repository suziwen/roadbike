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
      padding: vP,
      paddingTop: rhythm(5),
      paddingBottom: rhythm(1),
      flexGrow: `0`,
      flexShrink: `1`,
      [presets.Mobile]: {
        paddingBottom: rhythm(2),
      },
      [presets.Phablet]: {
        paddingRight: 0,
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
        paddingBottom: rhythm(3),
      },
      [presets.VHd]: {
        paddingTop: rhythm(6),
        paddingLeft: vPVHd,
      },
      [presets.VVHd]: {
        paddingLeft: vPVVHd,
      },
    }}
  >
    <div>
      <h1
        css={{
          ...scale(0.7),
          color: colors.gatsby,
          lineHeight: 1.1,
          margin: 0,
          marginBottom: `1.2em`,
          padding: 0,
          whiteSpace: `nowrap`,
          width: rhythm(10),
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
            color={colors.lilac}
          />
        </span>
        的写作软件
      </h1>
      <Button large tag="href" target="_self" overrideCSS={{fontFamily: 'smy'}} to="http://markdown.xiaoshujiang.com" icon={<FiFeather />}>
        开始写作
      </Button>
    </div>
    <div>
      <h2>激发你的写作热情</h2>
      <h2>促进你的写作时效</h2>
      <h2>沉淀你的知识宝藏</h2>
      <h2>开拓你的第三大脑</h2>
      <h2>快来吧</h2>
      <h2>一起和小书匠享受成长的快乐</h2>
    </div>
  </div>
)

const Masthead = () => <MastheadContent />

export default Masthead
