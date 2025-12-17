import React from "react"
import { Link } from "gatsby"
import styled from "react-emotion"
import Helmet from "react-helmet"
import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import { vP } from "../components/gutters"
import Container from "../components/container"
import { PriceIcon} from "../assets/mobile-nav-icons"
import {MdArrowForward} from "react-icons/md"
import HomepageSection from "../components/homepage/homepage-section"
import PWADownloadSection from '../components/downloads/pwaSection'
import JOPPDownloadSection from '../components/downloads/joppSection'
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
        <Button large to="https://github.com/suziwen/markdownxiaoshujiang/releases/tag/v8.14.0" ondark={true} tag="href" target="_blank" icon={<MdArrowForward />} style={{margin: "10px"}}>
          Github 下载
        </Button>
        <Button large to="https://www.aliyundrive.com/s/Ss9LcYedT8g" ondark={true} tag="href" target="_blank" icon={<MdArrowForward />} style={{margin: "10px"}}>
          阿里云盘
        </Button>
        <Button large to="https://pan.baidu.com/s/1rGOes1DxQXDsEOC3VmEAZQ" ondark tag="href" target="_blank" icon={<MdArrowForward />} overrideCSS={{
          margin: "10px",
          position: "relative",
          "&:after": {
            display: `block`,
            position: `absolute`,
            bottom: `-50%`,
            right: `0`,
            pointerEvents: `none`,
            fontSize: `1rem`,
            content: `'提取密码: (ggst)'`,
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
          Mac M1/M2 机器的用户，请下载 osxarm 版本
          如果发现不能启动，可以尝试执行下面的命令
          <pre>
            <code>
              cd /Users/suziwen/Downloads/Story-writer-osxarm<br/>
              xattr -cr ./Story-writer.app<br/>
            </code>
          </pre>
        </InfoMessageStyled>
        <InfoMessageStyled>
          从 2.0.0 版本开始，不再支持 window xp 和 osx 32 版本
        </InfoMessageStyled>

    </HomepageSection>
  )
}

const DockerDownloadSections = ()=>{
  return (
    <HomepageSection
      sectionName="Pegasus"
      sectionIcon={PriceIcon}
      inverseStyle={true}
      title={`天马版(小书匠 Docker 自部署版本)`}
      links={[{
        to: "https://hub.docker.com/r/suziwen/pegasus",
        label: "Docker 官网",
        inverseStyle: true,
        icon: MdArrowForward,
        tag: "href",
        target: "_blank",
      },{
        to: "https://www.bilibili.com/video/BV1Bd4y1U7mv",
        label: "安装教程",
        inverseStyle: true,
        icon: MdArrowForward,
        tag: "href",
        target: "_blank",
      },{
        to: "https://www.bilibili.com/video/BV19A41197Ba",
        label: "架构介绍",
        inverseStyle: true,
        icon: MdArrowForward,
        tag: "href",
        target: "_blank",
      }]}
    >
    </HomepageSection>
  )
}

const GithubPagesDownloadSections = ()=>{
  return (
    <HomepageSection
      sectionName="Pegasus"
      sectionIcon={PriceIcon}
      inverseStyle={true}
      title={`招财猫版(小书匠 Github Pages 静态自部署版本)`}
      links={[{
        to: "https://github.com/suziwen/lucky-cat",
        label: "代码地址",
        inverseStyle: true,
        icon: MdArrowForward,
        tag: "href",
        target: "_blank",
      },{
        to: "https://suziwen.github.io/lucky-cat/",
        label: "演示地址",
        inverseStyle: true,
        icon: MdArrowForward,
        tag: "href",
        target: "_blank",
      }]}
    >
    </HomepageSection>
  )
}




const AndroidDownloadSections = ()=>{
  return (
    <HomepageSection
      sectionName="1.3.0"
      sectionIcon={PriceIcon}
      inverseStyle={true}
      title={`有影笔记(小书匠手机版)`}
      links={[{
        to: "https://github.com/suziwen/markdownxiaoshujiang/releases/tag/Android_1.3.0",
        label: "Android 下载(Github)",
        inverseStyle: true,
        icon: MdArrowForward,
        tag: "href",
        target: "_blank",
      }, {
        to: "https://apps.apple.com/cn/app/apple-store/id1574463816",
        label: "iOS 下载",
        inverseStyle: true,
        icon: MdArrowForward,
        tag: "href",
        target: "_blank",
      }]}
    >
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
            "&:before": {
              content: `' '`,
              height: `100VH`,
              width: `100VW`,
              position: `fixed`,
              backgroundColor: `#fff`,
              backgroundImage: `-webkit-gradient(linear,left top,right top,from(rgba(255,255,255,0)),color-stop(25%,#fff),color-stop(75%,#fff),to(rgba(255,255,255,0))),repeating-linear-gradient(-45deg,transparent 0,transparent 2.5em,${colors.ui.border} 0,${colors.ui.border} calc(2.5em + 1px)),repeating-linear-gradient(45deg,transparent 0,transparent 2.5em,${colors.ui.border} 0,${colors.ui.border} calc(2.5em + 1px))`,
              backgroundImage: `linear-gradient(90deg,rgba(255,255,255,0),#fff 25%,#fff 75%,rgba(255,255,255,0)),repeating-linear-gradient(-45deg,transparent 0,transparent 2.5em,${colors.ui.border} 0,${colors.ui.border} calc(2.5em + 1px)),repeating-linear-gradient(45deg,transparent 0,transparent 2.5em,${colors.ui.border} 0,${colors.ui.border} calc(2.5em + 1px))`
            },
          }}
        >
          <div
            css={{
              position: `relative`,
              maxWidth: `21cm`,
              margin: `0 auto`,
              padding: rhythm(presets.gutters.default / 2),
              paddingBottom: 0,
              flex: `0 0 100%`,
              background: `linear-gradient(135deg, #4567b2 20%, #8ab9ff 80%)`,
              backgroundAttachment: `fixed`,
              [presets.Hd]: { padding: vP, paddingTop: 0, paddingBottom: 0,
                marginTop: presets.headerHeight,
              },
              "&>section": {
                background: `initial!important`,
              },
            }}
          >
            <DownloadSections version="8.14.0" downloadUrl="http://www.baidu.com" />
            <JOPPDownloadSection />
            <PWADownloadSection />
            <AndroidDownloadSections />
            <DockerDownloadSections />
            <GithubPagesDownloadSections />
            <OldDownloadSections />
            <OtherDownloadSections />
          </div>
        </div>
      </div>
    )
  }
}

export default IndexRoute


