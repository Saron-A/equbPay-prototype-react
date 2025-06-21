import React, { useState, useContext, useRef, useEffect } from "react";
import { GroupContext } from "../contexts/GroupContext";

const Add_Join_Groups = () => {
  const { groupList, setGroupList } = useContext(GroupContext);
  const [groupInfo, setGroupInfo] = useState({
    groupName: "",
    members: [
      {
        memberName: "",
        phoneNum: "",
      },
    ],
    creationDate: Date.now(),
    id: "",
  });
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);

  const handleCreateClick = () => {
    dialogRef.current.showModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target; // to access the form
    setGroupList([...groupList, groupInfo]);
    form.reset();
    dialogRef.current.close();
  };

  const handleChange = (e) => {
    // works only for flat structures not nested ones
    const { name, value } = e.target;
    setGroupInfo({ ...groupInfo, [name]: value });
  };

  const handleMemNumChange = (e) => {
    const newLength = parseInt(e.target.value, 10) || 0;

    const updatedMembers = Array.from({ length: newLength }, () => ({
      memberName: "",
      phoneNum: "",
    }));

    setGroupInfo({ ...groupInfo, members: updatedMembers });
  };

  const handleNestedChange = (name, value, index) => {
    const updatedMembers = [...groupInfo.members];
    updatedMembers[index][name] = value;
    setGroupInfo({ ...groupInfo, members: updatedMembers });
  };

  const handleCancel = () => {
    dialogRef.current.close();
  };

  return (
    <div className="add-join-btns">
      <button onClick={handleCreateClick}>Create Group</button>

      <dialog ref={dialogRef} className="dialog-container">
        <form className="dialog-box" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name of the group"
            name="groupName"
            value={groupInfo.groupName}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Number of members"
            name="members"
            value={groupInfo.members.length}
            onChange={handleMemNumChange}
          />

          {groupInfo.members.map((member, index) => (
            <div className="memberInfo">
              <input
                type="text"
                placeholder="Your Name:"
                name="memberName"
                value={member.memberName}
                onChange={(e) =>
                  handleNestedChange(e.target.name, e.target.value, index)
                }
                required
              />
              <input
                type="number"
                placeholder="Your Phone Number:"
                name="phoneNum"
                value={member.phoneNum}
                onChange={(e) =>
                  handleNestedChange(e.target.name, e.target.value, index)
                }
                required
              />
            </div>
          ))}

          <button type="Submit">Create Group</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </dialog>

      <button>Join Group</button>
    </div>
  );
};

export default Add_Join_Groups;
