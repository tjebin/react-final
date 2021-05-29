const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    airlineName: {
        type: String
    },
    route: {
        type: String,
        required: true
    },
    deal: {
        type: String
    }
});

module.exports = mongoose.model('flight', FlightSchema);