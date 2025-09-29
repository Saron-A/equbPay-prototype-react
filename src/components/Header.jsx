import React from "react";
import Image from "../assets/images/header-img.jpg";

const Header = () => {
  return (
    <div className="header">
      <h1>Welcome to EqubPay</h1>
      <p>Your Contribution, Your Turn, Your Prosperity!</p>
      <img src={Image} alt="" height="200px" width="300px" />
    </div>
  );
};

export default Header;
