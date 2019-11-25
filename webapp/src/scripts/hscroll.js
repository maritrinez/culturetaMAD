// d3 imports
import {select, selectAll} from "d3-selection";

// Classes imports
import { Render } from './renders';



// Render class
export class Hscroll {
  constructor () {
    this._container = undefined;
    this._scales = undefined;
    this.step = 30;
  }


  // - - - CUSTOM PARAMETERS - - - //
  container (_) {
    this._container = _;
    return this;
  }

  scales (_) {
    this._scales = _;
    return this;
  }


  // - - - PUBLIC FUNCTIONS - - - //
  init() {
    const c = select(this._container).node(); 
    this._setToday(c);

    // Updaters for x positions
    const render = new Render();
    render.scales(this._scales);


    window.addEventListener('wheel', e => {
      if (e.deltaY > 0) c.scrollLeft += 30;
      else c.scrollLeft -= 30;

      // Update info & axis x position
      render._infoUpdate(c.scrollLeft)
    });
  }


  // - - - PRIVATE FUNCTIONS - - - //
  _setToday(c) {
    const endX = this._scales.x(new Date()) - 30;

    const ticksPerRender = 12;
    requestAnimationFrame(function render() {
      for (let i = 0; i < ticksPerRender; i++) {
        if (c.scrollLeft < endX) c.scrollLeft += i;
      }
      
      if (c.scrollLeft < endX) {
        requestAnimationFrame(render);
      }
    });
  }
}
