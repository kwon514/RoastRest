import axios from 'axios';

function updatePassword(currentPassword, newPassword) {
  return axios.put(`/user/password`, { currentPassword, newPassword }, { withCredentials: true });
}

export default updatePassword;
