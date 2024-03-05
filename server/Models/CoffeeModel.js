const mongoose = require('mongoose');

const coffeeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    coffeeName: {
        type: String,
        required: [true, 'Coffee name is required']
    },
    roastLevel: {
        type: String,
        required: [true, 'Roast level is required']
    },
    roastDate: {
        type: Date,
        required: [true, 'Roast date is required']
    },
    restDays: {
        type: Number,
        required: [true, 'Rest days is required']
    },
    isFrozen: {
        type: Boolean,
        default: false
    },
    frozenStart: {
        type: Date
    },
    frozenEnd: {
        type: Date
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('Coffee', coffeeSchema);