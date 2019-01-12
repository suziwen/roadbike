import React from "react"
import styled, { keyframes } from "react-emotion"

const rippleScale = keyframes({
  to: {
    opacity: 0,
    transform: `scale(2.5)`,
  }
})

const Ink = styled.div`
  position: absolute;
  display: block;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  transform: scale(0);
  width: 10vw;
  height: 10vw;
  animation: ${rippleScale} .5s linear;
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
      props.rippled?<Ink innerRef={this.rippleRef} style={{
          top: this.props.top+"px",
          left: this.props.left+"px",
      }}></Ink>:""
    )
  }
}

export default Ripple
