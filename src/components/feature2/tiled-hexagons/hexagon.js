import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { generateHexSVG } from './generateHexSVG'

const elevationStyleHover = (elevation) => {
  return {
    cursor: 'pointer',
    transform: `translateY(${elevation/2}px)`
  }
}

const elevationStyleActive = (elevation) => {
  return {
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    transform: `translateY(${elevation}px)`
  }
}

export default class Hexagon extends Component {
  constructor(props) {
    super(props)
    let { elevation, stroke, strokeWidth, styles: { normal, hover, active } } = this.props
    
    var thHexagonStyleBase = {
      userSelect: 'none',
      stroke,
      strokeWidth: `${strokeWidth}px`, 
      transition: 'all 0.2s ease',
    }

    this.thHexagonStyleNormal = Object.assign({}, thHexagonStyleBase, normal)
    this.thHexagonStyleHover = Object.assign({}, thHexagonStyleBase, elevation ? elevationStyleHover(elevation) : {}, hover)
    this.thHexagonStyleActive = Object.assign({}, thHexagonStyleBase, elevation ? elevationStyleActive(elevation) : {}, active)
    
    this.state = {
      thHexagonStyle: this.thHexagonStyleNormal
    }
  }

  render() {
    let { sideLength, borderRadius, elevation, shadow, img, icon, text, textStyle, href, target, onClick, fill } = this.props
    let { thHexagonStyle } = this.state

    let width = Math.sqrt(3) * sideLength
    let height = 2 * sideLength + elevation

    let fontSizeOffset = textStyle.fontSize ? 0.3 * parseInt(textStyle.fontSize) : 0
    const imgTag = img?(<image href={img} width={0.7 * width} height={0.7 * height} x={0.15 * width} y={0.12 * height} />): ''
    const HexagonIcon = icon
    const iconTag = HexagonIcon?(
      <foreignObject className={"foreign-object hex_icon"} style={{width: '100%', height: '100%', ...textStyle}}>
        <HexagonIcon style={{width: '50%', height: '50%', transform: 'translate(50%, 70%)'}}/>
      </foreignObject>
    ):''
    const textTag = text?(
        <text fill="#bbb" strokeWidth="0" style={textStyle}>
          <tspan x={width/2} y={height/2 + fontSizeOffset} textAnchor="middle">
            {text}
          </tspan>
        </text>
    ): ''

    
    const hexagon = (
      <React.Fragment>
        <path fill={fill} d={generateHexSVG(sideLength, borderRadius)} />
        {imgTag}
        {iconTag}
        {textTag}
      </React.Fragment>)

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height} >
        <svg y={elevation}><path fill={shadow} d={generateHexSVG(sideLength, borderRadius)} /></svg>
        <g
          style={thHexagonStyle}
          onMouseOver={() => this.setState({ thHexagonStyle: this.thHexagonStyleHover })}
          onMouseLeave={() => this.setState({ thHexagonStyle: this.thHexagonStyleNormal })}
          onMouseDown={() => this.setState({ thHexagonStyle: this.thHexagonStyleActive })}
          onMouseUp={() => this.setState({ thHexagonStyle: this.thHexagonStyleHover })}
          onClick={onClick}>
          {!href ? hexagon : <a href={href} target={target || '_blank'}>{hexagon}</a>}
        </g>
      </svg>
    )
  }
}

Hexagon.defaultProps = {
  sideLength: 100,
  borderRadius: 12,
  fill: 'white',
  stroke: '#bbb',
  strokeWidth: 0,
  elevation: 12,
  shadow: '#e2e2e2',
  img: '',
  text: '',
  textStyle: {},
  styles: {
    normal: {},
    hover: {},
    active: {}
  },
  href: null,
  target: null,
  onClick: () => {}
}

Hexagon.propTypes = {
  sideLength: PropTypes.number,
  borderRadius: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  elevation: PropTypes.number,
  shadow: PropTypes.string,
  img: PropTypes.string,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  styles: PropTypes.shape({
    normal: PropTypes.object,
    hover: PropTypes.object,
    active: PropTypes.object
  }),
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func
}
