import Box from "@mui/material/Box";
import { CartItensButton } from "../Cart/CartItensButton";
import { InputSearch } from "./InputSearch";
import { Logo } from "./Logo";
import { useMediaQuery } from "@mui/material";
import { MobileMenu } from "./MobileMenu";

export function Header(): JSX.Element {
  const matches = useMediaQuery("(min-width:960px)");

  return (
    <Box
      display="flex"
      justifyContent={{ md: "space-between" }}
      paddingX={{ xs: "16px", md: "40px" }}
      marginTop={2}
      gap={2}
    >
      {matches && <Logo />}
      <InputSearch />
      {matches && <CartItensButton />}
      <MobileMenu />
    </Box>
  );
}
