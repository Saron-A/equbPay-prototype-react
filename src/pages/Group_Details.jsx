import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";

const Group_Details = () => {
  const { groupList } = useContext(GroupContext);
  const { id } = useParams();
  const group = groupList.find((group) => String(group.id) === id); // finding the group by its id
  return (
    <div className="group-details-page">
      {group ? (
        <div>
          <h1>{group.groupName}</h1>{" "}
          <ul>
            Members:
            {group.members.map((member, index) => (
              <li key={index}>
                <div>
                  <p>{member.memberName}</p>
                  <p> {member.phoneNum}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        "Group not found"
      )}
    </div>
  );
};

export default Group_Details;
