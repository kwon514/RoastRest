const router = require('express').Router()
const { Signup, Login, Logout } = require('../Controllers/AuthController')

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/logout', Logout)

module.exports = router