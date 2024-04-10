import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Badge,
  TextField,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { classColors, npcOptions } from "../../../typesAndConstants";

const PlayerCard = ({
  player,
  updateStat,
  updatePlayerNotes,
  handleInsertNPC,
  currentTurnIndex,
}) => {
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = (npc) => {
  //   if (npc) {
  //     handleInsertNPC(player, npc);
  //   }
  //   setAnchorEl(null);
  // };

  const renderStatField = (statName: string, statValue: number) => {
    if (statName === "id") return null;
    return (
      <div key={statName} style={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="body1"
          sx={{ fontSize: "24px", fontWeight: "bold", margin: "0 20px" }}
        >
          {statName}: {statValue}
        </Typography>
        <IconButton
          onClick={() => updateStat(player, statName, -1)}
          sx={{ color: "black" }}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <IconButton
          onClick={() => updateStat(player, statName, 1)}
          sx={{ color: "black" }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <Badge
      color="secondary"
      overlap="circular"
      variant="dot"
      invisible={!currentTurnIndex}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiBadge-badge": {
          height: 35,
          minWidth: 35,
          marginRight: 2,
        },
      }}
    >
      <Card
        sx={{
          width: 500,
          height: 550,
          backgroundColor: classColors[player.role],
          marginRight: "20px",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "black" }}
          >
            {player.name} {player.role} {player.team}
          </Typography>
          {Object.keys(player)
            .filter(
              (key) =>
                typeof player[key] === "number" && key !== "x" && key !== "y"
            )
            .map((stat) => renderStatField(stat, player[stat]))}
          <Button
            onClick={() => updateStat(player, "tokens", 3)}
            variant="contained"
            sx={{ mr: 2 }}
          >
            Record player kill
          </Button>
          <TextField
            label="Notes"
            variant="outlined"
            value={player.playerNotes}
            onChange={(e) => updatePlayerNotes(player, e.target.value)}
            style={{ marginTop: "10px" }}
            fullWidth
            multiline
            rows={3}
            sx={{
              backgroundColor: "white", // Set background color to white
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black", // Optional: Change the border color to black
                },
                "&:hover fieldset": {
                  borderColor: "gray", // Optional: Change the border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: classColors[player.role], // Optional: Change the border color when the text field is focused
                },
              },
            }}
          />

          {/* <Button
            aria-controls="npc-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Add NPC
          </Button>
          <Menu
            id="npc-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose(null)}
          >
            {npcOptions.map((npc, index) => (
              <MenuItem
                key={`${npc}-${index}`}
                onClick={() => handleClose(npc)}
              >
                {npc}
              </MenuItem>
            ))}
          </Menu> */}
        </CardContent>
      </Card>
    </Badge>
  );
};

export default PlayerCard;
