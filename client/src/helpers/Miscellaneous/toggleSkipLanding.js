function toggleSkipLanding() {
  const skipLanding = JSON.parse(localStorage.getItem('skipLanding'));
  localStorage.setItem('skipLanding', !skipLanding);
  return !skipLanding;
}

export default toggleSkipLanding;
