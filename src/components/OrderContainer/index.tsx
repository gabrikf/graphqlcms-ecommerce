import { Box, useMediaQuery } from "@mui/material";
import FilterBuilder from "../../builders/FilterBuilder";
import { FilterDrawer } from "../FilterDrawer";

import { Order } from "./Order";

export function OrderContainer() {
  const matches = useMediaQuery("(max-width:960px)");

  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent={{ xs: "space-between", md: "center" }}
      marginY="30px"
      marginX="16px"
    >
      <Order />
      {matches && <FilterDrawer />}
    </Box>
  );
}
