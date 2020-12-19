import React from "react"
import styled from "react-emotion"
import { graphql, Link, StaticQuery } from "gatsby"
import presets, { colors } from "../../utils/presets"
import { rhythm, options } from "../../utils/typography"
import { vP } from "../gutters"
import Container from "../container"
import HomepageSection from "../homepage/homepage-section"
import { PriceIcon} from "../../assets/mobile-nav-icons"


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


const PriceQuestion = ()=>{
  return (<HomepageSection
    sectionName="reward"
    sectionIcon={PriceIcon}
    inverseStyle={true}
    title="奖励"
  >
    <QuestionSectionsStyled>
      <QuestionSectionStyled>
        <Header>邀请奖励</Header>
        <Content>
          拥有邀请码的用户，在注册为小书匠用户后的一个月内升级为会员，系统将赠送一年(365天)的会员时长。
          <br/>
          详细规则可以参考<Link to='/blog/user/invitation'>这里</Link>
        </Content>
      </QuestionSectionStyled>
      <QuestionSectionStyled>
        <Header>教育奖励</Header>
        <Content>
          <p>
            只要使用了带有 <code>edu</code> 域名的邮箱用户，在完成邮箱验证后进行付款，成为小书匠会员后，自动奖励两年( 365*2 天)的会员时长。
          </p>
          <p>
            该优惠不需要邀请码就可以完成，如果同时使用了邀请码和 <code>edu</code> 邮箱，对于被邀请者，奖励时长无法累加，最终时长为 730 天，而不是 730 + 365。对于邀请者，用户数奖励统计依然有效。
          </p>
          <p>
            <strong>注: 一定要先验证 edu 邮箱的有效性后，再进行付款才会奖励 730 天会员时长。付完款升级为正式会员后，再进行 edu 邮箱验证将无法获得奖励。</strong>
          </p>
        </Content>
      </QuestionSectionStyled>
      <QuestionSectionStyled>
        <Header>征文奖励</Header>
        <Content>
          只要发布了关于小书匠相关的文章，都将获得一年(365天)的会员时长。
          <br/>
          详细规则可以参考<Link to='/blog/story-writer/2021-essay-contest'>这里</Link>
        </Content>
      </QuestionSectionStyled>
    </QuestionSectionsStyled>
  </HomepageSection>
  )
}

export default PriceQuestion

