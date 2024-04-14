import axios from 'axios';
import { isFrozen } from '..';

function toggleCoffeeFrozen(coffeeId, frozenStart, frozenEnd) {
  const frozen = isFrozen(frozenStart, frozenEnd);
  const currentDate = new Date().setHours(13, 0, 0, 0);

  if (frozen) {
    return axios.put(`/coffee/${coffeeId}`, { frozenEnd: currentDate }, { withCredentials: true });
  } else {
    return axios.put(
      `/coffee/${coffeeId}`,
      { frozenStart: currentDate },
      { withCredentials: true }
    );
  }
}

export default toggleCoffeeFrozen;
