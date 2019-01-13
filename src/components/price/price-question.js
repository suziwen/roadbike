import React from "react"
import styled from "react-emotion"
import { graphql, Link, StaticQuery } from "gatsby"
import presets, { colors } from "../../utils/presets"
import { rhythm, options } from "../../utils/typography"
import { vP } from "../gutters"
import Container from "../container"
import HomepageSection from "../homepage/homepage-section"
import { PriceIcon} from "../../assets/mobile-nav-icons"
import Img from "gatsby-image"


const QuestionSectionsStyled = styled(`div`)`
  display: flex;
  flex-direction: column;
`

const QuestionSectionStyled = styled(`section`)`
  flex-basis: calc(50% - 20px);
  flex-grow: 0;
  background: #fff;
  margin: 0 10px 20px;
  box-shadow: 0 1px 8px ${colors.gatsbyDarker};
  border-radius: ${presets.radiusLg}px;
  overflow: hidden;
  padding: 0 ${rhythm(options.blockMarginBottom)};
  ${presets.Tablet} {
    border-radius: ${presets.radiusLg}px;
    margin: 0 10px 20px;
    padding: ${rhythm(options.blockMarginBottom)};
  }
`


const Header = styled(`header`)`
  margin-bottom: ${rhythm(options.blockMarginBottom)};
  color: ${colors.gatsby};
  text-shadow: 3px 3px 7px ${colors.gray.calm};
`

const Content = styled(`div`)`
  line-height: 28px;
  color: ${colors.gray.lightCopy};
`
class PriceQuestionPayFlow extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.img1Ref = React.createRef()
    this.img2Ref = React.createRef()
    this.img3Ref = React.createRef()
    this.img4Ref = React.createRef()
    this.onLoad = this.onLoad.bind(this)
  }
  onLoad(imgRefStr){
    const self = this
    return ()=>{
      const imgRef = self[imgRefStr].current.imageRef.current
      imgRef.setAttribute("data-action", "zoom")
    }
  }
  render(){
    const PayImgsStyled = styled('div')`
      display: flex;
      flex-direction: column;
      justify-content: center;
      &>.gatsby-image-wrapper{
        flex: auto;
        margin: .3em;
        border-radius: 0.3125em;
        box-shadow: 0 2px 4px 0 ${colors.gray.light}, 0 2px 10px 0  ${colors.gray.superLight};
      }
      ${presets.Tablet} {
        flex-direction: row;
        align-items: flex-start;
      }
    `
    return (<StaticQuery
      query={graphql`
    query {
      image1: file(relativePath: { eq: "price/1.png" }, sourceInstanceName: { eq: "assets"}) {
        publicURL
        childImageSharp {
          fluid(maxWidth: 1000){
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      image2: file(relativePath: { eq: "price/2.png" }, sourceInstanceName: { eq: "assets"}) {
        publicURL
        childImageSharp {
          fluid(maxWidth: 1000){
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      image3: file(relativePath: { eq: "price/3.png" }, sourceInstanceName: { eq: "assets"}) {
        publicURL
        childImageSharp {
          fluid(maxWidth: 1000){
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      image4: file(relativePath: { eq: "price/4.png" }, sourceInstanceName: { eq: "assets"}) {
        publicURL
        childImageSharp {
          fluid(maxWidth: 1000){
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
      `}
      render={data => {
      return (
        <PayImgsStyled>
          <Img
            fluid={data.image1.childImageSharp.fluid}
            ref={this.img1Ref}
            onLoad={this.onLoad('img1Ref')}
          />
          <Img
            fluid={data.image2.childImageSharp.fluid}
            ref={this.img2Ref}
            onLoad={this.onLoad('img2Ref')}
          />
          <Img
            fluid={data.image3.childImageSharp.fluid}
            ref={this.img3Ref}
            onLoad={this.onLoad('img3Ref')}
          />
          <Img
            fluid={data.image4.childImageSharp.fluid}
            ref={this.img4Ref}
            onLoad={this.onLoad('img4Ref')}
          />
        </PayImgsStyled>
      )}}
    />)
  }
}


const PriceQuestion = ()=>{
  return (<HomepageSection
    sectionName="price"
    sectionIcon={PriceIcon}
    inverseStyle={true}
    title="常见问题"
  >
    <QuestionSectionsStyled>
      <QuestionSectionStyled>
        <Header>我找不到付费入口</Header>
        <Content>
          先到小书匠编辑器里，点击 `小书匠` 主按钮，然后再点击 `用户`， 会弹出一个用户注册/登录界面。要升级为会员的用户，请先注册，再进行付款
        </Content>
        <PriceQuestionPayFlow/>
      </QuestionSectionStyled>
      <QuestionSectionStyled>
        <Header>免费和付费有什么区别</Header>
        <Content>
          付费用户提供更及时的更新，更多定制化的导出
        </Content>
      </QuestionSectionStyled>
      <QuestionSectionStyled>
        <Header>我可以一次性预付多年吗</Header>
        <Content>
          不可以，目前提供最多预付两年，即两年40人民币。如果您付费超过40,我们这边也只是把你的会员时间延长两年，超出的金额需要用户在一定的时间内提出退回申请，才可以取回
        </Content>
      </QuestionSectionStyled>
      <QuestionSectionStyled>
        <Header>
          可以通过哪些方式支付费用
        </Header>
        <Content>
          目前仅支持支付宝线下转账支付，用户在支付成功后，我们会在 10 个工作日内进行人工确认支付完成，再升级为正式会员. 在此期间，用户可以自动升级为临时会员, 享受与会员一样的功能
        </Content>
      </QuestionSectionStyled>
      <QuestionSectionStyled>
        <Header>
          我需要注册吗
        </Header>
        <Content>
          免费用户可以直接下载使用，无需注册。升级为会员时，需要先注册一个用户，再进行付费升级为会员用户
        </Content>
      </QuestionSectionStyled>
      <QuestionSectionStyled>
        <Header>
          升级会员后，是否可以进行数据同步了
        </Header>
        <Content>
          不可以，小书匠目前不提供数据存储同步的服务。所有用户数据，配置都保存在用户本地，包括在线网页版小书匠编辑器，数据和配置都是保存在当前浏览器内置数据库里
        </Content>
      </QuestionSectionStyled>
      <QuestionSectionStyled>
        <Header>
          我一个账号能多个人使用吗
        </Header>
        <Content>
          不可以，如果系统发现账号行为异常，有同时多个人使用,该账号将会被取消会员资格
        </Content>
      </QuestionSectionStyled>
      <QuestionSectionStyled>
        <Header>
          更多关于收费的问题
        </Header>
        <Content>
          你可以通过 <a href="https://github.com/suziwen/markdownxiaoshujiang/issues" target="_blank">github issues</a> 进行提问，或者随时通过 <a href="mailto:suziwenjob@gmail.com" target="_blank">suziwenjob@gmail.com</a> 邮箱与联系我们
        </Content>
      </QuestionSectionStyled>
    </QuestionSectionsStyled>
  </HomepageSection>
  )
}

export default PriceQuestion
