import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Box } from "@mui/system";
import { useState } from "react";
import { useFilter } from "../../hooks/useFilters";
import FilterBuilder from "../../builders/FilterBuilder";
import { useMediaQuery } from "@mui/material";

export function InputSearch(): JSX.Element {
  const matches = useMediaQuery("(min-width:960px)");
  const [serachText, setSearchText] = useState("");
  const { dispatchFilter, filters } = useFilter();
  function handleSearchBox(description: string) {
    const filter = FilterBuilder.build({ description }, filters);
    dispatchFilter(filter);
  }
  return (
    <Box
      sx={{ background: "#EDEDF0" }}
      width="438px"
      height="48px"
      display="flex"
      alignItems="center"
      borderRadius="4px"
      gap={1}
      paddingX="10px"
    >
      {matches && <SearchIcon />}
      <InputBase
        onChange={(e) => handleSearchBox(e.target.value)}
        placeholder="Search"
        fullWidth
      />
      {!matches && <SearchIcon />}
    </Box>
  );
}
