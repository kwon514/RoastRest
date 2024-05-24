import axios from 'axios';

function updatePersonalDetails(name, email) {
  return axios.put(`/user`, { name, email }, { withCredentials: true });
}

export default updatePersonalDetails;
