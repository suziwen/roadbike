import React from "react"
import styled, { keyframes } from "react-emotion"

const rippleScale = keyframes({
  to: {
    transform: `scale(30)`,
  }
})

const Ink = styled.div`
  position: absolute;
  display: block;
  background: #2F4F4F;
  border-radius: 50%;
  transform: scale(0);
  width: 10vw;
  height: 10vw;
  margin-top: -5vw;
  margin-left: -5vw;
  animation: ${rippleScale} .8s linear;
  z-index: 1000;
`

class Ripple extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.rippleRef = React.createRef()
    this.state = {
      animate: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  }
  componentDidUpdate(){
    if (this.props.rippled) {
      const onEnd = this.props.onEnd
      const rippleNode = this.rippleRef.current
      $(rippleNode).one(`animationend webkitAnimationEnd oanimationend MSAnimationEnd`, ()=>{
        onEnd()
      })
    }
  }

  render () {
    const props = this.props
    return (
      props.rippled?<Ink innerRef={this.rippleRef} css={{
          top: this.props.cursorPos.top+"px",
          left: this.props.cursorPos.left+"px",
      }}></Ink>:""
    )
  }
}

export default Ripple
