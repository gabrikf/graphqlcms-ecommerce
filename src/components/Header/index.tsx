import Box from "@mui/material/Box";
import { CartItensButton } from "../Cart/CartItensButton";
import { InputSearch } from "./InputSearch";
import { Logo } from "./Logo";
import { Stack, useMediaQuery } from "@mui/material";
import { MobileMenu } from "./MobileMenu";
import { BasicSelect } from "../Form/Select";
import { useState } from "react";
import { LanguageSelector } from "../../constants/LanguageConstants";

export function Header(): JSX.Element {
  const matches = useMediaQuery("(min-width:960px)");
  const [language, setLanguege] = useState("English");
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
      {matches && (
        <Stack direction="row" spacing={4} alignItems="center">
          <BasicSelect
            width={100}
            label=""
            options={LanguageSelector}
            value={language}
            setValue={setLanguege}
          />
          <CartItensButton />
        </Stack>
      )}
      <MobileMenu />
    </Box>
  );
}
