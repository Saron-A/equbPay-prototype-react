import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";
import { useContext } from "react";
import "../index.css";

const Edit_page = () => {
  const { groupList, setGroupList } = useContext(GroupContext);
  let navigate = useNavigate();
  const { id } = useParams();
  const group = groupList.find((group) => String(group.id === id));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupList((prevList) =>
      prevList.map((group) => {
        if (group.id === id) return { ...group, [name]: value };
        return group;
      })
    );
  };

  const handleSubmit = (e, name, value) => {
    e.preventDefault();
    const updatedGroup = {
      ...group,
      [name]: value,
    };
    const updatedList = groupList.map((g) =>
      g.id === group.id ? updatedGroup : g
    );
    setGroupList(updatedList);
    navigate(`/group_details/${group.id}`);
  };

  return (
    <div>
      {group ? (
        <div className="edit-group-page">
          <h1>{group.groupName}</h1>
          <h2>Edit Information</h2>
          <form onSubmit={(e) => handleSubmit(e, name, value)}>
            <label>
              Group Name:
              <input type="text" value={group.groupName} name="groupName" />
            </label>
            <label>
              Description:
              <textarea value={group.description} name="description"></textarea>
            </label>

            <label htmlFor="">
              Members
              {group.members.map((member, index) => (
                <div key={index} className="member-edit">
                  <label htmlFor="">
                    Name of member {index + 1}
                    <input
                      type="text"
                      value={member.memberName}
                      name="memberName"
                    />
                  </label>
                  <label htmlFor="">
                    Phone Number
                    <input
                      type="text"
                      value={member.phoneNum}
                      name="phoneNum"
                    />
                  </label>
                  <button type="button" onClick={() => deleteMember()}>
                    Delete Member
                  </button>
                </div>
              ))}
            </label>

            <button>Add Member</button>

            <button type="submit">Save Changes</button>
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
