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
    { id: 1, name: 'Express Bus', time: '10:00 AM', price: '130 EGP', pickup: 'Borg Al-Arab', arrival: 'Cairo' },
    { id: 2, name: 'City Bus', time: '12:00 PM', price: '50 EGP', pickup: 'Alexandria', arrival: 'Borg Al-Arab' },
    { id: 3, name: 'Night Bus', time: '9:00 PM', price: '130 EGP', pickup: 'Borg Al-Arab', arrival: 'Alexandria' },
  ];

  const popularRoutes = [
    { id: 1, route: 'Borg Al-Arab to Cairo' },
    { id: 2, route: 'Alexandria to Borg Al-Arab' },
    { id: 3, route: 'Borg Al-Arab to Alexandria' },
  ];

  const filteredBuses = buses.filter(bus =>
    (pickupPoint ? bus.pickup === pickupPoint : true) &&
    (arrivalPoint ? bus.arrival === arrivalPoint : true) &&
    (selectedRoute ? `${bus.pickup} to ${bus.arrival}` === selectedRoute : true)
  );

  const handleRouteSelect = route => setSelectedRoute(route);
  const handleBusSelect = bus => {
    setSelectedBus(bus);
    navigate('/seat-selection');
  };

  const toggleContactForm = () => setShowContactForm(!showContactForm);

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="company-title">MyBus Reservation</h1>
      </header>

      <div className="bus-search-bar">
        <select onChange={e => setPickupPoint(e.target.value)} value={pickupPoint}>
          <option value="">Pickup Point</option>
          <option value="Borg Al-Arab">Borg Al-Arab</option>
          <option value="Alexandria">Alexandria</option>
        </select>
        <select onChange={e => setArrivalPoint(e.target.value)} value={arrivalPoint}>
          <option value="">Arrival Point</option>
          <option value="Cairo">Cairo</option>
          <option value="Borg Al-Arab">Borg Al-Arab</option>
          <option value="Alexandria">Alexandria</option>
        </select>
        <input type="date" onChange={e => setDate(e.target.value)} value={date} />
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
        {filteredBuses.length ? (
          filteredBuses.map(bus => (
            <div className="bus-card" key={bus.id} onClick={() => handleBusSelect(bus)}>
              <h3>{bus.name}</h3>
              <p>Time: {bus.time}</p>
              <p>Price: {bus.price}</p>
              <p>Pickup: {bus.pickup}</p>
              <p>Arrival: {bus.arrival}</p>
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
        <div className="contact-us-form">
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
