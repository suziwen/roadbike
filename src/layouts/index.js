import React from "react"
import Modal from "react-modal"
import { SkipNavLink } from "@reach/skip-nav"
import {MdClose} from "react-icons/md"
import { navigate, PageRenderer } from "gatsby"
import presets, { colors } from "../utils/presets"
import isHomepageFn from "../utils/is-homepage"
import Navigation from "../components/navigation"
import MobileNavigation from "../components/navigation-mobile"
import SiteMetadata from "../components/site-metadata"
import Transition from "../components/transition"
import ContextConsumer, { ContextProviderComponent } from "../components/context"
import PageWithSidebar from "../components/page-with-sidebar"

// Other fonts
import "typeface-spectral"


class DefaultLayout extends React.PureComponent {
  constructor() {
    super()
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const isHomepage = isHomepageFn(this.props.location.pathname)
    const pageContext = this.props.pageContext
    const sidebarItems = pageContext.sidebarItems
    const isSidebarDisabled = pageContext.isSidebarDisabled || !sidebarItems
    const enableScrollSync = pageContext.enableScrollSync

    const props = this.props
    return (
    <ContextProviderComponent>
      <ContextConsumer>
        {({data, set})=>{
          // SEE: template-docs-markdown for why this.props.isSidebarDisabled is here
          // const isSidebarDisabled = data.isSidebarDisabled || !data.itemList
          //const itemList = data.itemList
          //const enableScrollSync = data.enableScrollSync
          return (
            <div className={isHomepage ? `is-homepage` : ``}>
              <SiteMetadata pathname={props.location.pathname} />
              <SkipNavLink css={styles.skipLink}>Skip to main content</SkipNavLink>
              <Navigation pathname={props.location.pathname} />
              <div
                className={`main-body`}
                css={{
                  [presets.Tablet]: {
                    margin: `0 auto`,
                  },
                  paddingTop: isHomepage
                    ? 0
                    : presets.headerHeight,
                  paddingLeft: `env(safe-area-inset-left)`,
                  paddingRight: `env(safe-area-inset-right)`,
                }}
              >
                <PageWithSidebar
                  disable={isSidebarDisabled}
                  itemList={sidebarItems}
                  location={props.location}
                  enableScrollSync={enableScrollSync}
                >
                  <Transition location={props.location}>
                    {props.children}
                  </Transition>
                </PageWithSidebar>
              </div>
              <MobileNavigation pathname={props.location.pathname} />
            </div>
          )
        }}
      </ContextConsumer>
    </ContextProviderComponent>
    )
  }
}


const styles = {
  skipLink: {
    border: `0`,
    clip: `rect(0 0 0 0)`,
    height: 1,
    width: 1,
    margin: -1,
    padding: 0,
    overflow: `hidden`,
    position: `absolute`,
    zIndex: 100,
    fontSize: `0.85rem`,
    ":focus": {
      padding: `0.9rem`,
      position: `fixed`,
      top: 10,
      left: 10,
      background: `white`,
      textDecoration: `none`,
      width: `auto`,
      height: `auto`,
      clip: `auto`,
    },
  },
}

export default DefaultLayout
