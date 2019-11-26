// d3 imports
import {select} from "d3-selection";
import {axisTop} from "d3-axis";
import {timeFormatLocale} from "d3-time-format";
import {timeDay, timeMonth} from "d3-time";


// Constants
// Locale months and days names
// https://bl.ocks.org/mbostock/805115ebaa574e771db1875a6d828949
const locale = timeFormatLocale({
      "dateTime": "%A, %e %B %Y г. %X",
      "date": "%d.%m.%Y",
      "time": "%H:%M:%S",
      "periods": ["AM", "PM"],
      "days": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      "shortDays": ["D", "L", "M", "M", "J", "V", "S"],
      "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    });


export class Axis {
  constructor (frequency) {
    this._scale = undefined;
    this._selection = undefined;
    this._frequency = frequency;
    this._tickLength = undefined;
    this._dy = undefined;
  }

  // - - - CUSTOM PARAMETERS - - - //
  scale (_) {
    this._scale = _;
    return this;
  }

  selection (_) {
    this._selection = _;
    return this;
  }

  tickLength (_) {
    this._tickLength = _;
    return this;
  }

  dy (_) {
    this._dy = _;
    return this;
  }

  // - - - PUBLIC FUNCTIONS - - - //
  draw() {
    let _g = this._selection.selectAll(`g.axis.${this._frequency}`).data([{}]);
    _g = _g.enter()
      .append('g')
      .attr('class', `axis ${this._frequency}`)
      .attr('transform', `translate(0, ${this._dy})`)

    _g.call(this._axis());

  

    _g.selectAll('text')
      .attr('text-anchor', this._textAnchor())
      .attr('dx', this._dx())
  }

  // - - - PRIVATE FUNCTIONS - - - //
  _axis () {
    return axisTop(this._scale)
      .tickSize(this._tickLength)
      .ticks(this._ticks())
      .tickFormat(this._format())
  }

  _ticks () {
    return this._frequency == 'daily' ? timeDay.every(1) : timeMonth.every(1);
  }

  _format () {
    return this._frequency == 'daily' ? locale.format('%a%d') : locale.format('%B');
  }

  _dx () {
    switch (this._frequency) {
      case 'daily':
        return this._scale(timeDay.offset(this._scale.domain()[0], 1))  / 2;
        break;
      default:
        return 5;
    }
  }

  _textAnchor () {
    switch (this._frequency) {
      case 'daily':
        return 'middle';
        break;
      default:
        return 'start';
    }
  }
}