import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext_1.jsx";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [groupList, setGroupList] = useState([]);
  // information about the current group the user created
  const [groupInfo, setGroupInfo] = useState({});

  //link each group to the user that created it
  //only allow logged in users to create groups
  //pass the user ID along with the group creation request

  useEffect(() => {
    const fetchGroupsOfUser = async () => {
      if (!user) {
        setGroupList([]);
        return;
      }

      try {
        const res = await axios.get("http://localhost:4000/api/groups", {
          withCredentials: true,
        });
        const allGroups = res.data;
        console.log("All groups fetched", allGroups);
        const userGroups = allGroups.filter(
          (group) =>
            group.creator_id === user.id ||
            group.members?.some((m) => m.phonenum === user.phonenum),
        );
        setGroupList(userGroups);
        console.log("Fetched user groups", userGroups);
      } catch (err) {
        console.error("Error fetching groups", err);
      }
    };
    fetchGroupsOfUser();
  }, [user]);

  return (
    <GroupContext.Provider
      value={{ groupList, setGroupList, groupInfo, setGroupInfo }}
    >
      {children}
    </GroupContext.Provider>
  );
};
