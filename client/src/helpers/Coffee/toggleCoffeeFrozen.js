import axios from 'axios';

function toggleCoffeeFrozen(coffeeId, isFrozen) {
  const currentDate = new Date().setHours(13, 0, 0, 0);

  if (isFrozen) {
    return axios.put(
      `/coffee/${coffeeId}`,
      { frozenEnd: currentDate, isFrozen: false },
      { withCredentials: true }
    );
  } else {
    return axios.put(
      `/coffee/${coffeeId}`,
      { frozenStart: currentDate, isFrozen: true },
      { withCredentials: true }
    );
  }
}

export default toggleCoffeeFrozen;
