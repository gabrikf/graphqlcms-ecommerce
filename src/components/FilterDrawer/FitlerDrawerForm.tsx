import { Button, InputBase, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useFilter } from "../../hooks/useFilters";
import FilterBuilder from "../../builders/FilterBuilder";

const currencies = [
  {
    value: 1,
    label: "1 and above",
  },
  {
    value: 2,
    label: "2 and above",
  },
  {
    value: 3,
    label: "3 and above",
  },
  {
    value: 4,
    label: "4 and above",
  },
];

export function FiltersDrawerForm(): JSX.Element {
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
            {currencies.map((option) => (
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
          onClick={() => formik.resetForm()}
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
