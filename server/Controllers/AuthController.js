const User = require('../Models/UserModel');
const Coffee = require('../Models/CoffeeModel');
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const setCookie = (res, name, value, httpOnly) => {
  res.cookie(name, value, {
    httpOnly: httpOnly,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6),
  });
};

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, name, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'This email is already in use!' });
    }
    const user = await User.create({ email, password, name, createdAt });
    const token = createSecretToken(user._id);
    setCookie(res, 'token', token, true);
    setCookie(res, 'name', user.name, false);
    res
      .status(201)
      .json({ name: user.name, message: 'Account created successfully!', success: true });
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res) => {
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
    setCookie(res, 'token', token, true);
    setCookie(res, 'name', user.name, false);
    res.status(201).json({ name: user.name, message: 'Logged in successfully!', success: true });
  } catch (error) {
    console.error(error);
  }
};

module.exports.Logout = async (req, res) => {
  try {
    res.clearCookie('name', { domain: process.env.DOMAIN });
    res.clearCookie('token', { domain: process.env.DOMAIN });
    res.status(200).json({ message: 'Logged out successfully!' });
  } catch (error) {
    console.error(error);
  }
};

module.exports.getPersonalDetails = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized request.' });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized request.' });
      } else {
        const user = await User.findById(data.id);
        if (user) {
          const token = createSecretToken(user._id);
          setCookie(res, 'token', token, true);
          setCookie(res, 'name', user.name, false);
          return res.status(200).json({ name: user.name, email: user.email });
        } else {
          return res.status(401).json({ error: 'Unauthorized request.' });
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.updatePersonalDetails = async (req, res) => {
  try {
    const { name, email } = req.body;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized request.' });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized request.' });
      } else {
        const user = await User.findById(data.id);
        if (user) {
          const existingUser = await User.findOne({ email });
          if (existingUser && existingUser._id.toString() !== data.id) {
            return res.json({ success: false, message: 'This email is already in use!' });
          }
          const user = await User.findByIdAndUpdate(
            data.id,
            { $set: { name, email } },
            { new: true }
          );
          res
            .status(200)
            .json({ success: true, message: 'Personal details updated successfully!' });
        } else {
          return res.status(401).json({ error: 'Unauthorized request.' });
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized request.' });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized request.' });
      } else {
        let user = await User.findById(data.id);
        if (user) {
          const auth = await bcrypt.compare(currentPassword, user.password);
          if (!auth) {
            return res.json({ success: false, message: 'Incorrect password.' });
          }
          const hashedPassword = await bcrypt.hash(newPassword, 12);
          user = await User.findByIdAndUpdate(
            data.id,
            { $set: { password: hashedPassword } },
            { new: true }
          );
          res.status(200).json({ success: true, message: 'Password updated successfully!' });
        } else {
          return res.status(401).json({ error: 'Unauthorized request.' });
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.deleteAccount = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized request.' });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized request.' });
      } else {
        let user = await User.findById(data.id);
        if (user) {
          await User.findByIdAndDelete(data.id);
          const coffee = await Coffee.find({ userId: data.id });
          if (coffee.length > 0) {
            await Coffee.deleteMany({ userId: data.id });
          }
          res.clearCookie('name', { domain: process.env.DOMAIN });
          res.clearCookie('token', { domain: process.env.DOMAIN });
          res.status(200).json({ success: true, message: 'Account deleted successfully!' });
        } else {
          return res.status(401).json({ error: 'Unauthorized request.' });
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};
