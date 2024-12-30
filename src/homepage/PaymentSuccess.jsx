import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PaymentSuccess.css';
import authen from '../authent';

const port = 3001

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { index } = useParams();
  authen()

  const handleProceedToTicketSummary = () => {
    navigate(`/Ticket-summary/${index}`);  // Redirects to the TicketSummary page
  };

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
