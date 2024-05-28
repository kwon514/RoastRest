function toggleSkipLanding() {
  const skipLanding = localStorage.getItem('skipLanding');
  localStorage.setItem('skipLanding', !skipLanding);
}

export default toggleSkipLanding;
