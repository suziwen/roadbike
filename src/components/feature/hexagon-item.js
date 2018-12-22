import React from "react"
import styled from "react-emotion"
import { graphql, Link } from "gatsby"
import presets, { colors } from "../../utils/presets"

class FeatureHexagonItem extends React.Component {
  render(){
    return(
      <div className="hex">
        <div className="hexIn">
          <div className="hexLabel">
            <span className="header">This is a title</span>
          </div>
        </div>
      </div>)
  }
}

export default FeatureHexagonItem
