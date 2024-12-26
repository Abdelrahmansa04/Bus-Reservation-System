import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
  const [pickupPoint, setPickupPoint] = useState('');
  const [arrivalPoint, setArrivalPoint] = useState('');
  const [date, setDate] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedBus, setSelectedBus] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const buses = [
    { id: 1, name: 'Express Bus', time: '10:00 AM', price: '130 EGP', pickup: 'Borg Al-Arab', arrival: 'Cairo', date: '2024-12-27' },
    { id: 2, name: 'City Bus', time: '12:00 PM', price: '50 EGP', pickup: 'Alexandria', arrival: 'Borg Al-Arab', date: '2024-12-26' },
    { id: 3, name: 'Night Bus', time: '9:00 PM', price: '130 EGP', pickup: 'Borg Al-Arab', arrival: 'Alexandria', date: '2024-12-28' },
    { id: 4, name: 'Express Bus', time: '8:00 AM', price: '350 EGP', pickup: 'Borg Al-Arab', arrival: 'Aswan', date: '2024-12-28' },
    { id: 5, name: 'City Bus', time: '6:00 PM', price: '130 EGP', pickup: 'Alexandria', arrival: 'Sharm El-Sheikh', date: '2024-12-28' },
    { id: 6, name: 'Night Bus', time: '1:00 PM', price: '130 EGP', pickup: 'Sharm El-Sheikh', arrival: 'Alexandria', date: '2024-12-28' },
    { id: 7, name: 'Express Bus', time: '7:00 AM', price: '200 EGP', pickup: 'Cairo', arrival: 'Luxor', date: '2024-12-29' },
    { id: 8, name: 'City Bus', time: '3:00 PM', price: '180 EGP', pickup: 'Alexandria', arrival: 'Tanta', date: '2024-12-29' },
    { id: 9, name: 'Night Bus', time: '10:00 PM', price: '150 EGP', pickup: 'Cairo', arrival: 'Hurghada', date: '2024-12-30' },
    { id: 10, name: 'City Bus', time: '11:00 AM', price: '120 EGP', pickup: 'Aswan', arrival: 'Cairo', date: '2024-12-30' },
    { id: 11, name: 'Express Bus', time: '5:00 AM', price: '100 EGP', pickup: 'Sharm El-Sheikh', arrival: 'Dahab', date: '2024-12-31' },
    { id: 12, name: 'Night Bus', time: '8:00 PM', price: '160 EGP', pickup: 'Luxor', arrival: 'Cairo', date: '2024-12-31' },
    { id: 13, name: 'City Bus', time: '2:00 PM', price: '130 EGP', pickup: 'Hurghada', arrival: 'Cairo', date: '2025-01-01' },
  ];

  const popularRoutes = [
    { id: 1, route: 'Borg Al-Arab to Cairo' },
    { id: 2, route: 'Alexandria to Borg Al-Arab' },
    { id: 3, route: 'Borg Al-Arab to Alexandria' },
    { id: 5, route: 'Sharm El-Sheikh to Alexandria' },
  ];

  const [filteredBuses, setFilteredBuses] = useState(buses);

  const handleRouteSelect = route => setSelectedRoute(route);
  const handleBusSelect = bus => {
    setSelectedBus(bus);
    navigate('/seat-selection');
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
          <form onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <input type="tel" placeholder="Your Phone Number" required />
            <button type="submit">Send Message</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Homepage;
