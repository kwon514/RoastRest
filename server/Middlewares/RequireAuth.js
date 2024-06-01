const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

const RequireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Authorization token required.' });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      res.status(401).json({ error: 'Unauthorized request.' });
    } else {
      const user = await User.findById(data.id);
      if (user) next();
      else res.status(401).json({ error: 'Unauthorized request.' });
    }
  });
};

module.exports = RequireAuth;
