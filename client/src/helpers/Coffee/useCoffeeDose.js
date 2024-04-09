import axios from 'axios';

function useCoffeeDose(coffeeId, coffeeWeight, coffeeDose) {
  let newWeight = Math.round((coffeeWeight - coffeeDose) * 10) / 10;

  if (newWeight === 0) {
    return;
  } else if (newWeight < 0) {
    newWeight = 0;
  }

  return axios.put(`/coffee/${coffeeId}`, { coffeeWeight: newWeight }, { withCredentials: true });
}

export default useCoffeeDose;
