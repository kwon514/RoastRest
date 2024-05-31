const router = require('express').Router();
const {
  Signup,
  Login,
  Logout,
  getPersonalDetails,
  updatePersonalDetails,
  updatePassword,
  deleteAccount,
} = require('../Controllers/AuthController');

router.get('/', getPersonalDetails);
router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);
router.put('/details', updatePersonalDetails);
router.put('/password', updatePassword);
router.delete('/', deleteAccount);

module.exports = router;
