import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { busId } = useParams();
  const [busDetails, setBusDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const port = 3001

  const handleProceedToTicketSummary = () => {
    navigate(`/Ticket-summary/${busDetails._id}`);  // Redirects to the TicketSummary page
  };

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


  return (
    <div className="payment-success-container">
      <h1>Payment Successful</h1>
      <p>Your payment has been processed successfully!</p>
      <p>Thank you for booking your trip with us. <br />You will receive a confirmation message shortly.</p>
      <button onClick={handleProceedToTicketSummary} className="cta-button">
        Proceed to the Ticket Summary
      </button>
    </div>
  );
};

export default PaymentSuccess;
