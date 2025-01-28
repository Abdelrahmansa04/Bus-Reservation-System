const express = require("express");
const router = express.Router();
const Bus = require('../models/busModel');
const User = require("../models/user")



router.get('/:id', async (req,res) => {
    try {
        const busId = req.params.id;
        const bus = await Bus.findById(busId);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
          }
        res.status(200).json(bus);
      } catch (err) {
        console.error('Error fetching bus details:', err);
        res.status(500).json({ message: 'Error fetching bus details', error: err.message });
      }
})

router.post('/:busId', async (req, res) => {
    const  busId  = req.params.busId;
    const { selectedSeats, userId } = req.body;
    const seats = selectedSeats.split(",").map(Number)

    try{
      const bus = await Bus.findById(busId);
      const user = await User.findById(userId);

      if(!bus){
        return res.status(404).json({ message: 'Bus not found' })
      }

      for(let i = 0; i < seats.length; i++){
        // if(bus.seats.bookedSeats[(seats[i])] !== "0"){
        //   return res.status(400).json(seats[i]);
        // }
        const fieldToUpdate = `seats.bookedSeats.${[seats[i]]}`;
        
        const updatedBus = await Bus.findByIdAndUpdate(
          busId,
          {$set:{[fieldToUpdate]:userId}},
          {new : true}
        );        
      }
      if (bus.bookedBuses.buses[i] !== busId){
        const userBookedBuses = await User.updateOne(
          {_id : userId},
          {$push: {'bookedBuses.buses':busId}},
          {new : true}
        );        
      }


      // const userBookedSeats = await User.updateOne(
      //   {_id : userId},
      //   {$push: {'bookedBuses.seats':seats}},
      //   {new : true}
      // );

      res.status(200).json({ message: 'Seat reserved successfully'});
    }
    catch(error){
      console.error('Error reserving seat:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    
  });

module.exports = router;