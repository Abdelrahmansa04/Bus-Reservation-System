// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import SeatSelection from './SeatSelection';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
      </Routes>
    </Router>
  );
};

export default App;
