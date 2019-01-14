import React, { Fragment } from "react"
import {GoX} from "react-icons/go"

import presets, { colors } from "../../utils/presets"
import { scale, options, rhythm } from "../../utils/typography"

const HideSidebarButton = ({ onClick}) => (
  <button
    onClick={onClick}
    css={{
      ...scale(-2 / 3),
      lineHeight: 1,
      background: `transparent`,
      border: `none`,
      borderRadius: presets.radius,
      color: colors.gatsby,
      display: `flex`,
      cursor: `pointer`,
      alignItems: `center`,
      flexGrow: 0,
      paddingTop: rhythm(options.blockMarginBottom / 3),
      paddingBottom: rhythm(options.blockMarginBottom / 3),
      fontFamily: options.systemFontFamily.join(`,`),
      textAlign: `left`,
      transition: `all .2s`,
      "&:hover": {
        background: colors.ui.bright,
      },
    }}
  >
      <Fragment>
        <span>隐藏</span>
        <span css={{ ...styles.icon }}>
          <GoX />
        </span>
      </Fragment>
  </button>
)

export default HideSidebarButton

const styles = {
  icon: {
    display: `inline-block`,
    fontSize: `.9rem`,
    marginLeft: 8,
  },
}

