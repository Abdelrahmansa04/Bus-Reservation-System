import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyEmail() {
    // const { state } = useLocation();
    // const navigate = useNavigate();
    // const email = location.state?.email || ""; // Get email from navigation state
    // const [code, setCode] = useState("");
    const { state } = useLocation();
    const navigate = useNavigate();
    const email = state?.email || ""; // Get email from navigation state
    const [code, setCode] = useState("");
    const [resendMessage, setResendMessage] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("verificationToken"); // Retrieve token from localStorage
        
        try {
            const response = await axios.post("http://localhost:3001/varification/verify-email", {
                token,
                code,
            });

            if (response.status === 200) {
                alert("Email verified successfully!");
                navigate("/login"); // Redirect to login page
            }
        } catch (err) {
            alert(err.response?.data?.message || "Invalid verification code.");
        }

    };

    const handleResendCode = async () => {
        try {
            const response = await axios.post("http://localhost:3001/varification/resend-code", { token });

            if (response.status === 200) {
                setResendMessage("New verification code sent! Check your email.");
            }
        } catch (err) {
            setResendMessage(err.response?.data?.message || "Error resending code.");
        }
    };

    return (
        <div>
            <h2>Verify Your Email</h2>
            <p>Enter the verification code sent</p>
            <form onSubmit={handleVerify}>
                <input type="text" placeholder="Enter code" required onChange={(e) => setCode(e.target.value)} />
                <button type="submit">Verify</button>
            </form>
            <button onClick={handleResendCode} style={{ marginTop: "10px" }}>
                Resend Verification Code
            </button>

        </div>
    );
}

export default VerifyEmail;
