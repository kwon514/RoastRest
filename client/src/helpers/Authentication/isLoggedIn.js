function isLoggedIn() {
  return localStorage.getItem('name') ? true : false;
}

export default isLoggedIn;
