import axios from 'axios';

function deleteAccount() {
  return axios.delete(`/user`, { withCredentials: true });
}

export default deleteAccount;
