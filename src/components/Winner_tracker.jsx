import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GroupContext } from "../contexts/GroupContext";

const Winner_tracker = () => {
  const {
    groupList,
    groupInfo,
    winnerOfTheMonth,
    setWinnerOfTheMonth,
    winnersOfThisRound,
    setWinnersOfThisRound,
  } = useContext(GroupContext);
  const { id } = useParams();
  const group = groupList.find((group) => String(group.id) === id);

  if (!group) return <p>Loading group...</p>;

  const getWinner = () => {
    let numOfMems = group.members.length;

    // we can't use id because it is not a number yet
    let winnerIndex = Math.floor(Math.random() * numOfMems);
    let winner = group.members[winnerIndex].memberName;
    setWinnerOfTheMonth(winner);
    setWinnersOfThisRound([...winnersOfThisRound, winner]);
  };

  return (
    <div>
      <button onClick={getWinner}>Find winner of the month</button>
      {winnerOfTheMonth && (
        <div>
          <h3>Winner of this month is: {winnerOfTheMonth}</h3>
        </div>
      )}
    </div>
  );
};

export default Winner_tracker;
