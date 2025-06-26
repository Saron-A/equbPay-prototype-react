import React, { useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";
import "../index.css";

const Group_Details = () => {
  const { groupList } = useContext(GroupContext);
  const { id } = useParams();
  const group = groupList.find((group) => String(group.id) === id); // finding the group by its id
  let navigate = useNavigate();
  const dialogRef = useRef(null);

  const handleEditRequest = (id) => {
    navigate(`/edit_group/${id}`); // navigate to the edit page with the group id
  };

  const handleCheckRequests = () => {
    group.joinRequests.length > 0
      ? dialogRef.current.showModal()
      : "No requests";
  };

  const handleAddMember = (e) => {
    const 

  }

  return (
    <div>
      {group ? (
        <div className="group-details-page">
          <h1>{group.groupName}</h1> <p>{group.description}</p>
          <ul>
            Members:
            {group.members.map((member, index) => (
              <li key={index}>
                <div className="member-tile">
                  <p>{member.memberName}</p>
                  <p> {member.phoneNum}</p>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <button className="btns" onClick={handleCheckRequests}>
              Join Requests
            </button>
            <dialog ref={dialogRef} className="check-requests-dialog">
              <div className="check-requests">
                <h2>Join Requests: {group.joinRequests.length}</h2>
                {group.joinRequests.map((request) => (
                  <div key={request.memberName} className="request-tile">
                    <p>Name: {request.memberName}</p>
                    <p>Phone Number: {request.phoneNum}</p>
                    <div className="btns-container">
                      <button className="btns" onClick={handleAddMember}>Add to Group</button>
                      <button className="btns" onClick={handleRejectRequest}>Reject</button>
                    </div>
                  </div>
                ))}
                <button
                  className="btns"
                  onClick={() => dialogRef.current.close()}
                >
                  Cancel
                </button>
              </div>
            </dialog>
          </div>
        </div>
      ) : (
        "Group not found"
      )}

      <button
        className="edit-details-btn"
        onClick={() => handleEditRequest(group.id)}
      >
        Edit Content
      </button>

      <Link to="/">
        <button className="back-btn">Back to homepage</button>
      </Link>
    </div>
  );
};

export default Group_Details;
