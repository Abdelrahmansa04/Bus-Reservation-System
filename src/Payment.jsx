import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: 'visa', // Default to Visa
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  // Function to format card number
  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19); // Max 16 digits with spaces
  };

  // Function to format expiry date
  const formatExpiryDate = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/').slice(0, 5); // Max 4 digits in MM/YY format
  };

  // Function to limit CVC input to 3 digits
  const formatCvc = (value) => {
    return value.replace(/\D/g, '').slice(0, 3); // Max 3 digits
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Perform payment processing here (e.g., API call)
    navigate('/payment-success'); // Redirect to payment success
  };

  return (
    <div className="payment-container">
      <h1>Complete Your Payment</h1>
      <form className="payment-form" onSubmit={handlePaymentSubmit}>
        {/* Payment Method Selection */}
        <div className="payment-method">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="visa"
              checked={paymentDetails.paymentMethod === 'visa'}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, paymentMethod: e.target.value })}
            />
            Visa
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentDetails.paymentMethod === 'cash'}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, paymentMethod: e.target.value })}
            />
            Cash
          </label>
        </div>

        {/* Visa Payment Form (only shown if Visa is selected) */}
        {paymentDetails.paymentMethod === 'visa' && (
          <>
            <input
              type="text"
              placeholder="Card Number"
              value={paymentDetails.cardNumber}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: formatCardNumber(e.target.value) })}
              required
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={paymentDetails.cardExpiry}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cardExpiry: formatExpiryDate(e.target.value) })}
              required
            />
            <input
              type="text"  // Change type to "text" for CVV to prevent up/down arrows
              placeholder="CVC"
              value={paymentDetails.cardCvc}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cardCvc: formatCvc(e.target.value) })}
              maxLength="3" // Limit to 3 digits
              required
            />
          </>
        )}

        <button type="submit" className="cta-button">Pay Now</button>
      </form>
    </div>
  );
};

export default Payment;
