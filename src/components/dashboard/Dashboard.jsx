import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import authen from '../../authent';
import axios from "axios";
import { get } from "mongoose";
import "./dashboard.css"
const port = 3001;

const Dashboard = () => {
    authen();

    const navigate = useNavigate();
    const [busDetails, setBusDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [busAndSeat, setBusAndSeat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [seats, setSeats] = useState([]);
    const hasFetched = useRef(false); // Ref to track whether fetch has been performed

    const fetchUsers = async () => {
        try{
            // Get session data
            const req_user = await axios.get(`http://localhost:${port}/auth`, { withCredentials: true });
            
            // Store user ID in userID state from session data 
            setUserId(req_user.data.userId);

            // Make a variable to hold user ID 
            const userId = req_user.data.userId;

            // Get user data
            const res = await axios.get(`http://localhost:${port}/user/profile/${userId}`);

            // Store user data in the userDetails state
            setUserDetails(res.data);

            // Make a variable to store the user details
            const userDetails = res.data;
            const busIds = userDetails.bookedBuses.buses;

            let buses = [];
            for(let i = 0; i < busIds.length; i++){
                const busDetails = await axios.get(`http://localhost:${port}/buses/${busIds[i]}`);
                buses.push(busDetails.data)
                console.log(busDetails.data)
            }

            
            setBusDetails(prevBuses => [...prevBuses, ...buses]);
            // setBusDetails(busDetails)


            // const busAndSeat = userDetails.bookedBuses.buses.map((item, index) => [item, userDetails.bookedBuses.seats[index]])  
            // setBusAndSeat(busAndSeat)
            // console.log(busAndSeat)

            // Loop over the booked busses of the current user
            // for (let i = 0; i < userDetails.bookedBuses.length; i++) {
            //     // Get the buses details
            //     console.log(userDetails.bookedBuses[i])
            //     const response = await axios.get(`http://localhost:${port}/seatselection/${userDetails.bookedBuses[i]}`);
            //     console.log(response)
            //     // Make a variable to store the bus details
            //     const bus = response.data

            //     // Add each bus to the buses state array
            //     // setBuses(prevBuses => [...prevBuses, bus]);


            //     let userSeats = [];
            //         for (let j = 0; j < bus.seats.bookedSeats.length; j++) {
            //             if (bus.seats.bookedSeats[j] === userId) {
            //                 userSeats.push(j + 1);  // Add seat index (1-based)
            //             }
            //         }
            //         setSeats((prevSeats) => [...prevSeats, ...userSeats]); 
                    
            // }

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

                setUserId(req_user.data.userId);
                const userId = req_user.data.userId;

            } catch (err) {
                console.error('Error fetching bus details:', err);
                setError('Failed to fetch bus details.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers(); // Fetch user and bus details only once
    }, []); // Empty dependency array ensures the effect runs only once

    useEffect(() => {
        console.log(busDetails)
    }, [busDetails])

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
                {/* <h1>{busDetails[0].seats.bookedSeats[1] === userId ? "true":"false"} </h1> */}
                {busDetails.length > 0  ? (
                    busDetails.map((bus, index) => ( bus !== null &&
                        <div className="dashboard-card" key={index}>
                            <p>{bus.location.pickupLocation} to {bus.location.arrivalLocation}</p>
                            <p>{bus.schedule}</p>
                            <p>{bus.time.departureTime} to {bus.time.arrivalTime}</p>
                            <p>{bus.seats.bookedSeats
                            .map((seat, index) => seat === userId ? index + 1: null)
                            .filter((index) => index !== null).join(", ")}</p>
                            </div> 
                    ))
                ) : (
                    <p>No buses found.</p>
                )}
               
                <br />

                </div>
            </div>
        </>
    );
};

export default Dashboard;
