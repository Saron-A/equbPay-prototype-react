import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";

const Contribution_Tracker = () => {
  const { groupList, setGroupList, groupInfo, setGroupInfo, contributionInfo } =
    useContext(GroupContext);
  const { id } = useParams();
  const group = groupList.find((group) => group.id === id);

  return (
    <div>
      <h2> Contribution_Tracker</h2>
      <p>Amount per month from each member: {group.contribution}Br.</p>
    </div>
  );
};

export default Contribution_Tracker;
