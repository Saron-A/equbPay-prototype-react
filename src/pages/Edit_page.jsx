import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";
import "../index.css";

const Edit_page = () => {
  const { groupList, setGroupList, groupInfo, setGroupInfo } =
    useContext(GroupContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const dialogRef = useRef(null);

  // Find the group from the list by ID
  const group = groupList.find((g) => String(g.id) === id);

  useEffect(() => {
    if (group) {
      setGroupInfo({
        groupName: group.groupName,
        description: group.description,
        members: group.members,
        creationDate: group.creationDate,
        id: group.id,
      });
    }
  }, [group, setGroupInfo]);

  const [newMembers, setNewMembers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (index, name, value) => {
    const updatedMembers = [...groupInfo.members];
    updatedMembers[index] = { ...updatedMembers[index], [name]: value };
    setGroupInfo((prev) => ({ ...prev, members: updatedMembers }));
  };

  const deleteMember = (memId) => {
    const filteredMembers = groupInfo.members.filter((m) => m.memId !== memId);
    setGroupInfo((prev) => ({ ...prev, members: filteredMembers }));
  };

  const addMembers = () => {
    setNewMembers([
      { memId: crypto.randomUUID(), memberName: "", phoneNum: "" },
    ]);
    dialogRef.current.showModal();
  };

  const handleNewMemberChange = (index, name, value) => {
    const updated = [...newMembers];
    updated[index] = { ...updated[index], [name]: value };
    setNewMembers(updated);
  };

  const addNewMemberInput = () => {
    setNewMembers((prev) => [
      ...prev,
      { memId: crypto.randomUUID(), memberName: "", phoneNum: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedGroup = {
      ...group,
      groupName: groupInfo.groupName,
      description: groupInfo.description,
      members: groupInfo.members.map((member) => ({
        ...member,
        memId: member.memId || crypto.randomUUID(),
      })),
    };

    setGroupInfo(updatedGroup);
    setGroupList((oldList) =>
      oldList.map((grp) => (grp.id === group.id ? updatedGroup : grp))
    );

    navigate(`/group_details/${group.id}`);
  };

  const handleAddMembersSubmit = (e) => {
    e.preventDefault();

    setGroupInfo((prev) => ({
      ...prev,
      members: [...prev.members, ...newMembers],
    }));
    dialogRef.current.close();
  };

  if (!groupInfo) {
    return <p>Loading group data...</p>;
  }

  return (
    <div className="edit-group-page">
      <h1>Edit Group: {groupInfo.groupName}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Group Name:
          <input
            type="text"
            name="groupName"
            value={groupInfo.groupName}
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={groupInfo.description}
            onChange={handleChange}
          />
        </label>

        <fieldset>
          <legend>Members</legend>
          {groupInfo.members.map((member, index) => (
            <div key={member.memId || index} className="member-edit">
              <label>
                Name of member {index + 1}:
                <input
                  type="text"
                  value={member.memberName}
                  onChange={(e) =>
                    handleMemberChange(index, "memberName", e.target.value)
                  }
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  value={member.phoneNum}
                  onChange={(e) =>
                    handleMemberChange(index, "phoneNum", e.target.value)
                  }
                />
              </label>
              <button
                type="button"
                onClick={() => deleteMember(member.memId)}
                className="delete-member-btn"
              >
                Delete Member
              </button>
            </div>
          ))}
        </fieldset>

        <button type="button" onClick={addMembers}>
          Add New Members
        </button>

        <button type="submit">Save Changes</button>
      </form>

      <dialog ref={dialogRef}>
        <h2>Add New Members</h2>
        <form onSubmit={handleAddMembersSubmit}>
          {newMembers.map((member, index) => (
            <div key={member.memId} className="member-edit">
              <label>
                Name:
                <input
                  type="text"
                  value={member.memberName}
                  onChange={(e) =>
                    handleNewMemberChange(index, "memberName", e.target.value)
                  }
                  required
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  value={member.phoneNum}
                  onChange={(e) =>
                    handleNewMemberChange(index, "phoneNum", e.target.value)
                  }
                  required
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addNewMemberInput}>
            Add Another Member
          </button>
          <button type="submit">Add Members</button>
          <button type="button" onClick={() => dialogRef.current.close()}>
            Cancel
          </button>
        </form>
      </dialog>

      <Link to="/">
        <button className="back-btn">Back to homepage</button>
      </Link>
    </div>
  );
};

export default Edit_page;
