import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './AddBus.css';

const port = 3001;

const AddBus = () => {
    const [totalSeats, setAllSeats] = useState('');
    const [schedule, setSchedule] = useState('');
    const [minNoPassengers, setMinNoPassengers] = useState('');
    const [price, setPrice] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [cancelTimeAllowance, setCancelTimeAllowance] = useState('');
    const [bookingTimeAllowance, setBookingTimeAllowance] = useState('');
    const [allowedNumberOfBags, setAllowedNumberOfBags] = useState('');

    const navigate = useNavigate(); // Hook to navigate after adding the bus

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Post the new bus to the server
            await axios.post(`http://localhost:${port}/buses`, { 
                totalSeats, 
                schedule, 
                minNoPassengers, 
                price, 
                pickupLocation, 
                arrivalLocation, 
                departureTime, 
                arrivalTime, 
                cancelTimeAllowance, 
                bookingTimeAllowance, 
                allowedNumberOfBags
            });
            
            // Show a confirmation alert
            alert('Bus added successfully!');
            
            // Navigate to the Bus List page after adding the bus
            navigate('/bus-list');  // You can change this to any page you'd like
        } catch (err) {
            alert('Error adding bus!');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-bus">
            <h1>Add a new Bus</h1>
            {/* Your form fields here */}
            <label>Pickup location</label>
            <input type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
           
            <label>Arrival location</label>
            <input type="text" value={arrivalLocation} onChange={(e) => setArrivalLocation(e.target.value)} />
            
            <label>Departure time</label>
            <input type="number" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
            
            <label>Arrival time</label>
            <input type="number" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
            
            <label>Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            
            <label>Min No. passengers</label>
            <input type="number" value={minNoPassengers} onChange={(e) => setMinNoPassengers(e.target.value)} />
            
            <label>Allowed Number Of Bags</label>
            <input type="number" value={allowedNumberOfBags} onChange={(e) => setAllowedNumberOfBags(e.target.value)} />
            
            <label>Booking Time Allowance</label>
            <input type="number" value={bookingTimeAllowance} onChange={(e) => setBookingTimeAllowance(e.target.value)} />
            
            <label>Cancel Time Allowance</label>
            <input type="number" value={cancelTimeAllowance} onChange={(e) => setCancelTimeAllowance(e.target.value)} />
            
            <label>Total Seats</label>
            <input type="number" value={totalSeats} onChange={(e) => setAllSeats(e.target.value)} />
            
            <label>Schedule</label>
            <input type="date" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
            
            <button type="submit">Add Bus</button>            
        </form>
    );
};

export default AddBus;
