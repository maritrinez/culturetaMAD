import {select} from "d3-selection";

// const rects = (svg, data, xScale, yScale) => {
//   let s = select(selector).selectAll('svg')
//     .data([{}]);
//   s = s.enter()
//     .append('svg').merge(s)
//     .style('background-color', 'hotpink')
//     .attr('width', size.w + m.left + m.right)
//     .attr('height', size.h + m.top + m.bottom);
//   s.exit().remove();

//   let g = s.selectAll('g').data([{}]);
//   g = g.enter()
//     .append('g').merge(g)
//     .attr('transform', `translate(${m.left}, ${m.top})`);
//   g.exit().remove();
//   return g;
// }


// export {rects, texts};

// D3js & ES6 classes: http://elliotbentley.com/2017/08/09/a-better-way-to-structure-d3-code-es6-version.html 


// class Rects {
    
//   constructor(opts) {
//     this.data = opts.data;
//     this.container = opts.container;
//   }

//   draw() {
//     console.log(this.data)
//     return 'lines';
//   }

//   setData(newData) {
//     this.data = newData;

//     // full redraw needed
//     this.draw();
//   }

//   setContainer(container) {
//     this.container = container;

//     // full redraw needed
//     this.draw();
//   }
// }


export class Render {
  constructor () {
    this._selection = undefined;
    this._datum = undefined;
    this._xScale = undefined;
    this._yScale = undefined;
  }


  // Custom parameters
  data (_) {
    this._data = _;
    return this;
  }

  selection (_) {
    this._selection = _;
    return this;
  }

  xScale (_) {
    this._xScale = _;
    return this;
  }

  yScale (_) {
    this._yScale = _;
    return this;
  }

  // Functions
  _rects() {
    const _g = this._group(this._selection, 'rects');

    let _r = _g.selectAll('rect').data(this._data);
    _r = _r.enter()
      .append('rect').merge(_r)
      .attr('x', d => this._xScale(d.start_date))
      .attr('y', d => this._yScale(d.row))
      .attr('width', d => this._xScale(d.end_date) - this._xScale(d.start_date))
      .attr('height', this._yScale.bandwidth())
      .style('fill', 'lightsteelblue');
      
    _r.exit().remove();
  }

  _info() {
    const _g = this._group(this._selection, 'info');

    let _i = _g.selectAll('text').data(this._data);
    _i = _i.enter()
      .append('text').merge(_i)
      .attr('x', d => this._xScale(d.start_date))
      .attr('y', d => this._yScale(d.row) + this._yScale.bandwidth() / 3)
      .text(d => d.event);
      
    _i.exit().remove();
  }

  _tickets() {
    const _g = this._group(this._selection, 'tickets');

    // Lines
    let _l = _g.selectAll('line')
      .data(this._data.filter(d => d.tickets !== null));
    _l = _l.enter()
      .append('line').merge(_l)
      .attr('x1', d => this._xScale(d.tickets))
      .attr('x2', d => this._xScale(d.start_date))
      .attr('y1', d => this._yScale(d.row) + this._yScale.bandwidth() / 2)
      .attr('y2', d => this._yScale(d.row) + this._yScale.bandwidth() / 2)
      .style('stroke', 'navy');
      
    _l.exit().remove();

    // Circles
    let _t = _g.selectAll('circle')
      .data(this._data.filter(d => d.tickets !== null));
    _t = _t.enter()
      .append('circle').merge(_t)
      .attr('cx', d => this._xScale(d.tickets))
      .attr('cy', d => this._yScale(d.row) + this._yScale.bandwidth() / 2)
      .attr('r', 20)
      .style('fill', 'navy');
      
    _t.exit().remove();
  }

  draw() {
    this._rects();
    this._info();
    this._tickets();
  }

  // Helpers
  _group(selection, classed) {
    let _g = selection.selectAll(`g.${classed}`).data([{}]);
    _g = _g.enter()
      .append('g')
      .attr('class', classed);

    console.log(_g)
    return _g;
  }
}
