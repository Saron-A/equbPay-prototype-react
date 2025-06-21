import React, { useState, useRef, useContext } from "react";
import { GroupContext } from "../contexts/GroupContext";
import "../index.css";

const Request_Join = () => {
  const { groupList, setGroupList } = useContext(GroupContext);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [reqInfo, setReqInfo] = useState({
    memberName: "",
    phoneNum: "",
  });

  const dialog2Ref = useRef(null);
  const dialog3Ref = useRef(null);

  const handleJoinRequest = () => {
    dialog2Ref.current.showModal();
  };

  const handleJoin = (group) => {
    setSelectedGroup(group);
    dialog3Ref.current.showModal();
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const updatedList = groupList.map((group) => {
      if (group.id === id) {
        return {
          ...group,
          joinRequests: [...group.joinRequests, reqInfo],
        };
      }
      return group; // unchanged groups
    });

    setGroupList(updatedList);
    //reset the form
    setReqInfo({
      memberName: "",
      phoneNum: "",
    });

    dialog3Ref.current.close();
    dialog2Ref.current.close();
  };
  return (
    <div>
      <button onClick={handleJoinRequest}>Request To Join</button>

      <dialog ref={dialog2Ref} className="dialog-box2">
        {groupList.length === 0 ? (
          "No groups available"
        ) : (
          <>
            <p className="number-of-grps-title">
              Number of Groups: {groupList.length}
            </p>
            <ul className="groups-to-join">
              {groupList.map((group) => (
                <li key={group.id}>
                  <div className="available-group-tile">
                    <h3>{group.groupName}</h3>
                    <p>Members: {group.members.length}</p>
                    <button onClick={() => handleJoin(group)}>Join</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        <button type="button" onClick={() => dialog2Ref.current.close()}>
          Cancel
        </button>
      </dialog>

      {/* Single shared Join Form Dialog */}
      <dialog ref={dialog3Ref} className="dialog-box3">
        <form onSubmit={handleSubmit} className="join-req-form">
          <caption>Your Information</caption>
          <input
            type="text"
            placeholder="Your Name: "
            value={reqInfo.memberName}
            onChange={(e) =>
              setReqInfo({ ...reqInfo, memberName: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Your Phone Number: "
            value={reqInfo.phoneNum}
            onChange={(e) =>
              setReqInfo({ ...reqInfo, phoneNum: e.target.value })
            }
            required
          />
          <button type="submit">Submit Request</button>
          <button type="button" onClick={() => dialog3Ref.current.close()}>
            Cancel
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default Request_Join;
