import axios from 'axios';

function updatePersonalDetails(name, email) {
  return axios.put(`/user/details`, { name, email }, { withCredentials: true });
}

export default updatePersonalDetails;
