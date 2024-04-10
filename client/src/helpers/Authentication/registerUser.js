import axios from 'axios';
import { toTitleCase } from '..';

function registerUser(email, password, name) {
  return axios.post(
    `/user/signup`,
    { email, password, name: toTitleCase(name) },
    { withCredentials: true }
  );
}

export default registerUser;
