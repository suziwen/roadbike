import React, { useRef, useEffect, useState} from "react"
import styled, { keyframes } from "react-emotion"
import { withPrefix } from "gatsby"




// openmoji.org-master/public/js-code/emoji-cloud.js
function initEmojiCloud(targetEl) {
  const domResult = []
  //------------ META ------------
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  //------------ Emoji Cloud ------------
  const EMOJI_POSITIONS = getPositions(isMobile ? 1.1 : 1.4, 300);


  genEmojiCloud();

  function genEmojiCloud() {
    const shuffledList = shuffleArr(Array.from(Array(400).keys()).map((n)=>{ return { filename: `chip_${(n%11) + 1}.svg`}}));

    const isSmall = isMobile;
    const BOUNDARIES = {
      xMin: isSmall ? 0 : -5,
      xMax: isSmall ? 85 : 105,
      yMin: 0,
      yMax: isSmall ? 95 : 100,
    };

    // populate html with emojis
    for (var i = 0; i < EMOJI_POSITIONS.length; i++) {
      // break out of loop if array doesn't have new emojis anymore
      if (i >= shuffledList.length) break;

      var xPos = EMOJI_POSITIONS[i].x + 50;
      var yPos = EMOJI_POSITIONS[i].y + 50;

      // add emoji to html
      if (
        !(
          xPos >= BOUNDARIES.xMin &&
          xPos <= BOUNDARIES.xMax &&
          yPos >= BOUNDARIES.yMin &&
          yPos <= BOUNDARIES.yMax
        )
      ){
          let dom = ""
        dom += "<span class='emojiCloudWrapper' style='left: " + xPos + "%; top: " + yPos + "%;--emojiURL: url(" + toCodePointURL(shuffledList[i].filename) + ");'>"
          dom += "</span>"
          domResult.push(dom)
        }
    }
  }

  // get emoji positions based on the Vogel/Fermat spiral Equation
  function getPositions(a, n) {
    var positions = [];
    const GOLDEN_ANGLE = 137.508;

    for (var i = 1; i <= n; i++) {
      var theta = i * GOLDEN_ANGLE;

      // calculate x and y position
      var xPos = Math.sign(a) * Math.abs(a) * Math.pow(theta, 0.5) * Math.cos(theta);
      var yPos = Math.sign(a) * Math.abs(a) * Math.pow(theta, 0.5) * Math.sin(theta);

      // push coordinates into position array
      positions.push({
        x: xPos,
        y: yPos
      });
    }

    return positions;
  }

  //------------ General Functions ------------
  function shuffleArr(arr) {
    var ctr = arr.length,
      temp, index;

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arr[ctr];
      arr[ctr] = arr[index];
      arr[index] = temp;
    }
    return arr;
  }

  return domResult.join('\n')
}

function toCodePointURL(filename){
  return withPrefix('/') + 'imgs/technology/' + filename
}

const BitCloud = (props) => {
  const runStep = props.isRunStep
  const isInMainBtn = props.isInMainBtn || props.isRunStep
  const containerElRef = useRef()

  useEffect(()=>{
    if (containerElRef.current) {
      const domResultStr = initEmojiCloud();
      containerElRef.current.innerHTML = domResultStr;
    }
  }, [containerElRef])

  return (
    <div className={`emojiStep ${!!isInMainBtn?'starStep':''} ${!!runStep ? "runStep": ""}`} css={{
      "&:before": {
        content: `' '`,
        width: `100VW`,
        height: `100VH`,
        display: `block`,
        transform: `translateX(-50%)`,
        top: 0,
        left: `50%`,
        zIndex: 10,
        position: `absolute`,
        background: `radial-gradient(transparent, white)`,
        backgroundRepeat: `no-repeat`,
        backgroundSize: `300% 300%`,
        backgroundPosition: `center`,
        pointerEvents: `none`,
        transition: `all 1s`,
      },
      "&.initStep .emojiCloudWrapper": {
        opacity: 0,
      },
      "&.starStep .emojiCloudWrapper": {
        "&:before": {
          opacity: 0,
          background: `url(${toCodePointURL('computing.svg')})`,
        },
        "&:after": {
          opacity: 1,
        }
      },
      "&.runStep": {
        "&:before": {
          backgroundSize: `100% 100%`,
        },
      },
      "&.emojiStep .emojiCloudContainer:before": {
        backgroundSize: `100% 100%`,
      },
      "&.runStep .emojiCloudContainer": {
        "&:before": {
          backgroundSize: `0 0`,
        },
        "& .emojiCloudWrapper": {
          left: `50%!important`,
          top: `50%!important`,
          transitionDelay: `.5s`,
          "&:before": {
            //content: `"🌟"`,
            background: `url(${toCodePointURL('computing.svg')})`,
            opacity: 1,
          },
          "&:nth-child(3n+1):before": {
            //content: `"✨"`,
            fontSize: `.6em`,
          },
          "&:nth-child(4n+3):before": {
            fontSize: `.3em`,
          },
          "&:nth-child(7n+3):before": {
            fontSize: `1.3em`,
          },
          "&:after": {
            opacity: 0,
          },
        }
      },
      }}>
      <div className="emojiCloudContainer" css={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        fontSize: `3em`,
        zIndex: -1,
        pointerEvents: `none`,
        "&:before": {
          content: `' '`,
          width: `100VW`,
          height: `100VH`,
          display: `block`,
          position: `relative`,
          transform: `translateX(-50%)`,
          left: `50%`,
          background: `radial-gradient(white 10%, transparent)`,
          backgroundSize: `300% 300%`,
          backgroundPosition: `center`,
          backgroundRepeat: `no-repeat`,
          transition: `all 1s`,
          zIndex: 10,
        },
        "& .emojiCloudWrapper": {
          position: `absolute`,
          opacity: 1,
          transition: `all 2s`,
          "&:nth-child(2n+1)": {
            fontSize: `.8em`,
          },
          "&:nth-child(3n+2)": {
            fontSize: `.6em`,
          },
          "&:before": {
            //content: `attr(data-emoji)`,
            content: `' '`,
            opacity: 1,
            transition: `all 1s`,
            position: `absolute`,
            aspectRatio: `1 / 1`,
            width: `1em`,
            background: `var(--emojiURL)`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
          },
          "&:after": {
            //content: `"⭐️"`,
            content: `' '`,
            opacity: 0,
            transition: `all 1s`,
            position: `absolute`,
            aspectRatio: `1 / 1`,
            width: `1em`,
            background: `url(${toCodePointURL('computing.svg')})`,
            maskImage: `radial-gradient(black, transparent)`,
            //animation: `${binaryEffect} 1s ease infinite`,
            transform: `scale(2)`,
          }
        },
      }} ref={containerElRef}>
      </div>
    </div>
  )
}

export default BitCloud
