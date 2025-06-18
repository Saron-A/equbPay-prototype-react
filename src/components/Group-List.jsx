import React, { useContext } from "react";
import { GroupContext } from "../contexts/GroupContext";

const Group_List = () => {
  const { groupList } = useContext(GroupContext);

  return (
    <div className="groupList-container">
      {groupList.length === 0 ? (
        <p>No groups yet</p>
      ) : (
        <ul>
          {groupList.map((group) => (
            <li key={group.id}>
              <div className="group-tile">
                <h3>{group.groupName}</h3>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Group_List;
