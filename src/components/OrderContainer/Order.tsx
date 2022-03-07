import { Box, MenuItem, TextField, useMediaQuery } from "@mui/material";
import FilterBuilder from "../../builders/FilterBuilder";
import { FilterSortBy } from "../../constants/FilterConstants";
import { useFilter } from "../../hooks/useFilters";

export function Order() {
  const { dispatchFilter, filters } = useFilter();
  function handleOrderBy(orderBy: string) {
    const filter = FilterBuilder.build({ orderBy }, filters);
    dispatchFilter(filter);
  }

  return (
    <Box width={150}>
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="SORT BY"
        onChange={(e) => handleOrderBy(e.target.value)}
        size="small"
      >
        {FilterSortBy.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
