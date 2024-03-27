import axios from 'axios';

function isLoggedIn() {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/user`, { withCredentials: true })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
}

export default isLoggedIn;
