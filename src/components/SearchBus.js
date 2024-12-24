// src/components/SearchBuses.js
import React, { useState } from 'react';

const SearchBuses = ({ onSearch }) => {
  const [busType, setBusType] = useState('');
  const [minSeats, setMinSeats] = useState('');

  const handleSearch = () => {
    onSearch({
      busType,
      minSeats: minSeats ? parseInt(minSeats) : null,
    });
  };

  return (
    <div className="search-buses">
      <h2>Search for Buses</h2>

      <div>
        <label htmlFor="busType">Bus Type: </label>
        <select
          id="busType"
          value={busType}
          onChange={(e) => setBusType(e.target.value)}
        >
          <option value="">Select Bus Type</option>
          <option value="Luxury Coach">Luxury Coach</option>
          <option value="Standard Coach">Standard Coach</option>
        </select>
      </div>

      <div>
        <label htmlFor="minSeats">Minimum Available Seats: </label>
        <input
          type="number"
          id="minSeats"
          value={minSeats}
          onChange={(e) => setMinSeats(e.target.value)}
          min="0"
        />
      </div>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBuses;
