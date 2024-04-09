import axios from 'axios';

function getAllCoffeeData() {
  return axios.get(`/coffee`, { withCredentials: true }).then((res) => {
    return res.data;
  });
}

export default getAllCoffeeData;
