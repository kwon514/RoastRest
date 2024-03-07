const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Coffee = require('../Models/CoffeeModel');


module.exports.getAllCoffee = async (req, res) => {
    try {
        const userId = jwt.verify(req.cookies.token, process.env.TOKEN_KEY).id;
        const coffee = await Coffee.find({ userId });
        res.status(200).json(coffee);
    } catch (error) {
        console.error(error);
    }
};

module.exports.addCoffee = async (req, res) => {
    try {
        const userId = jwt.verify(req.cookies.token, process.env.TOKEN_KEY).id;
        const { name, coffeeName, roastLevel, roastDate, isFrozen, frozenStart, frozenEnd, notes } = req.body;
        const coffee = await Coffee.create({
            userId,
            name,
            coffeeName,
            roastLevel,
            roastDate,
            isFrozen,
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