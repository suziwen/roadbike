import React, {useEffect} from "react";
import styled from "react-emotion"
import presets, { colors } from "../../utils/presets"
import tocbot from 'tocbot';

const StyledToc = styled.div`
  display: none;
  ${presets.Desktop}{
        position: fixed;
        overflow: auto;
        top: 0;
        height: 100VH;
        display: flex;
        max-width: 210px;
        z-index: 1;
        opacity: 0.3;
        transition: opacity 0.5s ease 0s;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        &:hover {
            opacity: 1;
        }
        .toc-list {
            list-style-type: none;
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
