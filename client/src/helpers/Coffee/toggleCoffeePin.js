import axios from 'axios';

function toggleCoffeePin(coffeeId, isPinned) {
  return axios.put(`/coffee/${coffeeId}`, { isPinned: !isPinned }, { withCredentials: true });
}

export default toggleCoffeePin;
