import React, { useContext, useRef } from "react";
import { GroupContext } from "../contexts/GroupContext";

const Add_Join_Groups = () => {
  const { groupList, setGroupList } = useContext(GroupContext);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  const handleCreateClick = () => {
    dialogRef.current.showModal();
  };

  const handleGroupCreation = () => {
    const newGroup = {
      id: Date.now(),
      groupName: inputRef.current.value,
      members: [],
    };
    setGroupList([...groupList, newGroup]);
    dialogRef.current.close();
    inputRef.current.value = "";
  };

  return (
    <div className="add-join-btns">
      <button onClick={handleCreateClick}>Create Group</button>
      <dialog ref={dialogRef}>
        <input
          ref={inputRef}
          type="text"
          placeholder="name of the group"
          id="group-name"
        />
        <button onClick={handleGroupCreation}>Create Group</button>
        <button onClick={() => dialogRef.close()}>Cancel</button>
      </dialog>

      <button>Join Group</button>
    </div>
  );
};

export default Add_Join_Groups;
