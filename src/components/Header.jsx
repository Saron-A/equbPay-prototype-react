import React, { useContext } from "react";
import Image from "../assets/images/header-img.jpg";
import { UserContext } from "../contexts/UserContext_1";
import "../index.css";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="header">
      {user ? (
        <h1>Welcome, {user.username}!</h1>
      ) : (
        <h1>Please login to continue with EqubPay</h1>
      )}

      <p>Your Contribution, Your Turn, Your Prosperity!</p>
      <img src={Image} alt="" height="200px" width="300px" />
    </div>
  );
};

export default Header;
