import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";
import "../index.css";

const Group_List = () => {
  const { groupList } = useContext(GroupContext);

  return (
    <div className="groupList-container">
      {groupList.length === 0 ? (
        <p id="no-group-message">No groups yet</p>
      ) : (
        <ul>
          {groupList.map((group) => (
            <li key={group.id}>
              <Link to={`/group_details/${group.id}`} className="group-link">
                <div className="group-tile">
                  <h3>{group.groupName}</h3>
                  <p>Members: {group.members.length}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Group_List;
