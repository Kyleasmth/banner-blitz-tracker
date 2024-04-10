import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
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

  const [dialog, setDialog] = React.useState({
    open: false,
    type: "", // 'generate' or 'reset'
  });

  const [openResetDialog, setOpenResetDialog] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // generatePositions();
    handleOpenDialog();
  };

  const openDialog = (type) => {
    setDialog({
      open: true,
      type,
    });
  };

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, open: false }));
  };

  const handleConfirm = () => {
    if (dialog.type === "generate") {
      generatePositions();
    } else if (dialog.type === "reset") {
      resetGame();
    }
    closeDialog();
  };

  return (
    <Container maxWidth="sm">
      <Dialog open={dialog.open} onClose={closeDialog}>
        <DialogTitle>
          Confirm {dialog.type === "generate" ? "Generation" : "Reset"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            {dialog.type === "generate"
              ? "generate team positions"
              : "reset the game"}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

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
        <Button onClick={toggleTracker} variant="contained" sx={{ mt: 3 }}>
          Go to turn tracker
        </Button>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 5 }}
          onClick={() => openDialog("generate")}
        >
          Generate Team Positions
        </Button>
        <Button
          onClick={() => openDialog("reset")}
          variant="contained"
          sx={{ mt: 5 }}
        >
          Reset Game
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
