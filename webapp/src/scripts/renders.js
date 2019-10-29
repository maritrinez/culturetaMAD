// d3 imports
import {select} from "d3-selection";

// Script imports
import { colors, margin } from './config';


// Render class
export class Render {
  constructor () {
    this._container = undefined;
    this._datum = undefined;
    this._size = undefined;
    this._scales = undefined;
    this._axis = undefined;
  }


  // - - - CUSTOM PARAMETERS - - - //
  data (_) {
    this._data = _;
    return this;
  }

  container (_) {
    this._container = _;
    return this;
  }

  size (_) {
    this._size = _;
    return this;
  }

  scales (_) {
    this._scales = _;
    return this;
  }

  axis (_) {
    this._axis = _;
    return this;
  }
  
  // - - - PUBLIC FUNCTIONS - - - //
  draw() {
    this._enterSvg();
    this._enterAxis();

    this._rects();
    this._info();
    this._tickets();
  }
  

  // - - - PRIVATE FUNCTIONS - - - //
  _enterSvg() {
    let s = select(this._container).selectAll('svg').data([{}]);
    s = s.enter()
      .append('svg').merge(s)
      .style('background-color', 'lightsteelblue')
      .attr('width', this._size.w + margin.left + margin.right)
      .attr('height', this._size.h + margin.top + margin.bottom);
    s.exit().remove();

    let g = s.selectAll('g').data([{}]);
    g = g.enter()
      .append('g').merge(g)
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    g.exit().remove();
    return g;
    

  }

  _enterAxis() {
    this._enterGroup(this._svg(), 'x axis')
      .call(this._axis);
  }

  _rects() {
    const _g = this._enterGroup(this._svg(), 'rects');

    let _r = _g.selectAll('rect').data(this._data);
    _r = _r.enter()
      .append('rect').merge(_r)
      .attr('x', d => this._scales.x(d.start_date))
      .attr('y', d => this._scales.y(d.row))
      .attr('width', d => this._scales.x(d.end_date) - this._scales.x(d.start_date))
      .attr('height', this._scales.y.bandwidth())
      .style('fill', d => colors[d.category]);
      
    _r.exit().remove();
  }

  _info() {
    const _g = this._enterGroup(this._svg(), 'info');

    let _i = _g.selectAll('text').data(this._data);
    _i = _i.enter()
      .append('text').merge(_i)
      .attr('x', d => this._scales.x(d.start_date))
      .attr('y', d => this._scales.y(d.row) + this._scales.y.bandwidth() / 3)
      .text(d => d.event);
      
    _i.exit().remove();
  }

  _tickets() {
    const _g = this._enterGroup(this._svg(), 'tickets');

    // Lines
    let _l = _g.selectAll('line')
      .data(this._data.filter(d => d.tickets !== null));
    _l = _l.enter()
      .append('line').merge(_l)
      .attr('x1', d => this._scales.x(d.tickets))
      .attr('x2', d => this._scales.x(d.start_date))
      .attr('y1', d => this._scales.y(d.row) + this._scales.y.bandwidth() / 2)
      .attr('y2', d => this._scales.y(d.row) + this._scales.y.bandwidth() / 2)
      .style('stroke', d => colors[d.category]);
      
    _l.exit().remove();

    // Circles
    let _t = _g.selectAll('circle')
      .data(this._data.filter(d => d.tickets !== null));
    _t = _t.enter()
      .append('circle').merge(_t)
      .attr('cx', d => this._scales.x(d.tickets))
      .attr('cy', d => this._scales.y(d.row) + this._scales.y.bandwidth() / 2)
      .attr('r', 20)
      .style('fill', d => colors[d.category]);
      
    _t.exit().remove();
  }

  // Helpers
  _svg () {
    return select(this._container).selectAll('svg').select('g');
  }

  _enterGroup(selection, classed) {
    let _g = selection.selectAll(`g.${classed}`).data([{}]);
    _g = _g.enter()
      .append('g')
      .attr('class', classed);
    return _g;
  }
}
