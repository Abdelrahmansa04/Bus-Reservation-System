const express = require('express');
const Bus = require('../models/busModel')
const router = express.Router();

// Add new Bus details
router.post('/api/bus', async (req, res) => {
    try {
        const {busName, route, availableSeats, schedule} = req.body;
        const newBus = new Bus({busName, route, availableSeats, schedule});
        await newBus.save();
        res.status(201).json(newBus);
    } catch (err) {
        res.status(400).json({ message: 'Error adding the bus details', error:err});
    }
});

// Get all buses
router.get('/buses', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.status(200).json(buses);
    } catch (err){
        res.status(400).json({ message: 'Error fetching busses', error:err});
    }
});

module.exports = router;



