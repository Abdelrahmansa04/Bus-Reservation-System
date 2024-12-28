import React, { useState,useEffect } from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import './SeatSelection.css';
import authent from "../authent";
import axios from "axios";

const port = 3001

const SeatSelection = () => {
  const navigate = useNavigate();
  const { busId } = useParams();

  useEffect(() => {
    // You can fetch the bus details based on the busId here
    console.log("Selected Bus ID:", busId);
    // Fetch the bus data using the busId, if necessary
  }, [busId]);

  // Initial selected seats and bus details
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [confirmation, setConfirmation] = useState(false);

  // Sample bus details (should come from the selected bus)
  const busDetails = {
    name: 'Express Bus',
    time: '10:00 AM',
    price: '130 EGP',
    pickup: 'Borg Al-Arab',
    arrival: 'Cairo',
    date: '2024-12-27',
  };

  // Sample seat grid (Assuming bus has 10 seats per row)
  const seats = Array(20).fill(false); // 20 seats in total (for simplicity)

  const handleSeatSelect = (index) => {
    setSelectedSeats((prev) => {
      const newSeats = [...prev];
      if (newSeats.includes(index)) {
        newSeats.splice(newSeats.indexOf(index), 1); // Deselect seat if already selected
      } else {
        newSeats.push(index); // Select the seat
      }
      return newSeats;
    });
  };

  const handleConfirmSeats = () => {
    setConfirmation(true);
  };

  const handleProceedToPayment = () => {
    // Logic to proceed to the payment page (e.g., navigate to a payment page)
    navigate('/payment');
  };
  

  authent()


  return (
    <div className="seat-selection-page">
      <header className="header">
        <h1>Seat Selection</h1>
      </header>

      <div className="bus-details">
        <h2>{busDetails.name}</h2>
        <p>Time: {busDetails.time}</p>
        <p>Price per seat: {busDetails.price}</p>
        <p>Pickup: {busDetails.pickup}</p>
        <p>Arrival: {busDetails.arrival}</p>
        <p>Date: {busDetails.date}</p>
      </div>

      <div className="seat-grid">
        {seats.map((_, index) => (
          <div
            key={index}
            className={`seat ${selectedSeats.includes(index) ? 'selected' : ''}`}
            onClick={() => handleSeatSelect(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {confirmation ? (
        <div className="seat-confirmation">
          <h3>Seats Confirmed</h3>
          <p>Selected Seats: {selectedSeats.map((seat) => seat + 1).join(', ')}</p>
        </div>
      ) : (
        <button className="confirm-btn" onClick={handleConfirmSeats}>
          Confirm Seats
        </button>
      )}

      {confirmation && (
        <div className="payment-bar">
          <button className="proceed-btn" onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
