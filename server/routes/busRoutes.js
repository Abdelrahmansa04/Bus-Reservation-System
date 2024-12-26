const express = require('express');
const Bus = require('../models/busModel')
const router = express.Router();

// Add new Bus details
router.post('/', async (req, res) => {
    try {
        // console.log(req.body);
        const {busName, route, availableSeats, schedule} = req.body;
        // console.log(busName, route, availableSeats, schedule);
        const newBus = new Bus({busName, route, availableSeats, schedule});
        console.log(newBus);
        await newBus.save();
        res.status(201).json("New Bus Created and saved successfully");
    } catch (err) {
        res.status(400).json({ message: 'Error adding the bus details', error:err});
    }
});

// Get all buses
router.get('/', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.status(200).json(buses);
    } catch (err){
        res.status(400).json({ message: 'Error fetching busses', error:err});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const deletedBus = await Bus.deleteOne({_id: id});

        if (!id) {
            return res.status(404).json({error: "Bus not found"});
        }

        res.status(200).json({message: "Bus deleted successfully", bus: deletedBus});        
    } catch (err) {
        console.error("Error deleting the Item",err);
        res.status(500).json({error: "Internal server error"})
    }
});

module.exports = router;



