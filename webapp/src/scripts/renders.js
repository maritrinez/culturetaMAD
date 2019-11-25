// d3 imports
import {select, selectAll} from "d3-selection";

// Classes imports
import { Axis } from './axis';

// Script imports
import { colors, margin } from './config';


// Render class
export class Render {
  constructor () {
    this._container = undefined;
    this._datum = undefined;
    this._size = undefined;
    this._scales = undefined;
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
  
  // - - - PUBLIC FUNCTIONS - - - //
  draw() {
    // SVG
    this._enterSvg();

    // Axis
    this._axis(); 


    // Elements
    this._today(3);
    this._rects();
    this._info();
    this._tickets();
    this._today(1);
  }
  

  // - - - PRIVATE FUNCTIONS - - - //
  _enterSvg() {
    let s = select(this._container).selectAll('svg').data([{}]);
    s = s.enter()
      .append('svg').merge(s)
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

  _axis() {
    const mAxis = new Axis('monthly');
    mAxis
      .selection(this._svg())
      .scale(this._scales.x)
      .tickLength(- margin.top / 2)
      .dy(- margin.top / 2)
      .draw();

    const dAxis = new Axis('daily');
    dAxis
      .selection(this._svg())
      .scale(this._scales.x)
      .tickLength(-this._size.h)
      .dy(0)
      .draw();
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
    
    _g.selectAll('text')
      .data(this._data)
      .enter()
      .append('text')
      .attr('x', d => Math.max(this._scales.x(d.start_date), this._scales.x(new Date())))
      .attr('y', d => this._scales.y(d.row) + this._scales.y.bandwidth() / 3)
      .text(d => d.event);
  }

  _infoUpdate(scroll) {
    const screenDate = this._scales.x.invert(scroll);

    selectAll('.info').selectAll('text')
      .attr('x', d => _isActive(d) ? Math.max(this._scales.x(d.start_date), scroll) : this._scales.x(d.start_date))

    function _isActive(d) {
      if (d.end_date > screenDate & d.start_date < screenDate) return true;
      else return false;
    }
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


  _today(w) {
    // Lines
    let _l = this._svg().selectAll('.today')
      .data([new Date()]);
    _l = _l.enter()
      .append('line').merge(_l)
      .attr('x1', d => this._scales.x(d))
      .attr('x2', d => this._scales.x(d))
      .attr('y1', -margin.top)
      .attr('y2', this._size.h + margin.bottom)
      .style('stroke', 'deeppink')
      .style('stroke-width', w);
      
    _l.exit().remove();
  }
  
  // Helpers
  _svg () {
    return select(this._container).selectAll('svg').select('g');
  }

  _enterGroup(selection, classed) {
    let _g = selection.selectAll(`g.${classed}`).data([{}]);

    _g = _g.enter()
      .append('g').merge(_g)
      .attr('class', classed);
    return _g;
  }
}
