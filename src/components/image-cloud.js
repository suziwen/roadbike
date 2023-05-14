import React, { useRef, useEffect, useState} from "react"
import styled, { keyframes } from "react-emotion"
import { withPrefix } from "gatsby"

let OPENMOJIJSON = null

const initialiseStyleBackgroundIntersectionObserver = () => {
  const lazyBackgrounds = Array.from(document.querySelectorAll('.emojiCloudWrapper.hidden'));
  if (lazyBackgrounds.length === 0) {
    return;
  }
  let lazyBackgroundObserver;

  const loadBackgroundIfElementOnScreen = (entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('hidden')
      lazyBackgroundObserver.unobserve(entry.target);
    }
  };
  const observeElementVisibility = (lazyBackground) => {
    lazyBackgroundObserver.observe(lazyBackground);
  };

  const setBackground = (element) => {
    element.classList.remove('hidden')
  };

  if (typeof window.IntersectionObserver === 'function') {
    lazyBackgroundObserver = new IntersectionObserver((entries) => {
      entries.forEach(loadBackgroundIfElementOnScreen);
    });
    lazyBackgrounds.forEach(observeElementVisibility);
  } else {
    lazyBackgrounds.forEach(setBackground);
  }
};

// openmoji.org-master/public/js-code/emoji-cloud.js
function initEmojiCloud(targetEl) {
  const domResult = []
  //------------ META ------------
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  //------------ Emoji Cloud ------------
  const EMOJI_COUNT = 300;
  const EMOJI_POSITIONS = getPositions(isMobile ? 1.1 : 1.4, EMOJI_COUNT);

  var EMOJI_LIST = OPENMOJIJSON;

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
        dom += "<span class='emojiCloudWrapper hidden' style='left: " + xPos + "%; top: " + yPos + "%;--emoji-url: url(" + toCodePointURL(shuffledList[i].emoji) + ");' data-emoji='" + shuffledList[i].emoji + "'>"
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

function toCodePoint(unicodeSurrogates, sep) {
  var
    r = [],
    c = 0,
    p = 0,
    i = 0;
  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16));
      p = 0;
    } else if (0xD800 <= c && c <= 0xDBFF) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.join(sep || '-');
}

const UFE0Fg = /\uFE0F/g

// avoid using a string literal like '\u200D' here because minifiers expand it inline
const U200D = String.fromCharCode(0x200D)

function grabTheRightIcon(rawText) {
  // if variant is present as \uFE0F
  return toCodePoint(rawText.indexOf(U200D) < 0 ?
    rawText.replace(UFE0Fg, '') :
    rawText
  );
}

function toCodePointURL(unicodeSurrogates){
  return withPrefix('/') + 'imgs/twemoji/svg/' + grabTheRightIcon(unicodeSurrogates) + '.svg'
}

const ImageCloud = (props) => {
  const [emojiData, setEmojiData] = useState(null)
  const runStep = props.isRunStep
  const isInMainBtn = props.isInMainBtn || props.isRunStep
  const containerElRef = useRef()

  useEffect(() => {
    if (!OPENMOJIJSON) {
      OPENMOJIJSON = []
      setTimeout(()=>{
        fetch(withPrefix('/') + 'emojistr.json').then((res)=> res.json()).then((emojiJson)=>{
          emojiJson = emojiJson.split(',').map((emojiStr)=>{
            return {
              emoji: emojiStr
            }
          })
          OPENMOJIJSON = emojiJson
          setEmojiData(emojiJson)
        }).catch((e)=>{
          console.error(e)
        })
      }, 600)
    } else {
      setEmojiData(OPENMOJIJSON)
    }
  }, [])
  useEffect(()=>{
    if (emojiData && containerElRef.current) {
      const domResultStr = initEmojiCloud();
      containerElRef.current.innerHTML = domResultStr;
      setTimeout(()=> {
        initialiseStyleBackgroundIntersectionObserver()
      }, 600)
    }
  }, [emojiData, containerElRef])

  return (
    <div className={`${!!emojiData?'emojiStep':'initStep'} ${!!isInMainBtn?'starStep':''} ${!!runStep ? "runStep": ""}`} css={{
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
        background: `radial-gradient(transparent 50%, white)`,
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
          background: `url(${toCodePointURL('⭐️')})`,
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
            background: `url(${toCodePointURL('🌟')})`,
            opacity: 1,
          },
          "&:nth-child(3n+1):before": {
            //content: `"✨"`,
            background: `url(${toCodePointURL('✨')})`,
          },
          "&:nth-child(4n+3):before": {
            //content: `"⭐️"`,
            background: `url(${toCodePointURL('⭐️')})`,
          },
          "&:nth-child(7n+3):before": {
            //content: `"⭐️"`,
            fontSize: `1.3em`,
            background: `url(${toCodePointURL('💖')})`,
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
          background: `radial-gradient(white 30%, transparent)`,
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
          "&.hidden:before": {
            "--emoji-url": "none"
          },
          "&:before": {
            //content: `attr(data-emoji)`,
            content: `' '`,
            opacity: 1,
            transition: `all 1s`,
            position: `absolute`,
            aspectRatio: `1 / 1`,
            width: `1em`,
            background: `var(--emoji-url)`,
          },
          "&:after": {
            //content: `"⭐️"`,
            content: `' '`,
            opacity: 0,
            transition: `all 1s`,
            position: `absolute`,
            aspectRatio: `1 / 1`,
            width: `1em`,
            background: `url(${toCodePointURL('⭐️')})`,
          }
        },
      }} ref={containerElRef}>
      </div>
    </div>
  )
}

export default ImageCloud
