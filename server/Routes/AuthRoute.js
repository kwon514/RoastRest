const router = require('express').Router();
const {
  Signup,
  Login,
  Logout,
  checkAuth,
  updatePersonalDetails,
  updatePassword,
} = require('../Controllers/AuthController');

router.get('/', checkAuth);
router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);
router.put('/', updatePersonalDetails);
router.put('/password', updatePassword);

module.exports = router;
