import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Badge,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { classColors } from "../../typesAndConstants";

const PlayerCard = ({
  player,
  currentTurnIndex,
  handleStatChange,
  updatePlayerNotes,
}) => {
  const renderStatField = (statName, statValue) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body2" sx={{ fontWeight: "bold", margin: "0 10px" }}>
        {statName}: {statValue}
      </Typography>
      <IconButton
        onClick={() => handleStatChange(player.name, player.team, statName, -1)}
        sx={{ color: "black" }}
      >
        <RemoveCircleOutlineIcon />
      </IconButton>
      <IconButton
        onClick={() => handleStatChange(player.name, player.team, statName, 1)}
        sx={{ color: "black" }}
      >
        <AddCircleOutlineIcon />
      </IconButton>
    </div>
  );

  return (
    <Badge
      color="success"
      overlap="circular"
      variant="dot"
      invisible={!currentTurnIndex}
      anchorOrigin={{
        vertical: "bottom",
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
          width: 344,
          height: 500,
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
          <TextField
            label="Notes"
            variant="outlined"
            value={player.playerNotes}
            onChange={(e) =>
              updatePlayerNotes(player.name, player.team, e.target.value)
            }
            style={{ marginTop: "10px" }}
            fullWidth
            multiline
            rows={3}
          />
        </CardContent>
      </Card>
    </Badge>
  );
};

export default PlayerCard;
