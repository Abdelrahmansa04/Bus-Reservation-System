import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import SeatSelection from './SeatSelection';
import Payment from './Payment';
import PaymentSuccess from './PaymentSuccess';
import TicketSummary from './TicketSummary';  // Import TicketSummary component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/ticket-summary" element={<TicketSummary />} /> {/* Add route for Ticket Summary */}
      </Routes>
    </Router>
  );
};

export default App;
