import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export function Logo() {
  return (
    <Box width={349}>
      <Box
        sx={{
          background: "#F9F9F9",
          border: "solid 1px #777777",
          height: "49px",
          width: "250px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            textTransform: "uppercase",
            fontWeight: "800",
            fontSize: "16px",
            color: "black",
          }}
        >
          Logo
        </Typography>
      </Box>
    </Box>
  );
}
