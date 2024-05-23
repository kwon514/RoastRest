const User = require('../Models/UserModel');
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, name, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'This email is already in use!' });
    }
    const user = await User.create({ email, password, name, createdAt });
    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      domain: process.env.DOMAIN,
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6),
    });
    res.status(201).json({ name: user.name, message: 'Logged in successfully!', success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: 'All fields are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Incorrect password or email.' });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: 'Incorrect password or email.' });
    }
    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      domain: process.env.DOMAIN,
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6),
    });
    res.status(201).json({ name: user.name, message: 'Logged in successfully!', success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Logout = async (req, res, next) => {
  try {
    res.clearCookie('token', { domain: process.env.DOMAIN });
    res.status(200).json({ message: 'Logged out successfully!' });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        res.status(401).json({ error: 'Request is not authorized' });
      } else {
        const user = await User.findById(data.id);
        if (user) {
          return res.status(200).json({ name: user.name, email: user.email });
        } else {
          return res.status(401).json({ error: 'Request is not authorized' });
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.updateAccountDetails = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        res.status(401).json({ error: 'Request is not authorized' });
      } else {
        const user = await User.findByIdAndUpdate(
          data.id,
          { $set: { name, email } },
          { new: true }
        );
        console.log(user);
        res.status(200).json(user);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
