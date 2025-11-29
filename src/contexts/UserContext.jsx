import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
// create the context
export const UserContext = createContext();
// create the provider so it can pass the data to children components
export const UserProvider = ({ children }) => {
  //the children prop represents all the components that can access the context

  const [userData, setUserData] = useState(null);
  //when userData is populated it becomes an object with id, phoneNum, passcode and username properties

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/users/current_user`
      );
      console.log(res.data);
      setUserData(res.data);
    };
    fetchUserData();
  }, []);
  // provider broadcasts the context data to all its children components
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
// use the context through useContext hook
