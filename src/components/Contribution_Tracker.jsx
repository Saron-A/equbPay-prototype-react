import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";
import axios from "axios";
import "../index.css";

const Contribution_Tracker = () => {
  const { groupList, setGroupList, setGroupInfo } = useContext(GroupContext);

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
  if (!group) return <p>Loading group data...</p>;
  const handleContributionChange = async (e, memId, month) => {
    let updatedMember = {};
    const updatedGroup = {
      ...group,
      members: group.members.map((member) => {
        if (member.memId === memId) {
          updatedMember = {
            ...member,
            contributionInfo: member.contributionInfo.map((info) =>
              info.month === month
                ? { ...info, isPaid: e.target.checked }
                : info
            ),
          };
          return updatedMember;
        }
        return member;
      }),
    };
    setGroupInfo(updatedGroup);
    try {
      let res = await axios.put(
        `http://localhost:4000/api/groups/${id}/members/${memId}`,
        updatedMember
      );
      console.log(res.data);
      setGroupList((prevList) =>
        prevList.map((group) =>
          group.id === id
            ? {
                ...group,
                members: group.members.map((mem) =>
                  mem.memId === memId ? updatedMember : mem
                ),
              }
            : group
        )
      );
    } catch (err) {
      console.error("Error updating contribution", err);
    }
  };

  let creationDate = new Date(group.creationDate);
  let startMonth = creationDate.getMonth();

  let orderedMonths = months
    .slice(startMonth + 1)
    .concat(months.slice(0, startMonth + 1));

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
            {orderedMonths.map((month) => (
              <tr>
                <td> {month}</td>
                {group.members.map((member) => (
                  <td key={member.memId}>
                    <input
                      type="checkbox"
                      checked={
                        member.contributionInfo?.find(
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
