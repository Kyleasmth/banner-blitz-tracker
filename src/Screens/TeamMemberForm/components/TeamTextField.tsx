import React from "react";
import { TextField } from "@mui/material";
import { classColors } from "../../../typesAndConstants";

interface TeamTextFieldProps {
  role: string;
  teamType: "top" | "bottom";
  value: string;
  onChange: (team: "top" | "bottom", role: string, value: string) => void;
}

const TeamTextField: React.FC<TeamTextFieldProps> = ({
  role,
  teamType,
  value,
  onChange,
}) => {
  return (
    <TextField
      fullWidth
      label={`${role} (${
        teamType.charAt(0).toUpperCase() + teamType.slice(1)
      } Team)`}
      InputLabelProps={{
        sx: {
          fontWeight: "bold",
          fontSize: "1.25rem",
        },
      }}
      variant="outlined"
      value={value}
      onChange={(e) => onChange(teamType, role, e.target.value)}
      sx={{
        "& label.Mui-focused": {
          color: classColors[role as keyof typeof classColors],
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: classColors[role as keyof typeof classColors],
          },
        },
        "& .MuiInputBase-input": {
          color: classColors[role as keyof typeof classColors],
        },
        marginBottom: "16px",
      }}
    />
  );
};

export default TeamTextField;
