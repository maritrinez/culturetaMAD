// d3 imports
import {select, selectAll} from "d3-selection";
import {timeFormat} from "d3-time-format";

// Classes imports
import { Render } from './renders';


// Constants
const formatMonth = timeFormat('%B');
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
      if (e.deltaY > 0 || e.deltaX > 0) c.scrollLeft += 15;
      else c.scrollLeft -= 15;

      // Update info & axis x position
      render._infoUpdate(c.scrollLeft);
      this._monthUpdate(c);
    });
  }


  // - - - PRIVATE FUNCTIONS - - - //
  _setToday(c) {
    const endX = this._scales.x(new Date()),
          that = this;

    const ticksPerRender = 12;
    requestAnimationFrame(function render() {
      for (let i = 0; i < ticksPerRender; i++) {
        if (c.scrollLeft < endX) {
          c.scrollLeft += i;
          that._monthUpdate(c);
        }
      }
      
      if (c.scrollLeft < endX) {
        requestAnimationFrame(render);
      }
    });
  }

  _monthUpdate(c) {
    const screenMonth = formatMonth(this._scales.x.invert(c.scrollLeft));

    selectAll('.axis.monthly').selectAll('text')
      .attr('dx', function(d) {
        return _isActive(d) ? _newX(this.parentNode, c.scrollLeft) : 5;
      });


    // Private
    function _isActive(d) {
      if (formatMonth(d) == screenMonth) return true;
      else return false;
    }

    function _newX(parent, scroll) {
      const regExp = /\(([^)]+)\,/,
            tx = +regExp.exec(parent.getAttribute('transform'))[1];
      return scroll - tx;
    }
  }
}
