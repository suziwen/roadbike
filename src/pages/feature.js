import React, { useState, useEffect, useRef } from "react"
import styled, {keyframes} from "react-emotion"
import presets, { colors } from "../utils/presets"
import gsap from "gsap"
import { withPrefix } from "gatsby"

const spinEffect = keyframes({
  "to": {
    transform: `translate3d(0, 0, 5vmin) rotate(360deg)`,
  }
})


const MainStyled = styled('div')`
  transform-style: preserve-3d;
  perspective: 50vmin;
  width: 100%;
  margin: 3.5rem auto 0;
  pointer-events: initial;
  & .flippy-snap {
    --count: 0;
    width: 80%;
    margin: 0 auto;
    aspect-ratio: 1920/1049;
    display: grid;
    grid-template-columns: repeat(var(--grid-size, 10), 1fr);
    grid-template-rows: repeat(var(--grid-size, 10), 1fr);
    perspective: 50vmin;
    transform-style: preserve-3d;
    appearance: none;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    --rx: 0.1;
    --ry: 0.25;
    --r: 0.01;
    --x: calc(((var(--rx, 0) * var(--range-y, 0))) * 1deg);
    --y: calc(((var(--ry, 0) * var(--range-x, 0))) * 1deg);
    --ro: calc(((var(--r, 0) * var(--range-x, 0))) * 1deg);
    transform: translate3d(0, 0, -5vmin) rotateX(var(--x)) rotateY(var(--y)) rotate(var(--ro));
    &:after{
      content: '';
      height: 5%;
      width: 80%;
      position: absolute;
      background: hsl(var(--hue), 30%, 30%);
      filter: blur(14px);
      top: 110%;
      left: 50%;
      right: 0;
      transform: translate(-50%, 0) rotateX(90deg) translate(0, -50%);
    }
  }

  & .flippy-snap__loader {
    border-radius: 50%;
    border: 6px solid ${colors.ui.whisper};
    border-left-color: ${colors.ui.border};
    border-right-color: ${colors.ui.border};
    position: absolute;
    right: 20%;
    bottom: 20%;
    height: 8%;
    width: 8%;
    transform: translate3d(0, 0, 5vmin) rotate(0deg);
    animation: ${spinEffect} 1s infinite;
  }
  & .flippy-card {
    --hovered: 1;
    height: 100%;
    width: 100%;
    position: relative;
    transform: translate3d(0, 0, calc((1 - (var(--hovered, 1))) * 5vmin)) rotateX(calc(var(--count) * -180deg));
    transform-style: preserve-3d;
  }

  & .flippy-card__front,
  & .flippy-card__rear {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    background-image: var(--current-image);
    background-position: calc(var(--x, 0) * -100%) calc(var(--y, 0) * -100%);
    background-size: calc(var(--grid-size, 10) * 100%);
  }

  & .flippy-card__rear {
    background-image: var(--next-image);
    transform: rotateY(180deg) rotate(180deg);
  }
`

const useParallax = (callback, elementRef, proximityArg = 100) => {
  React.useEffect(() => {
    if (!elementRef.current || !callback) return
    const UPDATE = ({ x, y }) => {
      const bounds = 100
      const proximity = typeof proximityArg === 'function' ? proximityArg() : proximityArg
      const elementBounds = elementRef.current.getBoundingClientRect()
      const centerX = elementBounds.left + elementBounds.width / 2
      const centerY = elementBounds.top + elementBounds.height / 2
      const boundX = gsap.utils.mapRange(centerX - proximity, centerX + proximity, -bounds, bounds, x)
      const boundY = gsap.utils.mapRange(centerY - proximity, centerY + proximity, -bounds, bounds, y)
      callback(boundX / 100, boundY / 100)
    }
    elementRef.current.parentElement.addEventListener('pointermove', UPDATE)
    return () => {
      elementRef.current.parentElement.removeEventListener('pointermove', UPDATE)
    }
  }, [elementRef, callback])
}


