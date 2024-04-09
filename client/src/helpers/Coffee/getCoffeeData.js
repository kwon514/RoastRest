import axios from 'axios';

function getCoffeeData(coffeeId) {
  return axios.get(`/coffee/${coffeeId}`, { withCredentials: true }).then((res) => {
    return res.data;
  });
}

export default getCoffeeData;
