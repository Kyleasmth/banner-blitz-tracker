import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Badge,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { classColors } from "../../../typesAndConstants";

const NPCCard = ({
  npc,
  handleStatChange,
  updatePlayerNotes,
  handleRemoveNPC,
  currentTurnIndex,
}) => {
  const renderStatField = (statName, statValue) => (
    <div key={statName} style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body2" sx={{ fontWeight: "bold", margin: "0 10px" }}>
        {statName}: {statValue}
      </Typography>
      <IconButton
        onClick={() => handleStatChange(npc.name, npc.team, statName, -1)}
        sx={{ color: "black" }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );

  return (
    <Badge
      color="error"
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
          width: 500,
          height: 550,
          backgroundColor: classColors[npc.role],
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
            {npc.name} {npc.role} {npc.team}
          </Typography>
          {Object.keys(npc)
            .filter(
              (key) =>
                typeof npc[key] === "number" && key !== "x" && key !== "y"
            )
            .map((stat) => renderStatField(stat, npc[stat]))}
          <TextField
            label="Notes"
            variant="outlined"
            value={npc.playerNotes}
            onChange={(e) =>
              updatePlayerNotes(npc.name, npc.team, e.target.value)
            }
            style={{ marginTop: "10px" }}
            fullWidth
            multiline
            rows={3}
          />

          <IconButton onClick={() => handleRemoveNPC(npc)}>
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Badge>
  );
};

export default NPCCard;
