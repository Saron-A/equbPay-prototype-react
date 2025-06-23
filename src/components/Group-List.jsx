import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
  SwipeAction,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { GroupContext } from "../contexts/GroupContext";

import "../index.css";

const Group_List = () => {
  const { groupList, setGroupList } = useContext(GroupContext);
  const navigate = useNavigate();

  const trailingActions = (groupId) => (
    <TrailingActions>
      <SwipeAction>✏️ Edit</SwipeAction>
      <SwipeAction destructive={true} onClick={() => handleDelete(groupId)}>
        🗑️ Delete
      </SwipeAction>
    </TrailingActions>
  );

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this group?"
    );
    if (!confirmed) return;
    else {
      const updatedGroupList = groupList.filter((group) => group.id !== id);
      setGroupList(updatedGroupList);
    }
  };

  return (
    <div className="groupList-container">
      {groupList.length === 0 ? (
        <p id="no-group-message">No groups yet</p>
      ) : (
        <SwipeableList className="group-list-item">
          {groupList.map((group) => (
            <SwipeableListItem
              key={group.id}
              className="group-tile"
              trailingActions={trailingActions(group.id)}
            >
              <div
                className="group-tile"
                onClick={() => navigate(`/group_details/${group.id}`)}
              >
                <h3>{group.groupName}</h3>
                <p>Members: {group.members.length}</p>
              </div>
            </SwipeableListItem>
          ))}
        </SwipeableList>
      )}
    </div>
  );
};

export default Group_List;
