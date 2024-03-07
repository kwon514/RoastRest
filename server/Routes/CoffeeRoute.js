const router = require('express').Router()
const RequireAuth = require('../Middlewares/RequireAuth')
const { getAllCoffee, getCoffeeById, addCoffee } = require('../Controllers/CoffeeController')

router.use(RequireAuth)

router.get('/', getAllCoffee)
router.get('/:id', getCoffeeById)
router.post('/', addCoffee)

module.exports = router