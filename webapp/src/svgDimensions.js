// import * as d3 from 'd3';
import {select} from "d3-selection"

const svgDimensions = (selector) => {
  const parentDiv = select(selector).node(),
        w = parentDiv.clientWidth,
        h = Math.max(parentDiv.clientHeight, 400);

  const svg = select(selector).selectAll('svg')
    .data([{}])
    .enter()
    .append('svg');

  svg
    .style('background-color', 'hotpink')
    .attr('width', w)
    .attr('height', h);

  console.log(svg)
  console.log(w, h)
}

export default svgDimensions;