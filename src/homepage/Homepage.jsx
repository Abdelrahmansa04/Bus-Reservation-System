import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Homepage.css";
import authent from "../authent";

const port = 3001

const Homepage = () => {
  const navigate = useNavigate();
  const [pickupPoint, setPickupPoint] = useState('');
  const [arrivalPoint, setArrivalPoint] = useState('');
  const [date, setDate] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedBus, setSelectedBus] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  
  const [filteredBuses, setFilteredBuses] = useState(buses);
  // Contact form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // authent()

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/auth", { withCredentials: true });
  //       // console.log("hi")
  //       console.log("Authentication check response:", response.data);
  //       if (response.data.authenticated) {
  //         setIsAuthenticated(true);
  //       } else {
  //         setIsAuthenticated(false);
  //         navigate("/login");
  //       }
  //     } catch (error) {
  //       console.log("Authentication check failed:", error);
  //       setIsAuthenticated(false);
  //        navigate("/login");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   checkAuth();
  // }, [navigate]);
  
  authent()

  const fetchBuses = async () =>{
    try {
      const res = await axios.get(`http://localhost:${port}/buses`);
      setBuses(res.data);
      setFilteredBuses(res.data); // Ensure filteredBuses syncs with buses
    } catch (error) {
      console.error('Error fetching buses:', error);
      // setBuses([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    setIsLoading(true); // Show loading before fetching
    fetchBuses();
  }, []);

  const popularRoutes = [
    { id: 1, route: 'Borg Al-Arab to Cairo' },
    { id: 2, route: 'Alexandria to Borg Al-Arab' },
    { id: 3, route: 'Borg Al-Arab to Alexandria' },
    { id: 5, route: 'Sharm El-Sheikh to Alexandria' },
  ];


  const handleRouteSelect = route => setSelectedRoute(route);
  const handleBusSelect = bus => {
    setSelectedBus(bus);
    setTimeout(async() => {
      const req_user = await axios.get(`http://localhost:${port}/auth/${bus._id}`, { withCredentials: true });
      // req_user.data.busId = bus._id
      console.log("a7a",req_user.data.busId)
      // const userId = req_user.data.userId; // Ensure the token contains the user ID

    });
    // req_user.data.busId = busId
    navigate(`/seat-selection/${bus._id}`);//to get the bus id in the seat selection
  };

  const toggleContactForm = () => setShowContactForm(!showContactForm);

  const handleSearch = () => {
    if (!Array.isArray(buses)) {
      console.error('buses is not an array:', buses);
      return;
    }
  
    const filtered = buses.filter(bus =>
      (pickupPoint ? bus.location.pickupLocation === pickupPoint : true) &&
      (arrivalPoint ? bus.location.arrivalLocation === arrivalPoint : true) &&
      (date ? bus.schedule === date : true)
    );
    setFilteredBuses(filtered);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await axios.post(`http://localhost:${port}/logout`, null, { withCredentials: true });
      console.log("Logout response:", response);
      if (response.status === 200) {
        alert("Logged out successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out");
    }
  };

    // Logout handler
    const handleProfile = async () => {
      try {
          navigate("/profile");
      } catch (error) {
        console.error("profile failed:", error);
        alert("Failed to go to profile");
      }
    };
  // if (isLoading) {
  //   return <p>Loading buses...</p>;
  // }



  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name,
      email,
      message,
    };

    try {
      const response = await axios.post(`http://localhost:${port}/contact`, contactData);
      setResponseMessage('Message sent successfully');
      console.log('Contact message saved:', response.data);
    } catch (error) {
      setResponseMessage('Failed to send message');
      console.error('Error sending contact message:', error);
    }
  };

  // authent()

  return (
    <div className="home-page">
        <nav className="navbar">
          <h1 className="company-title">Bus Reservation</h1>
          <button id="profile-btn" onClick={handleProfile}>Profile</button>
          <button id="logout-btn" onClick={handleLogout}>Logout</button>

          </nav>

      <div className="bus-search-bar">
        <select onChange={e => setPickupPoint(e.target.value)} value={pickupPoint}>
          <option value="">Pickup Point</option>
          <option value="Borg Al-Arab">Borg Al-Arab</option>
          <option value="Alexandria">Alexandria</option>
          <option value="Cairo">Cairo</option>
          <option value="Sharm El-Sheikh">Sharm El-Sheikh</option>
          <option value="Aswan">Aswan</option>
          <option value="Luxor">Luxor</option>
        </select>
        <select onChange={e => setArrivalPoint(e.target.value)} value={arrivalPoint}>
          <option value="">Arrival Point</option>
          <option value="Cairo">Cairo</option>
          <option value="Borg Al-Arab">Borg Al-Arab</option>
          <option value="Alexandria">Alexandria</option>
          <option value="Sharm El-Sheikh">Sharm El-Sheikh</option>
          <option value="Aswan">Aswan</option>
          <option value="Luxor">Luxor</option>
          <option value="Hurghada">Hurghada</option>
        </select>
        <input
          type="date"
          onChange={e => setDate(e.target.value)}
          value={date}
        />
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>

      <div className="popular-routes">
        <h3>Popular Routes</h3>
        <div className="popular-routes-list">
          {popularRoutes.map(route => (
            <div
              key={route.id}
              className="route-card"
              onClick={() => handleRouteSelect(route.route)}
            >
              {route.route}
            </div>
          ))}
        </div>
      </div>

      <div className="bus-list">
        {filteredBuses.length ? (
          filteredBuses.map(bus => (
            <div className="bus-card" key={bus.id} onClick={() => handleBusSelect(bus)}>
              <h3>{bus.name}</h3>
              {/* <p>Time: {bus.time}</p>
              <p>Price: {bus.price}</p>
              <p>Pickup: {bus.pickup}</p>
              <p>Arrival: {bus.arrival}</p>
              <p>Date: {bus.date}</p> */}
               <p>Pickup location: {bus.location.pickupLocation}</p>
              <p>Arrival location: {bus.location.arrivalLocation}</p>
              <p>Seats: {bus.seats.totalSeats}</p>
              <p>Price: {bus.price}</p>
              <p>schedule: {bus.schedule}</p>
              <p>Departure time: {bus.time.departureTime}</p>
              <p>Arrival time: {bus.time.arrivalTime}</p>
              <p>Minimum number of passengers: {bus.minNoPassengers}</p>
              <p>Cancel time allowance: {bus.allowance.cancelTimeAllowance}</p>
              <p>Booking time allowance: {bus.allowance.bookingTimeAllowance}</p>
              <p>Allowed number of bags: {bus.allowedNumberOfBags}</p>

            </div>
          ))
        ) : (
          <p>No buses found matching your criteria.</p>
        )}
      </div>

      <div className="contact-us-bar" onClick={toggleContactForm}>
        <h3>Contact Us</h3>
      </div>

      {showContactForm && (
        <div className={`contact-us-form ${showContactForm ? 'active' : ''}`}>
          <h3>Write Us a Message</h3>
          <form onSubmit={handleContactSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Homepage;
