import { Box, MenuItem, TextField, useMediaQuery } from "@mui/material";
import FilterBuilder from "../../builders/FilterBuilder";
import { useFilter } from "../../hooks/useFilters";

const currencies = [
  {
    value: "rate_DESC",
    label: "Rating",
  },
  {
    value: "price_DESC",
    label: "Price",
  },
];

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
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
