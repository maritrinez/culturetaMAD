// d3 imports
import {select} from "d3-selection";



// Render class
export class Hscroll {
  constructor () {
    this._container = undefined;
    this._scale = undefined;
    this.step = 30;
  }


  // - - - CUSTOM PARAMETERS - - - //
  container (_) {
    this._container = _;
    return this;
  }

  scale (_) {
    this._scale = _;
    return this;
  }


  // - - - PUBLIC FUNCTIONS - - - //

  init() {
    const c = select(this._container).node();
    this._setToday(c);

    window.addEventListener('wheel', function(e) {
      if (e.deltaY > 0) c.scrollLeft += 30;
      else c.scrollLeft -= 30;
    });
  }

  // - - - PRIVATE FUNCTIONS - - - //
  _setToday(c) {
    const endX = this._scale(new Date()) - 30;

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
