import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext_1";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {!user ? (
        <h2>Please Log in to see your information</h2>
      ) : (
        <div>
          <h2>{user.username}</h2>
          <p>{user.phoneNum}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
