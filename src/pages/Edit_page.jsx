import React, { useState, useRef, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";
import axios from "axios";
import "../index.css";

const Edit_page = () => {
  const { groupList, setGroupList, groupInfo, setGroupInfo } =
    useContext(GroupContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [newMember, setNewMember] = useState([
    { memId: "", memberName: "", phoneNum: "", isAdmin: false },
  ]);

  const dialogRef = useRef(null);
  const group = groupList.find((group) => String(group.id) === id);

  useEffect(() => {
    if (group) {
      setGroupInfo({
        groupName: group.groupName,
        description: group.description,
        members: group.members,
        creationDate: group.creationDate,
        id: group.id,
        contribution: group.contribution,
      });
    }
  }, [group, setGroupInfo]);

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

  const handleChange = (e, name, value) => {
    setGroupInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleNumChange = (e) => {
    const newLength = parseInt(e.target.value) || 0;
    const newMembers = [];

    for (let i = 0; i < newLength; i++) {
      newMembers.push({
        memId: crypto.randomUUID(),
        memberName: "",
        phoneNum: "",
        isAdmin: false,
        contribution: 0,
        contributionInfo: defaultContributionInfo, // <--- Added here
      });
    }

    setNewMember(newMembers);
  };
  const handleNestedChange = (name, value, index) => {
    const updatedMembers = [...groupInfo.members];
    updatedMembers[index][name] = value;
    setGroupInfo({ ...groupInfo, members: updatedMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedGroup = {
      ...group,
      groupName: groupInfo.groupName,
      description: groupInfo.description,
      members: groupInfo.members.map((member) => ({
        ...member,
        memId: member.memId || crypto.randomUUID(),
        contributionInfo: member.contributionInfo || defaultContributionInfo,
      })),
      contribution: Number(groupInfo.contribution),
      creationDate: group.creationDate,
      admin: groupInfo.members
        .filter((mem) => mem.isAdmin === true)
        .map((mem) => mem.memberName),
    };

    setGroupInfo(updatedGroup);

    try {
      let res = await axios.put(
        `http://localhost:4000/api/groups/edit_group/${id}`,
        updatedGroup
      );
      console.log(res.data); // now only the updated group is returned
      setGroupList((prevList) =>
        prevList.map((grp) => (grp.id === id ? res.data : grp))
      );
    } catch (err) {
      console.error("Error editing group information:", err);
    }

    setGroupInfo({
      groupName: "",
      description: "",
      members: [{ memId: "", memberName: "", phoneNum: "" }],
      creationDate: "",
      id: "",
    });

    navigate(`/group_details/${group.id}`);
  };

  const deleteMember = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member?"
    );
    if (!confirmed) return;
    const updatedMembers = groupInfo.members.filter(
      (member) => member.memId !== id
    );

    setGroupInfo({ ...groupInfo, members: updatedMembers });

    setGroupList((prevList) =>
      prevList.map((grp) =>
        grp.id === group.id ? { ...grp, members: updatedMembers } : grp
      )
    );
  };

  const addMembers = () => {
    dialogRef.current.showModal();
  };

  const mergeMembers = (e) => {
    e.preventDefault();

    setGroupInfo((prevInfo) => ({
      ...prevInfo,
      members: [...prevInfo.members, ...newMember],
    }));

    setNewMember([
      {
        memId: "",
        memberName: "",
        phoneNum: "",
        isAdmin: false,
        contributionInfo: defaultContributionInfo, // reset newMember with contributionInfo
      },
    ]);

    dialogRef.current.close();
  };

  return (
    <div>
      {groupInfo ? (
        <div className="edit-group-page">
          <h1>{groupInfo.groupName}</h1>

          <form onSubmit={handleSubmit}>
            <h2>Edit Information</h2>
            <div className="user-data">
              <label>
                Group Name:
                <input
                  type="text"
                  value={groupInfo.groupName}
                  name="groupName"
                  onChange={(e) =>
                    handleChange(e, e.target.name, e.target.value)
                  }
                />
              </label>
              <label>
                Description:
                <textarea
                  value={groupInfo.description}
                  name="description"
                  onChange={(e) =>
                    handleChange(e, e.target.name, e.target.value)
                  }
                ></textarea>
              </label>
              <label>
                Contribution:
                <input
                  type="number"
                  value={groupInfo.contribution}
                  name="contribution"
                  onChange={(e) =>
                    handleChange(e, e.target.name, e.target.value)
                  }
                />
              </label>
              <label className="members-label">
                Members:
                {groupInfo.members.map((member, index) => (
                  <div key={index} className="member-edit">
                    <label>
                      Name of member {index + 1}
                      <input
                        type="text"
                        name="memberName"
                        value={member.memberName}
                        onChange={(e) =>
                          handleNestedChange(
                            e.target.name,
                            e.target.value,
                            index
                          )
                        }
                      />
                    </label>
                    <label>
                      Phone Number
                      <input
                        type="text"
                        name="phoneNum"
                        value={member.phoneNum}
                        onChange={(e) =>
                          handleNestedChange(
                            e.target.name,
                            e.target.value,
                            index
                          )
                        }
                      />
                    </label>
                    <label>
                      Are you an admin? (true/false)
                      <input
                        type="text"
                        name="isAdmin"
                        value={member.isAdmin}
                        onChange={(e) =>
                          handleNestedChange(
                            e.target.name,
                            e.target.value,
                            index
                          )
                        }
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => deleteMember(member.memId)}
                      className="btns"
                    >
                      Delete Member
                    </button>
                  </div>
                ))}
              </label>
            </div>

            <button type="button" onClick={addMembers} className="btns">
              Add Member
            </button>

            <dialog ref={dialogRef} className="add-member-dialog">
              <div className="add-member-form">
                <h2>Add New Members</h2>
                <label htmlFor="newMemNum" className="member-edit">
                  How many members do you want to add?
                  <input
                    type="number"
                    name="newMemNum"
                    placeholder=""
                    value={newMember.length}
                    onChange={handleNumChange}
                    id="newMemNum"
                    min="0"
                  />
                </label>

                {newMember.map((member, index) => (
                  <div key={index} className="member-edit">
                    <input
                      type="text"
                      placeholder={`Name of member ${index + 1}`}
                      value={member.memberName}
                      onChange={(e) =>
                        setNewMember((prev) =>
                          prev.map((m, i) =>
                            i === index
                              ? { ...m, memberName: e.target.value }
                              : m
                          )
                        )
                      }
                    />
                    <input
                      type="number"
                      placeholder="Phone Number"
                      value={member.phoneNum}
                      onChange={(e) =>
                        setNewMember((prev) =>
                          prev.map((m, i) =>
                            i === index ? { ...m, phoneNum: e.target.value } : m
                          )
                        )
                      }
                    />
                    <input
                      type="text"
                      placeholder="Admin status (true/false)"
                      value={member.isAdmin}
                      onChange={(e) =>
                        setNewMember((prev) =>
                          prev.map((m, i) =>
                            i === index ? { ...m, isAdmin: e.target.value } : m
                          )
                        )
                      }
                    />
                  </div>
                ))}
                <div className="add-cancel-btns">
                  <button type="button" onClick={mergeMembers} className="btns">
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => dialogRef.current.close()}
                    className="btns"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </dialog>

            <button type="submit" className="btns">
              Save Changes
            </button>
          </form>
        </div>
      ) : (
        <p>Group not found</p>
      )}
      <Link to="/">
        <button className="back-btn">Back to homepage</button>
      </Link>
    </div>
  );
};

export default Edit_page;
