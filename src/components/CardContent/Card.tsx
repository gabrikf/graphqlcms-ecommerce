import {
  Button,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { BasicSelect } from "../Form/Select";
import Ok from "../../assets/Ok.svg";
import { ProductQuantity } from "../../constants/ProductsConstants";

interface ICardProps {
  id: string;
  imgUrl: string;
  description: string;
  rating: number;
  price: string;
  priceConverted: string;
}

export function Card({
  id,
  description,
  imgUrl,
  priceConverted,
  price,
  rating,
}: ICardProps): JSX.Element {
  const [quantity, setQuantity] = useState("1");
  const [productisLoading, setProductIsLoading] = useState(false);
  const matches = useMediaQuery("(min-width:960px)");
  const { addProduct } = useCart();
  function handleAddingItem() {
    addProduct(id, +quantity, +price);
    setProductIsLoading(true);
    setTimeout(() => setProductIsLoading(false), 5000);
  }
  return (
    <Box
      sx={{
        width: {
          xs: "160px",
          md: "288px",
        },
      }}
      padding={{ xs: 1, md: 2 }}
      border="solid 1px #BCBDBC"
      borderRadius="4px"
    >
      <Box width="100%" display="flex" justifyContent="center">
        <img width="100%" src={imgUrl} alt="product image" />
      </Box>
      <Box height="100px">
        <Typography fontSize="14px" fontFamily="Inter">
          {description}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} alignItems="center">
        <Rating
          name="half-rating-read"
          defaultValue={Number(rating)}
          precision={0.5}
          readOnly
        />
        <Typography
          color="#5E6366"
          fontFamily="Roboto"
          fontSize="14px"
          fontWeight="700"
        >
          {rating}
        </Typography>
      </Stack>
      <Stack
        paddingY={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          fontWeight={700}
          fontSize={{ xs: "16px", md: "36px" }}
          fontFamily="Inter"
        >
          {priceConverted}
        </Typography>
        <BasicSelect
          width={matches ? 120 : 40}
          outlined={matches}
          label={matches ? "quantity" : ""}
          options={ProductQuantity}
          value={quantity}
          setValue={setQuantity}
        />
      </Stack>
      <Button
        onClick={handleAddingItem}
        startIcon={productisLoading ? <img src={Ok} /> : ""}
        fullWidth
        variant="outlined"
      >
        <Typography
          fontWeight={500}
          fontSize="14px"
          fontFamily="Inter"
          textTransform="none"
        >
          {!productisLoading ? "Add to Cart" : "Added"}
        </Typography>
      </Button>
    </Box>
  );
}
