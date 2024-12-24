import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">King's trip</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Bus Schedules</a></li>
          <li><a href="#">Booking</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
        <button className="login-btn">Login / Signup</button>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Choose your trip</h1>
        <p>Find and book your bus tickets quickly and securely.</p>
        <div className="search-bar">
          <input type="text" placeholder="Departure City" />
          <input type="text" placeholder="Destination City" />
          <input type="date" />
          <button className="search-btn">Search</button>
        </div>
      </header>
      <HomePage /> {/* Render the HomePage component */}
      {/* Featured Services */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="card">
            <h3>Online Booking</h3>
            <p>Book tickets anytime, anywhere.</p>
          </div>
          <div className="card">
            <h3>Real-Time Availability</h3>
            <p>Check seat availability in real-time.</p>
          </div>
          <div className="card">
            <h3>Customer Support</h3>
            <p>24/7 assistance for your journey.</p>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="popular-routes">
        <h2>Popular Routes</h2>
        <ul>
          <li>Borg al-arab →Alexandria - 50EGP</li>
          <li>Borg al-arab → Cairo - 130EGP</li>
          <li>Alexandria →  Borg al-arab - 50EGP</li>
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Bus Reservation System. All rights reserved.</p>
          <ul className="social-links">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
// src/App.js

export default App;
