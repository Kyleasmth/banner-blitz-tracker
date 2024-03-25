// App.js
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { GameProvider, useGame } from "../gamecontext/GameContext";
import TeamMemberForm from "./Screens/TeamMemberForm/TeamMemberForm";
import TurnTracker from "./Screens/TurnTracker/TurnTracker"; // Uncomment if TurnTracker is to be used

const theme = createTheme({
  palette: {
    background: {
      default: "#afafaf", // Set your background color here
    },
    action: {
      active: "#ffffff", // Set your text color here
    },
  },
});

// A new component that decides what to render
const Content = () => {
  const { isTurnTrackerVisible } = useGame();

  return isTurnTrackerVisible ? <TurnTracker /> : <TeamMemberForm />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameProvider>
        <Content />{" "}
      </GameProvider>
    </ThemeProvider>
  );
};

export default App;
