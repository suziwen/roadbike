import React, {useEffect} from "react";
import styled from "react-emotion"
import presets, { colors } from "../../utils/presets"
import { scale } from "../../utils/typography"
import tocbot from 'tocbot';

const StyledToc = styled.div`
  display: none;
  ${presets.Desktop}{
        position: fixed;
        overflow: auto;
        top: 0;
        font-size: ${scale(-2/5).fontSize};
        height: 100VH;
        display: flex;
        max-width: 400px;
        z-index: 1;
        opacity: 0.15;
        transition: opacity 0.5s ease 0s;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        overscroll-behavior: none;
        scrollbar-color: transparent transparent;
        &::-webkit-scrollbar-thumb {
          background: transparent;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: transparent;
        }
        &::-webkit-scrollbar-track {
          background: transparent;
        }
        &:hover {
            background: ${colors.ui.wisper};
            opacity: 1;

            scrollbar-color: ${colors.ui.border} ${colors.ui.light};
            &::-webkit-scrollbar-thumb {
              background: ${colors.ui.border};
            }
            &::-webkit-scrollbar-thumb:hover {
              background: ${colors.gatsbyDark};
            }
            &::-webkit-scrollbar-track {
              background: ${colors.ui.light};
            }
        }
        .toc-list {
            list-style-type: none;
            margin: 1rem;
        }
        .toc-list-item {
            margin: 5px 0;
        }
        .toc-link {
            font-weight: normal;
        }
        .is-active-link {
            color: ${colors.gatsby};
            font-weight: bold;
        }
    }
`
const tocbotInstance = {}
const Toc = ({onClick, location}) => {
  useEffect(()=>{
    let hasInstanceTocbot = false
    Object.keys(tocbotInstance).forEach((key)=>{
      if (tocbotInstance[key]) {
        hasInstanceTocbot = true
      }
      delete tocbotInstance[key]
    })
    if (hasInstanceTocbot) {
      tocbot.destroy()
    }

    tocbot.init({
      tocSelector: `.toc-content`,
      contentSelector: `.post-body`,
      headingSelector: `h1,h2,h3`,
      scrollSmooth: true,
      scrollSmoothDuration: 1,
      disableTocScrollSync: true,
      headingObjectCallback: function(obj, el){
        if (!obj.id && el) {
          const prevEl = el.previousElementSibling
          if (prevEl && prevEl.classList.contains('xsj_anchor')) {
            const anchorEl = prevEl.querySelector('.blank_anchor_id')
            if (anchorEl && anchorEl.id) {
              obj.id = anchorEl.id
              anchorEl.remove()
              el.id = obj.id
            }
          }
        }
        return obj
      },
    });
    tocbotInstance[location.pathname] = true

    return ()=>{
      if (tocbotInstance[location.pathname]) {
        tocbot.destroy()
        delete tocbotInstance[location.pathname]
      }
    }
  }, [location.pathname])
  return (<StyledToc className="toc-content">xx</StyledToc>)
}
export default Toc
