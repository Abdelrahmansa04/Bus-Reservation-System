import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import './homepage/Signup.css';
import './homepage/login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            console.log("Email", email);
            console.log("Password", password);
            // Make the POST request for login
            const response = await axios.post(
                "http://localhost:3001/login",
                { email, password },
            );

            console.log("Response", response);

                // Store the token in sessionStorage upon successful login
                // sessionStorage.setItem('authToken', response.data.token);
                const userId = response.data.userId;
                const sessionID = response.data.sessionID;
                // Alert the user that the login was successful
                console.log("user ID", userId);
                response.status(200).json(response.data.userId);
                alert("Login successful");

                // Navigate to the home or seat selection page
                navigate("/home");  // or "/seatselection" based on your use case
                sessionStorage.setItem('authToken', userId);            
        }} catch (error) {
            // console.error(error);
            // Show an alert if login failed
            alert("Login failed: " + error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="login-container">
            <h2>Bus Reservation System</h2>
            
            {/* Back to Register Button */}
            <Link to="/register" className="back-button">
                ← Register
            </Link>

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
