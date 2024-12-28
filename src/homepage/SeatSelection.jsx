import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SeatSelection.css';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode'; // Ensure this import is at the top
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

  // Authentication check using the authen() function
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3001/auth', { withCredentials: true });
  //       if (!response.data.authenticated) {
  //         alert("Please log in to select a seat.");
  //         navigate('/login'); // Redirect to login if not authenticated
  //       }
  //     } catch (error) {
  //       console.error('Authentication check failed:', error);
  //       navigate('/login'); // Redirect to login if an error occurs
  //     }
  //   };
  //   checkAuth();
  // }, [navigate]);

  // Fetch bus details using the busId
  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:${port}/seatselection/${busId}`);
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
      // Fetch the authentication token
      const token = localStorage.getItem('authToken'); // Or retrieve from cookies
      if (!token) {
        alert('Please log in to select a seat.');
        navigate('/login'); // Redirect to login if no token is found
        return;
      }

      // Decode the token to extract the user ID
      const decodedToken = jwt_decode(token); // Decode the token
      const userId = decodedToken.userId; // Ensure the token contains the user ID

      if (!userId) {
        throw new Error('Token is invalid or missing user ID.');
      }

      // Update the selected seats in the state
      setSelectedSeats((prev) => {
        const newSeats = [...prev];
        if (newSeats.includes(index)) {
          newSeats.splice(newSeats.indexOf(index), 1); // Deselect seat if already selected
        } else {
          newSeats.push(index); // Select the seat
        }
        return newSeats;
      });

      // Send the seat selection data to the backend
      const response = await axios.post(
        `http://localhost:${port}/seatselection/${busId}`,
        { seatIndex: index, userId },
        { withCredentials: true }
      );

      console.log('Seat selection successful:', response.data);
    } catch (err) {
      console.error('Error selecting seat:', err);
    }
  };

  const handleConfirmSeats = () => {
    setConfirmation(true);
  };

  const handleProceedToPayment = () => {
    navigate('/payment'); // Logic to proceed to the payment page
  };

  if (loading) {
    return <p>Loading bus details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  authen()

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
          <button className="proceed-btn" onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
