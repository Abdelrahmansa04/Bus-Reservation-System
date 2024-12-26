import React, { useState } from 'react';
import './SeatSelection.css';

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleConfirmation = () => {
    setIsConfirmed(true);
  };

  const handleResetSelection = () => {
    setSelectedSeats([]);
    setIsConfirmed(false);
  };

  const seatLayout = [
    { id: 'driver', position: 'driver', isAvailable: false, number: 'Driver' },
    { id: 'door', position: 'door', isAvailable: false, number: 'Door' },
    { id: '1', position: 'available', isAvailable: true, number: 'Available' },
    { id: '2', position: 'available', isAvailable: true, number: 'Available' },
    { id: '3', position: 'available', isAvailable: true, number: 'Available' },
    { id: '4', position: 'available', isAvailable: true, number: 'Available' },
    { id: '5', position: 'available', isAvailable: true, number: 'Available' },
    { id: '6', position: 'available', isAvailable: true, number: 'Available' },
    { id: '7', position: 'available', isAvailable: true, number: 'Available' },
    { id: '8', position: 'available', isAvailable: true, number: 'Available' },
    { id: '9', position: 'available', isAvailable: true, number: 'Available' },
    { id: '10', position: 'available', isAvailable: true, number: 'Available' },
  ];

  return (
    <div className="seat-selection-container">
      <h2>Select Your Seats</h2>
      <div className="seat-grid">
        {/* Top Row: Driver and Door */}
        <div className="seat-row top-row">
          <div
            className={`seat driver ${!seatLayout[0].isAvailable ? 'disabled' : ''}`}
          >
            {seatLayout[0].number}
          </div>
          <div
            className={`seat door ${!seatLayout[1].isAvailable ? 'disabled' : ''}`}
          >
            {seatLayout[1].number}
          </div>
        </div>

        {/* Seats Below Driver and Door */}
        <div className="seat-columns">
          {/* Left Column Below Driver */}
          <div className="seat-column">
            {seatLayout.slice(2, 6).map((seat) => (
              <div
                key={seat.id}
                className={`seat ${seat.position} ${selectedSeats.includes(seat.id) ? 'selected' : ''} ${
                  !seat.isAvailable ? 'disabled' : ''
                }`}
                onClick={() => seat.isAvailable && handleSeatSelect(seat.id)}
              >
                {seat.number}
              </div>
            ))}
          </div>

          {/* Right Column Below Door */}
          <div className="seat-column">
            {seatLayout.slice(6, 10).map((seat) => (
              <div
                key={seat.id}
                className={`seat ${seat.position} ${selectedSeats.includes(seat.id) ? 'selected' : ''} ${
                  !seat.isAvailable ? 'disabled' : ''
                }`}
                onClick={() => seat.isAvailable && handleSeatSelect(seat.id)}
              >
                {seat.number}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="confirmation">
        {selectedSeats.length > 0 && !isConfirmed && (
          <button className="confirm-button" onClick={handleConfirmation}>
            Confirm Selection
          </button>
        )}
        {isConfirmed && (
          <div className="confirmation-message">
            <p>
              You have selected {selectedSeats.length} seat(s): {selectedSeats.join(', ')}
            </p>
          </div>
        )}
        <button className="reset-button" onClick={handleResetSelection}>
          Reset Selection
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
