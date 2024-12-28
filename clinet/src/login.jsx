import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            // Make the POST request for login
            const response = await axios.post(
                "http://localhost:3001/login",
                { email, password },
                { withCredentials: true } // Ensure cookies are sent if needed
            );

            console.log(response);

            if (response.status === 200) {
                // Store the token in sessionStorage upon successful login
                sessionStorage.setItem('authToken', response.data.token);

                // Alert the user that the login was successful
                alert("Login successful");

                // Navigate to the home or seat selection page
                navigate("/home");  // or "/seatselection" based on your use case
                sessionStorage.setItem('authToken', response.data.token);
            }
            
        } catch (error) {
            console.error(error);
            // Show an alert if login failed
            alert("Login failed: " + error.response?.data?.message || "An error occurred");
        }
        
    };
   

    return (
        <div className="login-container">
            <h2>Bus Reservation System</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
