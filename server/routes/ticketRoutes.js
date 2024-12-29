// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();

// Route to create a new ticket
router.post('/create', async (req, res) => {
    const { busId, userId, seatNumber, price, passengerName } = req.body;
    
    // Basic validation (optional)
    if (!busId || !userId || !seatNumber || !price || !passengerName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new ticket using the Ticket model
        const newTicket = new Ticket({
            busId,
            userId,
            seatNumber,
            price,
            passengerName
        });

        // Save the ticket to the database
        await newTicket.save();

        // Return the newly created ticket as a JSON response
        res.status(201).json(newTicket);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create ticket' });
    }
});

// Route to get all tickets (for example, for an admin to see all tickets)
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();  // Fetch all tickets from the database
        res.status(200).json(tickets);  // Return all tickets
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch tickets' });
    }
});

// Route to get tickets for a specific user (e.g., to see their own tickets)
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const tickets = await Ticket.find({ userId });  // Find tickets for this user
        res.status(200).json(tickets);  // Return the tickets for this user
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch user tickets' });
    }
});

// Route to delete a ticket by ticket ID (for cancellation purposes)
router.delete('/:ticketId', async (req, res) => {
    const { ticketId } = req.params;

    try {
        const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
        if (!deletedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete ticket' });
    }
});

module.exports = router;
