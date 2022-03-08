import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField } from "@mui/material";

interface IBasicSelecProps {
  label: string;
  value: string;
  width?: number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  outlined?: boolean;
  options: IOptions[];
}
interface IOptions {
  value: string | number;
  display: string;
}

export function BasicSelect({
  label,
  value,
  outlined,
  setValue,
  options,
  width,
}: IBasicSelecProps) {
  return (
    <Box sx={{ width: width || 120 }}>
      <FormControl fullWidth>
        <TextField
          id="simple-select"
          value={value}
          label={label}
          variant={outlined ? "outlined" : "standard"}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          select
        >
          <MenuItem value="">Select...</MenuItem>
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.display}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Box>
  );
}
