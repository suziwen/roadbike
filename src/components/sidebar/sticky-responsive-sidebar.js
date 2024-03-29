import React, { Component } from "react"

import Sidebar from "./sidebar"
import ScrollSyncSidebar from "./scroll-sync-sidebar"
import ChevronSvg from "./chevron-svg"
import presets, { colors } from "../../utils/presets"
import { rhythm } from "../../utils/typography"
import ScrollPositionProvider, {
  ScrollPositionConsumer,
} from "./scrollbar-position-provider"

class StickyResponsiveSidebar extends Component {
  constructor(props) {
    super(props)

    this.state = { open: false }
  }

  _openSidebar = () => {
    this.setState({ open: !this.state.open })
  }

  _closeSidebar = () => {
    this.setState({ open: false })
  }

  render() {
  //hide 和 open 的区别，open 是给 mobile 屏幕下使用， hide 是给宽屏下使用的
    const { open } = this.state
    const {
      enableScrollSync,
      hide,
      location: { pathname },
    } = this.props
    const SidebarComponent = enableScrollSync ? ScrollSyncSidebar : Sidebar

    const iconOffset = open ? 5 : -5
    const menuOpacity = open ? 1 : 0
    const menuOffset = open ? 0 : rhythm(10)

    const sidebarType = pathname.split(`/`)[1]

    return (
      <ScrollPositionProvider>
        <div
          css={{
            ...styles.sidebarScrollContainer,
            opacity: menuOpacity,
            pointerEvents: open ? `auto` : `none`,
            [presets.Tablet]: {
              maxWidth: `none`,
              opacity: `1 !important`,
              pointerEvents: `auto`,
              display: hide? `none`:false,
              top: `calc(${presets.headerHeight})`,
              width: rhythm(10),
            },
            [presets.Desktop]: {
              width: rhythm(12),
              display: hide? `none`:false,
            },
          }}
        >
          <div
            css={{
              ...styles.sidebar,
              transform: `translateX(-${menuOffset})`,
            }}
          >
            <ScrollPositionConsumer>
              {({ positions, onPositionChange }) => (
                <SidebarComponent
                  position={positions[sidebarType]}
                  onPositionChange={onPositionChange}
                  closeSidebar={this._closeSidebar}
                  {...this.props}
                />
              )}
            </ScrollPositionConsumer>
          </div>
        </div>
        <div
          css={{ ...styles.sidebarToggleButton }}
          onClick={this._openSidebar}
          role="button"
          aria-label="Show Secondary Navigation"
          aria-controls="SecondaryNavigation"
          aria-expanded={open ? `true` : `false`}
          tabIndex={0}
        >
          <div css={{ ...styles.sidebarToggleButtonInner }}>
            <ChevronSvg
              size={15}
              cssProps={{
                transform: `translate(${iconOffset}px, 5px) rotate(90deg)`,
                transition: `transform 0.2s ease`,
              }}
            />
            <ChevronSvg
              size={15}
              cssProps={{
                transform: `translate(${5 -
                  iconOffset}px, -5px) rotate(270deg)`,
                transition: `transform 0.2s ease`,
              }}
            />
          </div>
        </div>
      </ScrollPositionProvider>
    )
  }
}

export default StickyResponsiveSidebar

const styles = {
  sidebarScrollContainer: {
    border: 0,
    bottom: 0,
    display: `block`,
    position: `fixed`,
    top: 0,
    transition: `opacity 0.5s ease`,
    width: 320,
    zIndex: 10,
  },
  sidebar: {
    height: `100%`,
    transition: `transform 0.5s ease`,
    boxShadow: `0 0 20px rgba(0, 0, 0, 0.15)`,
    [presets.Tablet]: {
      transform: `none !important`,
      boxShadow: `none`,
    },
  },
  sidebarToggleButton: {
    backgroundColor: colors.gatsby,
    borderRadius: `50%`,
    bottom: 64,
    boxShadow: `0 0 2px rgba(0, 0, 0, 0.15)`,
    cursor: `pointer`,
    display: `flex`,
    height: 50,
    justifyContent: `space-around`,
    position: `fixed`,
    right: 20,
    visibility: `visible`,
    width: 50,
    zIndex: 20,
    [presets.Tablet]: { display: `none` },
  },
  sidebarToggleButtonInner: {
    alignSelf: `center`,
    color: `#fff`,
    display: `flex`,
    flexDirection: `column`,
    height: 20,
    visibility: `visible`,
    width: 20,
  },
}
