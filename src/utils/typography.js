import Typography from "typography"
import presets, { colors } from "./presets"

const scrollbarStyles = {
  "*": {
    scrollbarWidth: `thin`,
    scrollbarColor: `${colors.ui.border} ${colors.ui.light}`,
  },
  "*::-webkit-scrollbar": {
    width: `6px`,
    height: `6px`,
  },
  "*::-webkit-scrollbar-thumb": {
    background: colors.ui.border,
  },
  "*::-webkit-scrollbar-thumb:hover": {
    background: colors.gatsbyDark,
  },
  "*::-webkit-scrollbar-track": {
    background: colors.ui.light,
  },
}


const headerFontFamily =[`Noto Sans SC`, `-apple-system`, `BlinkMacSystemFont`, `Helvetica Neue`, `PingFang SC`, `Microsoft YaHei`, `Source Han Sans SC`, `Noto Sans CJK SC`, `WenQuanYi Micro Hei`, `sans-serif`] 

const _options = {
  headerFontFamily,
  bodyFontFamily: [`Noto Serif SC`, `-apple-system`, `BlinkMacSystemFont`, `Helvetica Neue`, `PingFang SC`, `Microsoft YaHei`, `Source Han Sans SC`, `Noto Sans CJK SC`, `WenQuanYi Micro Hei`, `sans-serif`],
  cursiveFontFamily: [`enxsjcursive`, `xsjcursive`, "FandolKai", "Adobe Kaiti Std", "Adobe 楷体 Std", "FZKai-Z03S", "方正楷体简体","AR PL UKai CN", "楷体", "NSimSun","SimSun", `cursive`],
  quoteFontFamily: [`founderkaiti`, "FandolKai", "Adobe Kaiti Std", "Adobe 楷体 Std", "FZKai-Z03S", "方正楷体简体","AR PL UKai CN", "楷体", "NSimSun","SimSun", `cursive`],
  monospaceFontFamily: [`Noto Sans Mono SC`, `Menlo`, `Monaco`, `Consolas`, `Andale Mono`, `lucida console`, `Courier New`, `monospace`],
  baseFontSize: `16px`,
  headerLineHeight: 1.075,
  headerColor: colors.gray.dark,
  bodyColor: colors.gray.copy,
  blockMarginBottom: 0.75,
  scaleRatio: 2,
  overrideStyles: ({ rhythm, scale }, options) => {
    return {
      ...scrollbarStyles,
      "html": {
        scrollBehavior: `smooth`
      },
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
      ".preview .xsj_mindmap_toc": {
        filter: `drop-shadow(10px 10px 5px grey)`,
      },
      ".preview video": {
        maxWidth: `100%`,
      },
      ".preview .xsj_heading": {
        position: `relative`,
        transition: `250ms box-shadow ease-out, 250ms transform ease-out`,
      },
      ".preview .xsj_heading:focus": {
        boxShadow: `0 0 0 15px #ffffff, 0 0 16px 20px ${colors.gatsbyDark}`,
        outline: `2px dotted transparent`,
        outlineOffset: `2px`,
        transform: `scale(1.025)`,
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
        fontFamily: options.quoteFontFamily.join(`,`),
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
      ".preview img.emoji": {
            width: `1em`,
            lineHeight: `1em`,
            verticalAlign: `baseline`,
            marginBottom: 0,
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
        fontFamily: "'" + options.monospaceFontFamily.join(`','`) + "'", 
      },
      ".preview .xiaoshujiang_code_title_container": {
        userSelect: `none`,
      },
      ".preview code": {
        position: `relative`,
        fontFamily: "'" + options.monospaceFontFamily.join(`','`) + "'", 
        background: `#fdf6e3`,
      },
      ".preview code:before, .preview code:after": {
        content: '"`"',
        color: colors.ui.border,
        letterSpacing: `initial`,
      },
      ".preview pre code:before, .preview pre code:after": {
        content: `none`,
      },
      ".preview pre": {
        background: `initial`,
        padding: 0,
        fontFamily: "'" + options.monospaceFontFamily.join(`','`) + "'", 
      },
      ".main-body a": {
        color: `inherit`,
        textDecoration: `none`,
        fontWeight: `bold`,
      },
      ".main-body a:hover": {
        color: colors.gatsby,
      },
      ".preview>.xsj_paragraph_level_0:before": {
        content: `'　'`,
        display: `inline-block`,
        width: `2em`
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
      }
    }
  },
}

const typography = new Typography(_options)

export const { scale, rhythm, options } = typography
export default typography
