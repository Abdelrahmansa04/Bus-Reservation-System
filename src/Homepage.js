import React, { useState } from 'react';
import './Homepage.css'; // Import the updated CSS file

const Homepage = () => {
  const [pickupPoint, setPickupPoint] = useState('');
  const [arrivalPoint, setArrivalPoint] = useState('');
  const [date, setDate] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');

  // Example bus data with pickup and arrival points
  const buses = [
    { id: 1, name: 'Express Bus', time: '10:00 AM', price: '130 EGP', pickup: 'Borg Al-Arab', arrival: 'Cairo' },
    { id: 2, name: 'City Bus', time: '12:00 PM', price: '50 EGP', pickup: 'Alexandria', arrival: 'Borg Al-Arab' },
    { id: 3, name: 'Night Bus', time: '9:00 PM', price: '130 EGP', pickup: 'Borg Al-Arab', arrival: 'Alexandria' },
  ];

  const popularRoutes = [
    { id: 1, route: 'Borg Al-Arab to Cairo' },
    { id: 2, route: 'Alexandria to Borg Al-Arab' },
    { id: 3, route: 'Borg Al-Arab to Alexandria' },
  ];

  const handlePickupChange = (e) => setPickupPoint(e.target.value);
  const handleArrivalChange = (e) => setArrivalPoint(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleRouteSelect = (route) => setSelectedRoute(route);

  const filteredBuses = buses.filter(bus => 
    (pickupPoint ? bus.pickup === pickupPoint : true) &&
    (arrivalPoint ? bus.arrival === arrivalPoint : true) &&
    (date ? bus.time.includes(date) : true) &&
    (selectedRoute ? bus.pickup + ' to ' + bus.arrival === selectedRoute : true)
  );

  return (
    <div className="home-page">
      <div className="bus-search-bar">
        <select onChange={handlePickupChange} value={pickupPoint}>
          <option value="">Pickup Point</option>
          <option value="Borg Al-Arab">Borg Al-Arab</option>
          <option value="Alexandria">Alexandria</option>
        </select>
        <select onChange={handleArrivalChange} value={arrivalPoint}>
          <option value="">Arrival Point</option>
          <option value="Cairo">Cairo</option>
          <option value="Borg Al-Arab">Borg Al-Arab</option>
          <option value="Alexandria">Alexandria</option>
        </select>
        <input 
          type="date" 
          onChange={handleDateChange} 
          value={date}
          className="bus-search-bar-input"
        />
      </div>

      <div className="popular-routes">
        <h3>Popular Routes</h3>
        <ul>
          {popularRoutes.map(route => (
            <li key={route.id} onClick={() => handleRouteSelect(route.route)}>
              {route.route}
            </li>
          ))}
        </ul>
      </div>

      <div className="bus-list">
        {filteredBuses.length ? filteredBuses.map(bus => (
          <div className="bus-card" key={bus.id}>
            <h3>{bus.name}</h3>
            <p>Time: {bus.time}</p>
            <p>Price: {bus.price}</p>
            <p>Pickup: {bus.pickup}</p>
            <p>Arrival: {bus.arrival}</p>
          </div>
        )) : <p>No buses found matching your criteria.</p>}
      </div>

      <div className="contact-us">
        <h3>Contact Us</h3>
        <input type="text" placeholder="Name" className="contact-input" />
        <input type="email" placeholder="Email" className="contact-input" />
        <textarea placeholder="Your Message" className="contact-textarea"></textarea>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Homepage;
