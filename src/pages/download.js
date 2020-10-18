import React from "react"
import styled from "react-emotion"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import { vP } from "../components/gutters"
import Container from "../components/container"
import { PriceIcon} from "../assets/mobile-nav-icons"
import {MdArrowForward} from "react-icons/md"
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
        <Button large to="https://github.com/suziwen/markdownxiaoshujiang/releases/tag/v8.4.2" ondark={true} tag="href" target="_blank" icon={<MdArrowForward />} style={{margin: "10px"}}>
          Github 下载
        </Button>
        <Button large to="https://gitee.com/suziwen/v8.4.2/releases/v8.4.2" ondark={true} tag="href" target="_blank" icon={<MdArrowForward />} style={{margin: "10px"}}>
          Gitee 下载
        </Button>
        <Button large to="https://pan.baidu.com/s/1EHfRImvvdO6hKd1FNiqxOA" ondark tag="href" target="_blank" icon={<MdArrowForward />} overrideCSS={{
          margin: "10px",
          position: "relative",
          "&:after": {
            display: `block`,
            position: `absolute`,
            bottom: `-50%`,
            right: `0`,
            pointerEvents: `none`,
            fontSize: `1rem`,
            content: `'提取密码: (5uic)'`,
          }
        }}>
          百度网盘下载
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
      links={[{
        to: "https://github.com/suziwen/markdownxiaoshujiang/releases/tag/v1.13.0",
        label: "Github 下载",
        inverseStyle: true,
        icon: MdArrowForward,
        tag: "href",
        target: "_blank",
      }]}
    >
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
      links={[{
        to: "https://github.com/suziwen/markdownxiaoshujiang/releases",
        label: "Github 下载",
        inverseStyle: true,
        icon: MdArrowForward,
        tag: "href",
        target: "_blank",
      }]}
    >
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
      <div css={{ position: `relative` }}>
        <Helmet bodyAttributes={{
          class: "roadbike-download-page"
        }}>
          <title>下载</title>
          <meta
            name="Description"
            content="小书匠下载"
          />
        </Helmet>
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
            <DownloadSections version="8.4.2" downloadUrl="http://www.baidu.com" />
            <OldDownloadSections />
            <OtherDownloadSections />
          </div>
        </div>
      </div>
    )
  }
}

export default IndexRoute


