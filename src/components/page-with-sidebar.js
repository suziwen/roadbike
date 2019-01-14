import React, { Fragment } from "react"
import {GoThreeBars} from "react-icons/go"

import StickyResponsiveSidebar from "./sidebar/sticky-responsive-sidebar"
import { rhythm } from "../utils/typography"
import presets, { colors } from "../utils/presets"

class PageWithSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hide: false }
    this.hideSidebar = this.hideSidebar.bind(this)
    this.showSidebar = this.showSidebar.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  hideSidebar(){
    this.setState({
      hide: true
    })
  }

  showSidebar(){
    this.setState({
      hide: false
    })
  }

  toggleSidebar(){
    this.setState({
      hide: !this.state.hide
    })
  }

  render() {
    const props = this.props
    if (props.disable) {
      return props.children
    } else {
      return (
        <Fragment>
          <div
            css={{
              [presets.Tablet]: { paddingLeft: this.state.hide?false:rhythm(10) },
              [presets.Desktop]: { paddingLeft: this.state.hide?false:rhythm(12) },
            }}
          >
            {props.children}
          </div>
          <StickyResponsiveSidebar
            enableScrollSync={props.enableScrollSync}
            itemList={props.itemList}
            key={props.location.pathname}
            location={props.location}
            toggleSidebar={this.toggleSidebar}
            hide={this.state.hide}
          />
          {this.state.hide&&(<div onClick={this.showSidebar} css={{...styles.sidebarToggleButton}}>
            <GoThreeBars />
          </div>)}
        </Fragment>
      )
    }
  }
}
const styles = {
  sidebarToggleButton: {
    backgroundColor: colors.gatsby,
    color: colors.ui.whisper,
    borderRadius: `50%`,
    bottom: 64,
    boxShadow: `0 0 20px ${colors.gray.light}`,
    cursor: `pointer`,
    display: `flex`,
    height: 60,
    justifyContent: `space-around`,
    alignItems: `center`,
    position: `fixed`,
    left: 20,
    visibility: `visible`,
    width: 60,
    zIndex: 20,
    display: `none`,
    [presets.Tablet]: { display: `flex` },
  }
}

export default PageWithSidebar
