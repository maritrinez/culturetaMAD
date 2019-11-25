// Load a stylesheet
import '../styles/main.css'

// d3 imports
import {csv, json} from "d3-fetch";

// Classes imports
import { Calendar } from './calendar';
import { Hscroll } from './hscroll';

// Script imports
import { parseTime, scrollContainer, calendarContainer} from './config';




// LOAD DATA & BUILD VIZ
csv('../data/nexts.csv', (d, i) => {
  d.start_date = parseTime(d.start_date);
  d.end_date = parseTime(d.end_date);
  d.tickets = parseTime(d.tickets);
  d.edition = +d.edition;
  return d;
}).then((data) => {
  
  // - - - INIT CALENDAR
  const calendar = new Calendar();
  calendar
    .data(data)
    .container(calendarContainer)
    .build();


  // - - - SCROLL
  const hscroll = new Hscroll();
  hscroll
    .container(scrollContainer)
    .scales(calendar._scales())
    .init();


  // - - - RESIZE
  window.addEventListener('resize', () => calendar.build());

}).catch(function(error){
   throw (error);
});




// PRIVATE

