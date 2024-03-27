const router = require('express').Router();
const RequireAuth = require('../Middlewares/RequireAuth');
const {
  addCoffee,
  getAllCoffee,
  getCoffeeById,
  updateCoffeeById,
  deleteCoffeeById,
} = require('../Controllers/CoffeeController');

router.use(RequireAuth);

router.post('/', addCoffee);
router.get('/', getAllCoffee);
router.get('/:id', getCoffeeById);
router.put('/:id', updateCoffeeById);
router.delete('/:id', deleteCoffeeById);

module.exports = router;
