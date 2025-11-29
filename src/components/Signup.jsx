import React from "react";
import axios from "axios";

const Signup = () => {
  const handleSignup = async (e) => {
    e.preventDefault(); //prevent page refresh
    const { username, phoneNum, passcode, confirm_pass } = e.target;
    const userData = {
      username: username.value,
      phoneNum: phoneNum.value,
      passcode: passcode.value,
      confirm_pass: confirm_pass.value,
    };
    try {
      //send it to backend
      const res = await axios.post(
        "http://localhost:4000/api/signup",
        userData,
        {
          withCredentials: true,
        }
      );
      console.log(res.data.message);
      alert(res.data.message);
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Create an account on EqubPay</h1>
      <form onSubmit={handleSignup}>
        <div className="label-input">
          <label htmlFor="username">Create your username:</label>
          <input type="text" name="username" id="username" required />
        </div>
        <div className="label-input">
          <label htmlFor="phoneNum">Enter your phone number: </label>
          <input
            type="text"
            name="phoneNum"
            id="phoneNum"
            placeholder="09..."
            pattern="(09)[0-9]{8}"
            minLength="10"
            maxLength="10"
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="passcode">Create a passcode: </label>
          <input
            type="password"
            name="passcode"
            id="passcode"
            pattern="[0-9]{4,6}"
            minLength="4"
            maxLength="6"
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="confirm_pass">Confirm your passcode: </label>
          <input
            type="password"
            name="confirm_pass"
            id="confirm_pass"
            pattern="[0-9]{4,6}"
            required
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
