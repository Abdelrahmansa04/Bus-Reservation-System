// src/components/BusDetails.js
import React from 'react';

const BusDetails = ({ buses }) => {
  return (
    <div className="bus-details">
      <h2>Bus Details</h2>
      {buses.length > 0 ? (
        buses.map((bus, index) => (
          <div key={index} className="bus-card">
            <img src={bus.imageUrl} alt={bus.busName} className="bus-image" />
            <div className="bus-info">
              <h3>{bus.busName}</h3>
              <p><strong>Bus Type:</strong> {bus.busType}</p>
              <p><strong>Departure Time:</strong> {bus.departureTime}</p>
              <p><strong>Available Seats:</strong> {bus.availableSeats}</p>
              <p><strong>Facilities:</strong> {bus.facilities.join(', ')}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No buses available with the selected filters.</p>
      )}
    </div>
  );
};

export default BusDetails;
