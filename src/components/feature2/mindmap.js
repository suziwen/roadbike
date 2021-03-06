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
  TooltipComponent,
  GraphicComponent
}  from 'echarts/components'
import { SVGRenderer} from 'echarts/renderers'




import presets, { colors } from "../../utils/presets"

import xsjLogoDataUri from './mindmap-data'

//一般顺时针显示的顺序
//const jieqi = ["立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至", "小寒", "大寒"]
//太极八卦图显示的顺序
const jieqi = ["夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至", "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种"]

echarts.use(
  [TooltipComponent, GraphicComponent, PolarComponent, SunburstChart, CustomChart, SVGRenderer]
)

function list_to_tree(list) {
  var map = {}, node, roots = [], i, newList=[];
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    var _node = list[i];
    newList[i] = {
      name: _node.id,
      value: 1,
      label: {
        formatter: _node.title
      },
      children: [],
      data: _node
    }
  }
  
  for (i = 0; i < newList.length; i += 1) {
    var node = newList[i];
    if (node.data.parentId !== "") {
      // if you have dangling branches check that map[node.parentId] exists
      var parentNode = newList[map[node.data.parentId]];
      parentNode.children.push(node);
      while (parentNode) {
        parentNode.value++;
        parentNode = newList[map[parentNode.data.parentId]];
      }
    } else {
      roots.push(node);
    }
  }
  //从上到下，再次遍历，把 level 样式应用上去
  const levelR = [0, 10, 25, 55, 85]
  function applyLevelFn(node, level){
    node.depth = level
    if (node.children && node.children.length > 0 || level < 3) {
      node.children.forEach(function(cNode, index){
        applyLevelFn(cNode, level + 1)
      })
      node.r0 = levelR[level] + '%'
      node.r = levelR[level + 1] + '%'
    } else {
      //没有子节点了，这是叶子节点

      node.r0 = levelR[level] + '%'
      node.r = (levelR[level] + 2) + '%'
      node.label = {
        formatter: node.data.title,
        position: 'outside',
        padding: 3,
        silent: false
      }
      node.itemStyle = {
        borderRadius: 5,
        borderWidth: 2
      }
    }
  }
  applyLevelFn(roots[0], 0)
  return roots;
}


function renderitem(params, api){
    const myChart = this.echarts_react.getEchartsInstance();
    const myModel = myChart.getModel();
    const sunSeries = myModel.getSeriesByIndex(0);
    const viewRoot = sunSeries.getViewRoot();
    if (viewRoot.dataIndex !== 0) {
        return
    }
    const fillColor = myModel.getColorFromPalette(params.dataIndex + 3)
    //console.log(myChart)
    //console.log(api.value(1,0),api.value(1))
  //  乘以 .2 这个 就是taichi 的半径
    const lwidth = params.coordSys.r * .2
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
                fill: fillColor
            }, 1)
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
            style: api.style({
                fill: fillColor
            })
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
    const vipNodeIds = []
    const noVipNodeIds = []
    this.nodes.forEach(function(_node){
      if (_node.parentId){
        if(_node.vip){
          vipNodeIds.push(_node.id)
        } else {
          noVipNodeIds.push(_node.id)
        }
      }
    })
    this.vipNodeIds = vipNodeIds
    this.noVipNodeIds = noVipNodeIds
    this.mindmapData = list_to_tree(this.nodes)[0].children
    
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
    echarts_instance.on('mouseover', {seriesName: 'yinyang', name: 'yin'}, function(eInfo){
      if (eInfo.data && eInfo.data.name !== 'yin') {return}
      echarts_instance.dispatchAction({
        type: 'highlight',
        name: self.noVipNodeIds
      })
    })
    echarts_instance.on('mouseover', {seriesName: 'yinyang', name: 'yang'}, function(eInfo){
      if (eInfo.data && eInfo.data.name !== 'yang') {return}
      echarts_instance.dispatchAction({
        type: 'highlight',
        name: self.vipNodeIds
      })
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
        graphic: [{
          type: 'image',
          left: 'center',
          top: 'center',
          zlevel: 1,
          onclick: function(){
            window.document.location.href = '/'
          },
          style: {
            image: xsjLogoDataUri,
            width: 40,
            height: 40
          }
        }],
        polar: {
            radius: [0, '90%']
        },
        angleAxis: {
          type: 'category',
          data: jieqi,
          boundaryGap: false,
          splitLine: {
              show: true,
              lineStyle: {
                  color: '#ddd',
                  type: 'dashed'
              }
          },
          axisLine: {
            symbol: 'arrow',
              show: true
          }
        },
        radiusAxis: {
            type: 'category',
            axisLine: {
                show: false
            },
            axisLabel: {
                rotate: 45
            }
        },
        series: [{
            type: 'sunburst',
            data: self.mindmapData,
            itemStyle: {
              borderRadius: 7,
            },
            radius: [0, '95%'],
            sort: null,

            emphasis: {
            },
            levels: [{}, {
                itemStyle: {
                    borderRadius: 0,
                    borderWidth: 2
                },
                label: {
                    rotate: 'tangential'
                }
            }, {
                label: {
                    align: 'right'
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
      <TransformWrapper wheel={{step: 200}} options={{
        limitToBounds: false,
        minScale: .8
        }} defaultPositionX={1} defaultPositionY={1} positionX={1} positionY={1}>
        <TransformComponent>
          <ReactEChartsCore
            ref={(e) => { this.echarts_react = e }}
            echarts={echarts}
            option={{}}
            style = {{
              height: '100vH',
              width: '100vW',
              minHeight: '1200px',
              minHeight: '1200px'

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

