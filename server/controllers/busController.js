const Bus = require('../models/busModel');
const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token and extract user info
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token (user info) to the request object
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid or expired token.' });
    }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied, admin privileges required.' });
    }
    next();
};

// Get all buses (accessible to both admin and regular users)
const getBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new bus (accessible only to admin)
const addBus = async (req, res) => {
    try {
        // Ensure the user is an admin before adding a bus
        const newBus = new Bus(req.body);
        await newBus.save();
        res.status(201).json(newBus);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Export the controller functions and middlewares
module.exports = {
    getBuses,
    addBus,
    verifyToken,   // Add the verifyToken middleware to be used in routes
    isAdmin        // Add the isAdmin middleware to be used in routes
};
