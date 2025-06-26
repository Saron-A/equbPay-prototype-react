import React, { useState, createContext, useEffect } from "react";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groupList, setGroupList] = useState(() => {
    return JSON.parse(localStorage.getItem("groupList")) || [];
  });

  useEffect(() => {
    localStorage.setItem("groupList", JSON.stringify(groupList));
  }, [groupList]);

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
    joinRequests: [
      {
        memberName: "",
        phoneNum: "",
      },
    ],
  });

  return (
    <GroupContext.Provider
      value={{ groupList, setGroupList, groupInfo, setGroupInfo }}
    >
      {children}
    </GroupContext.Provider>
  );
};
