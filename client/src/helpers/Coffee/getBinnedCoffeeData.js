import axios from 'axios';

function getBinnedCoffeeData() {
  return axios
    .get(`/coffee`, {
      withCredentials: true,
      params: {
        isBinned: true,
      },
    })
    .then((res) => {
      return res.data;
    });
}

export default getBinnedCoffeeData;
