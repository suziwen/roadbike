import React from "react"
import { keyframes } from "react-emotion"
import presets, { colors } from "../utils/presets"
import { rhythm, scale } from "../utils/typography"

export default ({ items, color }) => (
  <div
    css={{
      display: `inline`,
      position: `relative`,
      fontFamily: `xsjbg, "AR PL UKai TW", SimSun, "宋体", Song`,
      fontSize: scale(1.1).fontSize,
      "@media (min-width: 350px)": {
        fontSize: scale(1.3).fontSize,
      },
      "@media (min-width: 650px)": {
        fontSize: scale(1.6).fontSize,
        width: rhythm(12),
      },
      [presets.Tablet]: {
        fontSize: scale(2).fontSize,
        width: rhythm(14),
      },
      [presets.Hd]: {
        fontSize: scale(2.2).fontSize,
        width: rhythm(16),
      },
      [presets.VHd]: {
        fontSize: scale(2.5).fontSize,
        width: rhythm(18),
      },
      [presets.VVHd]: {
        fontSize: scale(3).fontSize,
        width: rhythm(18),
      },
      "&:before": {
        content: `"灵活"`,
        visibility: `hidden`,

      },

      "& span": {
        animation: `${topToBottom} 12.5s linear infinite 0s`,
        opacity: 0,
        left: 0,
        position: `absolute`,

        ":nth-child(2)": {
          animationDelay: `2.5s`,
        },

        ":nth-child(3)": {
          animationDelay: `5s`,
        },

        ":nth-child(4)": {
          animationDelay: `7.5s`,
        },

        ":nth-child(5)": {
          animationDelay: `10s`,
        },
      },
    }}
  >
    {items.map(item => (
      <span key={item} css={{ color }}>
        {item}
      </span>
    ))}
  </div>
)

const topToBottom = keyframes({
  "0%": {
    opacity: 0,
  },
  "6%": {
    opacity: 0,
    transform: `translateY(-30px)`,
  },
  "10%": {
    opacity: 1,
    transform: `translateY(0px)`,
  },
  "25%": {
    opacity: 1,
    transform: `translateY(0px)`,
  },
  "29%": {
    opacity: 0,
    transform: `translateY(30px)`,
  },
  "80%": {
    opacity: 0,
  },
  "100%": {
    opacity: 0,
  },
})
