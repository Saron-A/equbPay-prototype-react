import React, { useRef, useContext } from "react";
import { GroupContext } from "../contexts/GroupContext";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGroup = {
      ...groupInfo,
      id: crypto.randomUUID(),
      members: groupInfo.members.map((member) => ({
        ...member,
        memId: crypto.randomUUID(),
        contributionInfo: defaultContributionInfo,
      })),
      creationDate: new Date(),
      admin: groupInfo.members.find((mem) => mem.isAdmin === true).memberName,
    };

    try {
      let newItem = await axios.post(
        "http://localhost:4000/api/groups",
        newGroup
      );
      console.log(newItem);
      setGroupList([...groupList, newGroup]);
    } catch (err) {
      console.log("Error creating group", err);
    }

    // reset form
    setGroupInfo({
      groupName: "",
      description: "",
      contribution: "",
      members: [
        {
          memId: "",
          memberName: "",
          phoneNum: "",
          isAdmin: false,
          contributionInfo: defaultContributionInfo,
        },
      ],
      creationDate: "",
      id: "",
      joinRequests: [],
    });

    dialog1Ref.current.close();
  };

  const handleChange = (e) => {
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
        isAdmin: false,
        contributionInfo: defaultContributionInfo,
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
          <h2>Create a Group</h2>
          <div className="label-input">
            <label htmlFor="groupName">Name of the group</label>
            <input
              id="groupName"
              type="text"
              name="groupName"
              value={groupInfo.groupName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label-input">
            <label htmlFor="description">Group description</label>
            <textarea
              id="description"
              type="text"
              name="description"
              value={groupInfo.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="label-input">
            <label htmlFor="contribution">Contribution amount:</label>
            <input
              id="contribution"
              type="number"
              name="contribution"
              value={groupInfo.contribution}
              onChange={handleChange}
              required
            />
          </div>

          <div className="label-input">
            <label htmlFor="members">Number of Members:</label>
            <input
              id="members"
              type="number"
              name="members"
              value={groupInfo.members.length}
              onChange={handleMemNumChange}
              required
            />
          </div>

          {groupInfo.members.map((member, index) => (
            <div className="memberInfo" key={member.memId || index}>
              <p>
                <b>{index + 1}.</b>
              </p>
              <div className="sub-label-input">
                <label htmlFor="memberName">Name:</label>
                <input
                  id="memberName"
                  type="text"
                  name="memberName"
                  value={member.memberName}
                  onChange={(e) =>
                    handleNestedChange(e.target.name, e.target.value, index)
                  }
                  required
                />
              </div>

              <div className="sub-label-input">
                <label htmlFor="phoneNum">Phone: </label>
                <input
                  id="phoneNum"
                  type="number"
                  name="phoneNum"
                  value={member.phoneNum}
                  onChange={(e) =>
                    handleNestedChange(e.target.name, e.target.value, index)
                  }
                  required
                />
              </div>

              <div className="sub-label-input">
                <label htmlFor={`isAdmin-${index}`}>Are you an admin?</label>
                <input
                  id={`isAdmin-${index}`}
                  type="checkbox"
                  name="isAdmin"
                  checked={member.isAdmin}
                  onChange={(e) =>
                    handleNestedChange(e.target.name, e.target.checked, index)
                  }
                />
              </div>
            </div>
          ))}

          <button type="submit">Create Group</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default Create_Group;
