import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import SeatSelection from './SeatSelection';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
      </Routes>
    </Router>
  );
};

export default App;
