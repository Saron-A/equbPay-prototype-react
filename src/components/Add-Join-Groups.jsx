import React from "react";
import { GroupContext } from "../contexts/GroupContext";
import { useContext } from "react";
import Create_Group from "./Create-Group.jsx";
import Request_Join from "./Request-Join-group.jsx";

const Add_Join_Groups = () => {
  // const { groupList, setGroupList } = useContext(GroupContext);
  const { groupInfo, setGroupInfo } = useContext(GroupContext);

  return (
    <div className="add-join-btns">
      <Create_Group groupInfo={groupInfo} setGroupInfo={setGroupInfo} />
      <Request_Join groupInfo={groupInfo} setGroupInfo={setGroupInfo} />
    </div>
  );
};

export default Add_Join_Groups;
