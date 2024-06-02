import { parseDateToISO } from '..';
import axios from 'axios';

function editCoffeeData(coffeeId, data) {
  if (data.roastDate) {
    data.roastDate = parseDateToISO(data.roastDate);
  }
  if (data.frozenStart) {
    data.frozenStart = parseDateToISO(data.frozenStart);
  }
  if (data.frozenEnd) {
    data.frozenEnd = parseDateToISO(data.frozenEnd);
  }
  return axios.put(
    `/coffee/${coffeeId}`,
    { ...data, lastModifiedDate: new Date() },
    { withCredentials: true }
  );
}

export default editCoffeeData;
