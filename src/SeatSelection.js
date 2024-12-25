// src/SeatSelection.js
import React, { useState } from 'react';
import './SeatSelection.css'; // Import the CSS file for styling

const SeatSelection = () => {
  const rows = 6; // Number of rows in the bus
  const seatsPerRow = 4; // Number of seats per row
  const [seats, setSeats] = useState(
    Array(rows).fill(Array(seatsPerRow).fill(false)) // Initialize all seats as available (false)
  );

  const toggleSeat = (row, seatIndex) => {
    const updatedSeats = [...seats];
    updatedSeats[row][seatIndex] = !updatedSeats[row][seatIndex];
    setSeats(updatedSeats);
  };

  return (
    <div className="seat-selection-container">
      <h2>Select Your Seats</h2>
      <div className="bus-seats">
        {seats.map((row, rowIndex) => (
          <div className="seat-row" key={rowIndex}>
            {row.map((seat, seatIndex) => (
              <button
                key={seatIndex}
                className={`seat ${seat ? 'selected' : 'available'}`}
                onClick={() => toggleSeat(rowIndex, seatIndex)}
                disabled={seat} // Disable the seat if already selected
              >
                {seat ? 'Selected' : 'Available'}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="actions">
        <button className="confirm-button">Confirm Seats</button>
      </div>
    </div>
  );
};

export default SeatSelection;
