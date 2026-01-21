import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext_1";
import "../index.css";

const Sign_up = () => {
  const { setUser } = useContext(UserContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      username: e.target.username.value.trim(),
      phonenum: e.target.phoneNum.value.trim(),
      passcode: e.target.passcode.value.trim(),
      confirm_pass: e.target.confirm_pass.value.trim(),
    };

    // check its unique phone number and username before sending to backend
    // check passcode and confirm_pass match

    try {
      const res = await axios.get("http://localhost:4000/api/users");
      const users = res.data; // array of existing users

      const phoneExists = users.find(
        (user) => user.phonenum === newUser.phonenum,
      );
      const usernameExists = users.find(
        (user) => user.username === newUser.username,
      );
      if (phoneExists) {
        alert(
          "Phone number already in use. Please login or choose another number.",
        );
        return;
      } else if (usernameExists) {
        alert("Username already taken. Please choose another username.");
        return;
      } else if (newUser.passcode !== newUser.confirm_pass) {
        alert("Passcode and Confirm Passcode do not match.");
        return;
      } else {
        // proceed to create new user
        try {
          const req = await axios.post(
            "http://localhost:4000/api/signup",
            newUser,
            { withCredentials: true },
          );
          console.log("User created successfully", req.data);
          setUser(req.data);
        } catch (err) {
          console.error("Error creating user", err);
        }
      }
    } catch (err) {
      console.error("Error fetching users", err);
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

export default Sign_up;
