import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import "../index.css";
import { UserContext } from "../contexts/UserContext_1.jsx";
import Group_List from "../components/Group_List.jsx";
import Login from "../components/login.jsx";
import Create_Group from "../components/Create_Group.jsx";

const Homepage = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="homepage-container">
      <nav>
        <ul>
          {!user ? (
            <>
              <li>
                <a href="/signup_login">Sign up</a>
              </li>

              <li>
                <a href="/about">About Us</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/logout">Logout</a>
              </li>

              <li>
                <a href="/profile">Profile</a>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Header />
      {user ? (
        <>
          <Group_List /> <Create_Group />
        </>
      ) : (
        <Login />
      )}
      <Outlet />
    </div>
  );
};

export default Homepage;
