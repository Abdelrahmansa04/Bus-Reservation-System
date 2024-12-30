import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SeatSelection.css';
import axios from 'axios';
import authen from '../authent';

const port = 3001;

const SeatSelection = () => {
  const navigate = useNavigate();
  const { busId } = useParams();
  const [busDetails, setBusDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [confirmation, setConfirmation] = useState(false);
 
  authen();



  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const req_user = await axios.get(`http://localhost:${port}/auth`, { withCredentials: true });
        console.log(req_user)
        // const response = await axios.get(`http://localhost:${port}/seatselection/${busId}`);
        const response = await axios.get(`http://localhost:${port}/seatselection/${req_user.data.busId}`);
        console.log(response)
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

  const handleSeatSelect = async (index) => {
    try {
      const req_user = await axios.get(`http://localhost:${port}/auth`, { withCredentials: true });
      const userId = req_user.data.userId; // Ensure the token contains the user ID

      if (!userId) {
        alert('Session is ended');
        navigate('/login');
        return;
      }

      // Update the selected seats in the state
      setSelectedSeats((prev) => {
        const newSeats = [...prev];

        // Only allow selecting available seats (index !== "0")
        if (busDetails.seats.bookedSeats[index] === "0") {
          if (newSeats.includes(index)) {
            newSeats.splice(newSeats.indexOf(index), 1); // Deselect seat if already selected
          } else {
            newSeats.push(index); // Select the seat
          }
        } else {
          console.log(`Seat ${index + 1} is already booked and cannot be selected.`);
        }

        return newSeats;
      });

      // Send the seat reservation request to the backend
      // const response = await axios.post(
      //   `http://localhost:${port}/seatselection/${busId}`,
      //   { seatIndex: index, userId },
      //   { withCredentials: true }
      // );

      // console.log('Seat selection successful:', response.data);
    } catch (err) {
      console.error('Error selecting seat:', err);
    }
  };

  const handleConfirmSeats = () => {
    if (selectedSeats.length === 1) {
      setConfirmation(true);
    } else {
      alert('Please select at least one seat before confirming.');
    }
  };

  const handleProceedToPayment = (index) => {
    if (selectedSeats.length === 1) {
      
      navigate(`/payment/${selectedSeats}`);
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
        {busDetails.seats.bookedSeats.map((seat, index) => {
          const isBooked = seat !== "0";  // Check if the seat is booked
          const isSelected = selectedSeats.includes(index);

          return (
            <div
              key={index}
              className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
              onClick={() => !isBooked && handleSeatSelect(index)} // Prevent selecting booked seats
              title={isBooked ? "Can't select this seat" : ""} // Tooltip for unselectable seats
            >
              {index + 1}
            </div>
          );
        })}
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
