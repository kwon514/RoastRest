const router = require('express').Router();
const { Signup, Login, Logout, checkAuth } = require('../Controllers/AuthController');

router.get('/', checkAuth);
router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);

module.exports = router;
