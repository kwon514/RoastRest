import { getCookie } from 'helpers';

function isLoggedIn() {
  return getCookie('name') !== null;
}

export default isLoggedIn;
