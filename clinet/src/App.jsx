import { useState } from 'react'

import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './login'
import Homepage from './Homepage'

function App() {
  

  return (
   <BrowserRouter>
    <Routes>
      <Route path= '/register' element = {<Signup />}></Route>
      <Route path='/home' element={<Homepage />}></Route>
      <Route path= '/login' element = {<Login />}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
