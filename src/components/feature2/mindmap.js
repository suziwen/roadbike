import React from "react"
import styled from "react-emotion"
import { graphql } from "gatsby"

import ReactEChartsCore from 'echarts-for-react/lib/core'
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core'
import { SunburstChart } from 'echarts/charts'
import {
  TooltipComponent,
  TitleComponent
}  from 'echarts/components'
import { CanvasRenderer} from 'echarts/renderers'




import presets, { colors } from "../../utils/presets"

import mindmapData from './mindmap-data'



echarts.use(
  [TitleComponent, TooltipComponent, SunburstChart, CanvasRenderer]
)



class Mindmap extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleActiveNode = this.props.handleActiveNode
    this.handleSelectedNode = this.props.handleSelectedNode
    this.handleResize = this.handleResize.bind(this)
    this.nodes = this.props.nodes
    this.state = {
      activeNode: this.props.activeNode,
      selectedNode: this.props.selectedNode
    }
  }

  handleResize(){
  }
  shouldComponentUpdate(nextProps, nextState){
    // 内部自己的变化不管
    if (this.state != nextState) {return false}
    if (nextProps.activeNode != this.state.activeNode){
      const activeKey = nextProps.activeNode
      const activeNode = getNodeById(activeKey)
      mouseovered(activeNode)
    }
    if (this.props.selectedNode != nextProps.selectedNode && nextProps.selectedNode != this.state.selectedNode){
      const selectedKey = nextProps.selectedNode
      const selectedNode = getNodeById(selectedKey)
      clickSelected(selectedNode, true, true)
    }
    return false
  }
  componentDidMount() {
    const self = this
    window.addEventListener(`resize`, this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener(`resize`, this.handleResize)
  }

  getOption (){
    return {
        title: {
            text: 'WORLD COFFEE RESEARCH SENSORY LEXICON',
            textStyle: {
                fontSize: 14,
                align: 'center'
            },
        },
        series: {
            type: 'sunburst',
            data: mindmapData,
            radius: [0, '95%'],
            sort: null,

            emphasis: {
                focus: 'ancestor'
            },

            levels: [{}, {
                r0: '15%',
                r: '35%',
                itemStyle: {
                    borderWidth: 2
                },
                label: {
                    rotate: 'tangential'
                }
            }, {
                r0: '35%',
                r: '70%',
                label: {
                    align: 'right'
                }
            }, {
                r0: '70%',
                r: '72%',
                label: {
                    position: 'outside',
                    padding: 3,
                    silent: false
                },
                itemStyle: {
                    borderWidth: 3
                }
            }]
        }
    }
  }

  render() {
    return <ReactEChartsCore
      echarts={echarts}
      option={this.getOption()}
      style = {{
        height: '100%'
      }}
      notMerge={true}
      lazyUpdate={true}
      theme={"light"}
    />
  }
}

export default Mindmap
