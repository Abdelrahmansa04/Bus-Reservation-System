import React, { useState } from 'react';
import './Homepage.css';

const Homepage = () => {
  const [pickupPoint, setPickupPoint] = useState('');
  const [arrivalPoint, setArrivalPoint] = useState('');
  const [date, setDate] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);

  const toggleContactForm = () => setShowContactForm(prevState => !prevState);

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

  const handlePickupChange = e => setPickupPoint(e.target.value);
  const handleArrivalChange = e => setArrivalPoint(e.target.value);
  const handleDateChange = e => setDate(e.target.value);
  const handleRouteSelect = route => setSelectedRoute(route);
  const handleBusSelect = bus => setSelectedBus(bus);
  
  const toggleSeatSelection = seatIndex => {
    setSelectedSeats(prevSeats => 
      prevSeats.includes(seatIndex) 
        ? prevSeats.filter(seat => seat !== seatIndex) 
        : [...prevSeats, seatIndex]
    );
  };

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
        <input type="date" onChange={handleDateChange} value={date} />
      </div>

      <div className="popular-routes">
        <h3>Popular Routes</h3>
        <ul>
          {popularRoutes.map(route => (
            <li key={route.id} onClick={() => handleRouteSelect(route.route)}>{route.route}</li>
          ))}
        </ul>
      </div>

      <div className="bus-list">
        {filteredBuses.length
          ? filteredBuses.map(bus => (
              <div className="bus-card" key={bus.id} onClick={() => handleBusSelect(bus)}>
                <h3>{bus.name}</h3>
                <p>Time: {bus.time}</p>
                <p>Price: {bus.price}</p>
                <p>Pickup: {bus.pickup}</p>
                <p>Arrival: {bus.arrival}</p>
              </div>
            ))
          : <p>No buses found matching your criteria.</p>
        }
      </div>

      {selectedBus && (
        <div className="seat-selection">
          <h3>Select Seats for {selectedBus.name}</h3>
          <div className="seats">
            {[...Array(6)].map((_, rowIndex) => (
              <div className="seat-row" key={rowIndex}>
                {[...Array(4)].map((_, seatIndex) => {
                  const seatNumber = rowIndex * 4 + seatIndex + 1;
                  const isSelected = selectedSeats.includes(seatNumber);
                  return (
                    <button 
                      key={seatIndex} 
                      className={`seat ${isSelected ? 'selected' : 'available'}`} 
                      onClick={() => toggleSeatSelection(seatNumber)}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <button className="confirm-button">Confirm Seats</button>
        </div>
      )}

      <div className="contact-us-bar" onClick={toggleContactForm}>
        <h3>Contact Us</h3>
      </div>

      {showContactForm && (
        <div className="contact-us-form">
          <h3>Write Us a Message</h3>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <input type="tel" placeholder="Your Phone Number" required />
          <button>Send Message</button>
        </div>
      )}
    </div>
  );
};

export default Homepage;
