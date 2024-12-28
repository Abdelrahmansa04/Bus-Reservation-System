const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Contact model

// Initialize Express app
const app = express();

// Middleware
app.use(cors());  // Enable cross-origin requests
app.use(bodyParser.json());  // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/bus-system')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Routes
app.use('/contacts', require('./routes/contactRoutes'));  // Use the contact routes


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
