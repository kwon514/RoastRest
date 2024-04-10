import axios from 'axios';

function loginUser(email, password) {
  return axios.post(`/user/login`, { email, password }, { withCredentials: true });
}

export default loginUser;
