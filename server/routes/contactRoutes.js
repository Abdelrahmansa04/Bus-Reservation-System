const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/Contact');  // Import the Contact model

// GET all contact messages
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();  // Retrieve all contacts
    res.json(contacts);  // Return the list of contacts
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving contact messages' });
  }
});

// POST a new contact message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });
    console.log(newContact);
    await newContact.save();  // Save the new contact message to the database
    console.log(newContact);

    res.status(201).json(newContact);  // Return the newly created contact message
  } catch (err) {
    res.status(500).json({ message: 'Error saving contact message' });
  }
});

// DELETE a contact message by ID
router.delete('/:id', async (req, res) => {
  const contactId = req.params.id;
  // Check if the ID is valid MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);  // Delete the contact by ID

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });  // Success message
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact message' });
  }
});

module.exports = router;
