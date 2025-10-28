import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groupList, setGroupList] = useState([]);
  const [winnerOfTheMonth, setWinnerOfTheMonth] = useState(null);
  // winners array to hold monthly winners who haven't won in this round
  // a round = when all the members have won once
  const [winnersOfThisRound, setWinnersOfThisRound] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/groups");
        const rawData = res.data;
        // since our group context has a nested structure and the data we fetch is flat, let us nest it so the frontend can work with it easily

        // Group data by group_id so members of the same group are nested together
        const groupedData = Object.values(
          rawData.reduce((acc, row) => {
            const {
              group_id,
              group_name,
              description,
              contribution,
              creation_date,
              mem_id,
              member_name,
              phone_num,
            } = row; // destructing row = which is the data from the backend
            //So acc is the object, if the obj acc with the id of our group's id doesn't exists, we create an a property called group_id with in acc object and fill it with the data we want and the same goes for members array
            if (!acc.group_id) {
              acc.group_id = {
                id: group_id,
                groupName: group_name,
                description,
                contribution,
                creationDate: creation_date,
                members: [],
              };
            }

            if (mem_id) {
              acc.group_id.members.push({
                memId: mem_id,
                memberName: member_name,
                phoneNum: phone_num,
              });
            }
            return acc;
          }, {}) //  accumulator object starts as empty
        );

        setGroupList(groupedData);
        console.log("Formatted groups:", groupedData);
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
      value={{
        groupList,
        setGroupList,
        groupInfo,
        setGroupInfo,
        winnerOfTheMonth,
        setWinnerOfTheMonth,
        winnersOfThisRound,
        setWinnersOfThisRound,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
