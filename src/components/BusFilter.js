// src/BusFilter.js
import React, { useState } from 'react';

const BusFilter = ({ buses, onFilter }) => {
  const [minSeats, setMinSeats] = useState(0);

  const handleFilterChange = (e) => {
    setMinSeats(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="bus-filter">
      <label htmlFor="minSeats">Minimum Available Seats: </label>
      <input
        type="number"
        id="minSeats"
        value={minSeats}
        onChange={handleFilterChange}
        min="0"
      />
    </div>
  );
};

export default BusFilter;
