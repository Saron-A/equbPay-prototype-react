import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/users/current_user",
          {
            withCredentials: true,
          }
        );
        setUser(res.data.user);
        console.log(res.data);
      } catch (err) {
        console.log("No logged in user", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
