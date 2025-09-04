import React, { useRef, useContext } from "react";
import { GroupContext } from "../contexts/GroupContext";

const Create_Group = ({ groupInfo, setGroupInfo }) => {
  const { groupList, setGroupList } = useContext(GroupContext);
  const dialog1Ref = useRef(null);
  const handleCreateClick = () => {
    dialog1Ref.current.showModal();
  };

  const defaultContributionInfo = [
    { month: "Jan", isPaid: false },
    { month: "Feb", isPaid: false },
    { month: "Mar", isPaid: false },
    { month: "Apr", isPaid: false },
    { month: "May", isPaid: false },
    { month: "June", isPaid: false },
    { month: "July", isPaid: false },
    { month: "Aug", isPaid: false },
    { month: "Sept", isPaid: false },
    { month: "Oct", isPaid: false },
    { month: "Nov", isPaid: false },
    { month: "Dec", isPaid: false },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGroup = {
      ...groupInfo,
      id: crypto.randomUUID(),
      members: groupInfo.members.map((member) => ({
        ...member,
        memId: crypto.randomUUID(),
        contributionInfo: defaultContributionInfo, // <--- Added default contribution info here
      })),
      creationDate: new Date(),
    };

    setGroupList([...groupList, newGroup]);

    // reset form
    setGroupInfo({
      groupName: "",
      description: "",
      contribution: 0,
      members: [
        {
          memId: "",
          memberName: "",
          phoneNum: "",
          isAdmin: false,
          contributionInfo: defaultContributionInfo, // initialize for default member
        },
      ],
      creationDate: "",
      id: "",
      joinRequests: [],
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
            type="text"
            placeholder="contribution amount:"
            name="contribution"
            value={groupInfo.contribution}
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
                placeholder="Name:"
                name="memberName"
                value={member.memberName}
                onChange={(e) =>
                  handleNestedChange(e.target.name, e.target.value, index)
                }
                required
              />
              <input
                type="number"
                placeholder="Phone Number:"
                name="phoneNum"
                value={member.phoneNum}
                onChange={(e) =>
                  handleNestedChange(e.target.name, e.target.value, index)
                }
                required
              />
              <input
                type="boolean"
                placeholder="Are you an admin? (true/false)"
                name="isAdmin"
                value={member.isAdmin}
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
