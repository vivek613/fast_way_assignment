import "./CategoryProduct.module.css";
import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "@mui/system";
import {
  Box,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { AllProductProvider, useAllProduct } from "../../Hooks/useProduct";
import ProductCard from "../../components/Product_card/ProductCard";
import Loading from "../../components/loading/Loading";
import { productContext } from "../../App";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const { allProduct, FetchProduct, category } = useAllProduct();
  const { isLoading } = useContext(productContext);
  const filterArray = ["Low To High", "High To Low"];
  const filtertype = [
    {
      lable: "Price",
      value: "price",
    },
    { lable: "Discount", value: "discountPercentage" },
    { lable: "Rating", value: "rating" },
  ];
  const [filterValue, setFilterValue] = useState("price");
  const [filterby, setFilterBy] = useState("Low To High");
  const [brand, setBrand] = useState("All");
  const [catagory, setCatagory] = useState([]);
  const params = useParams();
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

  useEffect(() => {
    const data = allProduct
      ?.filter((e) => e.category === params.id)
      .map((data) => data.brand);
    console.log(data);
    setCatagory([brand, ...new Set(data)]);
  }, [allProduct]);
  return (
    <Container
      maxWidth="xl"
      style={{
        marginTop: 90,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <BiArrowBack
        size={35}
        style={{
          display: "flex",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/");
        }}
      />
      <Box sx={{ minWidth: 140 }}>
        <FormControl sx={{ width: 140 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              width: "80vw",
            }}
          >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Sort Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Price"
                id="demo-simple-select"
                value={filterValue}
                sx={{ width: 200 }}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                {filtertype?.map((prod, index) => (
                  <MenuItem key={prod.value} value={prod.value}>
                    {prod.lable}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Price"
                id="demo-simple-select"
                value={filterby}
                sx={{ width: 200 }}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                {filterArray?.map((prod, index) => (
                  <MenuItem key={prod} value={prod}>
                    {prod}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>

              <Select
                label="Brand"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={brand}
                sx={{ width: 200 }}
                onChange={(e) => setBrand(e.target.value)}
              >
                {catagory?.map((prod, index) => (
                  <MenuItem key={prod} value={prod}>
                    {prod}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </FormControl>
      </Box>
      {loading}

      <Container
        maxWidth="xl"
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          paddingBottom: 20,
          marginBottom: 30,
          width: "100%",
        }}
      >
        {brand === "All"
          ? allProduct
              ?.filter((e) => e.category === params.id)
              .sort((a, b) => {
                if (filterby === "High To Low") {
                  return b[filterValue] - a[filterValue];
                } else {
                  return a[filterValue] - b[filterValue];
                }
              })
              .map((prod) => (
                <Link to={`/Detail/type/${params.id}/${prod.id}`} key={prod.id}>
                  <ProductCard prod={prod} />
                </Link>
              ))
          : allProduct
              ?.filter((e) => e.category === params.id)
              .sort((a, b) => {
                if (filterby === "High To Low") {
                  return b[filterValue] - a[filterValue];
                } else {
                  return a[filterValue] - b[filterValue];
                }
              })
              .filter((e) => e.brand === brand)
              .map((prod) => (
                <Link to={`/Detail/type/${params.id}/${prod.id}`} key={prod.id}>
                  <ProductCard prod={prod} />
                </Link>
              ))}
      </Container>
    </Container>
  );
};

export const Wrapper = () => (
  <AllProductProvider>
    <CategoryProduct />
  </AllProductProvider>
);

export default Wrapper;
