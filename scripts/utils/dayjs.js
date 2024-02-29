import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isSatSun from './isWeekend.js';

//15A
const today = dayjs();
console.log(today.format('MMMM D'));

//15B
const oneMonthLater = today.add(1, 'months');
console.log(oneMonthLater.format('MMMM D'));

//15C
const oneMonthBefore = today.subtract(1, 'months');
console.log(oneMonthBefore.format('MMMM D'));

//15D
let randomDay = today.add(4, 'days');
console.log(randomDay.format('dddd'));

//15E-G
randomDay = today.add(Math.floor(Math.random() * 20), 'days');
console.log(randomDay.format('dddd'));
console.log(isSatSun(randomDay));

