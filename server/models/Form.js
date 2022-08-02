const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Form', FormSchema);