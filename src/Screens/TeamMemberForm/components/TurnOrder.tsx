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
import TeamPositions from "./TeamPositions"; // Adjust the path as necessary
import { classColors, Player } from "../../../typesAndConstants";

interface TurnOrderProps {
  turnOrder: Player[];
}

const TurnOrder: React.FC<TurnOrderProps> = ({ turnOrder }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);

  const handleChange = (isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion expanded={expanded} onChange={() => handleChange(!expanded)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="turn-order-content"
        id="turn-order-header"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
        >
          Turn Order
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <List>
          {turnOrder.map((player, index) => (
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
                {`${player.team} - ${player.name} - ${player.role}`}
              </Typography>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default TurnOrder;
