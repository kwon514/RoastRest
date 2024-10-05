import axios from 'axios';

function unbinCoffeeData(coffeeId, data) {
  return axios.put(`/coffee/${coffeeId}`, { ...data, isBinned: false }, { withCredentials: true });
}

export default unbinCoffeeData;
