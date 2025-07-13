const router = require('express').Router();
const RequireAuth = require('../Middlewares/RequireAuth');
const {
  addCoffee,
  getCoffee,
  getCoffeeById,
  updateCoffeeById,
  deleteCoffeeById,
  deleteAllBinnedCoffee,
} = require('../Controllers/CoffeeController');

router.use(RequireAuth);

router.post('/', addCoffee);
router.get('/', getCoffee);
router.get('/:id', getCoffeeById);
router.put('/:id', updateCoffeeById);
router.delete('/binned', deleteAllBinnedCoffee);
router.delete('/:id', deleteCoffeeById);
module.exports = router;
