import React from "react";
import { Box, Button, Grid, Typography, Container } from "@mui/material";
import { useGame } from "../../../gamecontext/GameContext";
import TeamTextField from "./components/TeamTextField";
import TeamPositions from "./components/TeamPositions";
import { classColors } from "../../typesAndConstants";
import TurnOrder from "./components/TurnOrder";

const TeamMemberForm: React.FC = () => {
  const {
    teamMembers,
    turnOrder,
    handleInputChange,
    generatePositions,
    toggleTracker,
    resetGame,
  } = useGame();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generatePositions();
  };

  return (
    <Container maxWidth="sm">
      <Box
        onSubmit={handleSubmit}
        component="form"
        autoComplete="off"
        noValidate
        sx={{ textAlign: "center", mt: 4 }}
      >
        <Typography variant="h4" gutterBottom>
          Team Members
        </Typography>
        {Object.keys(classColors).map((role) => (
          <Grid container spacing={6} key={role} justifyContent="center">
            <Grid item xs={6}>
              <TeamTextField
                role={role}
                teamType="top"
                value={teamMembers.top[role as keyof typeof teamMembers.top]}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TeamTextField
                role={role}
                teamType="bottom"
                value={
                  teamMembers.bottom[role as keyof typeof teamMembers.bottom]
                }
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        ))}
        <Button type="submit" variant="contained" sx={{ mt: 5 }}>
          Generate Team Positions
        </Button>
        <Button onClick={resetGame} variant="contained" sx={{ mt: 5 }}>
          Reset game
        </Button>
        <TeamPositions team="Top" turnOrder={turnOrder} />
        <TeamPositions team="Bottom" turnOrder={turnOrder} />
        <TurnOrder turnOrder={turnOrder} />
      </Box>
      <Button onClick={toggleTracker} variant="contained" sx={{ mt: 3 }}>
        Go to turn tracker
      </Button>
    </Container>
  );
};

export default TeamMemberForm;
