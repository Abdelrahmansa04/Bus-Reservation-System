import React, { useState } from 'react';
import axios from 'axios';
import './Homepage.css';  // Assuming you have the corresponding CSS file

const Homepage = () => {
  const [pickupPoint, setPickupPoint] = useState('');
  const [arrivalPoint, setArrivalPoint] = useState('');
  const [date, setDate] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedBus, setSelectedBus] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  // Contact form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const buses = [
    { id: 1, name: 'Express Bus', time: '10:00 AM', price: '130 EGP', pickup: 'Borg Al-Arab', arrival: 'Cairo', date: '2024-12-27' },
    { id: 2, name: 'City Bus', time: '12:00 PM', price: '50 EGP', pickup: 'Alexandria', arrival: 'Borg Al-Arab', date: '2024-12-26' },
    { id: 3, name: 'Tour Bus', time: '08:00 AM', price: '200 EGP', pickup: 'Cairo', arrival: 'Sharm El-Sheikh', date: '2024-12-25' },

  ];

  const popularRoutes = [
    { id: 1, route: 'Borg Al-Arab to Cairo' },
    { id: 2, route: 'Alexandria to Borg Al-Arab' },
    // Add more popular routes...
  ];

  const [filteredBuses, setFilteredBuses] = useState(buses);

  const handleRouteSelect = route => setSelectedRoute(route);
  const handleBusSelect = bus => {
    setSelectedBus(bus);
    // Navigate to seat selection page (update as per your routing setup)
  };

  const toggleContactForm = () => setShowContactForm(!showContactForm);

  const handleSearch = () => {
    const filtered = buses.filter(bus =>
      (pickupPoint ? bus.pickup === pickupPoint : true) &&
      (arrivalPoint ? bus.arrival === arrivalPoint : true) &&
      (date ? bus.date === date : true)
    );
    setFilteredBuses(filtered);
  };

  // Handle the contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name,
      email,
      message,
    };

    try {
      const response = await axios.post('http://localhost:5000/contact', contactData);
      setResponseMessage('Message sent successfully');
      console.log('Contact message saved:', response.data);
    } catch (error) {
      setResponseMessage('Failed to send message');
      console.error('Error sending contact message:', error);
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="company-title">Bus Reservation</h1>
      </header>

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
              <p>Time: {bus.time}</p>
              <p>Price: {bus.price}</p>
              <p>Pickup: {bus.pickup}</p>
              <p>Arrival: {bus.arrival}</p>
              <p>Date: {bus.date}</p>
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
