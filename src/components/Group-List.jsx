import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";

import "../index.css";

const Group_List = () => {
  const { groupList, setGroupList } = useContext(GroupContext);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this group?"
    );

    if (confirmed) {
      const updatedGroupList = groupList.filter((group) => group.id !== id);
      setGroupList(updatedGroupList);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit_group/${id}`);
  };

  return (
    <div className="groupList-container">
      {groupList.length === 0 ? (
        <p id="no-group-message">No groups yet</p>
      ) : (
        <ul className="group-list">
          {groupList.map((group) => (
            <li key={group.id}>
              <div
                className="group-tile"
                onClick={() => navigate(`/group_details/${group.id}`)}
              >
                <h3>{group.groupName}</h3>
                <p>Members: {group.members.length}</p>
                <div className="btns-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(group.id);
                    }}
                    //  className="btns"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(group.id);
                    }}
                    // className="btns"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Group_List;
