import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext_1.jsx";

const Group_List = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      {user ? (
        <h2>Your Groups will be displayed here, {user.username}!</h2>
      ) : (
        <h2>Please log in to see your groups.</h2>
      )}
    </div>
  );
};

export default Group_List;
