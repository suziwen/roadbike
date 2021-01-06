import React from "react"
import styled from "react-emotion"
import { graphql, Link } from "gatsby"
import presets, { colors } from "../../utils/presets"
import { rhythm, options } from "../../utils/typography"
import { vP } from "../gutters"
import Container from "../container"
import HomepageSection from "../homepage/homepage-section"
import { PriceIcon} from "../../assets/mobile-nav-icons"
import Button from "../button"

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
  border-color: ${colors.ui.bright} ${colors.ui.whisper} ${colors.ui.whisper} ${colors.ui.bright};
`

  const HeaderTitleStyled = styled(`div`)`
    text-align: center;
    position: relative;
    padding-top: 2.3rem;
    line-height: 0;
    font-size: 2.3rem;
    z-index: 1;
  `


const PriceContainerStyled = styled(`div`)`
  padding: 0 0 10px;
  & span{
    display: inline-block;
    transition: transform .5s;
    font-size: 2rem;
  }
`
const PriceSectionPriceHeader = ({
  price
})=>{
  return (
    <PriceContainerStyled>
      <span>{price}</span>
    </PriceContainerStyled>
  )
}

const PriceSectionRoot = styled(`section`)`
  flex-basis: calc(50% - 20px);
  flex-grow: 0;
  margin: 0 10px 20px;
  box-shadow: 0 1px 8px ${colors.gray.light};
  border-radius: ${presets.radiusLg}px;
  text-align: center;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  &:hover ${HeaderBgStyled}{
    border-color: ${colors.gatsby} ${colors.ui.whisper} ${colors.ui.whisper} ${colors.gatsby};
  }
  &:hover ${HeaderTitleStyled}{
    color: ${colors.lemon};
  }
  &:hover ${PriceContainerStyled} span{
    transform: scale(3);
    -webkit-text-stroke: 1px white;
  }
`

const PriceSectionTitleHeader = ({
  title,
  isActived,
  isVip,
  price
  })=> {
  const vipFontFamilyStr = isVip?`'${options.cursiveFontFamily.join("','")}'`:'inherit'
  const HeaderContentStyled = styled(`header`)`
    font-family: ${vipFontFamilyStr};
    position: relative;
    margin: 0 0 4rem;
  `


  const HeaderBgActivedStyled = styled(`div`)`
    border-style: solid;
    border-width: 90px 1411px 23px 399px;
    position: absolute;
    border-color: ${colors.gatsby} ${colors.ui.whisper} ${colors.ui.whisper} ${colors.gatsby};
    color: ${colors.lemon};
  `

  return (
    <HeaderContentStyled>
      {isActived? <HeaderBgActivedStyled/> : <HeaderBgStyled/>}
      <HeaderTitleStyled css={{
        color: isActived?colors.lemon:colors.gatsby}
        }>
        {title}
      </HeaderTitleStyled>
    </HeaderContentStyled>
  )
}

const PriceSectionHeader = ({title, price, isActived, isVip})=>{
  const HeaderStyled = styled(`header`)`
    background-color: ${colors.ui.whisper};
  `
  return (
    <HeaderStyled>
      <PriceSectionTitleHeader title={title} isActived={isActived} isVip={isVip}/>
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
  color: ${colors.gray.bright};
  padding: 15px 0;
  & .more_detail{
    outline: 2px dotted;
    outline-offset: 6px;
  }
  & span{
    font-weight: bolder;
    a{
      text-decoration: dotted underline;
      text-underline-offset: 5px;
      color: ${colors.gatsbyDarker};
    }
  }
  :hover {
    background-color: ${colors.ui.light};
    border-left: 5px solid ${colors.gatsby};
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
  isVip,
  listItems,
  children
})=>{
  return (
    <PriceSectionRoot>
      <PriceSectionHeader title={title} price={price} isActived={isActived} isVip={isVip}/>
      <PriceSectionDetail listItems={listItems}></PriceSectionDetail>
      {children}
    </PriceSectionRoot>
  )
}



const PriceCompareDetail = ()=>{
    return (<HomepageSection 
      sectionName="price"
      sectionIcon={PriceIcon}
      inverseStyle={false}
      title="套餐选择"
    >
      <PriceSections>
        <PriceSection
          title="免费用户"
          price="￥ 0.0/年"
          listItems={[
            "所有 <span>markdown</span> 基础，及扩展语法",
            "所有<span><a href='/docs/tutorial/store/'>第三方存储</a></span>同步",
            "所有<span><a href='/docs/tutorial/image/'>图床</a></span>存储",
            "所有<span><a href='/docs/tutorial/import_and_export/'>客户端</a></span>导出",
            "<span><a href='/docs/tutorial/drawio/'>drawio</a></span> 绘图功能",
            "<span><a href='/docs/tutorial/table/editor/'>可视化</a></span>表格编辑器",
            "<span><a href='http://soft.xiaoshujiang.com/docs/tutorial/internal_link/'>内部链接,反向链接</a></span>",
            "<span><a href='http://soft.xiaoshujiang.com/docs/tutorial/task_list_window/'>待办清单</a></span>",
            "<span><a href='http://soft.xiaoshujiang.com/blog/file_template_manager'>模板</a></span>",
            "<span><a href='http://soft.xiaoshujiang.com/docs/tutorial/snippet/'>片段</a></span>",
            "<span><a href='http://soft.xiaoshujiang.com/docs/tutorial/search_grammar/'>全文搜索</a></span>",
            "文档<span><a href='/docs/tutorial/files_manager/'>历史记录</a></span>",
            "<span><a href='/docs/tutorial/image/editor/'>图片涂鸦</a></span> 功能",
          ]}
        >
          <div css={{
            margin: `${rhythm(options.blockMarginBottom)} 0`,
          }}>
            <Button large to="/download/">
              下载使用
            </Button>
            </div>
        </PriceSection>
        <PriceSection
          title="付费用户"
          price="￥ 40.0/年"
          isActived={true}
          isVip={true}
          listItems={[
            "免费版本<span>所有</span>功能",
            "小书匠专用<span>高级语法</span>",
            "自定义<span><a href='/docs/tutorial/database/'>数据中心</a></span>",
            "<span><a href='/docs/tutorial/export/pdf/'>定制化 PDF </a></span>导出<br><small>(加密，水印，封面等)</small>",
            "<span><a href='/docs/tutorial/link_network_map/'>链接关系图</a></span>",
            "<span><a href='/blog/mindmap/extense'>思维脑图</a></span>",
            "<span><a href='/docs/tutorial/sub_codemirror_editor/'>子编辑器</a></span>",
            "<span><a href='/docs/tutorial/filter/'>过滤器</a></span>",
            "<span>自定义背景主题</span>",
            "<span>新功能</span>第一时间体验",
            "<span class='more_detail'><a href='/blog/story-writer/vip-feature'>更多详细介绍</a></span>",
          ]}
        >
          <div css={{
            margin: `${rhythm(options.blockMarginBottom)} 0`,
          }}>
          <Button large to="/blog/vip/price/flow/">
              查看付费流程
            </Button>
          </div>
        </PriceSection>
      </PriceSections>
    </HomepageSection>)
}

export default PriceCompareDetail
