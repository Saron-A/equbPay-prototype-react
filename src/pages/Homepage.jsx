import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Group_List from "../components/Group-List.jsx";
import Add_Join_Groups from "../components/Add-Join-Groups.jsx";
import { GroupProvider } from "../contexts/GroupContext.jsx";
import "../index.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <Header />
      <Group_List />
      <Add_Join_Groups />
      <Outlet />
    </div>
  );
};

export default Homepage;
