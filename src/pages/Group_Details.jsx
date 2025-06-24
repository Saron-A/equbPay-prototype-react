import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";
import "../index.css";

const Group_Details = () => {
  const { groupList } = useContext(GroupContext);
  const { id } = useParams();
  const group = groupList.find((group) => String(group.id) === id); // finding the group by its id
  let navigate = useNavigate();
  const handleEditRequest = (id) => {
    navigate(`/edit_group/${id}`); // navigate to the edit page with the group id
  };
  return (
    <div>
      {group ? (
        <div className="group-details-page">
          <h1>{group.groupName}</h1> <p>{group.description}</p>
          <ul>
            Members:
            {group.members.map((member, index) => (
              <li key={index}>
                <div className="member-tile">
                  <p>{member.memberName}</p>
                  <p> {member.phoneNum}</p>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <p>
              {group.joinRequests.length > 0
                ? `Join Requests: ${group.joinRequests.length}`
                : "No requests"}
            </p>
          </div>
        </div>
      ) : (
        "Group not found"
      )}

      <button
        className="edit-details-btn"
        onClick={() => handleEditRequest(group.id)}
      >
        Edit Content
      </button>

      <Link to="/">
        <button className="back-btn">Back to homepage</button>
      </Link>
    </div>
  );
};

export default Group_Details;
