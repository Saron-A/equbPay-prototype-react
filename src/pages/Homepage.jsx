import React from "react";
import Header from "../components/Header.jsx";
import Group_List from "../components/Group-List.jsx";
import Add_Join_Groups from "../components/Add-Join-Groups.jsx";
import { GroupProvider } from "../contexts/GroupContext.jsx";
import "../index.css";

const Homepage = () => {
  return (
    <GroupProvider>
      <div className="homepage-container">
        <Header />
        <Group_List />
        <Add_Join_Groups />
      </div>
    </GroupProvider>
  );
};

export default Homepage;
