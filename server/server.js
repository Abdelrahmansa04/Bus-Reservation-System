const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRouter')
const userRoutes = require('./routes/userRoutes')
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/buses', busRoutes);
app.use('/users', userRoutes);
// app.use('/api', bookingRoutes);

//MongoDB connection 
mongoose
.connect("mongodb://localhost:27017/bus-system", {useNewUrlParser: true, useUnifiedTopology: true})
.then( ()=> console.log("MongoDB connected"))
.catch((err)=> console.error(err));


//Routes
// app.get("/api/buses", require('./routes/busRoutes'))


//Server start
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
