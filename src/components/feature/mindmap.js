import React from "react"
import styled from "react-emotion"
import { graphql } from "gatsby"

import * as d3 from 'd3'

//let layoutType = 'cluster'
let layoutType = 'tree'

let vLinks = null
let vNodes = null
let vRoot = null

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
  do {
    d3.select(d.linkNode).classed("link--active", true).each(moveLinkToFront);
    d3.select(d.textNode).classed("label--active", true).each(moveLabelToFront);
  } while (d = d.parent);
}

function clickSelected(d, force=false) {
  d3.selectAll('.link--selected').classed("link--selected", false)
  d3.selectAll('.label--selected').classed("label--selected", false)
  if (!d) {return}
  if (d.target){
    d = d.target
  }
  const currentNode = d.textNode
  if (!d3.select(currentNode).classed('label--selected') || force){
    do {
      d3.select(d.linkNode).classed("link--selected", true).each(moveLinkToFront);
      d3.select(d.textNode).classed("label--selected", true).each(moveLabelToFront);
    } while (d = d.parent);
  }
}

class Mindmap extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.d3Ref = React.createRef()
    this.handleActiveNode = this.props.handleActiveNode
    this.handleSelectedNode = this.props.handleSelectedNode
    this.state = {
      activeNode: this.props.activeNode,
      selectedNode: this.props.selectedNode
    }
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
      clickSelected(selectedNode, true)
    }
    return false
  }
  componentDidMount() {
    const target = this.d3Ref.current
    const self = this
    const vWidth = 1920
    const vHeight = 1920
    const vFontSize = [6,10,18,22]
    const vColor = d3.scaleOrdinal().domain(["Oceania", "Africa", "Europe", "Latin America", "Asia"]).range(["#ff6698", "#ffb366", "#ffff66", "#98ff66", "#6698ff"])
    const svg = d3.select(target)
    const zoomGroup= svg.select('g.zoom_group')
    const g = svg.select('g.rotate_group')
    const zoom = d3.zoom()
    svg.call(zoom
          .scaleExtent([1 / 2, 4])
          .on("zoom", zoomed))
          .on("wheel", rotate)
    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(vWidth / 2, vHeight / 2))
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
    d3.csv('/country-hierarchy.csv').then((vCsvData)=>{
      const vData = d3.stratify()(vCsvData)
      drawViz(vData)
    }).catch((err)=>{
      console.log(err)
    })
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
              vLayout = d3.cluster().size([2 * Math.PI, Math.min(vWidth, vHeight)/2 - 130]); // margin!
            } else {
              vLayout = d3.tree().size([2 * Math.PI, Math.min(vWidth, vHeight)/2 - 130]); // margin!
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
              clickSelected(d)
              self.setState({
                selectedNode: d.data.id
              })
              self.handleSelectedNode(d.data.id)
            }


            // Draw on screen
            g.selectAll('path').data(vLinks).enter().append('path')
                .each(function(d){d.target.linkNode = this})
                .attr('d', d3.linkRadial()
                    .angle(function (d) { return d.x; })
                    .radius(function (d) { return d.y; }))
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
                .attr('transform', function(d) { return "translate(" + d3.pointRadial(d.x, d.y) + ")"; });

            node.append("text")
                .text(function (d){ return d.data.data.title; })
                .each(function(d){d.textNode = this})
                .style("font-size", function (d){ return vFontSize[d.height] + "pt"; })
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
                .classed("glow", function (d){ return d.height !== 0; })
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


            function textRotation(d) {
                var angle = d.x / Math.PI * 180 + 90;

                if (d.depth < 2) { return 0;}
                else if (angle <= 270) { return angle - 180;}
                else { return angle;}
            }
        }


  }

  componentWillUnmount() {
    const target = this.d3Ref.current
    const svg = d3.select(target)
    svg.selectAll('text').on('mouseover', null).on('mouseout', null).on('click',null)
    svg.selectAll('path').on('mouseover', null).on('mouseout', null).on('click',null)
    svg.on(".zoom", null)
  }

  render() {
    return (
      <svg ref={this.d3Ref} width='100vw' height='100vh'>
        <g className="zoom_group">
          <g className="rotate_group">
          </g>
        </g>
      </svg>
    )
  }
}

export default Mindmap
