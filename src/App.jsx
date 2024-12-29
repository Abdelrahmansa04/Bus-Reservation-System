import './App.css'
import React from 'react'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './login'
import authen from './authent.jsx'
//from components
import AddBus from './components/AddBus.jsx';
import BusList from './components/Buslist.jsx';
//form homepage
import Homepage from './homepage/Homepage'
import SeatSelection from './homepage/SeatSelection'
import Payment from './homepage/Payment';
import PaymentSuccess from './homepage/PaymentSuccess';
import TicketSummary from './homepage/TicketSummary';  // Import TicketSummary component
import Profile from './homepage/profile.jsx';




function App() {
  return (
   <BrowserRouter>
    <Routes>

      <Route path= '/register' element = {<Signup />}></Route>
      <Route path= '/login' element = {<Login />}></Route>
      <Route path='/home' element={<Homepage />}></Route>
      <Route path='/seat-selection/:busId' element={<SeatSelection />}></Route>
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/ticket-summary" element={<TicketSummary />} /> {/* Add route for Ticket Summary */}
      <Route path="/authen" element={<authen />}></Route>

      <Route path='/add-bus' element={
            <>
            <AddBus />
            <BusList />
            </>
      }></Route>
      <Route path='/profile' element={<Profile/>}></Route>

    </Routes>
   </BrowserRouter>
  )
}

export default App
