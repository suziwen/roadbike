import Typography from "typography"
import presets, { colors } from "./presets"

const headerFontFamily =[`Noto Sans SC`, `-apple-system`, `BlinkMacSystemFont`, `Helvetica Neue`, `PingFang SC`, `Microsoft YaHei`, `Source Han Sans SC`, `Noto Sans CJK SC`, `WenQuanYi Micro Hei`, `sans-serif`] 

const _options = {
  headerFontFamily,
  bodyFontFamily: [`Noto Serif SC`, `-apple-system`, `BlinkMacSystemFont`, `Helvetica Neue`, `PingFang SC`, `Microsoft YaHei`, `Source Han Sans SC`, `Noto Sans CJK SC`, `WenQuanYi Micro Hei`, `sans-serif`],
  cursiveFontFamily: [`xsjcursive`, "FandolKai", "Adobe Kaiti Std", "Adobe 楷体 Std", "FZKai-Z03S", "方正楷体简体","AR PL UKai CN", "楷体", "NSimSun","SimSun", `cursive`],
  monospaceFontFamily: [`Noto Sans Mono SC`, `Menlo`, `Monaco`, `Consolas`, `Andale Mono`, `lucida console`, `Courier New`, `monospace`],
  systemFontFamily: [
    `Noto Serif SC`,
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
      text: {
        fontFamily: options.monospaceFontFamily.join(`,`),
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
        fontFamily: options.cursiveFontFamily.join(`,`),
        padding: rhythm(options.blockMarginBottom),
        marginLeft: 0,
        borderLeft: `10px solid ${colors.ui.border}`,
        background: `${colors.ui.light}`
      },
      ".preview .xsj_hr": {
        margin: `${rhythm(options.blockMarginBottom)} 0`,
        border: 0,
        borderTop: `1px dashed ${colors.gatsby}`,
        borderLeft: `90px solid transparent`,
        borderRight: `90px solid transparent`,
        height: 0,
        background: `none`,
        padding: `unset`,
      },
      ".preview kbd": {
        display: `inline-block`,
        padding: `3px 5px`,
        margin: `0 3px`,
        color: colors.gatsby,
        verticalAlign: `middle`,
        backgroundColor: colors.ui.light,
        border: `solid 1px ${colors.ui.border}`,
        borderRadius: `3px`,
        boxShadow: `inset 0 -1px 0 ${colors.ui.border}`,
      },
      ".preview pre, .preview .xiaoshujiang_pre":{
        lineHeight: `initial !important`,
        wordWrap: `break-word`,
        wordBreak: `break-word`,
        tabSize: `4`,
        whiteSpace: `pre-wrap`,
        fontFamily: options.monospaceFontFamily.join(`,`),
      },
      ".preview .xiaoshujiang_code_title_container": {
        userSelect: `none`,
      },
      ".preview code": {
        position: `relative`,
        fontFamily: options.monospaceFontFamily.join(`,`),
        fontSize: `1em`,
      },
      ".preview code:before, .preview code:after": {
        content: '"`"',
        color: colors.ui.bright,
        letterSpacing: `initial`,
      },
      ".preview pre code:before, .preview pre code:after": {
        content: `none`,
      },
      ".preview pre": {
        background: `initial`,
        padding: 0,
        fontFamily: options.monospaceFontFamily.join(`,`),
      },
      ".main-body a": {
        color: `inherit`,
        textDecoration: `none`,
        fontFamily: options.headerFontFamily.join(`,`),
        fontWeight: `bold`,
      },
      ".main-body a:hover": {
        color: colors.gatsby,
      },
      ".preview a": {
        fontSize: `103%`,
        color: colors.gray.lightCopy,
        position: `relative`,
        textShadow: `-1px -1px 0 ${colors.ui.whisper}, 1px -1px 0 ${colors.ui.whisper}, -1px 1px 0 ${colors.ui.whisper}, 1px 1px 0 ${colors.ui.whisper}`,
        backgroundImage: `linear-gradient(${colors.gatsby} 50%, ${colors.gatsby} 50%)`,
        backgroundSize: `100% 2px`,
        backgroundRepeat: `no-repeat`,
        backgroundPositionY: `calc(100% - 2px)`
      },
      ".preview a:hover": {
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
          fontSize: `${(19 / 16) * 100}%`,
        },
      },
    }
  },
}

const typography = new Typography(_options)

export const { scale, rhythm, options } = typography
export default typography
