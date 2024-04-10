import { createContext, useState, useContext, useEffect } from "react";
import {
  generateTeamPositions,
  shuffleArray,
  interleaveTeamsAvoidingSameClass,
} from "../src/gameplayFunctions/starterFunctions";
import { Player, NPC } from "../src/typesAndConstants";

interface GameContextType {
  teamMembers: any; //TeamMembersState
  turnOrder: Player[];
  handleInputChange: (
    team: "top" | "bottom",
    role: string,
    value: string
  ) => void;
  generatePositions: () => void;
  toggleTracker: () => void;
  isTurnTrackerVisible: boolean;
  currentTurnIndex: number;
  setCurrentTurnIndex: (index: number) => void;
  updateStat: (name: string, team: string, stat: string, delta: number) => void;
  topTeamPoints: number; // Track top team points
  bottomTeamPoints: number; // Track bottom team points
  handleNextTurn: () => void;
  handleTeamPointsChange: (team: string, delta: number) => void;
  updatePlayerNotes: (name: string, team: string, notes: string) => void;
  handleInsertNPC: (currentPlayer: Player, npcName: string) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState(() => {
    const savedTeamMembers = localStorage.getItem("teamMembers");
    return savedTeamMembers
      ? JSON.parse(savedTeamMembers)
      : {
          top: { Warrior: "", Rogue: "", Mage: "", Ranger: "", Cleric: "" },
          bottom: { Warrior: "", Rogue: "", Mage: "", Ranger: "", Cleric: "" },
        };
  });

  const [isTurnTrackerVisible, setIsTurnTrackerVisible] = useState(() => {
    const savedVisibility = localStorage.getItem("isTurnTrackerVisible");
    return savedVisibility ? JSON.parse(savedVisibility) : false;
  });

  const [turnOrder, setTurnOrder] = useState<Player[]>(() => {
    const savedTurnOrder = localStorage.getItem("turnOrder");
    return savedTurnOrder ? JSON.parse(savedTurnOrder) : [];
  });

  const [currentTurnIndex, setCurrentTurnIndex] = useState(() => {
    const savedIndex = localStorage.getItem("currentTurnIndex");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  const [topTeamPoints, setTopTeamPoints] = useState(() => {
    const savedPoints = localStorage.getItem("topTeamPoints");
    return savedPoints ? parseInt(savedPoints, 10) : 5;
  });

  const [bottomTeamPoints, setBottomTeamPoints] = useState(() => {
    const savedPoints = localStorage.getItem("bottomTeamPoints");
    return savedPoints ? parseInt(savedPoints, 10) : 5;
  });

  const handleInputChange = (team, role, value) => {
    setTeamMembers((prev) => ({
      ...prev,
      [team]: { ...prev[team], [role]: value },
    }));
  };

  const toggleTracker = () => {
    setIsTurnTrackerVisible((prev) => !prev);
  };

  const generatePositions = () => {
    let topPositions = shuffleArray(generateTeamPositions(teamMembers, "top"));
    let bottomPositions = shuffleArray(
      generateTeamPositions(teamMembers, "bottom")
    );
    let randomizedTurnOrder = interleaveTeamsAvoidingSameClass(
      topPositions,
      bottomPositions
    );

    // Ensure there's at least one player and assign 2 tokens to the first player
    if (randomizedTurnOrder.length > 0) {
      randomizedTurnOrder = randomizedTurnOrder.map((player, index) => {
        if (index === 0) {
          // First player in the order
          return { ...player, tokens: 2 }; // Assign 2 tokens
        }
        return player;
      });

      // Adjust team points based on the team of the first player
      if (randomizedTurnOrder[0].team === "Top") {
        setTopTeamPoints(6);
      } else {
        setBottomTeamPoints(6);
      }
    }

    setTurnOrder(randomizedTurnOrder);
    setCurrentTurnIndex(0);
  };

  const updatePlayerNotes = (selectedPlayer: Player, notes: string) => {
    const { id, team } = selectedPlayer;
    setTurnOrder((currentTurnOrder) =>
      currentTurnOrder.map((player) =>
        player.id === id && player.team === team
          ? { ...player, playerNotes: notes }
          : player
      )
    );
  };

  const updateStat = (selectedPlayer: Player, stat: string, delta: number) => {
    const { id, team } = selectedPlayer;
    setTurnOrder((currentTurnOrder) =>
      currentTurnOrder.map((player) => {
        if (player.id === id && player.team === team) {
          const updatedPlayer = { ...player, [stat]: player[stat] + delta };

          if (stat === "tokens" && delta > 0) {
            if (team === "Top") {
              setTopTeamPoints((prevPoints) => prevPoints + delta);
            } else if (team === "Bottom") {
              setBottomTeamPoints((prevPoints) => prevPoints + delta);
            }
          }

          // No decrease in team score if tokens are reduced
          return updatedPlayer;
        }
        return player;
      })
    );
  };

  const handleNextTurn = () => {
    setCurrentTurnIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % turnOrder.length;
      const newCurrentPlayer = turnOrder[newIndex];

      // Increment tokens for the new current player
      setTurnOrder((currentTurnOrder) =>
        currentTurnOrder.map((player, index) =>
          index === newIndex ? { ...player, tokens: player.tokens + 1 } : player
        )
      );

      // Increment team points based on the new current player's team
      const teamToUpdate = newCurrentPlayer.team === "Top" ? "Top" : "Bottom";
      if (teamToUpdate === "Top") {
        setTopTeamPoints((prevPoints) => prevPoints + 1);
      } else {
        setBottomTeamPoints((prevPoints) => prevPoints + 1);
      }

      return newIndex;
    });
  };

