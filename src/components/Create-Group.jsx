import React, { useRef, useContext, useEffect } from "react";
import { GroupContext } from "../contexts/GroupContext";

const Create_Group = ({ groupInfo, setGroupInfo }) => {
  const { groupList, setGroupList } = useContext(GroupContext);
  const dialog1Ref = useRef(null);
  const handleCreateClick = () => {
    dialog1Ref.current.showModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGroup = {
      ...groupInfo,
      id: crypto.randomUUID(),
      members: groupInfo.members.map((member) => ({
        ...member,
        memId: crypto.randomUUID(),
      })),
      creationDate: Date.now(),
    };

    // setGroupList([...groupList, newGroup]);
    setGroupList(
      localStorage.setItem(
        "groupList",
        JSON.stringify([...groupList, newGroup])
      )
    );

    // so form can actually reset
    setGroupInfo({
      groupName: "",
      description: "",
      members: [{ memID: "", memberName: "", phoneNum: "" }],
      creationDate: "",
      id: "",
    });

    dialog1Ref.current.close();
  };

  const handleChange = (e) => {
    // works only for flat structures not nested ones
    const { name, value } = e.target;
    setGroupInfo({ ...groupInfo, [name]: value });
  };

  const handleMemNumChange = (e) => {
    const newLength = parseInt(e.target.value, 10) || 0;
    const updatedMembers = [];

    for (let i = 0; i < newLength; i++) {
      updatedMembers.push({
        memId: crypto.randomUUID(),
        memberName: "",
        phoneNum: "",
      });
    }
    setGroupInfo({ ...groupInfo, members: updatedMembers });
  };

  const handleNestedChange = (name, value, index) => {
    const updatedMembers = [...groupInfo.members];
    updatedMembers[index][name] = value;
    setGroupInfo({ ...groupInfo, members: updatedMembers });
  };

  const handleCancel = () => {
    dialog1Ref.current.close();
  };

  return (
    <div>
      <button onClick={handleCreateClick}>Create Group</button>

      <dialog ref={dialog1Ref} className="dialog-container">
        <form className="dialog-box" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name of the group"
            name="groupName"
            value={groupInfo.groupName}
            onChange={handleChange}
            required
          />
          <textarea
            type="text"
            placeholder="description or purpose of the group"
            name="description"
            value={groupInfo.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            placeholder="Number of members"
            name="members"
            value={groupInfo.members.length}
            onChange={handleMemNumChange}
            required
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
    </div>
  );
};

export default Create_Group;
