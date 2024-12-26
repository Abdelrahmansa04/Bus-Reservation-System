import './App.css'
import React from 'react'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './login'
import Homepage from './Homepage'
import AddBus from './components/AddBus.jsx';
import BusList from './components/Buslist.jsx';


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path= '/register' element = {<Signup />}></Route>
      <Route path='/home' element={<Homepage />}></Route>
      <Route path= '/login' element = {<Login />}></Route>
      <Route path='/add-bus' element={
            <>
            <AddBus />
            <BusList />
            </>
        }></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
