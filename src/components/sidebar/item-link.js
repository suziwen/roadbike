import React from "react"
import { Link } from "gatsby"

import presets, { colors } from "../../utils/presets"

const _getTitle = (title, isDraft) => (isDraft ? title.slice(0, -1) : title)
const _isDraft = title => title.slice(-1) === `*`


class ItemLink extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.itemLinkRef = React.createRef()
  }

  componentDidUpdate() {
    const self = this
    setTimeout(()=>{
      self.scrollToView();
    }, 300)
  }

  scrollToView() {
    const {
      isActive,
      isExpanded,
      isParentOfActiveItem,
    } = this.props
    const isInFoldedActive  = !isActive && !isExpanded && isParentOfActiveItem
    const isNeedScollIntoView = isActive || isInFoldedActive
    if (isNeedScollIntoView){
      const node = this.itemLinkRef.current
      if (node.scrollIntoViewIfNeeded){
        node.scrollIntoViewIfNeeded({ behavior: 'smooth' });
      } else {
        node.scrollIntoView()
      }
    }
  }
  render() {
    const {
      item,
      onLinkClick,
      isActive,
      isExpanded,
      isParentOfActiveItem,
      stepsUI,
      customCSS,
    } = this.props
    const isDraft = _isDraft(item.title)
    const title = _getTitle(item.title, isDraft)
    const isInFoldedActive  = !isActive && !isExpanded && isParentOfActiveItem
  return (
    <span
      ref={this.itemLinkRef}
      css={{
        display: `flex`,
        alignItems: `center`,
        position: `relative`,
        "&:before": {
          background: colors.ui.light,
          bottom: 0,
          top: `auto`,
          content: `''`,
          height: 1,
          position: `absolute`,
          right: 0,
          left: 0,
        },
      }}
    >
      <a
        css={[
          styles.link,
          isDraft && styles.draft,
          isActive && styles.activeLink,
          isParentOfActiveItem && styles.parentOfActiveLink,
          isInFoldedActive && styles.isInFoldedActiveLink,
          customCSS && customCSS,
        ]}
        onClick={onLinkClick}
        href={item.link}
      >
        {stepsUI && <span css={{ ...styles.subsectionLink }} />}
        {title}
      </a>
    </span>
  )
  }
}

const bulletOffset = {
  default: {
    left: -25,
    top: `1.15em`,
  },
  desktop: {
    top: `1.2em`,
  },
}

const bulletSize = 8

const styles = {
  draft: {
    "&&": {
      color: colors.gray.calm,
    },
  },
  parentOfActiveLink: {
    "&&": {
      color: colors.gatsby,
      fontWeight: `bold`,
    },
  },
  activeLink: {
    "&&": {
      color: colors.gatsby,
      fontWeight: `bold`,
    },
    "&:before": {
      background: colors.gatsby,
      transform: `scale(1)`,
    },
    "&:after": {
      width: 200,
      opacity: 1,
    },
  },
  isInFoldedActiveLink: {
    "&:before": {
      background: colors.gatsby,
      transform: `scale(1)`,
      background: `repeating-linear-gradient(
  45deg,
  ${colors.ui.whisper},
  ${colors.ui.whisper} 10px,
  ${colors.gatsby} 10px,
  ${colors.gatsby} 20px
)`
    },
    "&:after": {
      width: 200,
      opacity: 1,
      background: `repeating-linear-gradient(
  45deg,
  ${colors.ui.whisper},
  ${colors.ui.whisper} 10px,
  ${colors.gatsby} 10px,
  ${colors.gatsby} 20px
)`
    },
  },
  link: {
    paddingRight: 40,
    minHeight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    position: `relative`,
    zIndex: 1,
    width: `100%`,
    "&&": {
      border: 0,
      boxShadow: `none`,
      fontWeight: `normal`,
      backgroundImage: `initial`,
      "&:hover": {
        background: `transparent`,
        color: colors.gatsby,
        "&:before": {
          background: colors.gatsby,
          transform: `scale(1)`,
        },
      },
    },
    "&:before, &:after": {
      ...bulletOffset.default,
      height: bulletSize,
      position: `absolute`,
      transition: `all ${presets.animation.speedDefault} ${
        presets.animation.curveDefault
      }`,
    },
    "&:before": {
      borderRadius: `100%`,
      content: `''`,
      transform: `scale(0.1)`,
      width: bulletSize,
      [presets.Tablet]: {
        ...bulletOffset.desktop,
      },
    },
    "&:after": {
      background: colors.gatsby,
      borderRadius: 4,
      content: `''`,
      left: bulletOffset.default.left + 7,
      opacity: 0,
      transform: `translateX(-200px)`,
      width: 1,
      [presets.Tablet]: {
        ...bulletOffset.desktop,
      },
    },
  },
  subsectionLink: {
    ...bulletOffset.default,
    background: `#fff`,
    border: `1px solid ${colors.ui.bright}`,
    borderRadius: `100%`,
    display: `block`,
    fontWeight: `normal`,
    height: bulletSize,
    position: `absolute`,
    width: bulletSize,
    zIndex: -1,
    [presets.Tablet]: {
      ...bulletOffset.desktop,
    },
  },
}

export default ItemLink

