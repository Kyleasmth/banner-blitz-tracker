import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { classColors, Player } from "../../../typesAndConstants";

interface TeamPositionsProps {
  team: "Top" | "Bottom";
  turnOrder: Player[];
}

const TeamPositions: React.FC<TeamPositionsProps> = ({ team, turnOrder }) => {
  const [expanded, setExpanded] = useState(true);
  const theme = useTheme();

  const handleChange =
    (panel: boolean) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === true}
      onChange={handleChange(true)}
      sx={{ backgroundColor: theme.palette.background.default }} // Set background color for Accordion
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{ backgroundColor: theme.palette.background.default }} // Set background color for AccordionSummary
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          {team} Team Positions
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ backgroundColor: theme.palette.background.default }} // Set background color for AccordionDetails
      >
        <List>
          {turnOrder
            .filter((player) => player.team === team)
            .map((player, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: theme.palette.background.default,
                  color: classColors[player.role as keyof typeof classColors],
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: classColors[player.role as keyof typeof classColors],
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                  }}
                >
                  {`${player.name} (${player.role}): X: ${player.x}, Y: ${player.y}`}
                </Typography>
              </ListItem>
            ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default TeamPositions;
