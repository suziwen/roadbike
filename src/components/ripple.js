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
  background: #12aa9c;
  border-radius: 50%;
  transform: scale(0);
  width: 10vw;
  height: 10vw;
  margin-top: -5vw;
  margin-left: -5vw;
  animation: ${rippleScale} .8s linear forwards;
  z-index: 1000;
`


var animationEndEvent = null; // use this to check for support and trigger fallback

// feature detect which vendor prefix is used
function getAnimationEventName () {
    var testEl = document.createElement('div'),
        transEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'MozAnimation': 'animationend',
            'OAnimation': 'oAnimationEnd oanimationend',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        };
    for (var i in transEndEventNames) {
        if (transEndEventNames.hasOwnProperty(i) && testEl.style[i] !== undefined) {
            return animationEndEvent = transEndEventNames[i];
        }
    }
};


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
      if (!animationEndEvent) {
        getAnimationEventName()
      }
      rippleNode.addEventListener(animationEndEvent, ()=> {
        onEnd()
      }, false)
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
