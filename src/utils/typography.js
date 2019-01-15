import Typography from "typography"
import CodePlugin from "typography-plugin-code"
import presets, { colors } from "./presets"

const headerFontFamily = [
  `Futura PT`,
  `-apple-system`,
  `BlinkMacSystemFont`,
  `Segoe UI`,
  `Roboto`,
  `Oxygen`,
  `Ubuntu`,
  `Cantarell`,
  `Fira Sans`,
  `Droid Sans`,
  `Helvetica Neue`,
  `Arial`,
  `sans-serif`,
]

const _options = {
  headerFontFamily,
  bodyFontFamily: [`Spectral`, `Georgia`, `Times New Roman`, `Times`, `serif`],
  monospaceFontFamily: [
    `SFMono-Regular`,
    `Menlo`,
    `Monaco`,
    `Consolas`,
    `Liberation Mono`,
    `Courier New`,
    `monospace`,
  ],
  systemFontFamily: [
    `-apple-system`,
    `BlinkMacSystemFont`,
    `Segoe UI`,
    `Roboto`,
    `Oxygen`,
    `Ubuntu`,
    `Cantarell`,
    `Fira Sans`,
    `Droid Sans`,
    `Helvetica Neue`,
    `Arial`,
    `sans-serif`,
  ],
  baseFontSize: `16px`,
  headerLineHeight: 1.075,
  headerColor: colors.gray.dark,
  bodyColor: colors.gray.copy,
  blockMarginBottom: 0.75,
  scaleRatio: 2,
  plugins: [new CodePlugin()],
  overrideStyles: ({ rhythm, scale }, options) => {
    return {
      "h1,h2,h4,h5,h6": {
        marginTop: rhythm(options.blockMarginBottom * 2),
        marginBottom: rhythm(options.blockMarginBottom),
        letterSpacing: `-0.0075em`,
      },
      "li": {
        marginBottom: 0,
      },
      h1: {
        ...scale(4 / 5),
      },
      h3: {
        ...scale(2 / 5),
        lineHeight: 1,
        marginTop: rhythm(options.blockMarginBottom * 2),
        marginBottom: rhythm(options.blockMarginBottom / 2),
      },
      h4: {
        ...scale(1 / 5),
      },
      h5: {
        ...scale(0),
      },
      ".preview .xsj_heading": {
        position: `relative`
      },
      ".preview .xsj_heading:before": {
        color: colors.ui.bright,
        display: `inline-block`,
        position: `absolute`,
        paddingRight: `100%`,
        right: `10px`,
        fontSize: `.8em`,
      },
      ".preview .xsj_heading.xsj_heading_h1:before": {
        "content": `'# '`
      },
      ".preview .xsj_heading.xsj_heading_h2:before": {
        "content": `'## '`
      },
      ".preview .xsj_heading.xsj_heading_h3:before": {
        "content": `'### '`
      },
      ".preview .xsj_heading.xsj_heading_h4:before": {
        "content": `'#### '`
      },
      ".preview .xsj_heading.xsj_heading_h5:before": {
        "content": `'##### '`
      },
      ".preview .xsj_heading.xsj_heading_h6:before": {
        "content": `'###### '`
      },
      ".preview blockquote": {
        padding: rhythm(options.blockMarginBottom),
        marginLeft: 0,
        borderLeft: `10px solid ${colors.ui.border}`,
        background: `${colors.ui.light}`
      },
      ".preview .xsj_hr": {
        margin: `${rhythm(options.blockMarginBottom)} 0`,
        border: 0,
        borderTop: `1px dashed ${colors.ui.border}`,
        borderLeft: `90px solid transparent`,
        borderRight: `90px solid transparent`,
      },
      ".preview kbd": {
        display: `inline-block`,
        padding: `3px 5px`,
        color: colors.gatsby,
        verticalAlign: `middle`,
        backgroundColor: colors.ui.light,
        border: `solid 1px ${colors.ui.border}`,
        borderRadius: `3px`,
        boxShadow: `inset 0 -1px 0 ${colors.ui.border}`,
      },
      hr: {
        backgroundColor: colors.ui.light,
      },
      ".main-body a": {
        color: `inherit`,
        textDecoration: `none`,
        fontFamily: options.headerFontFamily.join(`,`),
        fontWeight: `bold`,
      },
      ".post-body a": {
        fontSize: `103%`,
        color: colors.gray.lightCopy,
        position: `relative`,
        textShadow: `-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff`,
        backgroundImage: `linear-gradient(#37b2b2 50%, #37b2b2 50%)`,
        backgroundSize: `100% 2px`,
        backgroundRepeat: `no-repeat`,
        backgroundPositionY: `calc(100% - 2px)`
      },
      ".post-body figcaption": {
        color: colors.gray.calm,
        fontFamily: headerFontFamily.join(`,`),
        fontSize: `87.5%`,
        marginTop: rhythm(1 / 2),
      },
      ".post-body a:hover": {
        backgroundSize: `0 2px`,
        transition: `background-size .5s ease-in-out`,
      },
      ".main-body a.anchor": {
        color: `inherit`,
        fill: colors.gatsby,
        textDecoration: `none`,
        borderBottom: `none`,
        boxShadow: `none`,
      },
      ".main-body a.anchor:hover": {
        background: `none`,
      },
      [presets.Mobile]: {
        html: {
          fontSize: `${(17 / 16) * 100}%`,
        },
      },
      [presets.Tablet]: {
        html: {
          fontSize: `${(18 / 16) * 100}%`,
        },
      },
      [presets.VVHd]: {
        html: {
          fontSize: `${(21 / 16) * 100}%`,
        },
      },
    }
  },
}

const typography = new Typography(_options)

export const { scale, rhythm, options } = typography
export default typography
