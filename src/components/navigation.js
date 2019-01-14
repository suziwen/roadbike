import React from "react"
import { Link } from "gatsby"
import {GoMarkGithub} from "react-icons/go"
import logo from "../logo.svg"
import isHomepageFn from "../utils/is-homepage"
import typography, { rhythm, scale, options } from "../utils/typography"
import presets, { colors } from "../utils/presets"
import { vP, vPHd, vPVHd, vPVVHd } from "./gutters"

// what we need to nudge down the navItems to sit
// on the baseline of the logo's wordmark
const navItemTopOffset = `0.6rem`
const navItemHorizontalSpacing = rhythm(1 / 3)

const iconColor = colors.ui.border
const iconColorHomepage = colors.ui.light

const assignActiveStyles = ({ isPartiallyCurrent }) =>
  isPartiallyCurrent ? { style: styles.navItem.active } : {}


const Navigation = ({ pathname }) => {
  const isHomepage = isHomepageFn(pathname)
  const isBlog = pathname === `/blog/` || pathname.indexOf(`/blog/page/`) === 0
  const navItemStyles = {
    ...styles.navItem,
    color: isHomepage ? colors.ui.light : `inherit`,
    "&:hover": {
      color: isHomepage ? colors.ui.bright : colors.gatsby
    }
  }

  const NavItem = ({ linkTo, children }) => (
    <li css={styles.li}>
      <Link to={linkTo} getProps={assignActiveStyles} css={navItemStyles}>
        {children}
      </Link>
    </li>
  )

  const socialIconsStyles = {
    ...navItemStyles,
    ...styles.socialIconItem,
    [presets.Phablet]: {
      color: isHomepage ? iconColorHomepage : false,
      "&:hover": {
        color: isHomepage ? colors.ui.bright : colors.gatsby,
      },
    },
  }

  const SocialNavItem = ({ href, title, children, overrideCSS }) => (
    <a
      href={href}
      title={title}
      css={{
        ...socialIconsStyles,
        ...overrideCSS,
      }}
    >
      {children}
    </a>
  )

  return (
    <header
      css={{
        backgroundColor: isHomepage ? `transparent` : `rgba(255,255,255,0.975)`,
        position: isHomepage ? `absolute` : `relative`,
        height: presets.headerHeight,
        top: isHomepage
          ? rhythm(
              options.blockMarginBottom
            )
          : 0,
        left: 0,
        right: 0,
        zIndex: 2,
        "&:after": {
          content: `''`,
          position: `absolute`,
          bottom: 0,
          left: 0,
          right: 0,
          width: `100%`,
          height: 1,
          zIndex: -1,
          background: isHomepage ? `transparent` : colors.ui.light,
        },
        // use this to test if the header items are properly aligned to the logo
        // wordmark
        // "&:before": {
        //   content: `''`,
        //   position: `absolute`,
        //   bottom: `1.25rem`,
        //   left: 0,
        //   right: 0,
        //   width: `100%`,
        //   height: 1,
        //   zIndex: 10,
        //   background: `red`,
        // },
        [presets.Tablet]: {
          position: isHomepage || isBlog ? `absolute` : `fixed`,
          backgroundColor: isBlog ? colors.ui.whisper : false,
        },
        paddingLeft: `env(safe-area-inset-left)`,
        paddingRight: `env(safe-area-inset-right)`,
      }}
    >
      <div
        css={{
          ...styles.containerInner,
          ...(isHomepage
            ? {
                paddingLeft: vP,
                paddingRight: vP,
                [presets.Hd]: {
                  paddingLeft: vPHd,
                  paddingRight: vPHd,
                },
                [presets.VHd]: {
                  paddingLeft: vPVHd,
                  paddingRight: vPVHd,
                },
                [presets.VVHd]: {
                  paddingLeft: vPVVHd,
                  paddingRight: vPVVHd,
                },
              }
            : {}),
        }}
      >
        {isHomepage?'':<Link
          to="/"
          css={styles.logoLink}
          aria-label="Gatsby, Back to homepage"
        >
          <span css={{fontFamily: `webfontxiaoshujiang`, fontWeight: `bolder`}}>小书匠</span>
        </Link>
        }
        <nav
          className="navigation"
          aria-label="Primary Navigation"
          css={styles.navContainer}
        >
          <ul css={styles.ulContainer}>
            <NavItem linkTo="/docs/">文档</NavItem>
            <NavItem linkTo="/feature/">主要功能</NavItem>
            <NavItem linkTo="/blog/">博客</NavItem>
            <NavItem linkTo="/logs/">升级日志</NavItem>
            <NavItem linkTo="/price/">价格</NavItem>
            <NavItem linkTo="/download/">下载</NavItem>
            {/* <li css={styles.li}>
                <Link
                  to="/community/"
                  css={styles.navItem}
                  state={{ filter: `` }}
                >
                  Community
                </Link>
              </li> */}
          </ul>
        </nav>
        <div css={styles.searchAndSocialContainer}>
          <SocialNavItem
            href="https://github.com/suziwen/markdownxiaoshujiang"
            title="GitHub"
          >
            <GoMarkGithub style={{ verticalAlign: `text-top` }} />
          </SocialNavItem>
        </div>
      </div>
    </header>
  )
}

const styles = {
  li: {
    display: `block`,
    margin: 0,
    marginLeft: navItemHorizontalSpacing,
    marginRight: navItemHorizontalSpacing,
  },
  navContainer: {
    display: `none`,
    [presets.Tablet]: {
      alignSelf: `flex-end`,
      display: `flex`,
    },
  },
  ulContainer: {
    display: `none`,
    [presets.Tablet]: {
      alignSelf: `flex-end`,
      display: `flex`,
      flexGrow: 1,
      margin: 0,
      marginLeft: rhythm(1 / 4),
      listStyle: `none`,
      maskImage: `linear-gradient(to right, transparent, white ${rhythm(
        1 / 8
      )}, white 98%, transparent)`,
      overflowX: `auto`,
    },
  },
  containerInner: {
    margin: `0 auto`,
    paddingLeft: rhythm(3 / 4),
    paddingRight: rhythm(3 / 4),
    fontFamily: typography.options.headerFontFamily.join(`,`),
    display: `flex`,
    alignItems: `center`,
    width: `100%`,
    height: `100%`,
  },
  navItem: {
    ...scale(-1 / 3),
    borderBottom: `0.125rem solid transparent`,
    color: `inherit`,
    display: `block`,
    letterSpacing: `0.03em`,
    WebkitFontSmoothing: `antialiased`,
    lineHeight: `calc(${presets.headerHeight} - ${navItemTopOffset})`,
    position: `relative`,
    textDecoration: `none`,
    textTransform: `uppercase`,
    top: 0,
    transition: `color ${presets.animation.speedDefault} ${
      presets.animation.curveDefault
    }`,
    zIndex: 1,
    "&:hover": {
      color: colors.gatsby,
    },
    active: {
      borderBottomColor: colors.gatsby,
      color: colors.gatsby,
    },
  },
  socialIconItem: {
    color: iconColor,
    paddingLeft: navItemHorizontalSpacing,
    paddingRight: navItemHorizontalSpacing,
  },
  searchAndSocialContainer: {
    alignSelf: `flex-end`,
    display: `flex`,
    marginLeft: `auto`,
  },
  logo: {
    height: 28,
    margin: 0,
    [presets.Tablet]: {
      height: `1.55rem`,
    },
  },
  logoLink: {
    alignItems: `center`,
    color: `inherit`,
    display: `flex`,
    marginRight: rhythm(1 / 2),
    textDecoration: `none`,
  },
}

export default Navigation
