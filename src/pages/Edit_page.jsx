import React from "react";
import { useParams } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";
import { useContext } from "react";

const Edit_page = () => {
  const { groupList, setGroupList } = useContext(GroupContext);
  const { id } = useParams();
  const group = groupList.find((group) => String(group.id === id));

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
  };

  return (
    <div>
      {group ? (
        <div className="edit-group-page">
          <h1>Edit Group: {group.groupName}</h1>
          <form
            onSubmit={(e) => handleSubmit(e, e.target.name, e.target.value)}
          >
            <label>
              Group Name:
              <input
                type="text"
                defaultValue={group.groupName}
                name="groupName"
              />
            </label>
            <label>
              Description:
              <textarea
                defaultValue={group.description}
                name="description"
              ></textarea>
            </label>
            <label htmlFor="">Number of Members: </label>
            <input
              type="number"
              placeholder="Number of members"
              name="members"
              defaultValue={group.members.length}
            />

            <label htmlFor="">Members</label>
            {group.members.map((member, index) => (
              <div key={index} className="member-edit">
                <label htmlFor="">Name of member {index}</label>
                <input
                  type="text"
                  value={member.memberName}
                  name="memberName"
                />
                <label htmlFor="">Phone Number</label>
                <input type="text" value={member.phoneNum} name="phoneNum" />
              </div>
            ))}
            <button type="submit">Save Changes</button>
          </form>
        </div>
      ) : (
        <p>Group not found</p>
      )}
    </div>
  );
};

export default Edit_page;
