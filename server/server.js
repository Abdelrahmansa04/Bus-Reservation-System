const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes'); // Assuming the contact routes are in the routes folder

// Initialize the app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Allow Cross-Origin Requests (CORS)
app.use(cors());

// Contact routes
app.use('/contact', contactRoutes);

// MongoDB connection setup
const dbURI = "mongodb://127.0.0.1:27017/bus-system";  // Update this with your actual MongoDB URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit the process if DB connection fails
  });

  // Start the server after successful DB connection
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });