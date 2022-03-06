import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { useCallback, useState } from "react";
import { DrawerContent } from "./DrawerContent";
import { Box } from "@mui/material";

export function FilterDrawer() {
  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = useCallback((open: boolean) => {
    return (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, bottom: open });
    };
  }, []);

  return (
    <Box>
      <Button onClick={toggleDrawer(true)}>Filtros</Button>
      <SwipeableDrawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <DrawerContent drawerCommands={toggleDrawer} />
      </SwipeableDrawer>
    </Box>
  );
}
