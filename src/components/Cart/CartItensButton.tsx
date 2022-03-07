import { Button, Typography, useMediaQuery } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box } from "@mui/system";
import Cart from "../../assets/Cart.svg";
import { useCart } from "../../hooks/useCart";
import { useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
export function CartItensButton(): JSX.Element {
  const { cart, cleanCart } = useCart();
  const matches = useMediaQuery("(max-width:960px)");
  const productsTotalPrices = useMemo(() => {
    const total = parseFloat(String(cart.productsTotalPrice)).toFixed(2);
    return total;
  }, [cart]);
  return (
    <Button
      sx={{
        position: "relative",
        paddingX: "24px",
        height: { xs: "56px", md: "51px" },
      }}
      variant="contained"
      startIcon={<img src={Cart} />}
      fullWidth={matches ? true : false}
    >
      <Box
        sx={{
          background: "red",
          borderRadius: "100%",
          fontSize: "14px",
          width: "20px",
          height: "20px",
          position: "absolute",
          left: { xs: "115px", md: "40px" },
          top: "6px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cart.productAmount}
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: { xs: "0px", md: "0px" },
          top: "-2px",
        }}
      >
        {
          <CloseIcon
            sx={{ fontSize: "16px" }}
            color="action"
            onClick={cleanCart}
          />
        }
      </Box>
      <Typography
        sx={{ textTransform: "none", fontSize: "16px" }}
        paddingLeft={4}
      >
        Sub total: {productsTotalPrices}€
      </Typography>
    </Button>
  );
}
