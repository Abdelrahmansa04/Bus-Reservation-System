
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: false},
    email: {type: String, required: false},
    password: {type: String, required: false},
    bookedBuses: {
        BusId: [{type: String, required: false}],
        SeatsNumbers: [{type: Number, required: false}],
    }

});

module.exports = mongoose.model('User', UserSchema);
