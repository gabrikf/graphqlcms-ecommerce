import { Button, InputBase, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useFilter } from "../../hooks/useFilters";
import FilterBuilder from "../../builders/FilterBuilder";
import { ProductPriceAbove } from "../../constants/ProductsConstants";

export function FiltersDrawerForm(): JSX.Element {
  const { dispatchFilter, clearFilter, filters } = useFilter();
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

  function handleClearFilter() {
    formik.resetForm();
    clearFilter();
  }

  return (
    <form style={{ height: "40%" }} onSubmit={formik.handleSubmit}>
      <Box margin={2} display="flex" flexDirection="column" gap={2}>
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
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="end"
      >
        <Button
          type="reset"
          onClick={handleClearFilter}
          sx={{ width: "163px", height: "40px", textTransform: "none" }}
          variant="text"
        >
          Clear
        </Button>
        <Button
          type="submit"
          sx={{ width: "163px", height: "40px", textTransform: "none" }}
          variant="outlined"
        >
          Apply filters
        </Button>
      </Box>
    </form>
  );
}
