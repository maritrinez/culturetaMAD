import {timeParse, timeFormatLocale} from "d3-time-format"
import {timeDay} from "d3-time"

const margin = { top: 30, right: 10, bottom: 10, left: 30 },
      colors = {
        "ciencia": '#C00F49',
        "arquitectura": '#FB6DB3',
        "artes escénicas": '#073B99',
        "danza": '#369AC4',
        "circo": '#5867AE',
        "teatro": '#B0E0E6',
        "música": '#00CED1',
        "cine": '#86C2AA',
        "fotografía": '#9ACD32',
        "literatura": '#F48E3A',
        "interculturas": '#8B008B',
        "variado": '#FFD700' 
      },
      columnWidth = 50,
      rowHeight = 50;

// Locale months and days names
// https://bl.ocks.org/mbostock/805115ebaa574e771db1875a6d828949
const locale = timeFormatLocale({
      "dateTime": "%A, %e %B %Y г. %X",
      "date": "%d.%m.%Y",
      "time": "%H:%M:%S",
      "periods": ["AM", "PM"],
      "days": ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      "shortDays": ["L", "M", "M", "J", "V", "S", "D"],
      "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    });

const parseTime = timeParse('%Y-%m-%d'),
      axisFormat = locale.format('%a %d'),
      axisTicks = timeDay.every(1);



export {
  margin, 
  colors,
  columnWidth,
  parseTime,
  axisFormat,
  axisTicks
};