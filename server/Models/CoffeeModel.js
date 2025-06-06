const mongoose = require('mongoose');

const coffeeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  coffeeName: {
    type: String,
    required: [true, 'Coffee Name is required'],
  },
  coffeeRoaster: {
    type: String,
  },
  coffeeWeight: {
    type: Number,
  },
  coffeeDose: {
    type: Number,
  },
  roastLevel: {
    type: String,
  },
  roastDate: {
    type: Date,
    required: [true, 'Roast Date is required'],
  },
  frozenStart: {
    type: Date,
  },
  frozenEnd: {
    type: Date,
  },
  notes: {
    type: String,
  },
  websiteUrl: {
    type: String,
  },
  lastModifiedDate: {
    type: Date,
    required: [true, 'Last Modified Date is required'],
  },
  modifiedDates: {
    type: [Date],
  },
  modifiedLog: {
    type: [String],
  },
  creationDate: {
    type: Date,
    required: [true, 'Creation Date is required'],
  },
  isFrozen: {
    type: Boolean,
    default: false,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  isBinned: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Coffee', coffeeSchema);
