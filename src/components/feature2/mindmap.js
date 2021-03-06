import React from "react"
import styled from "react-emotion"
import { graphql } from "gatsby"

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

import ReactEChartsCore from 'echarts-for-react/lib/core'
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core'
import { 
  SunburstChart,
  CustomChart
} from 'echarts/charts'
import {
  PolarComponent,
  TooltipComponent
}  from 'echarts/components'
import { SVGRenderer} from 'echarts/renderers'




import presets, { colors } from "../../utils/presets"

import mindmapData from './mindmap-data'



echarts.use(
  [TooltipComponent, PolarComponent, SunburstChart, CustomChart, SVGRenderer]
)

function renderitem(params, api){
    const myChart = this.echarts_react.getEchartsInstance();
    const myModel = myChart.getModel();
    const sunSeries = myModel.getSeriesByIndex(0);
    const viewRoot = sunSeries.getViewRoot();
    if (viewRoot.dataIndex !== 0) {
        return
    }
    //console.log(myChart)
    //console.log(api.value(1,0),api.value(1))
    const lwidth = params.coordSys.r * .3
    const x = params.coordSys.cx - lwidth/2
    const y = params.coordSys.cy - lwidth/2
    if (params.dataIndex/2) {
        return {
            type: 'path',
            morph: true,
            name: 'yin_path',
            shape: {
                x: x -lwidth/8,
                y: y,
                width: lwidth,
                height: lwidth,
                d: 'M365.2 151.42c-1.49 0-2.97 0.02-4.44 0.07-163.56 2.37-295.56 135.82-295.56 299.93-0.005 164.31 132.3 297.86 296.12 299.94-81.01-2.05-146.12-68.43-146.12-149.94 0-82.8 67.2-150 150-150s150-67.2 150-150-67.2-150-150-150zm0 100c27.6 0 50 22.4 50 50s-22.4 50-50 50-50-22.4-50-50 22.4-50 50-50z'
            },
            textContent: {style: {text: '付费'}},
            textConfig: {
                rotation: 3.14/4,
                position: ['25%', '45%']},
            style: api.style({
                fillxx: 'red'
            }, 1),
            emphasis: {
                style: api.styleEmphasis({
                    fill:  api.visual('color')
                })
            }
        }
    } else {
        return {
            type: 'path',
            name: 'yang_path',
            morph: true,
            shape: {
                x: x + lwidth/8,  

                y: y,
                width: lwidth,
                height: lwidth,
                d: 'm365.2 751.36c1.48 0 2.96-0.02 4.43-0.06 163.56-2.38 295.57-135.82 295.57-299.94 0-164.3-132.31-297.86-296.13-299.94 81.01 2.06 146.13 68.44 146.13 149.94 0 82.8-67.2 150-150 150s-150 67.2-150 150 67.2 150 150 150zm0-100c-27.6 0-50-22.4-50-50s22.4-50 50-50 50 22.4 50 50-22.4 50-50 50z'
            },
            textContent: {style: {text: '免费'}},
            textConfig: {
                rotation: 3.14/4,
                position: ['50%', '60%']
                
            },
            style: api.style(null ,1)
        }
    }
}



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
    let echarts_instance = this.echarts_react.getEchartsInstance();
    echarts_instance.clear();
    echarts_instance.setOption(this.getOption())
    echarts_instance.on('mouseover', {seriesName: 'yinyang', name: 'yin'}, function(){
      echarts_instance.dispatchAction({
        type: 'highlight',
        name: ['Raisin', 'Blueberry', 'Chamomile']
      })
      console.log('mouse in yin')
    })
    echarts_instance.on('mouseover', {seriesName: 'yinyang', name: 'yang'}, function(){
      console.log('mouse in yang')
    })
    echarts_instance.on('mouseout', {seriesName: 'yinyang', name: 'yin'}, function(){
      console.log('mouse out yin')
    })
    echarts_instance.on('mouseout', {seriesName: 'yinyang', name: 'yang'}, function(){
      console.log('mouse out yang')
    })
    window.addEventListener(`resize`, this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener(`resize`, this.handleResize)
  }

  getOption (){
    const self = this
    return {
        polar: {
            radius: [0, '100%']
        },
        angleAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: true
            },
            axisLine: {
                show: true
            }
        },
        radiusAxis: {
            type: 'category',
            axisLine: {
                show: true
            },
            axisLabel: {
                rotate: 45
            }
        },
        series: [{
            type: 'sunburst',
            data: mindmapData,
            radius: [0, '95%'],
            sort: null,

            emphasis: {
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
        }, {
          type: 'custom',
          name: 'yinyang',
          coordinateSystem: 'polar',
          renderItem: renderitem.bind(self),
          data: [{name: 'yin', value: 1},{name: 'yang', value: 2}]
        }]
    }
  }

  render() {
    return (
      <TransformWrapper wheel={{step: 200}} options={{limitToBounds: false}} defaultPositionX={1} defaultPositionY={1} positionX={1} positionY={1}>
        <TransformComponent>
          <ReactEChartsCore
            ref={(e) => { this.echarts_react = e }}
            echarts={echarts}
            option={{}}
            style = {{
              height: '100VH',
              width: '100VW'
            }}
            notMerge={true}
            lazyUpdate={true}
            theme={"light"}
          />
        </TransformComponent>
      </TransformWrapper>
    )
  }
}

export default Mindmap

