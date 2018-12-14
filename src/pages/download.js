import React from "react"
import styled from "react-emotion"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import { vP } from "../components/gutters"
import Container from "../components/container"
import { PriceIcon} from "../assets/mobile-nav-icons"
import ArrowForwardIcon from "react-icons/lib/md/arrow-forward"
import HomepageSection from "../components/homepage/homepage-section"
import Button from "../components/button"
import {
  setupScrollersObserver,
  unobserveScrollers,
} from "../utils/scrollers-observer"


const MessageStyled = styled(`div`)`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: ${presets.radiusLg}px;
`

const InfoMessageStyled = styled(MessageStyled)`
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
`


const WarningMessageStyled = styled(MessageStyled)`
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
`

const DownloadButtonsStyled = styled(`div`)`
  padding: ${rhythm(options.blockMarginBottom)};
  text-align: center;
`

const DownloadSections = ({
  version,
  downloadUrl,
})=>{
  return (
    <HomepageSection
      sectionName={version}
      sectionIcon={PriceIcon}
      inverseStyle={true}
      title={`当前最新版本 v${version}`}
    >
      <DownloadButtonsStyled>
        <Button large to={downloadUrl} ondark={true} tag="href" target="_blank" icon={<ArrowForwardIcon />} style={{margin: "10px"}}>
          Github 下载
        </Button>
        <Button large to={downloadUrl} ondark tag="href" target="_blank" icon={<ArrowForwardIcon />} style={{margin: "10px"}}>
          百度网盘下载(提取密码:)
        </Button>
      </DownloadButtonsStyled>
        <WarningMessageStyled>
          注:
          <ol>
            <li>
              如果您从较老版本的小书匠升级，内置数据库会有不兼容问题，建议在升级前进行数据导出备份，或者数据库文件备份，防止升级失败。 <br/>
              数据库文件路径
              <pre>
                <code>
                  Windows: %LOCALAPPDATA%/storywriter/<br/>
                  Mac: ~/Library/Application Support/storywriter/<br/>
                  Linux: ~/.config/storywriter
                </code>
              </pre>
            </li>
            <li>
              系统升级时，都会自动重建索引，文章比较多的用户需要等待比较长时间才能再次进入。
            </li>
          </ol>
        </WarningMessageStyled>
        <InfoMessageStyled>
          从 2.0.0 版本开始，不再支持 window xp 和 osx 32 版本
        </InfoMessageStyled>

    </HomepageSection>
  )
}


const OldDownloadSections = ()=>{
  return (
    <HomepageSection
      sectionName="1.13.0"
      sectionIcon={PriceIcon}
      inverseStyle={true}
      title={`支持 window xp 的版本 v1.13.0`}
    >
      <Button large to="https://github.com/suziwen/markdownxiaoshujiang/releases/tag/v1.13.0" ondark={true} tag="href" target="_blank" icon={<ArrowForwardIcon />} style={{margin: "10px"}}>
        Github 下载
      </Button>
    </HomepageSection>
  )
}

const OtherDownloadSections = ()=>{
  return (
    <HomepageSection
      sectionName="其他"
      sectionIcon={PriceIcon}
      inverseStyle={true}
      title={`其他更多版本`}
    >
      <Button large to="https://github.com/suziwen/markdownxiaoshujiang/releases" ondark={true} tag="href" target="_blank" icon={<ArrowForwardIcon />} style={{margin: "10px"}}>
        Github 下载
      </Button>
    </HomepageSection>
  )
}

class IndexRoute extends React.Component {
  componentDidMount() {
    setupScrollersObserver()
  }

  componentWillUnmount() {
    unobserveScrollers()
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <Helmet>
          <meta
            name="Description"
            content="小书匠下载"
          />
        </Helmet>
        <div css={{ position: `relative` }}>
          <div
            css={{
              display: `flex`,
              flexDirection: `row`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
            }}
          >
            <div
              css={{
                padding: rhythm(presets.gutters.default / 2),
                paddingBottom: 0,
                flex: `0 0 100%`,
                maxWidth: `100%`,
                [presets.Hd]: { padding: vP, paddingTop: 0, paddingBottom: 0 },
              }}
            >
              <DownloadSections version="6.8.1" downloadUrl="http://www.baidu.com" />
              <OldDownloadSections />
              <OtherDownloadSections />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexRoute


