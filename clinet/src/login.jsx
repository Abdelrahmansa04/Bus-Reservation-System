import React, { useState } from "react";  
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
    const [email,setEmail] = useState()
    const [password ,setPassword]=useState()
    const navegate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', {email,password})
        .then(result => {console.log(result)
            console.log(result)
            if(result.data === "success" ){ 
                navegate('/home')
            }
            
        })
        .catch(err => console.log(err))
    }

    return(
        
        <div class="login-container">
        <h2>Bus Reservation System</h2>
        <form onSubmit={handleSubmit}>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required 
            onChange={(e) => setEmail(e.target.value) } />


            <label for="password">Password</label>
            <input type="password" id="password" name="password" required 
            onChange={(e) => setPassword(e.target.value) } />


            <button type="submit">Login</button>
        </form>
        </div>
        
    )
}

export default Login
