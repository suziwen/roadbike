import React from "react"
import styled from "react-emotion"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import { vP } from "../components/gutters"


class PDFJs {
  init = (source, element) => {
    const iframe = document.createElement('iframe');

    iframe.src = `/pdfjs/web/viewer.html?file=${encodeURIComponent(source)}`;
    iframe.width = '100%';
    iframe.height = '100%';

    element.appendChild(iframe);
  }
}

export default class PDFViewer extends React.Component {
  constructor(props) {
    super(props);
    this.viewerRef = React.createRef();
    this.backend = new PDFJs();
  }

  componentDidMount() {
    let src = `/welcome.pdf`
    const hash = decodeURIComponent(window.location.hash || '')
    if (hash && /^#file=\/static/i.test(hash)){
      src = hash.substring(6)
    }
    const element = this.viewerRef.current;
    this.backend.init(src, element);
  }

  render() {
    return (
      <div ref={this.viewerRef} id='viewer' style={{ width: '100%', height: `calc(100vh - 3.5rem)` }}>
        <Helmet>
          <htmlAttributes
            css={{
              overflow: `hidden`
            }}
          />
          <meta
            name="Description"
            content="小书匠 pdf 阅读"
          />
        </Helmet>

      </div>
    )
  }
}
