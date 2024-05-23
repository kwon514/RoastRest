const router = require('express').Router();
const {
  Signup,
  Login,
  Logout,
  checkAuth,
  updateAccountDetails,
} = require('../Controllers/AuthController');

router.get('/', checkAuth);
router.put('/', updateAccountDetails);
router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);

module.exports = router;
