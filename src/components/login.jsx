import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext_1.jsx";
import axios from "axios";
import "../index.css";

const Login = () => {
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    let userData = {
      phoneNum: e.target.phoneNum.value,
      passcode: e.target.passcode.value,
    };

    try {
      const req = await axios.post(
        "http://localhost:4000/api/login",
        userData,
        { withCredentials: true }
      );
      console.log("Login successful", req.data);
      setUser(req.data.user);
    } catch (err) {
      console.log("Login error", err.response.data);
      alert(err.response.data.error || "Login failed");
    }
  };

  return (
    <div>
      <h1>Login to your EqubPay account</h1>

      <form onSubmit={handleLogin}>
        <div className="input-label">
          <label htmlFor="phoneNum">Enter your phone number: </label>
          <input
            type="text"
            name="phoneNum"
            id="phoneNum"
            pattern="(09)[0-9]{8}"
            placeholder="09..."
            required
          />
        </div>
        <div className="input-label">
          <label htmlFor="passcode">Enter your passcode: </label>
          <input
            type="password"
            name="passcode"
            id="passcode"
            pattern="[0-9]{4,6}"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
