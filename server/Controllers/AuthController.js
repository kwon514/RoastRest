const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, name, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "This email is already in use!" });
        }
        const user = await User.create({ email, password, name, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            domain: process.env.DOMAIN,
            withCredentials: true,
            httpOnly: false,
            sameSite: "none",
            secure: true,
        });
        res.status(201).json({ name: user.name, message: "Logged in successfully!", success: true });
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'All fields are required.' })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'Incorrect password or email.' })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ message: 'Incorrect password or email.' })
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            domain: process.env.DOMAIN,
            withCredentials: true,
            httpOnly: false,
            sameSite: "none",
            secure: true,
        });
        res.status(201).json({ name: user.name, message: "Logged in successfully!", success: true });
        next()
    } catch (error) {
        console.error(error);
    }
};

module.exports.Logout = async (req, res, next) => {
    try {
        res.clearCookie("token", { domain: process.env.DOMAIN });
        res.status(200).json({ message: "Logged out successfully!" });
        next();
    } catch (error) {
        console.error(error);
    }
};