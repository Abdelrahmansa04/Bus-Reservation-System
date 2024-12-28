import React, { useState } from "react";  
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css';
import './Login.css';


function Login() {
    const [email,setEmail] = useState()
    const [password ,setPassword]=useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/login", 
                { email, password },
                { withCredentials: true } // Ensure cookies are sent
            );
            console.log(response)
            if (response.status === 200) {
                alert("Login successful");
                navigate("/home");
            }
        } catch (error) {
            console.error(error);
            alert("Login failed: " + error.response.data);
        }
    }


    // const handleLogin = async  () => {
    //     e.preventDefault(); 
    //     const response = await fetch("http://localhost:3001/login",{
    //         method : "POST",
    //         headers: {"Content-Type": "application/json"},
    //         credentials : "include",
    //         body: JSON.stringify({email,password}),

    //     });
    //     const data = await response.json();
    //     if(response.ok){
    //         localStorage.setItem("authenticated", true);
    //         alert("login succsse");
    //         navegate('/home')
    //     }else{
    //         alert(data);
    //     }
    // }

    return(
        
        <div className="login-container">
        <h2>Bus Reservation System</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required 
            onChange={(e) => setEmail(e.target.value) } />


            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required 
            onChange={(e) => setPassword(e.target.value) } />


            <button type="submit">Login</button>
        </form>
        </div>
        
    )
}

export default Login
