import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({});
  const handleLogin = async (e) => {
    e.preventDefault; // prevent page refresh
    setFormData({
      phoneNum: e.target.phoneNum.value,
      passcode: e.target.passcode.value,
    });
    //send it to backend
    await axios.post("http://localhost:4000/login", formData);
    setFormData({});
  };
  return (
    <div>
      <h1>Login to EqubPay</h1>
      <form action="/login" method="POST" onSubmit={handleLogin}>
        <div classname="input-label">
          <label htmlFor="phoneNum">Enter your phone number: </label>
          <input
            type="number"
            name="phoneNum"
            id="phoneNum"
            min="10"
            max="10"
            placeholder="09..."
            required
          />
        </div>

        <div classname="input-label">
          <label htmlFor="passcode">Enter your passcode: </label>
          <input
            type="number"
            min="4"
            max="6"
            name="passcode"
            id="passcode"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
