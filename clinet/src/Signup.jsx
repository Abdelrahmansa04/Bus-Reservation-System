import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navgate = useNavigate()

    const handleSubmit = (e)=>{
      e.preventDefault()
      axios.post('http://localhost:3001/register',{name,email,password})
      .then(result => {console.log(result)
        if (result.data === "succsse"){
          navgate('/login')          
        }else{
          alert(result.data)
          // alert(result.data)
        }
      })
      .catch(err => console.log(err))
    }
  return (
    <div className="register-container">
      <h2>Register for Bus Reservation</h2>
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required 
        onChange={(e) => setName(e.target.value) } />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required 
        onChange={(e) => setEmail(e.target.value) } />


        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required 
        onChange={(e) => setPassword(e.target.value) } />


        <button type="submit">Register</button>
      </form>
      <Link to = "/login">
      login
      </Link>
    </div>
  );
}

export default Signup;