// export const handleInputChange = (team, role, value) => {
//   setTeamMembers((prev) => ({
//     ...prev,
//     [team]: { ...prev[team], [role]: value },
//   }));
// };

// export const toggleTracker = () => {
//   setIsTurnTrackerVisible((prev) => !prev);
// };

// export const generatePositions = () => {
//   let topPositions = shuffleArray(generateTeamPositions(teamMembers, "top"));
//   let bottomPositions = shuffleArray(
//     generateTeamPositions(teamMembers, "bottom")
//   );
//   const randomizedTurnOrder = interleaveTeamsAvoidingSameClass(
//     topPositions,
//     bottomPositions
//   );
//   setTurnOrder(randomizedTurnOrder);
//   setCurrentTurnIndex(0);
//   console.log("randomizedTurnOrder[0]", randomizedTurnOrder[0]);
//   if (randomizedTurnOrder.length > 0) {
//     if (randomizedTurnOrder[0].team === "Top") {
//       setTopTeamPoints(6); // Set top team points to 6 if the first player is from the top team
//     } else {
//       setBottomTeamPoints(6); // Set bottom team points to 6 if the first player is from the bottom team
//     }
//   }
// };

// export const updatePlayerNotes = (
//   name: string,
//   team: string,
//   notes: string
// ) => {
//   setTurnOrder((currentTurnOrder) =>
//     currentTurnOrder.map((player) =>
//       player.name === name && player.team === team
//         ? { ...player, playerNotes: notes }
//         : player
//     )
//   );
// };

// export const updateStat = (
//   name: string,
//   team: string,
//   stat: string,
//   delta: number
// ) => {
//   setTurnOrder((currentTurnOrder) =>
//     currentTurnOrder.map((player) =>
//       player.name === name && player.team === team
//         ? { ...player, [stat]: player[stat] + delta }
//         : player
//     )
//   );
// };

// export const handleNextTurn = () => {
//   setCurrentTurnIndex((prevIndex) => {
//     const newIndex = (prevIndex + 1) % turnOrder.length;
//     const newCurrentPlayer = turnOrder[newIndex];

//     // Increment tokens for the new current player
//     setTurnOrder((currentTurnOrder) =>
//       currentTurnOrder.map((player, index) =>
//         index === newIndex ? { ...player, tokens: player.tokens + 1 } : player
//       )
//     );

//     // Increment team points based on the new current player's team
//     const teamToUpdate = newCurrentPlayer.team === "Top" ? "Top" : "Bottom";
//     if (teamToUpdate === "Top") {
//       setTopTeamPoints((prevPoints) => prevPoints + 1);
//     } else {
//       setBottomTeamPoints((prevPoints) => prevPoints + 1);
//     }

//     return newIndex;
//   });
// };

// export const handleTeamPointsChange = (team: string, delta: number) => {
//   if (team === "top") {
//     setTopTeamPoints((prev) => prev + delta);
//   } else if (team === "bottom") {
//     setBottomTeamPoints((prev) => prev + delta);
//   }
// };
