const router = require('express').Router();
const {
  Signup,
  Login,
  Logout,
  checkAuth,
  updateAccountDetails,
  updatePassword,
} = require('../Controllers/AuthController');

router.get('/', checkAuth);
router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);
router.put('/', updateAccountDetails);
router.put('/password', updatePassword);

module.exports = router;
