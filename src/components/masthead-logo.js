import React from "react"
import posed from 'react-pose'
import styled from "react-emotion"
import SplitText from 'react-pose-text'
import typography, { rhythm, scale } from "../utils/typography"
import presets from "../utils/presets"
import { vP, vPHd, vPVHd, vPVVHd } from "../components/gutters"
import goldImg from "../assets/gold-small.jpg"


const Divstyled = styled.div`
  & .split_text_logo{
    color: #c3a343;
    -webkit-text-fill-color: transparent;
    background: -webkit-linear-gradient(transparent, transparent), url(${goldImg}) repeat;
    background: -o-linear-gradient(transparent, transparent);
    -webkit-background-clip: text;
  }
`

const LogoText = posed.div({
  exit: {
    x: '-0%'
  },
  enter: {
    x: '0%',
    beforeChildren: true,
    staggerChildren: 200
  }
})

const charPoses = {
  exit: { opacity: 0 },
  enter: { opacity: 1 }
}
class Logo extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }
  render() {
   return (
    <div
      css={{
        position: `absolute`,
        bottom: rhythm(2),
        right: rhythm(2),
        [presets.Mobile]: {
          bottom: rhythm(4),
        },
        [presets.Phablet]: {
          bottom: rhythm(2),
        },
      }}
    >
      <Divstyled
        css={{
          color: `#fff`,
          letterSpacing: `0.02em`,
          fontFamily: "webfontxiaoshujiang",
          fontSize: scale(3 / 5).fontSize,
          textShadow: `1px 1px 20px hsla(0,100%,100%,0.3)`,
          fontWeight: `bold`,
          marginBottom: 0,
          [presets.Phablet]: {
            fontSize: scale(3 / 5).fontSize,
            textAlign: `right`,
          },
          [presets.Desktop]: {
            fontSize: scale(6 / 5).fontSize,
          },
        }}
      >
        <LogoText initialPose="exit" pose="enter">
          <SplitText className="split_text_logo" charPoses={charPoses}>
          小书匠
          </SplitText>
        </LogoText>
      </Divstyled>
    </div>
  )}
  }

export default Logo
