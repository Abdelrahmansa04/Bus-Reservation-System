import React, {useEffect, useState} from "react";
import axios from "axios";

const BusList = () => {
    const [buses, setBuses] = useState('');
    const [busId, setBusId] = useState('');
    const [userName, setUserName] = useState('');
    const [seatsBooked, setSeatsBooked] = useState('');


useEffect(() => {
    const fetchBuses = async () => {
        const res = await axios.get('/api/buses');
        setBuses(res.data);
    };
    fetchBuses();
}, []);

const handleBooking = async (e) => {
    e.preventDefault();
    try {
        await axios.post('/api/book', {busId, userName, seatsBooked});
        alert('Booking successful');
    } catch (err) {
        alert('Error booking the bus');
    }
};

return (
    <div>
        <h1>Available Buses</h1>
        <ul>
            {buses.map((bus) => (
                <li key={bus._id}>
                    <h3>{bus.busName}</h3>
                    <p>Route: {bus.busRoute}</p>
                    <p>Available Seats: {bus.availableSeats}</p>
                    <p>Schedule: {bus.schedule}</p>
                </li>
            ))}
        </ul>

        <h2>Book a bus</h2>
        <form onSubmit={handleBooking}>
            <select onChange={(e) => setBusId(e.target.value)}>
                <option value="">Select Bus</option>
                {buses.map((bus) => (
                    <option key={bus._id} value={bus._id}> {bus.busName} </option>
                ))}
            </select>
            <input type="text" placeholder="Your Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="number" placeholder="Seats to Book" value={seatsBooked} onChange={(e) => setSeatsBooked(e.target.value)} />
            <button type="submit">Book</button>
        </form>
    </div>
 
);
};

export default BusList;