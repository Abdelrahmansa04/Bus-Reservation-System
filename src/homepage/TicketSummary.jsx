import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Ticketsummary.css';

const TicketSummary = () => {
  const navigate = useNavigate();
    const { busId } = useParams();
    const [busDetails, setBusDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const port = 3001
  
    useEffect(() => {
      const fetchBusDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:${port}/seatselection/${busId}`);
          console.log(response.data)
          setBusDetails(response.data);
        } catch (err) {
          console.error('Error fetching bus details:', err);
          // co('Failed to fetch bus details.');
        } finally {
          setLoading(false);
        }
      };
  
      if (busId) {
        fetchBusDetails();
      }
      
    }, [busId]);
  

  // Simulated data (this would be passed as props or fetched from state)
  // const passenger = {
  //   name: 'Abdelrahman Saeed',
  //   email: 'abdelrahmansaeed288@gmail.com',
  //   phone: '+1234567890'
  // };

  // const booking = {
  //   busName: 'Express Bus',
  //   departureTime: '10:00 AM',
  //   pickup: 'Borg Al-Arab',
  //   arrival: 'Cairo',
  //   seats: ['A1', 'A2'],
  //   totalPrice: '260 EGP'
  // };

  // Handle redirection to home or another page
  const handleHomeRedirect = () => {
    navigate('/home');
  };

  return (
    <div className="ticket-summary-page">
      <div className="summary-container">
        <h1>Ticket Summary</h1>

        <div className="details">
          <h3 className="details-title">Passenger Information</h3>
          <p><strong>Name:</strong> {passenger.name}</p>
          <p><strong>Email:</strong> {passenger.email}</p>
          <p><strong>Phone:</strong> {passenger.phone}</p>
        </div>

        <div className="details">
          <h3 className="details-title">Bus Details</h3>
          <p><strong>Bus:</strong> {booking.busName}</p>
          <p><strong>Departure Time:</strong> {booking.departureTime}</p>
          <p><strong>Pickup:</strong> {booking.pickup}</p>
          <p><strong>Arrival:</strong> {booking.arrival}</p>
        </div>

        <div className="details">
          <h3 className="details-title">Seats Selected</h3>
          <p>{booking.seats.join(', ')}</p>
        </div>

        <div className="details">
          <h3 className="details-title">Total Price</h3>
          <p>{booking.totalPrice}</p>
        </div>

        <button className="cta-button" onClick={handleHomeRedirect}>
          Return to Home
        </button>

        <div className="summary-footer">
          <p>If you need any assistance, feel free to contact us.</p>
        </div>
      </div>
    </div>
  );
};

export default TicketSummary;
