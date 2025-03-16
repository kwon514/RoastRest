import axios from 'axios';

function binCoffeeData(coffeeId, data) {
  return axios.put(
    `/coffee/${coffeeId}`,
    { ...data, isBinned: true, modifiedLogReason: 'Log deleted' },
    { withCredentials: true }
  );
}

export default binCoffeeData;
