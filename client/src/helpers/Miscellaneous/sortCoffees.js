import { calcRestDays } from 'helpers';

function sortCoffees(coffees, key, reverse = false) {
  let sortedData = [];
  if (key === 'restDays') {
    sortedData = [...coffees].sort((a, b) => {
      const aRestDays = calcRestDays(a.roastDate, a.frozenStart, a.frozenEnd);
      const bRestDays = calcRestDays(b.roastDate, b.frozenStart, b.frozenEnd);
      return aRestDays - bRestDays;
    });
  } else if (key === 'coffeeWeight') {
    sortedData = [...coffees].sort((a, b) => {
      return a[key] - b[key];
    });
  } else if (key === 'creationDate') {
    sortedData = [...coffees].sort((a, b) => {
      return new Date(b[key]) - new Date(a[key]);
    });
  } else {
    sortedData = [...coffees].sort((a, b) => {
      let nameA = a[key].toUpperCase();
      let nameB = b[key].toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
  if (reverse) {
    sortedData.reverse();
  }
  return sortedData;
}

export default sortCoffees;
