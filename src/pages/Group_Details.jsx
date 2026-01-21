import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext_1.jsx";
import { GroupContext } from "../contexts/GroupContext.jsx";

const Group_Details = () => {
  const { user } = useContext(UserContext);
  const { groupList } = useContext(GroupContext);
  const { group_id } = useParams();
  console.log("Group ID from params:", group_id);

  const group = groupList.find((g) => String(g.group_id) === group_id);
  console.log("Group found:", group);

  return (
    <div>
      {user ? (
        group ? (
          <div>
            <h2>{group.group_name}</h2>
            <p>{group.description}</p>
          </div>
        ) : (
          <p> No group found with this ID.</p>
        )
      ) : (
        <p> Please log in to view group details.</p>
      )}
    </div>
  );
};

export default Group_Details;
