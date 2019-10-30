import {timeParse, timeFormatLocale} from "d3-time-format";


const margin = { top: 60, right: 10, bottom: 10, left: 30 },
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
      columnWidth = 30,
      rowHeight = 50;

const parseTime = timeParse('%Y-%m-%d');



export {
  margin, 
  colors,
  columnWidth,
  parseTime
};