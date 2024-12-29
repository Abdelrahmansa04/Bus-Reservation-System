import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleProceedToTicketSummary = () => {
    navigate('/Ticket-summary');  // Redirects to the TicketSummary page
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
