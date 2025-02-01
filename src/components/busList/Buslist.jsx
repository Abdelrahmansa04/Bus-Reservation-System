import React, { useEffect, useState } from "react";
import axios from "axios";
import './Buslist.css';

const port = 3001;

const BusList = () => {
    const [buses, setBuses] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Set loading state to true initially
    const [error, setError] = useState(''); // To store error messages

    const fetchBuses = async () => {
        try {
            const res = await axios.get(`http://localhost:${port}/buses`);
            setBuses(res.data);
            setIsLoading(false);
        } catch (err) {
            setError("Error fetching buses.");
            setIsLoading(false);
            console.log("Error fetching buses", err);
        }
    };

    useEffect(() => {
        fetchBuses();
    }, []);

    const handleDel = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this bus?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:${port}/buses/${id}`);
            setBuses(buses.filter((bus) => bus._id !== id));
            alert("Bus deleted successfully!");
        } catch (err) {
            console.log("Error deleting the bus", err);
            alert("Error deleting the bus.");
        }
    };

    return (
        <div className="home-bus-list">
            <br />
            <button onClick={() => fetchBuses()} className="button">Find Buses</button>
            <br />
            {isLoading ? (
                <p>Loading buses...</p>
            ) : error ? (
                <p>{error}</p>
            ) : buses.length > 0 ? (
                buses.map((bus) => (
                    <div key={bus._id} className="bus-container">
                        <h2>Bus Details</h2>
                        <p><strong>Pickup location:</strong> {bus.location.pickupLocation}</p>
                        <p><strong>Arrival location:</strong> {bus.location.arrivalLocation}</p>
                        <p><strong>Seats:</strong> {bus.seats.totalSeats}</p>
                        <p><strong>Price:</strong> {bus.price}</p>
                        <p><strong>Schedule:</strong> {bus.schedule}</p>
                        <p><strong>Departure time:</strong> {bus.time.departureTime}</p>
                        <p><strong>Arrival time:</strong> {bus.time.arrivalTime}</p>
                        <p><strong>Min No. passengers:</strong> {bus.minNoPassengers}</p>
                        <p><strong>Cancel time allowance:</strong> {bus.allowance.cancelTimeAllowance}</p>
                        <p><strong>Booking time allowance:</strong> {bus.allowance.bookingTimeAllowance}</p>
                        <p><strong>Allowed number of bags:</strong> {bus.allowedNumberOfBags}</p>

                        <button onClick={() => handleDel(bus._id)} className="delete-button">Delete Bus</button>
                    </div>
                ))
            ) : (
                <p>No buses available. Please add some buses.</p>
            )}
        </div>
    );
};

export default BusList;
