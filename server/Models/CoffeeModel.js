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
        required: [true, 'Roast Date is required']
    },
    frozenStart: {
        type: Date
    },
    frozenEnd: {
        type: Date
    },
    notes: {
        type: String
    },
    websiteUrl: {
        type: String
    },
});

module.exports = mongoose.model('Coffee', coffeeSchema);