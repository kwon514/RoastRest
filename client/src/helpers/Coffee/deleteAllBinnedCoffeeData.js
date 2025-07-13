import axios from 'axios';

function deleteAllBinnedCoffeeData() {
  return axios.delete(`coffee/binned`, { withCredentials: true });
}

export default deleteAllBinnedCoffeeData;
