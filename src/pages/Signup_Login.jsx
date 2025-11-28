import React from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/login";

const Signup_Login = () => {
  let navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };
  return (
    <div>
      <Signup />
      <p>
        Already have an account? <span onClick={login}>Sign in</span>
      </p>
    </div>
  );
};

export default Signup_Login;
