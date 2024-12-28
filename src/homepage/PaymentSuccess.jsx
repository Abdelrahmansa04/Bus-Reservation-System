import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/ticket-summary');
    }, 3000); // Redirect to Ticket Summary after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  return (
    <div className="payment-success-container">
      <h1 className="success-message">Payment Successful!</h1>
      <p>Your payment has been processed successfully. You will be redirected to your ticket summary shortly.</p>
      <p>If you are not redirected, click below:</p>
      <button className="cta-button" onClick={() => navigate('/ticket-summary')}>View Ticket Summary</button>
    </div>
  );
};

export default PaymentSuccess;
