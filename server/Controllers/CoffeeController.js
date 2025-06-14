const jwt = require('jsonwebtoken');
const Coffee = require('../Models/CoffeeModel');

module.exports.addCoffee = async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, process.env.TOKEN_KEY).id;
    const isFrozen = req.body.frozenStart && !req.body.frozenEnd ? true : false;
    const coffee = new Coffee({
      ...req.body,
      userId,
      isFrozen,
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

    coffee.modifiedDates = coffee.modifiedDates.concat(
      coffee.creationDate,
      coffee.roastDate,
      coffee.frozenStart ? [coffee.frozenStart] : [],
      coffee.frozenEnd ? [coffee.frozenEnd] : []
    );

    coffee.modifiedLog = coffee.modifiedLog.concat(
      'Log created',
      'Roasted',
      coffee.frozenStart ? ['Frozen'] : [],
      coffee.frozenEnd ? ['Thawed'] : []
    );

    const sortedIndices = coffee.modifiedDates
      .map((date, index) => ({ date, index }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(({ index }) => index);

    coffee.modifiedDates = sortedIndices.map((index) => coffee.modifiedDates[index]);
    coffee.modifiedLog = sortedIndices.map((index) => coffee.modifiedLog[index]);

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
    if (req.body.frozenStart) {
      req.body.isFrozen = true;
    } else {
      req.body.isFrozen = false;
    }
    const coffee = await Coffee.findOneAndUpdate(
      { _id: req.params.id, userId },
      {
        $set: req.body,
        $push: {
          modifiedDates: new Date(),
          modifiedLog: modifiedLogReason ? modifiedLogReason : 'Log updated',
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
