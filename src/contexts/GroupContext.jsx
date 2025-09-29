import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/groups");
        console.log(res.data);
        setGroupList(res.data);
      } catch (err) {
        console.error("Error fetching groups", err);
      }
    };
    fetchGroups();
  }, []);

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
        contributionInfo: [
          {
            month: "Jan",
            isPaid: false,
          },
          {
            month: "Feb",
            isPaid: false,
          },
          {
            month: "Mar",
            isPaid: false,
          },
          {
            month: "Apr",
            isPaid: false,
          },
          {
            month: "May",
            isPaid: false,
          },
          {
            month: "June",
            isPaid: false,
          },
          {
            month: "July",
            isPaid: false,
          },
          {
            month: "Aug",
            isPaid: false,
          },
          {
            month: "Sept",
            isPaid: false,
          },
          {
            month: "Oct",
            isPaid: false,
          },
          {
            month: "Nov",
            isPaid: false,
          },
          {
            month: "Dec",
            isPaid: false,
          },
        ],
      },
    ],
    creationDate: "",
    admin: [],

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