const FlippySnap = ({ disabled, gridSize, onFlip, snaps, snapRef }) => {
  const CELL_COUNT = Math.pow(gridSize, 2)
  const count = useRef(0)
  const containerRef = snapRef || useRef(null)
  const flipping = useRef(false)
    const audioRef = useRef(
    new Audio(withPrefix('/') + 'feature2/page-flip.mp3')
  )
  audioRef.current.volume = 0.5

  const flip = e => {
    if (disabled || flipping.current) return
    const x = parseInt(e.target.parentNode.getAttribute('data-snap-x'), 10)
    const y = parseInt(e.target.parentNode.getAttribute('data-snap-y'), 10)
    count.current = count.current + 1
    gsap.to(containerRef.current.querySelectorAll('.flippy-card'), {
      '--count': count.current,
      delay: gsap.utils.distribute({
        from: [x / gridSize, y / gridSize],
        amount: gridSize / 20,
        base: 0,
        grid: [gridSize, gridSize],
        ease: 'power1.inOut',
      }),
      duration: 0.2,
      onStart: () => {
        flipping.current = true
        audioRef.current.play()
      },
      onComplete: () => {
        // At this point update the images
        flipping.current = false
        if (onFlip) onFlip(count)
      },
    })
  }
  
  const indicate = e => {
    const x = parseInt(e.currentTarget.getAttribute('data-snap-x'), 10)
    const y = parseInt(e.currentTarget.getAttribute('data-snap-y'), 10)
    gsap.to(containerRef.current.querySelectorAll('.flippy-card'), {
      '--hovered': gsap.utils.distribute({
        from: [x / gridSize, y / gridSize],
        base: 0,
        amount: 1,
        grid: [gridSize, gridSize],
        ease: 'power1.inOut'
      }),
      duration: 0.1,
    })
  }
  
  const reset = () => {
    snapRef.current.style.removeProperty('--range-x')
    snapRef.current.style.removeProperty('--range-y')
    gsap.to(containerRef.current.querySelectorAll('.flippy-card'), {
      '--hovered': 1,
      duration: 0.1,
    })
  }

  return (
    <button
      className="flippy-snap"
      ref={containerRef}
      onPointerLeave={reset}
      style={{
        '--grid-size': gridSize,
        '--count': count.current,
        '--current-image': `url('${snaps[0]}')`,
        '--next-image': `url('${snaps[1]}')`,
      }}
      onClick={flip}>
      {new Array(CELL_COUNT).fill().map((cell, index) => {
        const x = index % gridSize
        const y = Math.floor(index / gridSize)
        return (
          <span
            onPointerOver={indicate}
            className="flippy-card"
            data-snap-x={x}
            data-snap-y={y}
            style={{
              '--x': x,
              '--y': y,
            }}>
            <span className="flippy-card__front"></span>
            <span className="flippy-card__rear"></span>
          </span>
        )
      })}
      {disabled && <span className='flippy-snap__loader'></span>}
    </button>
  )
}


const App = () => {
  const [snaps, setSnaps] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [gridSize, setGridSize] = useState(9)
  const snapRef = useRef(null)

  useParallax((x, y) => {
    snapRef.current.style.setProperty('--range-x', Math.floor(gsap.utils.clamp(-60, 60, x * 100)))
    snapRef.current.style.setProperty('--range-y', Math.floor(gsap.utils.clamp(-60, 60, y * 100)))
  }, snapRef, () => window.innerWidth * 0.5)

  const grabPic = async (picIndex) => {
    picIndex = picIndex || Math.floor(Math.random()*13) + 1
    const pic = await fetch(withPrefix('/') + 'feature2/' + picIndex + '.png')
    //const pic = await fetch('https://source.unsplash.com/random/1000x1000')
    return pic.url
  }

  useEffect(() => {
    const setup = async () => {
      const url = await grabPic(10)
      // Dirty hack to make sure we get two images
      await new Promise(resolve => setTimeout(resolve, 1000))
      const nextUrl = await grabPic()
      setSnaps([url, nextUrl])
      setDisabled(false)
    }
    setup()
  }, [])

  const setNewImage = async count => {
    const newSnap = await grabPic()
    setSnaps(
      count.current % 2 !== 0 ? [newSnap, snaps[1]] : [snaps[0], newSnap]
    )
    setDisabled(false)
  }

  const onFlip = async count => {
    setDisabled(true)
    setNewImage(count)
  }

  if (snaps.length !== 2) return <h1 className="loader">加载中...</h1>
  return (
    <div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 100,
        }}>
        <MainStyled>
          <FlippySnap
            gridSize={gridSize}
            disabled={disabled}
            snaps={snaps}
            onFlip={onFlip}
            snapRef={snapRef}
          />
        </MainStyled>
      </div>
      <div style={{height: '150VH'}}></div>
    </div>
  )
}
export default App
