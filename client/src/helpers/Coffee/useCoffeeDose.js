import { editCoffeeData } from 'helpers';

function useCoffeeDose(coffeeId, coffeeWeight, coffeeDose) {
  let newWeight = Math.round((coffeeWeight - coffeeDose) * 10) / 10;

  if (newWeight < 0) {
    newWeight = 0;
  }

  return editCoffeeData(coffeeId, { coffeeWeight: newWeight });
}

export default useCoffeeDose;
