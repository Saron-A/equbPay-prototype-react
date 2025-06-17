import React, { useContext, useRef, useEffect } from "react";
import { GroupContext } from "../contexts/GroupContext";

const Add_Join_Groups = () => {
  const { groupList, setGroupList } = useContext(GroupContext);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);

  const handleCreateClick = () => {
    dialogRef.current.showModal();
  };

  const handleGroupCreation = () => {
    const name = inputRef.current.value.trim();
    if (!name) return;

    const newGroup = {
      id: Date.now(),
      groupName: name,
      members: [],
    };
    setGroupList([...groupList, newGroup]);
    dialogRef.current.close();
    inputRef.current.value = "";
  };

  const handleCancel = () => {
    dialogRef.current.close();
  };

  return (
    <div className="add-join-btns">
      <button onClick={handleCreateClick}>Create Group</button>

      <dialog ref={dialogRef} className="dialog-container">
        <div className="dialog-box">
          <input
            ref={inputRef}
            type="text"
            placeholder="name of the group"
            id="group-name"
          />
          <input type="number" placeholder="Number of members:" />
          <button onClick={handleGroupCreation}>Create Group</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </dialog>

      <button>Join Group</button>
    </div>
  );
};

export default Add_Join_Groups;
