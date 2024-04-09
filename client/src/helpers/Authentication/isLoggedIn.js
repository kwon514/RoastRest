import axios from 'axios';

function isLoggedIn() {
  return axios
    .get(`/user`, { withCredentials: true })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
}

export default isLoggedIn;
