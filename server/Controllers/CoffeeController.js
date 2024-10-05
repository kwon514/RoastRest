const jwt = require('jsonwebtoken');
const Coffee = require('../Models/CoffeeModel');

module.exports.addCoffee = async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, process.env.TOKEN_KEY).id;
    const coffee = new Coffee({ ...req.body, userId });
    const savedCoffee = await coffee.save();
    res.status(201).json(savedCoffee);
  } catch (error) {
    console.error(error);
  }
};

module.exports.getCoffee = async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, process.env.TOKEN_KEY).id;
    const coffee = await Coffee.find({ userId, isBinned: false });
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
    const coffee = await Coffee.findOneAndUpdate({ _id: req.params.id, userId }, req.body, {
      new: true,
    });
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
