import axios from 'axios';

function getAllCoffeeData() {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/coffee`, { withCredentials: true })
    .then((res) => {
      return res.data;
    });
}

export default getAllCoffeeData;
