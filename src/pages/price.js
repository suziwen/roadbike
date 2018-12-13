import React from "react"
import styled from "react-emotion"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import { vP } from "../components/gutters"
import Container from "../components/container"
import MastheadBg from "../components/masthead-bg"
import MastheadContent from "../components/masthead"
import HomepageSection from "../components/homepage/homepage-section"
import { PriceIcon} from "../assets/mobile-nav-icons"
import PriceFreeSection from "../components/price-free-section"
import PriceVipSection from "../components/price-vip-section"
import {
  setupScrollersObserver,
  unobserveScrollers,
} from "../utils/scrollers-observer"


const PriceSections = styled('div')`
  display: flex;
  flex-direction: column;

  ${presets.Tablet}{
    flex-direction: row;
    margin: 0 -8px;
  }
`

const HeaderBgStyled = styled(`div`)`
  border-style: solid;
  border-width: 90px 1411px 23px 399px;
  position: absolute;
  border-color: #e4e4e4 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #e4e4e4;
`

const PriceSectionRoot = styled(`section`)`
  flex-basis: calc(50% - 20px);
  flex-grow: 0;
  margin: 0 10px 20px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  border-radius: ${presets.radiusLg}px;
  text-align: center;
  overflow: hidden;
  &:hover ${HeaderBgStyled}{
    border-color: #2ECC71 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #2ECC71;
    color: #fff;
  }
`

const PriceSectionTitleHeader = ({
  title,
  isActived,
  price
  })=> {
  const HeaderContentStyled = styled(`header`)`
    position: relative;
    margin: 0 0 50px;
  `


  const HeaderBgActivedStyled = styled(`div`)`
    border-style: solid;
    border-width: 90px 1411px 23px 399px;
    position: absolute;
    border-color: #2ECC71 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #2ECC71;
    color: #fff;
  `

  const HeaderTitleStyled = styled(`div`)`
    text-align: center;
    position: relative;
    padding-top: 40px;
    z-index: 1;
  `

  return (
    <HeaderContentStyled>
      {isActived? <HeaderBgActivedStyled/> : <HeaderBgStyled/>}
      <HeaderTitleStyled>
        {title}
      </HeaderTitleStyled>
    </HeaderContentStyled>
  )
}

const PriceSectionPriceHeader = ({
  price
})=>{
  const PriceContainerStyled = styled(`div`)`
    padding: 0 0 20px;
  `
  return (
    <PriceContainerStyled>
      <span>{price}</span>
    </PriceContainerStyled>
  )
}

const PriceSectionHeader = ({title, price, isActived})=>{
  const HeaderStyled = styled(`header`)`
    background-color: #f6f6f6;
  `
  return (
    <HeaderStyled>
      <PriceSectionTitleHeader title={title} isActived={isActived}/>
      <PriceSectionPriceHeader price={price}/>
    </HeaderStyled>
  )
}


const UlStyled = styled(`ul`)`
  list-style: none;
  padding: 0;
  margin: 0;
`

const LiStyled = styled(`li`)`
  color: #a7a7a7;
  padding: 15px 0;
  & span{
    color: #414141;
  }
  :hover {
    background-color: #E4E4E4;
    border-left: 5px solid #2ECC71;
  }
`

const PriceSectionDetail = ({
  listItems
  })=>{
  return (
    <UlStyled>
      {
        listItems.map((item, i)=>{
          return (
            <LiStyled key={i} dangerouslySetInnerHTML={{__html: item}} />
          )
        })
      }
    </UlStyled>
  )
}


const PriceSection = ({
  title,
  price,
  isActived,
  listItems
})=>{
  return (
    <PriceSectionRoot>
      <PriceSectionHeader title={title} price={price} isActived={isActived}/>
      <PriceSectionDetail listItems={listItems}></PriceSectionDetail>
    </PriceSectionRoot>
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
            content="小书匠付费功能介绍"
          />
        </Helmet>
        <div css={{ position: `relative` }}>
          <MastheadBg />
          <div
            css={{
              display: `flex`,
              flexDirection: `row`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
            }}
          >
            <MastheadContent />
            <div
              css={{
                padding: rhythm(presets.gutters.default / 2),
                paddingBottom: 0,
                flex: `0 0 100%`,
                maxWidth: `100%`,
                [presets.Hd]: { padding: vP, paddingTop: 0, paddingBottom: 0 },
              }}
            >
              <main
                id={`reach-skip-nav`}
                css={{
                  display: `flex`,
                  flexDirection: `row`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                }}
              >
              </main>
              <HomepageSection 
                sectionName="price"
                sectionIcon={PriceIcon}
                title="小书匠套餐选择"
              >
                <PriceSections>
                  <PriceSection
                    title="免费用户"
                    price="0/年"
                    listItems={[
                      "所有 <span>markdown</span> 基础，及扩展语法",
                      "所有<span>第三方存储</span>同步",
                      "所有<span>图床</span>存储",
                      "所有<span>客户端</span>导出",
                      "文档<span>历史记录</span>",
                    ]}
                  >
                  </PriceSection>
                  <PriceSection
                    title="付费用户"
                    price="20/年"
                    isActived={true}
                    listItems={[
                      "免费版本<span>所有</span>功能",
                      "小书匠专用<span>高级语法</span>",
                      "自定义<span>数据中心</span>",
                      "<span>定制化 PDF </span>导出<br><small>(加密，水印，封面等)</small>",
                      "<span>新功能</span>第一时间体验",
                      "<span>drawio</span> 绘图功能",
                      "<span>可视化</span>表格编辑器",
                      "<span>图片涂鸦</span> 功能",
                    ]}
                  >
                  </PriceSection>
                </PriceSections>
              </HomepageSection>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexRoute
