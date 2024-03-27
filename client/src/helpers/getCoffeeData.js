import axios from 'axios';

function getCoffeeData(coffeeId) {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/coffee/${coffeeId}`, { withCredentials: true })
    .then((res) => {
      return res.data;
    });
}

export default getCoffeeData;
