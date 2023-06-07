import React, { useContext, useEffect, useLayoutEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AllProductProvider, useAllProduct } from "../../Hooks/useProduct";
import CategoryCard from "../../components/category_card/CategoryCard";
import { productContext } from "../../App";
import Loading from "../../components/loading/Loading";

const Home = () => {
  const { allProduct, FetchProduct, category } = useAllProduct();
  const { isLoading } = useContext(productContext);
  useLayoutEffect(() => {
    FetchProduct();
  }, []);
  const loading = isLoading ? (
    <Container
      maxWidth="xl"
      style={{
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingBottom: 20,
      }}
    >
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
    </Container>
  ) : (
    ""
  );
  return (
    <>
      <Container
        maxWidth="xl"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 0,
          flexDirection: "column",
          marginBottom: 70,
        }}
      >
        <Container style={{ display: "flex", justifyContent: "center" }}>
          {/* <SearchBar /> */}
        </Container>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            marginTop: 10,
            color: "#1976d2",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Categories
        </Typography>
        {loading}
        <Grid
          container
          spacing={{ xs: 2, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {category.map((data, index) => (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CategoryCard data={data} key={data.img} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export const Wrapper = () => (
  <AllProductProvider>
    <Home />
  </AllProductProvider>
);

export default Wrapper;
