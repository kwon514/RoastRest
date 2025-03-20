import axios from 'axios';

function unbinCoffeeData(coffeeId, data) {
  return axios.put(
    `/coffee/${coffeeId}`,
    { ...data, isBinned: false, modifiedLogReason: 'Log restored' },
    { withCredentials: true }
  );
}

export default unbinCoffeeData;
