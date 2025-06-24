import React, { useState, createContext } from "react";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groupList, setGroupList] = useState([]);
  const [groupInfo, setGroupInfo] = useState({
    id: "",
    groupName: "",
    description: "",
    members: [
      {
        memId: "",
        memberName: "",
        phoneNum: "",
      },
    ],
    creationDate: "",
    admin: "",
    joinRequests: [],
  });

  return (
    <GroupContext.Provider
      value={{ groupList, setGroupList, groupInfo, setGroupInfo }}
    >
      {children}
    </GroupContext.Provider>
  );
};
