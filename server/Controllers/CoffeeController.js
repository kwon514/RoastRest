const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Coffee = require('../Models/CoffeeModel');

module.exports.addCoffee = async (req, res) => {
    try {
        const userId = jwt.verify(req.cookies.token, process.env.TOKEN_KEY).id;
        const { name, coffeeName, roastLevel, roastDate, frozenStart, frozenEnd, notes } = req.body;
        const coffee = await Coffee.create({
            userId,
            name,
            coffeeName,
            roastLevel,
            roastDate,
            frozenStart,
            frozenEnd,
            notes
        });
        const savedCoffee = await coffee.save();
        res.status(201).json(savedCoffee);
    } catch (error) {
        console.error(error);
    }
};

module.exports.getAllCoffee = async (req, res) => {
    try {
        const userId = jwt.verify(req.cookies.token, process.env.TOKEN_KEY).id;
        const coffee = await Coffee.find({ userId });
        res.status(200).json(coffee);
    } catch (error) {
        console.error(error);
    }
};

module.exports.getCoffeeById = async (req, res) => {
    try {
        const userId = jwt.verify(req.cookies.token, process.env.TOKEN_KEY).id;
        const coffee = await Coffee.findOne({ _id: req.params.id, userId });
        res.status(200).json(coffee);
    } catch (error) {
        console.error(error);
    }
};

module.exports.updateCoffeeById = async (req, res) => {
    try {
        const userId = jwt.verify(req.cookies.token, process.env.TOKEN_KEY).id;
        const { name, coffeeName, roastLevel, roastDate, frozenStart, frozenEnd, notes } = req.body;
        const coffee = await Coffee.findOneAndUpdate({ _id: req.params.id, userId }, {
            name,
            coffeeName,
            roastLevel,
            roastDate,
            frozenStart,
            frozenEnd,
            notes
        }, { new: true });
        res.status(200).json(coffee);
    } catch (error) {
        console.error(error);
    }
};

module.exports.deleteCoffeeById = async (req, res) => {
    try {
        const userId = jwt.verify(req.cookies.token, process.env.TOKEN_KEY).id;
        await Coffee.findOneAndDelete({ _id: req.params.id, userId });
        res.status(200).json({ message: 'Coffee log deleted successfully!' });
    } catch (error) {
        console.error(error);
    }
};