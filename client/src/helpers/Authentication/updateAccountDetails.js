import axios from 'axios';

function updateAccountDetails(name, email) {
  return axios.put(`/user`, { name, email }, { withCredentials: true });
}

export default updateAccountDetails;
