// TicketSummary.jsx
import React from 'react';
import { useLocation } from 'react-router-dom'; // Updated import for useLocation
// TicketSummary.jsx
import './TicketSummary.css'; // Correct import for renamed file


const TicketSummary = () => {
  const location = useLocation();
  const { selectedSeats, totalCost } = location.state || {}; // Access passed data

  return (
    <div className="ticket-summary-container">
      <h2>Ticket Summary</h2>
      <div className="ticket-details">
        <p><strong>Selected Seats:</strong> {selectedSeats ? selectedSeats.join(', ') : 'No seats selected'}</p>
        <p><strong>Total Cost:</strong> ${totalCost}</p>
      </div>

      <div className="bus-details">
        <h3>Bus Details</h3>
        <p><strong>Bus Name:</strong> XYZ Bus Co.</p>
        <p><strong>Bus Route:</strong> City A to City B</p>
        <p><strong>Departure Time:</strong> 10:00 AM</p>
        <p><strong>Arrival Time:</strong> 2:00 PM</p>
      </div>
    </div>
  );
};

export default TicketSummary;
