import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Buslist.css";
import LoadingPage from "../loadingPage/loadingPage";
const backEndUrl = import.meta.env.VITE_BACK_END_URL;

// import { set } from "mongoose";
const port = 3001;

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [busName, setBusName] = useState('');
  // const [busId, setBusId] = useState('');
  // const [userName, setUserName] = useState('');
  // const [seatsBooked, setSeatsBooked] = useState('');

  const fetchBuses = async () => {
    try {
      const res = await axios.get(`${backEndUrl}/buses`);
      setBuses(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching Buses.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleDel = async (id) => {
    try {
      await axios.delete(`${backEndUrl}/buses/${id}`);
      setBuses(buses.filter((bus) => bus._id !== id));
      alert("Bus deleted successfully!");
    } catch (err) {
      console.log("Error deleting the bus", err);
      alert("Error deleting the bus.");
    }
  };

  return (
    <>
    <div className="bus-list-page">
    <br />{" "}
      <div onClick={() => fetchBuses()} className="show-buses-btn">
        Show Available Buses
      </div>
      <br />
      <div className="bus-list">
        {buses.length > 0 ? (
          buses.map((bus) => (
            <div key={bus._id} className="bus-container">
              <h1>Bus details</h1>
              <p>
                {bus.location.pickupLocation} <span>to</span>{" "}
                {bus.location.arrivalLocation}
              </p>
              <p>Seats: {bus.seats.totalSeats}</p>
              <p>Price: {bus.price}</p>
              <p>Schedule: {bus.schedule}</p>
              <p>
                {bus.time.departureTime} <span>to</span> {bus.time.arrivalTime}
              </p>
              <p>Allowed number of bags: {bus.allowedNumberOfBags}</p>

              <button onClick={() => handleDel(bus._id)}>Delete Bus</button>
            </div>
          ))
        ) : isLoading ? (
          <LoadingPage />
        ) : (
          <p>No buses found.</p>
        )}
      </div>
    </div>
   
    </>
  );
};

export default BusList;
