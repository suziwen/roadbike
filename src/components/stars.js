import React, { Component } from "react"


/*
  varriables
*/
const PI2 = 2 * Math.PI
// amount is relative to screen size, this is the divider
// for the result (hight * width)
const AMOUNT_DIVIDER = 2800
// the connect star field
const DIST_MAX = 100
const CONNECT_RADIUS = 100
// speed of rotating
const ROTATION = 0.0001

let canvas = null
let ctx = null
let bounds = null
let center = null
let connectArea = null
let dots = []
let isMount = false

class Dot {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height 
    this.radius = Math.random() * 1.2
  }

  update() {
    if (this.y > bounds.bottom) this.y = bounds.top
    else if (this.y < bounds.top) this.y = bounds.bottom

    // http://stackoverflow.com/a/15109215/3137109
    this.x = Math.cos(ROTATION) * (this.x - center.x) - Math.sin(ROTATION) * (this.y - center.y) + center.x
    this.y = Math.sin(ROTATION) * (this.x - center.x) + Math.cos(ROTATION) * (this.y - center.y) + center.y

  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = '#fff'
    if(Math.random() < 0.99) ctx.arc(this.x, this.y, this.radius, 0, PI2, false)
    ctx.fill()
  }

}

/*
  and lets start
*/
function resize() {
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  bounds.right = canvas.width - 1
  bounds.bottom = canvas.height - 1

  ctx.lineWidth = 0.4

  center = {
    x: Math.floor(canvas.width / 2),
    y: Math.floor(canvas.height / 2)
  }

  connectArea.destX = center.x
  connectArea.destY = center.y * 0.1

  dots.length = 0

  let amount = Math.floor(canvas.width * canvas.height / AMOUNT_DIVIDER)
  for (let i = 0; i < amount; i++) dots.push(new Dot())

}

/*
  funtctions
*/

function updateConnectArea() {
  let distX = connectArea.destX - connectArea.x
  if (distX > 5 || distX < 5) connectArea.x += Math.floor(distX / 20)
  let distY = connectArea.destY - connectArea.y
  if (distX > 5 || distX < 5) connectArea.y += Math.floor(distY / 20)
}

function connectDots() {
  for (let i = 0, dot1; dot1 = dots[i]; i++) {
    for (let j = i + 1, dot2; dot2 = dots[j]; j++) {

      let xDiff = dot1.x - dot2.x,
        yDiff = dot1.y - dot2.y
      let xCoreDiff = dot1.x - connectArea.x,
        yCoreDiff = dot1.y - connectArea.y

      if (xDiff < DIST_MAX && xDiff > -DIST_MAX &&
        yDiff < DIST_MAX && yDiff > -DIST_MAX &&
        xCoreDiff < CONNECT_RADIUS && xCoreDiff > -CONNECT_RADIUS &&
        yCoreDiff < CONNECT_RADIUS && yCoreDiff > -CONNECT_RADIUS) {

        ctx.beginPath()
        ctx.strokeStyle = 'hsla(0,100%,100%,0.2)'
        ctx.moveTo(dot1.x + 0.0, dot1.y + 0.0)
        ctx.lineTo(dot2.x + 0.0, dot2.y + 0.0)
        ctx.stroke()
        ctx.closePath()

      }
    }
  }
}

function animateDots() {
  if (isMount) {
    requestAnimationFrame(animateDots)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    updateConnectArea()

    for (let i = 0, dot; dot = dots[i]; i++) dot.update()
    connectDots()
    for (let i = 0, dot; dot = dots[i]; i++) dot.draw()
  }

}

class Stars extends Component{
  constructor(props, context) {
    super(props, context)
    this.canvasRef = React.createRef()
    this.handleResize = this.handleResize.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }
  componentDidMount(){
    canvas = this.canvasRef.current
    ctx = canvas.getContext('2d')
    ctx.lineWidth = 0.4
    bounds = {
      top: -10,
      left: -10,
      right: canvas.width + 10,
      bottom: canvas.height + 10
    }

    center = {
      x: Math.floor(canvas.width / 2),
      y: Math.floor(canvas.height / 2)
    }

    connectArea = {
      destX: 0,
      destY: 0,
      x: center.x,
      y: center.y
    }

    /*
    the dots
    */
    dots = []
    isMount = true
    resize()
    animateDots()
    document.body.addEventListener('mousemove', this.handleMouseMove)
    document.body.addEventListener('mouseleave', this.handleMouseLeave)
    window.addEventListener('resize', this.handleResize)
  }
  handleResize(){
    resize()
  }
  handleMouseLeave(e){
    connectArea.destX = center.x
    connectArea.destY = center.y
  }
  handleMouseMove(e){
    connectArea.destX = e.clientX || e.touches && e.touches[0].pageX
    connectArea.destY = e.clientY || e.touches && e.touches[0].pageY
  }
  componentWillUnmount() {
    isMount = false
    window.removeEventListener(`resize`, this.handleResize)
    document.body.removeEventListener(`mousemove`, this.handleMouseMove)
    document.body.removeEventListener(`mouseleave`, this.handleMouseLeave)
  }
  render(){
   return(<canvas ref={this.canvasRef} {...this.props}></canvas>)
  }
}

export default Stars
