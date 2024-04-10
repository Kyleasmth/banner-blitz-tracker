import React from "react";
import { useGame } from "../../../gamecontext/GameContext";
import { Grid, Button, Typography, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import PlayerCard from "./components/PlayerCard";

const TurnTracker: React.FC = () => {
  const {
    turnOrder,
    toggleTracker,
    currentTurnIndex,
    updateStat,
    topTeamPoints,
    bottomTeamPoints,
    handleNextTurn,
    handleTeamPointsChange,
    updatePlayerNotes,
    handleInsertNPC,
  } = useGame();

  // const handleStatChange = (
  //   name: string,
  //   team: string,
  //   stat: string,
  //   delta: number
  // ) => {
  //   updateStat(name, team, stat, delta);
  // };

  return (
    <div style={{ paddingTop: "10px", textAlign: "center" }}>
      <Typography variant="h2" gutterBottom>
        Top Team Points: {topTeamPoints}
        <IconButton
          onClick={() => handleTeamPointsChange("top", -1)}
          sx={{ color: "black" }}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <IconButton
          onClick={() => handleTeamPointsChange("top", 1)}
          sx={{ color: "black" }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Typography>
      <Typography variant="h2" gutterBottom>
        Bottom Team Points: {bottomTeamPoints}
        <IconButton
          onClick={() => handleTeamPointsChange("bottom", -1)}
          sx={{ color: "black" }}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <IconButton
          onClick={() => handleTeamPointsChange("bottom", 1)}
          sx={{ color: "black" }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {turnOrder.map((player, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <PlayerCard
              player={player}
              currentTurnIndex={currentTurnIndex === index}
              updateStat={updateStat}
              updatePlayerNotes={updatePlayerNotes}
              handleInsertNPC={handleInsertNPC}
            />
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Button onClick={handleNextTurn} variant="contained" sx={{ mr: 2 }}>
          Next
        </Button>
        <Button onClick={toggleTracker} variant="contained">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default TurnTracker;
