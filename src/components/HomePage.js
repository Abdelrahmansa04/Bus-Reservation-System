// src/components/HomePage.js
import React, { useState } from 'react';
import BusDetails from './BusDetails';
import BusFilter from './BusFilter';
import SearchBuses from './SearchBus';

const HomePage = () => {
  // Sample data for buses
  const buses = [
    {
      busName: 'Express Travel 101',
      busType: 'Luxury Coach',
      departureTime: '2024-12-25 08:00 AM',
      availableSeats: 30,
      facilities: ['Wi-Fi', 'Air Conditioning', 'Reclining Seats', 'Charging Ports'],
      imageUrl: '"D:\EJUST\Website Bus system\code\bus-reservation\homepage\homepage\public\bus.webp"', // Example image URL
    },
    {
      busName: 'Fast Ride 202',
      busType: 'Standard Coach',
      departureTime: '2024-12-25 10:00 AM',
      availableSeats: 25,
      facilities: ['Air Conditioning', 'Charging Ports'],
      imageUrl: '"D:\EJUST\Website Bus system\code\bus-reservation\homepage\homepage\public\bus.webp"', // Example image URL
    },
   
  ];

  // State for storing filtered buses
  const [filteredBuses, setFilteredBuses] = useState(buses);

  // Function to filter buses based on criteria
  const handleSearch = (searchCriteria) => {
    const filtered = buses.filter(bus => {
      // You can add more complex filtering logic here based on criteria
      return (
        (searchCriteria.busType ? bus.busType === searchCriteria.busType : true) &&
        (searchCriteria.minSeats ? bus.availableSeats >= searchCriteria.minSeats : true)
      );
    });
    setFilteredBuses(filtered);
  };

  return (
    <div className="home-page">
      <h1>Welcome to Bus Reservation System</h1>

      {/* Search for buses */}
      <SearchBuses onSearch={handleSearch} />

      {/* Filter by available seats */}
      <BusFilter buses={filteredBuses} onFilter={handleSearch} />
      
      
      {/* Bus Details Section */}
      <BusDetails buses={filteredBuses} />
    </div>
  );
};

export default HomePage;
