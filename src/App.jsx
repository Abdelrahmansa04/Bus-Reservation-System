import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Signup from './components/signup/Signup.jsx'
import Login from './components/login/login.jsx'
import authen from './authent.jsx'

// Components for Bus Management
import AddBus from './components/addBus/AddBus.jsx'
import BusList from './components/busList/Buslist.jsx'

// Homepage & Other Pages
import Homepage from './components/homePage/Homepage.jsx'
import SeatSelection from './components/seatSelection/SeatSelection.jsx'
import Payment from './components/payment/Payment.jsx'
import PaymentSuccess from './components/paymentSuccess/PaymentSuccess.jsx'
import TicketSummary from './components/ticketSummary/TicketSummary.jsx'
import Profile from './components/Profile/profile.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import AdminLogin from './components/adminLogin/AdminLogin.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page - changed to root path */}
        <Route path="/" element={<LandingPage />} />
        
        {/* User Routes */}
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/seat-selection/:busId" element={<SeatSelection />} />
        <Route path="/payment/:selectedSeats" element={<Payment />} />
        <Route path="/payment-success/:selectedSeats" element={<PaymentSuccess />} />
        <Route path="/ticket-summary/:selectedSeats" element={<TicketSummary />} />
        <Route path="/authen" element={<authen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route path="/add-bus" element={<AddBus />} />
        <Route path="/bus-list" element={<BusList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
