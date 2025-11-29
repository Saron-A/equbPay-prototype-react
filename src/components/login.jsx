import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext_1";

const Login = () => {
  const { setUser } = useContext(UserContext);
  //   const navigate = useNavigate();
  //   const handleSignup = () => {
  //     navigate("/signup");
  //   };

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page refresh

    const userData = {
      phoneNum: e.target.phoneNum.value,
      passcode: e.target.passcode.value,
    };

    try {
      //send it to backend
      const res = await axios.post(
        "http://localhost:4000/api/login",
        userData,
        {
          withCredentials: true,
        }
      );
      console.log("Login Successful", res.data);
      setUser(res.data.user);
    } catch (err) {
      console.log("Login error", err.response.data);
      alert(err.response.data.error || "Login failed");
    }
  };
  return (
    <div>
      <h1>Login to EqubPay</h1>
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

      {/* <div>
        <p>
          Don't have an account?{" "}
          <span
            onClick={handleSignup}
            style={{
              color: "blue",
              textDecoration: "underline",
            }}
          >
            Sign up here
          </span>
        </p>
      </div> */}
    </div>
  );
};

export default Login;
