const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    telNum: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    agree: {
        type: Boolean,
        required: false
    },
    message: {
        type: String
    }
});

module.exports = mongoose.model('contact', ContactSchema);