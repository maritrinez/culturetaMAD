// d3 imports
import {select} from "d3-selection";
import {min, max, range} from "d3-array";
import {scaleBand, scaleTime} from "d3-scale";
import {axisTop} from "d3-axis";
import {timeDay} from "d3-time";

// Classes imports
import { Render } from './renders';

// Script imports
import * as c from './config';


export class Calendar {
  constructor () {
    this._data = undefined;
    this._container = undefined;
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


  
  // - - - PUBLIC FUNCTIONS - - - //
  build() {  
    // inspiración estilos
    // https://www.behance.net/gallery/22277857/-Identidad-Institucional-PLANETARIO
    // https://www.behance.net/gallery/26487879/Sao-Paulo-City-Rebrand-Propose
    // https://www.behance.net/gallery/6910163/IDENTITY-Coleccion-Fortabat
    const render = new Render();
    render
      .container(this._container)
      .data(this._data)
      .size(this._size())
      .scales(this._scales())
      .draw();
  }


  // - - - PRIVATE FUNCTIONS - - - //
  _dataDomains() {
    return {
      date: [min(this._data, d => d.tickets), max(this._data, d => d.end_date)],
      rows: range(+max(this._data, d => d.row) + 1)
    }
  }
  
  _size () {
    const extent = this._dataDomains().date,
          days = timeDay.count(extent[0], extent[1]);

    const parentDiv = select(this._container).node();
    
    return {
      w: days * c.columnWidth,
      h: parentDiv.clientHeight - c.margin.top - c.margin.bottom
    }
  }

  _scales () {
    const d = this._dataDomains(),
          s = this._size();
    return {
      x: scaleTime().domain(d.date).range([0, s.w]),
      y: scaleBand().domain(d.rows).range([0, s.h]).padding(0.2)
    }
  }
}