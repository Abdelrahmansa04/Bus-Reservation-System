import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Perform payment processing here (e.g., API call)
    navigate('/payment-success'); // Redirect to payment success
  };

  return (
    <div className="payment-container">
      <h1>Complete Your Payment</h1>
      <form className="payment-form" onSubmit={handlePaymentSubmit}>
        <input
          type="text"
          placeholder="Card Number"
          value={paymentDetails.cardNumber}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          value={paymentDetails.cardExpiry}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardExpiry: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="CVC"
          value={paymentDetails.cardCvc}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardCvc: e.target.value })}
          required
        />
        <button type="submit" className="cta-button">Pay Now</button>
      </form>
    </div>
  );
};

export default Payment;
