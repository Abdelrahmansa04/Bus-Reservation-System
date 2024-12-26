import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter  as Router, Route, Routes} from 'react-router-dom';
import AddBus from './components/AddBus';
import BusList from './components/Buslist';



function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <Routes>
        <Route path='/add-bus' element={
            <>
            <AddBus/>
            <BusList/>
            </>
        }></Route>
      </Routes>
    </Router>
  );
};

export default App;
