import { Player } from "../typesAndConstants";

export const generateTeamPositions = (
  teamMembers: {
    [team: string]: { [role: string]: string };
  },
  team: "top" | "bottom"
): Player[] => {
  return Object.entries(teamMembers[team])
    .filter(([role, name]) => name.trim() !== "") // Filter out entries without a name
    .map(([role, name]) => {
      let x = Math.floor(Math.random() * 15) + 1; // x is between 1 and 15 for both teams
      let y;
      if (team === "top") {
        y = Math.floor(Math.random() * (18 - 10 + 1)) + 10; // y between 10 and 18 for top team
      } else {
        y = Math.floor(Math.random() * (13 - 4 + 1)) + 4; // y between 4 and 13 for bottom team
      }

      return {
        team: team.charAt(0).toUpperCase() + team.slice(1), // Capitalize the first letter
        role,
        name,
        x,
        y,
        health: 20,
        movementBuff: 0,
        movementDebuff: 0,
        nextHitReduction: 0,
        increasedNextRoll: 0,
        decreasedNextRoll: 0,
        decreasedTurnRoll: 0,
        tokens: 1,
        type: "Player",
        id: Math.floor(Math.random() * 1000000),
      };
    });
};

export const shuffleArray = <T,>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5); // Simpler shuffle using sort
};

//WORKING but starting with top always :^()
// export const interleaveTeamsAvoidingSameClass = (
//   topTeamPositions: Player[],
//   bottomTeamPositions: Player[]
// ): Player[] => {
//   let turnOrder: Player[] = [];
//   let topIndex = 0;
//   let bottomIndex = 0;

//   while (
//     topIndex < topTeamPositions.length ||
//     bottomIndex < bottomTeamPositions.length
//   ) {
//     if (topIndex < topTeamPositions.length) {
//       turnOrder.push(topTeamPositions[topIndex]);
//       topIndex++;
//     }

//     if (bottomIndex < bottomTeamPositions.length) {
//       turnOrder.push(bottomTeamPositions[bottomIndex]);
//       bottomIndex++;
//     }
//   }

//   return turnOrder;
// };

export const interleaveTeamsAvoidingSameClass = (
  topTeamPositions: Player[],
  bottomTeamPositions: Player[]
): Player[] => {
  let turnOrder: Player[] = [];
  let topIndex = 0;
  let bottomIndex = 0;

  // Determine randomly whether to start with the top or bottom positions
  const startWithTop = Math.random() < 0.5;

  while (
    topIndex < topTeamPositions.length ||
    bottomIndex < bottomTeamPositions.length
  ) {
    if (startWithTop) {
      if (topIndex < topTeamPositions.length) {
        turnOrder.push(topTeamPositions[topIndex]);
        topIndex++;
      }

      if (bottomIndex < bottomTeamPositions.length) {
        turnOrder.push(bottomTeamPositions[bottomIndex]);
        bottomIndex++;
      }
    } else {
      if (bottomIndex < bottomTeamPositions.length) {
        turnOrder.push(bottomTeamPositions[bottomIndex]);
        bottomIndex++;
      }

      if (topIndex < topTeamPositions.length) {
        turnOrder.push(topTeamPositions[topIndex]);
        topIndex++;
      }
    }
  }

  return turnOrder;
};
