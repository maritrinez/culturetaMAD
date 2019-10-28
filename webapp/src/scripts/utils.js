// import * as d3 from 'd3';
import {select} from "d3-selection";
import {scaleBand } from "d3-scale";
import {timeDay} from "d3-time"
import * as c from './config';

const selector = c.containerId,
      m = c.margin;
  console.log(c)

const size = (dateRange) => {
  const days = timeDay.count(dateRange[0], dateRange[1]);

  const parentDiv = select(selector).node(),
        // w = parentDiv.clientWidth - m.left - m.right,
        w = days * c.columnWidth,
        h = Math.max(parentDiv.clientHeight, 600) - m.top - m.bottom;
  return {w, h}
}

const enterSvg = (size) => {
  let s = select(selector).selectAll('svg')
    .data([{}]);
  s = s.enter()
    .append('svg').merge(s)
    .style('background-color', 'hotpink')
    .attr('width', size.w + m.left + m.right)
    .attr('height', size.h + m.top + m.bottom);
  s.exit().remove();

  let g = s.selectAll('g').data([{}]);
  g = g.enter()
    .append('g').merge(g)
    .attr('transform', `translate(${m.left}, ${m.top})`);
  g.exit().remove();
  return g;
}


export {size, enterSvg};