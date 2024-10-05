import axios from 'axios';

function getAllCoffeeData() {
  return axios
    .get(`/coffee`, {
      withCredentials: true,
      params: {
        isBinned: false,
      },
    })
    .then((res) => {
      return res.data;
    });
}

export default getAllCoffeeData;
