import { parseDateToISO } from '..';
import axios from 'axios';

function addCoffeeData(data) {
  const currentDate = new Date();

  data.roastDate = parseDateToISO(data.roastDate);
  data.frozenStart = parseDateToISO(data.frozenStart);
  data.frozenEnd = parseDateToISO(data.frozenEnd);
  return axios.post(
    `/coffee`,
    { ...data, lastModifiedDate: currentDate, creationDate: currentDate },
    { withCredentials: true }
  );
}

export default addCoffeeData;
