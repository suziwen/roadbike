import React from "react"
import styled from "react-emotion"
import { graphql } from "gatsby"

import * as d3 from 'd3'

//let layoutType = 'cluster'
let layoutType = 'tree'

let vLinks = null
let vNodes = null
let vRoot = null
let zoom = null
let mindmapSvg = null

function textRotation(d) {
    var angle = d.x / Math.PI * 180 + 90;

    if (d.depth < 2) { return 0;}
    else if (angle <= 270) { return angle - 180;}
    else { return angle;}
}
const getNodeById = (id)=>{
  for (const vNode of vNodes) {
    if (vNode.data.id === id) {
      return vNode
    }
  }
  return null
}

function moveLabelToFront(){
  const groupNode = this.parentNode
  groupNode.parentNode.appendChild(groupNode);
}

function moveLinkToFront() {
  this.parentNode.appendChild(this);
}

function mouseovered(d) {
  d3.selectAll('.link--active').classed("link--active", false)
  d3.selectAll('.label--active').classed("label--active", false)
  if (!d) {return}
  if (d.target){
    d = d.target
  }
  if (d.depth == 0 ) {return}
  do {
    d3.select(d.linkNode).classed("link--active", true).each(moveLinkToFront);
    d3.select(d.textNode).classed("label--active", true).each(moveLabelToFront);
  } while ((d = d.parent) && d.depth);
  if (d) {
    d3.select(d.textNode).each(moveLabelToFront);
  }
}

function centerNode(d){
  //return mindmapSvg.transition().duration(750).call(zoom.translateTo, d.x, d.y)
  const vWidth = mindmapSvg.node().clientWidth
  const vHeight = mindmapSvg.node().clientHeight
  const rotateGroup = d3.select(".rotate_group")
  const t = d3.zoomTransform(mindmapSvg.node())
  const rotateValue = parseInt(rotateGroup.attr("data-rotate")) || 0
  const rotateAngle = rotateValue * 2 * Math.PI / 360
  // 要把 angle, raidus 转换成坐标
  const positions = d3.pointRadial(d.x + rotateAngle, d.y)
  let x = positions[0]
  let y = positions[1]
  // vWidth/2, vHeight /2 居中
  // vWidth / 4, vHeight /4 左上角
  x = -x  + (vWidth / 8) /t.k;
  y = -y  + (vHeight / 2) / t.k;
  // 注意 scale 和 translate 顺序，反了的话结果会出错
  mindmapSvg.transition().duration(750).call( zoom.transform, d3.zoomIdentity.scale(t.k).translate(x,y))
}

function clickSelected(d, force=false, scrollTo=false) {
  d3.selectAll('.link--selected').classed("link--selected", false)
  d3.selectAll('.label--selected').classed("label--selected", false)
  if (!d) {return}
  if (d.target){
    d = d.target
  }
  if (d.depth == 0 ) {return}
  const currentNode = d.textNode
  if (scrollTo) {
    centerNode(d)
  }
  if (!d3.select(currentNode).classed('label--selected') || force){
    do {
      d3.select(d.linkNode).classed("link--selected", true).each(moveLinkToFront);
      d3.select(d.textNode).classed("label--selected", true).each(moveLabelToFront);
    } while ((d = d.parent) && d.depth);
    if (d) {
      d3.select(d.textNode).each(moveLabelToFront);
    }
  }
}

