import React, { useContext } from "react";
import { GroupContext } from "../contexts/GroupContext";

const Group_List = () => {
  const { groupList, setGroupList } = useContext(GroupContext);
  let message = "No groups yet";

  return (
    <div>
      {groupList.length === 0 ? (
        message
      ) : (
        <ul>
          {groupList.map((group) => (
            <li key={group.id}>
              <div>
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
