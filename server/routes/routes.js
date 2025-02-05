const express = require('express');
const router = express.Router();

const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');
const busController = require('./controllers/busController');
const authController = require('./controllers/authController');

// Public route for login
router.post('/login', authController.login);

// Protected routes
router.use(authMiddleware); // Apply auth middleware to all routes below

// Admin-only routes
router.post('/add-bus', adminMiddleware, busController.addBus); // Only admin can add a bus
router.delete('/delete-bus/:busId', adminMiddleware, busController.deleteBus); // Only admin can delete a bus

// Available buses route (can be accessed by any logged-in user)
router.get('/available-buses', busController.getAvailableBuses);
router.get('/buses', busController.verifyToken, busController.getBuses);  // Any user can view buses
router.post('/buses', busController.verifyToken, busController.isAdmin, busController.addBus);  // Only admin can add a bus
// In routes.js
router.put('/buses/:id', busController.verifyToken, busController.isAdmin, busController.updateBus);
router.delete('/buses/:id', busController.verifyToken, busController.isAdmin, busController.deleteBus);
router.get('/buses/:id', busController.verifyToken, busController.getBusById);

module.exports = router;
