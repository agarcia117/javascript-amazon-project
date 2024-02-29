import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isWeekend from '../scripts/utils/isWeekend.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]


export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });

  return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption){
  const today = dayjs();
  let currentAddedDays = 0;
  let currentDate = today;


  while (currentAddedDays < deliveryOption.deliveryDays){
    if (!isWeekend(currentDate)){
      currentAddedDays++;
    }
    currentDate = currentDate.add(1, 'days');
  }

  while (isWeekend(currentDate)){
    currentDate = currentDate.add(1, 'days');
  }

  const deliveryDate = currentDate;
  const dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}