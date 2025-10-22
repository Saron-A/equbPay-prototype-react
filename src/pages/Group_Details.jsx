import React, { useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";
import "../index.css";
import Contribution_Tracker from "../components/Contribution_Tracker";
import Winner_tracker from "../components/Winner_tracker";
const Group_Details = () => {
  const { groupList, setGroupList, setGroupInfo } = useContext(GroupContext);
  const { id } = useParams();
  const group = groupList.find((group) => String(group.id) === id); // finding the group by its id
  let navigate = useNavigate();
  const dialogRef = useRef(null);

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

  const handleEditRequest = (id) => {
    navigate(`/edit_group/${id}`); // navigate to the edit page with the group id
  };

  const handleCheckRequests = () => {
    dialogRef.current.showModal();
  };

  const handleAddMember = (request) => {
    const updatedGroup = {
      ...group,
      members: [
        ...group.members,
        {
          memId: request.reqId,
          memberName: request.memberName,
          phoneNum: request.phoneNum,
          isAdmin: false,
          contributionInfo: defaultContributionInfo, // add contributionInfo here too
        },
      ],
      joinRequests: group.joinRequests.filter(
        (req) => req.reqId !== request.reqId
      ), // fixed property
    };

    setGroupInfo(updatedGroup);
    setGroupList((prevList) =>
      prevList.map((grp) => (grp.id === group.id ? updatedGroup : grp))
    );
    alert(`${request.memberName} has been added to the group!`);
    dialogRef.current.close();
  };

  const handleRejectRequest = (request) => {
    const confirmed = window.confirm(
      `Are you sure you want to reject the request from ${request.memberName}?`
    );
    if (!confirmed) return;

    const updatedGroup = {
      ...group,
      joinRequests: group.joinRequests.filter(
        (req) => req.reqId !== request.reqId
      ), // fixed property
    };

    setGroupInfo(updatedGroup);
    setGroupList((prevList) =>
      prevList.map((grp) => (grp.id === group.id ? updatedGroup : grp))
    );
    dialogRef.current.close();
  };

  return (
    <div>
      {group ? (
        <div className="group-details-page">
          <h1>{group.groupName}</h1> <p>{group.description}</p>
          <p>
            Contribution amount: <b>{group.contribution} Br.</b> per month for
            each member.
          </p>
          <ul>
            Members:
            {group.members.map((member, index) => (
              <li key={member.memId || index}>
                <div className="member-tile">
                  <p>{member.memberName}</p>
                  <p> {member.phoneNum}</p>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <Contribution_Tracker />
          </div>
          <div>
            <Winner_tracker />
          </div>
          <div>
            <button className="btns" onClick={handleCheckRequests}>
              Join Requests
            </button>
            <dialog ref={dialogRef} className="check-requests-dialog">
              {group.joinRequests.length === 0 ? (
                <>
                  <p>No join requests available</p>
                  <button
                    className="btns"
                    onClick={() => dialogRef.current.close()}
                  >
                    cancel
                  </button>
                </>
              ) : (
                <div className="check-requests">
                  <h2>Join Requests: {group.joinRequests.length}</h2>
                  {group.joinRequests?.map((request, index) => (
                    <div key={request.reqId || index} className="request-tile">
                      <p>Name: {request.memberName}</p>
                      <p>Phone Number: {request.phoneNum}</p>
                      <div className="btns-container">
                        <button
                          className="btns"
                          onClick={() => handleAddMember(request)}
                        >
                          Add to Group
                        </button>
                        <button
                          className="btns"
                          onClick={() => handleRejectRequest(request)}
                        >
                          Reject
                        </button>
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
              )}
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
