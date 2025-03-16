const jwt = require('jsonwebtoken');
const Coffee = require('../Models/CoffeeModel');

module.exports.addCoffee = async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, process.env.TOKEN_KEY).id;
    const coffee = new Coffee({
      ...req.body,
      userId,
      modifiedDates: [new Date()],
      modifiedLog: ['Coffee log created'],
    });
    const savedCoffee = await coffee.save();
    res.status(201).json(savedCoffee);
  } catch (error) {
    console.error(error);
  }
};

module.exports.getCoffee = async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, process.env.TOKEN_KEY).id;
    const filters = req.query;
    filters.userId = userId;
    const coffee = await Coffee.find(filters);
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
    const modifiedLogReason = req.body.modifiedLogReason;
    delete req.body.modifiedLog;
    const coffee = await Coffee.findOneAndUpdate(
      { _id: req.params.id, userId },
      {
        $set: req.body,
        $push: {
          modifiedDates: new Date(),
          modifiedLog: modifiedLogReason ? modifiedLogReason : 'Coffee log updated',
        },
      },
      { new: true }
    );
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
