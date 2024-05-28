import axios from 'axios';

function getUserData() {
  return axios.get(`/user`, { withCredentials: true });
}

export default getUserData;
