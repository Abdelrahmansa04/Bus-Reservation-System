import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import authen from '../authent';
import axios from "axios";
const port = 3001;

const Dashboard = () => {
    authen();

    const navigate = useNavigate();
    const [busDetails, setBusDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [buses, setBuses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [seats, setSeats] = useState([]);
    const hasFetched = useRef(false); // Ref to track whether fetch has been performed

    const fetchUsers = async () => {
        try{
        const req_user = await axios.get(`http://localhost:${port}/auth`, { withCredentials: true });
        console.log(req_user);
        setUserId(req_user.data.userId);
        const userId = req_user.data.userId;
        const res = await axios.get(`http://localhost:${port}/user/profile/${userId}`);
        setUserDetails(res.data);
        const userDetails = res.data;
        console.log("user Details", userDetails.bookedBuses.length);

        for (let i = 0; i < userDetails.bookedBuses.length; i++) {
            const response = await axios.get(`http://localhost:${port}/seatselection/${userDetails.bookedBuses[i]}`);
            console.log("Buses", response);
            const bus = response.data
            setBuses(prevBuses => [...prevBuses, bus]);
            
            console.log("Bus", bus.seats.bookedSeats)
            let userSeats = [];
                for (let j = 0; j < bus.seats.bookedSeats.length; j++) {
                    if (bus.seats.bookedSeats[j] === userId) {
                        userSeats.push(j + 1);  // Add seat index (1-based)
                    }
                }
                setSeats((prevSeats) => [...prevSeats, ...userSeats]); 
        }
        } catch (err) {
            console.error("Error fetching users:", error);
            setError("Failed to fetch bus details.");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (hasFetched.current) return; // Exit if the fetch has already been performed
        hasFetched.current = true; // Mark fetch as performed

        const fetchBusDetails = async () => {
            try {
                const req_user = await axios.get(`http://localhost:${port}/auth`, { withCredentials: true });
                console.log(req_user);
                setUserId(req_user.data.userId);
                const userId = req_user.data.userId;

                console.log("Booked Buses", buses);
            } catch (err) {
                console.error('Error fetching bus details:', err);
                setError('Failed to fetch bus details.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers(); // Fetch user and bus details only once
    }, []); // Empty dependency array ensures the effect runs only once

    if (loading) {
        return <p>Loading bus details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className="dashboard-container">
                <h1 className="dashboard-title">Dashboard</h1>
                <div className="dashboard-cards">
                    <br />
                    {buses.length > 0 ? (
                        buses.map((bus, index) => (
                            <div key={index}> {/* Added key for proper list rendering */}
                                <div className="card">
                                    <p>{bus.location.pickupLocation} To {bus.location.arrivalLocation}</p>
                                    <p>{bus.time.departureTime}:pm to {bus.time.arrivalTime}:pm</p>
                                    {/* Display booked seats for each bus */}
                                    <p>Seats Booked: {seats[index]}</p> {/* Show only the seats for the current bus */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No buses found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
