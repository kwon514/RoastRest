import { parseDateToISO } from '..';
import axios from 'axios';

function editCoffeeData(coffeeId, data) {
  data.roastDate = parseDateToISO(data.roastDate);
  data.frozenStart = parseDateToISO(data.frozenStart);
  data.frozenEnd = parseDateToISO(data.frozenEnd);
  return axios.put(
    `/coffee/${coffeeId}`,
    { ...data, lastModifiedDate: new Date() },
    { withCredentials: true }
  );
}

export default editCoffeeData;
