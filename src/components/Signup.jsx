import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({});

  const handleSignup = async (e) => {
    e.preventDefault(); //prevent page refresh
    const { username, phoneNum, passcode, confirm_pass } = e.target;
    setFormData({
      username: username.value,
      phoneNum: phoneNum.value,
      passcode: passcode.value,
      confirm_pass: confirm_pass.value,
    });
    //send it to backend
    await axios.post("http://localhost:4000/signup", formData);
    setFormData({});
  };

  return (
    <div>
      <h1>Create an account on EqubPay</h1>
      <form action="/signup" method="POST" onSubmit={handleSignup}>
        <div className="label-input">
          <label htmlFor="username">Create your username:</label>
          <input type="text" name="username" id="username" required />
        </div>
        <div className="label-input">
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
        <div className="label-input">
          <label htmlFor="passcode">Create a passcode: </label>
          <input
            type="number"
            min="4"
            max="6"
            name="passcode"
            id="passcode"
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="confirm_pass">Confirm your passcode: </label>
          <input
            type="number"
            min="4"
            max="6"
            name="confirm_pass"
            id="confirm_pass"
            required
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
