import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext_1.jsx";
import { GroupContext } from "../contexts/GroupContext.jsx";
import "../index.css";

const Group_List = () => {
  const { user } = useContext(UserContext);
  const { groupList } = useContext(GroupContext);
  return (
    <div className="groupList-container">
      {user ? (
        <>
          {groupList && groupList?.length > 0 ? (
            <>
              <ul className="group-list">
                {groupList?.map((group, index) => (
                  <li key={index}>
                    <div className="group-tile">
                      <h3>{group?.group_name}</h3>
                      <h4>Contribution :{group.contribution} ETB</h4>
                      <p>{group?.no_of_members}</p>
                      <div className="btns-container">
                        <button>Edit</button>
                        <button>Delete</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p id="no-group-message">No groups yet.</p>
          )}
        </>
      ) : (
        <h2>Please log in to see your groups.</h2>
      )}
    </div>
  );
};

export default Group_List;
