import axios from 'axios';

function toggleCoffeePin(coffeeId, isPinned) {
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/api/coffee/${coffeeId}`,
    { isPinned: !isPinned },
    { withCredentials: true }
  );
}

export default toggleCoffeePin;