  const handleTeamPointsChange = (team: string, delta: number) => {
    if (team === "top") {
      setTopTeamPoints((prev) => prev + delta);
    } else if (team === "bottom") {
      setBottomTeamPoints((prev) => prev + delta);
    }
  };

  const handleInsertNPC = (currentPlayer, npcName) => {
    setTurnOrder((currentTurnOrder) => {
      const currentIndex = currentTurnOrder.findIndex(
        (player) => player === currentPlayer
      );
      const newNPC = {
        name: npcName,
        role: "NPC",
        isNPC: true /* Add a flag to indicate that this is an NPC */,
      };
      if (currentIndex >= 0) {
        return [
          ...currentTurnOrder.slice(0, currentIndex + 1),
          newNPC,
          ...currentTurnOrder.slice(currentIndex + 1),
        ];
      }
      return currentTurnOrder;
    });
  };

  const handleRemoveNPC = (currentPlayer) => {
    setTurnOrder((currentTurnOrder) => {
      return currentTurnOrder.filter(
        (player) => player !== currentPlayer || !player.isNPC
      );
    });
  };

  const resetGame = () => {
    // Clear local storage
    localStorage.removeItem("teamMembers");
    localStorage.removeItem("isTurnTrackerVisible");
    localStorage.removeItem("turnOrder");
    localStorage.removeItem("currentTurnIndex");
    localStorage.removeItem("topTeamPoints");
    localStorage.removeItem("bottomTeamPoints");

    // Reset state
    setTeamMembers({
      top: {
        Warrior: "Kyle",
        Rogue: "Colin",
        Mage: "Kyle",
        Ranger: "EJ",
        Cleric: "",
      },
      bottom: {
        Warrior: "Asa",
        Rogue: "Sean",
        Mage: "Nick",
        Ranger: "Bucca",
        Cleric: "",
      },
    });
    setIsTurnTrackerVisible(false);
    setTurnOrder([]);
    setCurrentTurnIndex(0);
    setTopTeamPoints(5);
    setBottomTeamPoints(5);
  };

  useEffect(() => {
    localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
    localStorage.setItem(
      "isTurnTrackerVisible",
      JSON.stringify(isTurnTrackerVisible)
    );
    localStorage.setItem("turnOrder", JSON.stringify(turnOrder));
    localStorage.setItem("currentTurnIndex", currentTurnIndex.toString());
    localStorage.setItem("topTeamPoints", topTeamPoints.toString());
    localStorage.setItem("bottomTeamPoints", bottomTeamPoints.toString());
  }, [
    teamMembers,
    isTurnTrackerVisible,
    turnOrder,
    currentTurnIndex,
    topTeamPoints,
    bottomTeamPoints,
  ]);

  return (
    <GameContext.Provider
      value={{
        teamMembers,
        turnOrder,
        handleInputChange,
        generatePositions,
        toggleTracker,
        isTurnTrackerVisible,
        currentTurnIndex,
        setCurrentTurnIndex,
        updateStat,
        topTeamPoints,
        bottomTeamPoints,
        handleNextTurn,
        handleTeamPointsChange,
        updatePlayerNotes,
        handleInsertNPC,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
