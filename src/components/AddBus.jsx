import React, {useState, useEffect} from "react";
import axios from 'axios';
import "../App.css";

const port = 3001
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.get(`http://localhost:${port}/buses`);
            const buses = res.data;

            await axios.post(`http://localhost:${port}/buses`, {totalSeats, schedule, minNoPassengers, price, pickupLocation, 
                arrivalLocation, departureTime, arrivalTime, cancelTimeAllowance, 
                bookingTimeAllowance, allowedNumberOfBags});
            alert('Bus added successfully');
        } catch (err) {
            alert(err.response.data.message);
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="add-bus">
            <input type="text" placeholder="Pickup location" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
            <input type="text" placeholder="Arrival location" value={arrivalLocation} onChange={(e) => setArrivalLocation(e.target.value)} />
            <input type="number" placeholder="Departure time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
            <input type="number" placeholder="Arrival time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="number" placeholder="Min No. passengers" value={minNoPassengers} onChange={(e) => setMinNoPassengers(e.target.value)} />
            <input type="number" placeholder="Allowed Number Of Bags" value={allowedNumberOfBags} onChange={(e) => setAllowedNumberOfBags(e.target.value)} />
            <input type="number" placeholder="Booking Time Allowance" value={bookingTimeAllowance} onChange={(e) => setBookingTimeAllowance(e.target.value)} />
            <input type="number" placeholder="Cancel Time Allowance" value={cancelTimeAllowance} onChange={(e) => setCancelTimeAllowance(e.target.value)} />
            <input type="number" placeholder="Available Seats" value={totalSeats} onChange={(e) => setAllSeats(e.target.value)} />
            <input type="date" placeholder="Schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
            <button type="submit">Add Bus</button>            
        </form>
    );
};

export default AddBus;
