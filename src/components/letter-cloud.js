import React, { useRef, useEffect, useState} from "react"
import styled, { keyframes } from "react-emotion"
import { withPrefix } from "gatsby"

let OPENMOJIJSON = null

// openmoji.org-master/public/js-code/emoji-cloud.js
function initEmojiCloud(targetEl) {
  const domResult = []
  //------------ META ------------
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  //------------ Emoji Cloud ------------
  const EMOJI_COUNT = 300;
  const EMOJI_POSITIONS = getPositions(isMobile ? 1.1 : 1.4, EMOJI_COUNT);

  var EMOJI_LIST = OPENMOJIJSON.filter(function (emoji) {
    return emoji.group != 9;
  });

  genEmojiCloud();

  function genEmojiCloud() {
    // randomize EMOJI_LIST
    const shuffledList = shuffleArr(EMOJI_LIST);

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
          dom += "<span class='emojiCloudWrapper' style='left: " + xPos + "%; top: " + yPos + "%'>"
          dom += shuffledList[i].emoji
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


//https://stackoverflow.com/questions/58479029/javascript-detect-if-native-emoji-is-supported
function getWidth(s) {
  var n = document.body.appendChild(document.createElement("span"));
  n.appendChild(document.createTextNode(s));
  var w = n.offsetWidth;
  n.parentNode.removeChild(n);
  return w;
}

var trinidad = String.fromCodePoint(0x1F1F9, 0x1F1F9);
var hammerpick = String.fromCodePoint(0x2692);

//https://stackoverflow.com/questions/45576748/how-can-i-detect-rendering-support-for-emoji-in-javascript
function supportsEmoji () {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.canvas.width = ctx.canvas.height = 1;
  ctx.fillText("😗", -4, 4);
  return ctx.getImageData(0, 0, 1, 1).data[3] > 0; // Not a transparent pixel
}

const LetterCloud = (props) => {
  const [isSupportEmoji, setIsSupportEmoji] = useState(false)
  const [emojiData, setEmojiData] = useState(null)
  const containerElRef = useRef()
  useEffect(() => {
    //const _isSupport = getWidth(trinidad) === getWidth(hammerpick)
    setIsSupportEmoji(supportsEmoji())
  }, [])
  useEffect(() => {
    if (!OPENMOJIJSON && isSupportEmoji) {
      OPENMOJIJSON = []
      fetch(withPrefix('/') + 'emoji.json').then((res)=> res.json()).then((emojiJson)=>{
        OPENMOJIJSON = emojiJson
        setEmojiData(emojiJson)
      }).catch((e)=>{
        console.error(e)
      })
    }
  }, [isSupportEmoji])
  useEffect(()=>{
    if (isSupportEmoji && emojiData && containerElRef.current) {
      const domResultStr = initEmojiCloud();
      containerElRef.current.innerHTML = domResultStr;
    }
  }, [isSupportEmoji,  emojiData, containerElRef])
  if (!isSupportEmoji || !emojiData) {
    return <></>
  }

  return (
    <div className={"initStep"} css={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      fontSize: `3em`,
      zIndex: -1,
      pointerEvents: `none`,
      "& .emojiCloudWrapper": {
        position: `absolute`,
        opacity: 1,
        transition: `all 2s`,
      },
      "&.initStep .emojiCloudWrapper": {
        opacity: 0,
      },
      "&.initPosition .emojiCloudWrapper": {
        left: `50%!important`,
        top: `50%!important`,
      }
    }} ref={containerElRef}>
      背景图片
    </div>
  )
}

export default LetterCloud
