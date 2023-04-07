import React from "react"
import PropTypes from "prop-types"
import { withPrefix } from "gatsby"

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="stylesheet" type="text/css" href={withPrefix('/') + "libs/zoom/zoom.css"}/>
          <link rel="stylesheet" type="text/css" href={withPrefix('/') + "css/story-writer-markdown-default.css"}/>
          <link rel="stylesheet" type="text/css" href={withPrefix('/') + "css/story-writer-markdown-code-solarized-light.css"}/>
          <link rel="stylesheet" type="text/css" href={withPrefix('/') + "css/story-writer-markdown-components.css"}/>
          <link rel="stylesheet" type="text/css" href={withPrefix('/') + "fonts/Webfonts/xsj/stylesheet.css"}/>
          <link rel="stylesheet" type="text/css" href={withPrefix('/') + "xsjfonts/fontstyles/zh.css"}/>
          <link rel="stylesheet" type="text/css" href={withPrefix('/') + "css/font-awesome.min.css"}/>
          <link rel="stylesheet" type="text/css" href={withPrefix('/') + "css/svg-with-js.css"}/>
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script src={withPrefix('/') + "libs/zoom/zoom-vanilla.min.js"}></script>
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
