const express = require("express");
const router = express.Router();
const Bus = require('../models/busModel');



router.get('/:id', async (req,res) => {
    try {
        const busId = req.params.id;
        console.log(busId);
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
    const { index, userId } = req.body;
    console.log("index:" , index)
    // const bus_index = await Bus.find({ _id: busId.seats.bookingseats });
    console.log(busId)
    try{
      const bus = await Bus.findById(busId);

      if(!bus){
        return res.status(404).json({ message: 'Bus not found' })
      }
      // if(bus.seats.bookedSeats[(seatIndex)] !== "0"){
      //   return res.status(400).json({ seatIndex  });
      // }

      const fieldToUpdate = `seats.bookedSeats.${index}`;
      const updatedBus = await Bus.findByIdAndUpdate(
        busId,
        {$set:{[fieldToUpdate]:userId}},
        {new : true}
      );
      res.status(200).json({ message: 'Seat reserved successfully', bus: updatedBus });
    }
    catch(error){
      console.error('Error reserving seat:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    
    
    // if(bus_index === 0){
    //   return res.status(404).json({ message: 'seat is reserved' });
    // }else{
      
    // }

    // const bus = await Bus.findById(busId)
    
    // returnres.status(200).json(bus)
  
    // if (!userId || !seatIndex) {
    //   return res.status(400).json({ error: 'Missing seat index or user ID' });
    // }
  
    // Logic to handle seat reservation
    // const isSuccess = reserveSeat(busId, seatIndex, userId); // Replace with actual logic
  
    // if (isSuccess) {
    //   res.status(200).json({ message: 'Seat reserved successfully' });
    // } else {
    //   res.status(500).json({ error: 'Failed to reserve seat' });
    // }
  });

module.exports = router;