import axios from 'axios';

function logoutUser() {
  localStorage.removeItem('name');
  return axios.post(`/user/logout`, {}, { withCredentials: true });
}

export default logoutUser;
