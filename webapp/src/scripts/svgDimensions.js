// import * as d3 from 'd3';
import {select} from "d3-selection"

// const svgDimensions = (selector) => {
//   const parentDiv = select(selector).node(),
//         w = parentDiv.clientWidth,
//         h = Math.max(parentDiv.clientHeight, 400);

//   const svg = select(selector).selectAll('svg')
//     .data([{}])
//     .enter()
//     .append('svg');

//   svg
//     .style('background-color', 'hotpink')
//     .attr('width', w)
//     .attr('height', h);

//   console.log(svg)
//   console.log(w, h)
// }

// export default svgDimensions;

const margin = { top: 10, right: 10, bottom: 10, left: 10 };

const size = (selector) => {
  const parentDiv = select(selector).node(),
        w = parentDiv.clientWidth - margin.left - margin.right,
        h = Math.max(parentDiv.clientHeight, 400) - margin.top - margin.bottom;
  console.log(w)
  return {w, h}
}

// console.log(size('#calendar').w)
const enterSvg = (selector) => {
  let svg = select(selector).selectAll('svg')
    .data([{}]);
  svg = s.enter()
    .append('svg').merge(s)
    .style('background-color', 'hotpink')
    .attr('width', size.w + margin.left + margin.right)
    .attr('height', size.h + margin.top + margin.bottom);
  svg.exit().remove();

  let g = svg.selectAll('g').data([{}]);
  g = g.enter()
    .append('g').merge(g)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  g.exit().remove();
  return g;
}


export default size;