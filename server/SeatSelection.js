const express = require("express");
const router = express.Router();
const Bus = require('./models/busModel');



router.get('/:id', async (req,res) => {
    try {
        const busId = req.params.id;
        const bus = await Bus.findById(busId);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
          }
        res.status(200).json(bus);
      } catch (err) {
        console.error('Error fetching bus details:', error);
        res.status(500).json({ message: 'Error fetching bus details', error: error.message });
      }
})

router.post('/seatselection/:busId', (req, res) => {
    const { busId } = req.params;
    const { seatIndex, userId } = req.body;
  
    if (!userId || !seatIndex) {
      return res.status(400).json({ error: 'Missing seat index or user ID' });
    }
  
    // Logic to handle seat reservation
    const isSuccess = reserveSeat(busId, seatIndex, userId); // Replace with actual logic
  
    if (isSuccess) {
      res.status(200).json({ message: 'Seat reserved successfully' });
    } else {
      res.status(500).json({ error: 'Failed to reserve seat' });
    }
  });

module.exports = router;