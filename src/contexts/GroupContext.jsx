import React, { useState, createContext } from "react";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groupList, setGroupList] = useState([]);

  return (
    <GroupContext.Provider value={{ groupList, setGroupList }}>
      {children}
    </GroupContext.Provider>
  );
};
