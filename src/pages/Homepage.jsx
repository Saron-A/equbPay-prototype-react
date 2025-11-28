import React from "react";
import { Outlet } from "react-router-dom";
import Signup_Login from "../pages/Signup_Login.jsx";
import Header from "../components/Header.jsx";
import Group_List from "../components/Group-List.jsx";
import Add_Join_Groups from "../components/Add-Join-Groups.jsx";
import { GroupProvider } from "../contexts/GroupContext.jsx";
import "../index.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <nav>
        <ul>
          <li>
            <a href="/signup_login">Signup / Login</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </nav>
      <Header />
      <Group_List />
      <Add_Join_Groups />
      <Outlet />
    </div>
  );
};

export default Homepage;
