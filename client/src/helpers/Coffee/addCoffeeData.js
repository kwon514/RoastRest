import { parseDateToISO } from '..';
import axios from 'axios';

function addCoffeeData(data) {
  data.roastDate = parseDateToISO(data.roastDate);
  data.frozenStart = parseDateToISO(data.frozenStart);
  data.frozenEnd = parseDateToISO(data.frozenEnd);
  return axios.post(`/coffee`, { ...data, creationDate: new Date() }, { withCredentials: true });
}

export default addCoffeeData;
