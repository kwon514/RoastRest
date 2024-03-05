const router = require('express').Router()
const RequireAuth = require('../Middlewares/RequireAuth')
const { getAllCoffee, addCoffee } = require('../Controllers/CoffeeController')

router.use(RequireAuth)

router.get('/getAllCoffee', getAllCoffee)
router.post('/addCoffee', addCoffee)

module.exports = router