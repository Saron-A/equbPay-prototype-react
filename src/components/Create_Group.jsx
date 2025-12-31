import React, { useRef, useContext } from "react";
import { GroupContext } from "../contexts/GroupContext.jsx";
import axios from "axios";
import "../index.css";

const Create_Group = () => {
  const { setGroupInfo } = useContext(GroupContext);
  const dialog1 = useRef(null);

  const createGroupDia = () => {
    dialog1.current.showModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newGroup = {
      group_name: e.target.group_name.value,
      description: e.target.description.value,
      contribution: Number(e.target.contribution.value),
    };

    try {
      const req = await axios.post(
        "http://localhost:4000/api/groups",
        newGroup,
        { withCredentials: true }
      );
      console.log("Group created successfully", req.data);
      setGroupInfo(req.data); // object of the created group
      dialog1.current.close();
    } catch (err) {
      console.error("Error creating group", err);
    }
  };

  return (
    <div>
      <button onClick={createGroupDia}>Create Group</button>
      <dialog ref={dialog1} className="dialog-container">
        <form onSubmit={handleSubmit} className="dialog-box">
          <div className="label-input">
            <label htmlFor="">Name of the group: </label>
            <input type="text" id="groupName" name="group_name" />
          </div>
          <div className="label-input">
            <label htmlFor="">Group description: </label>
            <input type="text" id="description" name="description" />
          </div>
          <div className="label-input">
            <label htmlFor="">Contribution amount: </label>
            <input type="number" id="contribution" name="contribution" />
          </div>

          <button type="submit">Create Group</button>
        </form>
      </dialog>
    </div>
  );
};

export default Create_Group;
