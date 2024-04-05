import axios from 'axios';

function deleteCoffeeData(coffeeId) {
  return axios.delete(`/coffee/${coffeeId}`, {
    withCredentials: true,
  });
}

export default deleteCoffeeData;
