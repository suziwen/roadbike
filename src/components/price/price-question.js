import React from "react"
import styled from "react-emotion"
import { graphql, Link, StaticQuery } from "gatsby"
import presets, { colors } from "../../utils/presets"
import { rhythm, options } from "../../utils/typography"
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
  a{
    text-decoration: dotted underline;
    text-underline-offset: 5px;
    color: ${colors.gatsbyDarker};
  }
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
          付费用户提供更及时的更新，更多定制化的功能,详情可以参考<a href="http://soft.xiaoshujiang.com/blog/story-writer/vip-feature">这篇文章</a>
        </Content>
      </QuestionSectionStyled>
      <QuestionSectionStyled>
        <Header>我可以一次性预付多年吗</Header>
        <Content>
          不可以，目前提供最多预付两年，即两年80人民币。
          <br/>
          如果您付费超过80,我们这边也只是把你的会员时间延长两年，超出的金额需要用户在一个月内提出退回申请，才可以取回
        </Content>
      </QuestionSectionStyled>
      <QuestionSectionStyled>
        <Header>
          可以通过哪些方式支付费用
        </Header>
        <Content>
          目前仅支持支付宝线下转账支付，用户在支付成功后，我们会在 10 个工作日内进行人工确认支付完成，再升级为正式会员. 
          <br/>
          在此期间，用户可以自己手动升级为临时会员, 享受与会员一样的功能.
          <br/>
          手动升级临时会员流程可以查看这篇<a href="http://soft.xiaoshujiang.com/blog/vip/price/flow/">文章</a>
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
          小书匠的数据默认存储在哪？
        </Header>
        <Content>
          小书匠默认将数据存储在本地数据库，具体保存位置可以通过 `关于` 界面查看
          <br/>
          小书匠是一个离线优先的本地软件，不管是 web 版本还是客户端版本，所有的数据都是存储在本地。
          <br/>
          同时，小书匠提供了一个数据同步配置的服务，用户可以自定义<a href="http://soft.xiaoshujiang.com/docs/tutorial/database/">数据中心</a>来实现专门的存储和同步文章数据功能.
        </Content>
      </QuestionSectionStyled>
      <QuestionSectionStyled>
        <Header>
          升级会员后，是否可以进行数据同步了
        </Header>
        <Content>
          小书匠不提供直接的数据存储服务,但提供用户自定义<a href="http://soft.xiaoshujiang.com/docs/tutorial/database/">数据中心</a>,用户可以自己搭建一个服务器专门存储和同步文章数据.
          <br/>
          同时,小书匠还为会员提供一个临时数据中心功能,方便用户在不同的电脑上快速同步最近修改的文章
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
