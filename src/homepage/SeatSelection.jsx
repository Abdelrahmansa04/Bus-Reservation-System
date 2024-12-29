import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import './SeatSelection.css';
import axios from 'axios';
import authen from '../authent';

const port = 3001

const SeatSelection = () => {
  const navigate = useNavigate();
  const { busId } = useParams();
  const [busDetails, setBusDetails] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  // Initial selected seats and bus details
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [confirmation, setConfirmation] = useState(false);

  
  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:${port}/seatselection/${busId}`);
        console.log(response.data)
        setBusDetails(response.data);
      } catch (err) {
        console.error('Error fetching bus details:', err);
        setError('Failed to fetch bus details.');
      } finally {
        setLoading(false);
      }
    };

    if (busId) {
      fetchBusDetails();
    }
  }, [busId]);


  // Sample seat grid (Assuming bus has 10 seats per row)
  // const seats = Array(20).fill(false); // 20 seats in total (for simplicity)

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
    if (selectedSeats.length > 0) {
      setConfirmation(true);
    } else {
      alert('Please select at least one seat before confirming.');
    }
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length > 0) {
      navigate('/payment');
    } else {
      alert('You must select at least one seat to proceed to payment.');
    }
  };

  if (loading) {
    return <p>Loading bus details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="seat-selection-page">
      <header className="header">
        <h1>Seat Selection</h1>
      </header>

      <div className="bus-details">
      <h2>Bus details</h2>
        <p>Time: {busDetails.time.departureTime}</p>
        <p>Price per seat: {busDetails.price}</p>
        <p>Pickup: {busDetails.location.pickupLocation}</p>
        <p>Arrival: {busDetails.location.arrivalLocation}</p>
        <p>Date: {busDetails.schedule}</p>
      </div>

      <div className="seat-grid">
        {busDetails.seats.bookedSeats.map((_, index) => (
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
          <button
            className="proceed-btn"
            onClick={handleProceedToPayment}
            disabled={selectedSeats.length === 0}
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
