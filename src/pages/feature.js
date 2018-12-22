import React from "react"
import styled from "react-emotion"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import * as d3 from 'd3'
import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import { vP } from "../components/gutters"
import Container from "../components/container"
import { PriceIcon} from "../assets/mobile-nav-icons"
import {MdArrowForward} from "react-icons/md"
import HomepageSection from "../components/homepage/homepage-section"
import Button from "../components/button"
import FeatureHexagon from "../components/feature/feature-hexagon"

const SvgContainerStyled = styled(`div`)`
  background: ${colors.gatsby};
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  & .link--active {
    stroke-width: 3.5px;
  }
  & .label--active {
    font-weight: bolder;
    font-size: 20pt!important;
  }
  & .glow{
    text-shadow:
    -1px -1px 3px ${colors.lilac},
    -1px  1px 3px ${colors.lilac},
    1px -1px 3px ${colors.lilac},
    1px  1px 3px ${colors.lilac};
  }
  & text{
    alignment-baseline: central;
    fill: white;
  }
  & path{
    fill: none;
  } 
`

let layoutType = 'cluster'

class IndexRoute extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.d3Ref = React.createRef()
  }
  componentDidMount() {
    const target = this.d3Ref.current
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
            var vRoot = d3.hierarchy(vData);
            var vNodes = vRoot.descendants();
            var vLinks = vLayout(vRoot).links();


            function mouseovered(active) {
              return function(d) {
                //d3.select(this).classed("label--active", active);
                if (d.target){
                  d = d.target
                }
                do {
                  d3.select(d.linkNode).classed("link--active", active).each(moveLinkToFront);
                  d3.select(d.textNode).classed("label--active", active).each(moveLabelToFront);
                } while (d = d.parent);
              };
            }

            function moveLabelToFront(){
              const groupNode = this.parentNode
              groupNode.parentNode.appendChild(groupNode);
            }

            function moveLinkToFront() {
              this.parentNode.appendChild(this);
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
                .on("mouseover", mouseovered(true))
                .on("mouseout", mouseovered(false));

            var node = g.selectAll(".node").data(vNodes).enter().append('g')
                .attr('transform', function(d) { return "translate(" + d3.pointRadial(d.x, d.y) + ")"; });

            node.append("text")
                .text(function (d){ return d.data.data.id; })
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
                .on("mouseover", mouseovered(true))
                .on("mouseout", mouseovered(false));


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
    svg.on(".zoom", null)
  }

  render() {
    return (
      <SvgContainerStyled css={{ position: `relative` }}>
        <Helmet htmlAttributes={{style: 'overflow:hidden;'}}>
          <meta
            name="Description"
            content="小书匠主要功能"
          />
        </Helmet>
        <svg ref={this.d3Ref} width='100vw' height='100vh'>
          <g class="zoom_group">
            <g class="rotate_group">
            </g>
          </g>
        </svg>
        <FeatureHexagon>
        </FeatureHexagon>
      </SvgContainerStyled>
    )
  }
}

export default IndexRoute


