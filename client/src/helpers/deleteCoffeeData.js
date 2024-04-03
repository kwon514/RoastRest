import axios from 'axios';

function deleteCoffeeData(coffeeId) {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/coffee/${coffeeId}`, {
    withCredentials: true,
  });
}

export default deleteCoffeeData;
