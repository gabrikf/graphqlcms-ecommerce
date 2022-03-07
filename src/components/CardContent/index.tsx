import { Box, Grid, Pagination, Stack, useMediaQuery } from "@mui/material";
import { useQuery } from "graphql-hooks";
import { useEffect, useMemo, useState } from "react";
import { useFilter } from "../../hooks/useFilters";
import { CartItensButton } from "../Cart/CartItensButton";
import { Card } from "./Card";
import CircularProgress from "@mui/material/CircularProgress";

interface IProductsProps {
  allProducts: IProductsQuery[];
  _allProductsMeta: {
    count: number;
  };
}

interface IProductsQuery {
  id: string;
  description: string;
  price: string;
  priceConverted?: string;
  rate: number;
  image: {
    url: string;
  };
}

export function CartContent(): JSX.Element {
  const [page, setPage] = useState(1);
  const { filters } = useFilter();
  const matches = useMediaQuery("(max-width:960px)");
  console.log(filters);

  const HOMEPAGE_QUERY = `query{
    allProducts(first: 6,  skip :${(page - 1) * 6 || 0}, 
    orderBy:${
      filters.orderBy
    },filter: {   description: { matches: { pattern: "${
    filters.description.matches.pattern
  }" } },
    rate: { gte: ${filters.rate.gte} },
    price: { gte: ${filters.price.gte}, lte: ${filters.price.lte}},}){
    
        id,
        description,
        price,
        rate,
        image {
          url
        }
    }
    _allProductsMeta{
      count,
    }
  }`;
  const {
    loading,
    error,
    data: requestedData,
  } = useQuery<IProductsProps>(HOMEPAGE_QUERY);
  console.log(filters);
  const data = useMemo(() => {
    const prodcutFormated = requestedData?.allProducts.map((product) => {
      return {
        ...product,
        priceConverted: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(+product.price),
      };
    });
    return {
      ...requestedData,
      allProducts: prodcutFormated,
    };
  }, [requestedData]);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 200px)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  if (error)
    return (
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 200px)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        "Something Bad Happened"
      </div>
    );

  return (
    <Box>
      <Stack
        paddingBottom={{ xs: 10, md: 0 }}
        maxWidth="1080px"
        marginX="auto"
        spacing={2}
        alignItems="center"
      >
        <Grid
          alignItems="center"
          justifyContent="center"
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 2, md: 3 }}
        >
          {data &&
            data?.allProducts?.map((product) => (
              <Grid key={product.id} item>
                <Card
                  id={product.id}
                  description={product.description}
                  imgUrl={product.image.url}
                  price={product.price}
                  priceConverted={product.priceConverted}
                  rating={product.rate}
                />
              </Grid>
            ))}
        </Grid>
        <Pagination
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          count={data && Number(data?._allProductsMeta?.count) / 6}
          variant="outlined"
        />
      </Stack>
      {matches && (
        <Box
          sx={{ background: "#FFF", borderTop: "solid 1px #ccc" }}
          left="0"
          right="0"
          padding={1}
          position="fixed"
          bottom="0"
        >
          <CartItensButton />
        </Box>
      )}
    </Box>
  );
}
