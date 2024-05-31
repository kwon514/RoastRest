import axios from 'axios';

function logoutUser() {
  localStorage.removeItem('skipLanding');
  return axios.post(`/user/logout`, {}, { withCredentials: true });
}

export default logoutUser;
