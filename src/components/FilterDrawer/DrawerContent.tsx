import { Stack, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FiltersDrawerForm } from "./FitlerDrawerForm";

interface IDrawerContentProps {
  drawerCommands: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export function DrawerContent({ drawerCommands }: IDrawerContentProps) {
  return (
    <Box height="50vh">
      <Stack margin={2} direction="row" justifyContent="space-between">
        <Typography
          textTransform="uppercase"
          variant="h6"
          noWrap
          component="div"
        >
          Filters
        </Typography>
        <CloseIcon onClick={drawerCommands(false)} />
      </Stack>
      <FiltersDrawerForm />
    </Box>
  );
}
