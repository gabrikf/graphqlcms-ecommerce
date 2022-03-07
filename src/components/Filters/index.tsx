import { Button, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Box } from "@mui/system";
import { useFilter } from "../../hooks/useFilters";
import FilterBuilder from "../../builders/FilterBuilder";
import { ProductPriceAbove } from "../../constants/ProductsConstants";

interface INewFilterValues {
  description?: string;
  rateGte?: number;
  priceGte: number;
  priceLte: number;
}
export function Filters(): JSX.Element {
  const { dispatchFilter, filters } = useFilter();
  const formik = useFormik({
    initialValues: {
      rateGte: null,
      priceGte: null,
      priceLte: null,
    },
    onSubmit: (values) => {
      const filterValues = FilterBuilder.build(values, filters);
      dispatchFilter(filterValues);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ padding: "24px", margin: "40px", background: "#F9F9F9" }}
      >
        <Box width="160px"></Box>
        <Box display="flex" gap={2}>
          <Box height="40px" width="112px">
            <TextField
              fullWidth
              id="outlined-basic"
              label="€ Max"
              variant="outlined"
              size="small"
              value={formik.values.priceLte}
              name="priceLte"
              onChange={formik.handleChange}
            />
          </Box>
          <Box height="40px" width="112px">
            <TextField
              fullWidth
              id="outlined-basic"
              label="€ Min"
              variant="outlined"
              size="small"
              value={formik.values.priceGte}
              name="priceGte"
              onChange={formik.handleChange}
            />
          </Box>
          <Box height="40px" width="136px">
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="RATING"
              value={formik.values.rateGte}
              name="rateGte"
              onChange={formik.handleChange}
              size="small"
            >
              {ProductPriceAbove.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <Box>
          <Button
            type="submit"
            sx={{ width: "163px", height: "40px", textTransform: "none" }}
            variant="outlined"
          >
            Apply filters
          </Button>
        </Box>
      </Box>
    </form>
  );
}
