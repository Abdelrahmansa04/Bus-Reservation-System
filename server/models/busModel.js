const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
    busName: {type: String, required: true},
    route: {type: String, required: true},
    // seats: {type: Number, required: true},
    availableSeats: {type: Number, required: true},
    schedule: {type: String, required:true},
});

module.exports = mongoose.model('Bus', BusSchema);
