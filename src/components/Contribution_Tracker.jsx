import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";
import "../index.css";

const Contribution_Tracker = () => {
  const { groupList, setGroupList, groupInfo, setGroupInfo } =
    useContext(GroupContext);

  const { id } = useParams();
  const group = groupList.find((group) => String(group.id) === id);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleContributionChange = (e, memId, month) => {
    const updatedGroup = {
      ...group,
      members: group.members.map((member) => {
        if (member.memId === memId) {
          return {
            ...member,
            contributionInfo: member.contributionInfo.map((info) =>
              info.month === month
                ? { ...info, isPaid: e.target.checked }
                : info
            ),
          };
        }
        return member;
      }),
    };

    setGroupList((prevList) =>
      prevList.map((grp) => (grp.id === group.id ? updatedGroup : grp))
    );

    setGroupInfo(updatedGroup);
  };

  return (
    <div className="contribution-tracker-container">
      <h2> Contribution Tracker Table</h2>
      <p>Amount per month from each member: {group.contribution}Br.</p>
      {group.members.length >= 1 ? (
        <table>
          <thead>
            <tr>
              <th>Month</th>
              {group.members.map((member) => (
                <th>{member.memberName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {months.map((month) => (
              <tr>
                <td> {month}</td>
                {group.members.map((member) => (
                  <td key={member.memId}>
                    <input
                      type="checkbox"
                      checked={
                        member.contributionInfo.find(
                          (info) => info.month === month
                        )?.isPaid || false
                      }
                      onChange={(e) =>
                        handleContributionChange(e, member.memId, month)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>There are no members in this group yet.</p>
      )}
    </div>
  );
};

export default Contribution_Tracker;
