import React, { Fragment } from "react"
import {GoFold, GoUnfold} from "react-icons/go"

import presets, { colors } from "../../utils/presets"
import { scale, options, rhythm } from "../../utils/typography"

const ExpandAllButton = ({ onClick, expandAll }) => (
  <button
    onClick={onClick}
    css={{
      ...scale(-1 / 3),
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
      textAlign: `left`,
      transition: `all .2s`,
      "&:hover": {
        background: colors.ui.bright,
      },
    }}
  >
    {expandAll ? (
      <Fragment>
        <span>全部折叠</span>
        <span css={{ ...styles.icon }}>
          <GoFold />
        </span>
      </Fragment>
    ) : (
      <Fragment>
        <span>全部展开</span>
        <span css={{ ...styles.icon }}>
          <GoUnfold />
        </span>
      </Fragment>
    )}
  </button>
)

export default ExpandAllButton

const styles = {
  icon: {
    display: `inline-block`,
    fontSize: `.9rem`,
    marginLeft: 8,
  },
}
