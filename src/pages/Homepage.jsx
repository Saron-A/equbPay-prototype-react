import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Group_List from "../components/Group-List.jsx";
import Add_Join_Groups from "../components/Add-Join-Groups.jsx";
import "../index.css";
import { UserContext } from "../contexts/UserContext_1.jsx";
import Login from "../components/login.jsx";

const Homepage = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="homepage-container">
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          borderRadius: "0.25rem",
          boxShadow: "0 0.25rem 1rem rgba(20, 123, 206, 0.3)",
        }}
      >
        <ul
          style={{
            display: "flex",
            gap: "1rem",
            listStyle: "none",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingLeft: "0.5rem 1rem",
          }}
        >
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
      {user ? ((<Group_List />), (<Add_Join_Groups />)) : <Login />}
      <Outlet />
    </div>
  );
};

export default Homepage;