class Mindmap extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.d3Ref = React.createRef()
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
    const vWidth = mindmapSvg.node().clientWidth
    const vHeight = mindmapSvg.node().clientHeight
    const rotateGroup = mindmapSvg.select(".rotate_group")
    rotateGroup
      .transition().duration(750)
      .attr("data-rotate", 0)
      .attr("transform", null)
    mindmapSvg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.scale(1).translate(vWidth / 2, vHeight / 2))
  }
  shouldComponentUpdate(nextProps, nextState){
    // 内部自己的变化不管
    if (this.state != nextState) {return false}
    if (nextProps.activeNode != this.state.activeNode){
      const activeKey = nextProps.activeNode
      const activeNode = getNodeById(activeKey)
      mouseovered(activeNode)
    }
    if (nextProps.selectedNode != this.state.selectedNode){
      const selectedKey = nextProps.selectedNode
      const selectedNode = getNodeById(selectedKey)
      clickSelected(selectedNode, true, true)
    }
    return false
  }
  componentDidMount() {
    const target = this.d3Ref.current
    const self = this
    const mapWidth = 1920
    const mapHeight = 1920
    const vFontSize = [6,10,18,22, 30, 36]
    const vColor = d3.scaleOrdinal().domain(["Oceania", "Africa", "Europe", "Latin America", "Asia"]).range(["#ff6698", "#ffb366", "#ffff66", "#98ff66", "#6698ff"])
    mindmapSvg = d3.select(target)
    const vWidth = mindmapSvg.node().clientWidth
    const vHeight = mindmapSvg.node().clientHeight
    const zoomGroup= mindmapSvg.select('g.zoom_group')
    const g = mindmapSvg.select('g.rotate_group')
    zoom = d3.zoom()
    mindmapSvg.call(zoom
          .scaleExtent([1 / 2, 4])
          .on("zoom", zoomed))
          .on("wheel", rotate)
    mindmapSvg.call(zoom.transform, d3.zoomIdentity.translate(vWidth / 2, vHeight / 2))
    function zoomed() {
      zoomGroup.attr("transform", d3.event.transform);
    }

    function rotate(e){
      const oldValue = parseInt(g.attr("data-rotate")) || 0
      // 除以 14 个像素单位
      const delta = -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1) / 14
      const newValue = (oldValue + delta) % 360
      g.attr("data-rotate", newValue)
      g.attr("transform", `rotate(${newValue})`)

      const x = d3
      console.log(d3)
      console.log(x.event.wheelDelta)
      console.log(e)
    }
    const vData = d3.stratify()(self.nodes)
    drawViz(vData)
    function drawViz(vData) {

            vData.each( function(d){
                switch (d.depth) {
                    case 1: d.data.leg = d.id; break;
                    case 2: d.data.leg = d.parent.id; break;
                    case 3: d.data.leg = d.parent.parent.id; break;
            }});


            // Declare d3 layout
            let vLayout = null
            if (layoutType === 'cluster') {
              vLayout = d3.cluster().size([2 * Math.PI, Math.min(mapWidth, mapHeight)/2 - 130]); // margin!
            } else {
              vLayout = d3.tree().size([2 * Math.PI, Math.min(mapWidth, mapHeight)/2 - 130]); // margin!
            }
            // Layout + Data
            //var vRoot = d3.hierarchy(vData);
            vRoot = d3.hierarchy(vData);
            vNodes = vRoot.descendants();
            vLinks = vLayout(vRoot).links();

            function _mouseovered(active){
              
              return function(d){
                if (d.target){
                  d = d.target
                }
                if (active) {
                  mouseovered(d, true)
                  //self.handleActiveNode(d.data.id)
                } else {
                  mouseovered(null, true)
                  //self.handleActiveNode()
                }
              }
            }
            function _clickSelected(d){
              if (d.target){
                d = d.target
              }
              let key = d.data.id
              if (d.data.data.showHexagon !== "1") {
                return
              }
              if (key === self.state.selectedNode) {
                key=null
                d = null
              }
              clickSelected(d)
              self.setState({
                selectedNode: key
              })
              self.handleSelectedNode(key)
            }
            function project(theta, r){
              theta -= Math.PI/2
              return [
                r * Math.cos(theta),
                r * Math.sin(theta),
              ]
            }

/**
 *
 *
 https://blockbuilder.org/curran/1dd7ab046a4ed32380b21e81a38447aa
          .attr("d", function(d) {
            if(d.parent === descendants[0]){
              return "M" + project(d.x, d.y)
                + " " + project(d.parent.x, d.parent.y);
            } else {
              return "M" + project(d.x, d.y)
                + "C" + project(d.x, (d.y + d.parent.y) / 2)
                + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
                + " " + project(d.parent.x, d.parent.y);
            }
          });
      ////orign
                .attr('d', d3.linkRadial()
                    .angle(function (d) { return d.x; })
                    .radius(function (d) { return d.y; }))
 */
            // Draw on screen
            g.selectAll('path').data(vLinks).enter().append('path')
                .each(function(d){d.target.linkNode = this})
                .attr("d", function(d) {
            if(d.source === vNodes[0]){
              return "M" + project(d.source.x, d.source.y)
                + " " + project(d.target.x, d.target.y);
            } else {
                return d3.linkRadial()
                    .angle(function (d) { 
                    return d.x; 
                    })
                    .radius(function (d) { 
                    return d.y; 
                    })(d)
            }
          })
                .attr("stroke", function(d){
                        //if(d.data.data.least_devd_country === "Yes") { return "blue";}
                        //else if (d.data.data.devd_region === "Yes") { return "green";}
                        return vColor(d.target.data.data.leg);
                })
                .on("click", _clickSelected)
                .on("mouseover", _mouseovered(true))
                .on("mouseout", _mouseovered(false))
                .style("opacity", 0)
      .transition()
      .duration(300)
      .delay(function(d,i) {
        return 24*i;
      })
      .style("opacity", 1)

            var node = g.selectAll(".node").data(vNodes).enter().append('g')
                .classed("xsj_root_group", function (d){ return d.depth === 0; })
                .attr('transform', function(d) { return "translate(" + d3.pointRadial(d.x, d.y) + ")"; });

            node.append("text")
                .html(function (d){ 
                  const data = d.data.data
                  let title = data.title
                  if (data.showHexagon){
                    title += `<tspan class="fa fa-heart">&#xF004;</tspan>` 
                  }
                  return title; 
                })
                .each(function(d){d.textNode = this})
                .style("font-size", function (d){ 
                  return vFontSize[d.height] + "pt"; 
                })
                .attr("class", function(d){
                  if (d.depth === 0 ) {
                    return "xsj_root_text"
                  }
                  return ""
                })
                .attr("transform", function(d) { return "rotate(" + textRotation(d) + ")" })
                .attr("text-anchor", function (d){
                    if(d.height === 0){ return (d.x > Math.PI) ? "end" : "start"; }
                    else { return "middle"; } })
                .attr("dx", function (d){
                    if(d.depth === 3){ return (d.x > Math.PI) ? "-2px" : "2px"; }
                    else { return "0px"; } })
                .style("fill", function(d){
                    //if(d.data.data.least_devd_country === "Yes") { return "blue";}
                    //else if (d.data.data.devd_region === "Yes") { return "green";}

                    return vColor(d.data.data.leg);
        })
                .classed("glow", function (d){ 
                  return d.height !== 0; 
                })
                .classed("linkable", function (d){ 
                  return d.data.data.showHexagon === "1"; 
                })
                .on("mouseover", _mouseovered(true))
                .on("mouseout", _mouseovered(false))
                .on("click", _clickSelected)
                    .style("opacity", 0)
    .transition()
      .duration(300)
      .delay(function(d,i) {
        return 24*i;
      })
      .style("opacity", 1)

            const symbol = d3.symbol().type(d3.symbolCircle)
            const rootGroup = g.select(".xsj_root_group")
            const rootBox = rootGroup.node().getBBox()
            const symbolSizePercent = Math.max(rootBox.width/2, rootBox.height/2)
            // symbol.size  = math.pi * r^2
            rootGroup.insert("path", ":first-child ")
              .attr("d", symbol.size(symbolSizePercent * symbolSizePercent * Math.PI))
              .style("fill", "#663399")
              .style("stroke-width", "5")
              .style("stroke", "rgb(255, 179, 102)")

        }


    window.addEventListener(`resize`, this.handleResize)
  }

  componentWillUnmount() {
    const target = this.d3Ref.current
    if (mindmapSvg) {
      mindmapSvg.selectAll('text').on('mouseover', null).on('mouseout', null).on('click',null)
      mindmapSvg.selectAll('path').on('mouseover', null).on('mouseout', null).on('click',null)
      mindmapSvg.on(".zoom", null)
    }
    window.removeEventListener(`resize`, this.handleResize)
    vLinks = null
    vNodes = null
    vRoot = null
    zoom = null
    mindmapSvg = null
  }

  render() {
    return (
      <svg className="mindmap_svg" ref={this.d3Ref} width='100vw' height='100vh'>
        <g className="zoom_group">
          <g className="rotate_group">
          </g>
        </g>
      </svg>
    )
  }
}

export default Mindmap
