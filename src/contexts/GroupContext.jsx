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
    contribution: 0,
    members: [
      {
        memId: "",
        memberName: "",
        phoneNum: "",
        isAdmin: false,
      },
    ],
    creationDate: "",
    admin: "",
    contributionInfo: {},
    joinRequests: [
      {
        reqId: "",
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
