import React from "react";

function Signup() {
  return (
    <div className="register-container">
      <h2>Register for Bus Reservation</h2>
      <form action="#">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Signup;
