import React from "react";  

function Login() {
    return(
        
        <div class="login-container">
        <h2>Bus Reservation System</h2>
        <form action="#">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required />

            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Login</button>
        </form>
        </div>
        
    )
}

export default Login
