import {csv, json} from "d3-fetch";
import {min, max, range, sort} from "d3-array";
import {scaleBand, scaleTime} from "d3-scale";
import {axisTop} from "d3-axis";
import {select} from "d3-selection";


import * as utils from './utils';
import * as c from './config';
import { Render } from './renders';



csv('../data/nexts.csv', (d, i) => {
  d.start_date = c.parseTime(d.start_date);
  d.end_date = c.parseTime(d.end_date);
  d.tickets = c.parseTime(d.tickets);
  d.edition = +d.edition;
  d.row = i % c.nrow
  return d;
}).then((data) => {
  
  // ---- data
  // date range.
  // TODO:: extend to domains: date & max parallel events
  // hacer esto de R, y guardar los datos en JSON
  const start = min(data, d => d.start_date),
        end = max(data, d => d.end_date);

  // // date sort by start date
  // data.sort((a, b) => a.start_date - b.start_date)


  // size: done
  const size = utils.size([start, end]);

  // scales:
  const xScale = scaleTime().domain([start, end]).range([0, size.w]),
        yScale = scaleBand().domain(range(c.nrow)).range([0, size.h]).padding(0.2);

  // axis
  const xAxis = axisTop(xScale)
    .tickSize(-size.h)
    .ticks(c.axisTicks)
    .tickFormat(c.axisFormat);

  
  // ---- render viz
  // enter svg
  const svg = utils.enterSvg(size);

  // enter x axis
  svg.append('g').call(xAxis);

  // enter rectangles
  // TODO:: hacer una clase que le pases el data como método
  // inspiración estilos
  // https://www.behance.net/gallery/22277857/-Identidad-Institucional-PLANETARIO
  // https://www.behance.net/gallery/26487879/Sao-Paulo-City-Rebrand-Propose
  // https://www.behance.net/gallery/6910163/IDENTITY-Coleccion-Fortabat
  
  const render = new Render();
  render
    .selection(svg)
    .data(data)
    .xScale(xScale)
    .yScale(yScale)
    .draw();

  console.log(Render)


}).catch(function(error){
   throw (error);
});


