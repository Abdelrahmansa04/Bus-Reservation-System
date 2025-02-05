import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
      e.preventDefault()
      // axios.post('http://localhost:3001/register',{name,phoneNumber,email,password})
      // .then(result => {console.log(result)
      //   if (result.status === 201){
      //     alert("register successfuly")
      //     navgate('/login')          
      //   }else{
      //     alert("email already exist")
      //     // alert(result.data)
      //   }
      // })
      // .catch(err => console.log(err))

      try {
        const response = await axios.post("http://localhost:3001/varfication/register", {
            name,
            phoneNumber,
            email,
            password
        });

         if (response.status === 201) {
                alert("Registration successful! Check your email for a verification code.");
                navigate("/verify-email", { state: { email } }); // Pass email to the verification page
            }
    } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed. Email may already exist.");
    }
    }
  return (
    <div className="register-container">
      <h2>Register for Bus Reservation</h2>
      <form action="#" onSubmit={handleSubmit}>

        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required 
        onChange={(e) => setName(e.target.value) } />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="number" id="phoneNumber" name="phoneNumber" required 
        onChange={(e) => setPhoneNumber(e.target.value) } />

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
