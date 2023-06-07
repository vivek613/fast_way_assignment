import "./ProductDetails.css";
import React, { useState, useContext, useLayoutEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import {
  Box,
  Button,
  Container,
  Tooltip,
  Typography,
  Chip,
  Rating,
  ButtonGroup,
  Skeleton,
  Grid,
} from "@mui/material";
import { MdAddShoppingCart } from "react-icons/md";
import { TbDiscount2 } from "react-icons/tb";
import { BiArrowBack } from "react-icons/bi";

import { AllProductProvider, useAllProduct } from "../../Hooks/useProduct";
import ProductCard from "../../components/Product_card/ProductCard";
import { productContext } from "../../App";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    allProduct,
    FetchProduct,
    productQuntity,
    setProductQuntity,
    addToCart,
  } = useAllProduct();
  const [product, setProduct] = useState({});

  const { isLoading } = useContext(productContext);

  useLayoutEffect(() => {
    const findProduct = allProduct?.find((e) => e.id === Number(params.key));

    setProduct({ ...findProduct, quantity: 1 });
  }, [allProduct, params.key]);
  useLayoutEffect(() => {
    FetchProduct();
  }, []);

  const increaseQuantity = () => {
    if (productQuntity < product?.stock) {
      setProductQuntity(productQuntity + 1);
      setProduct({
        ...product,
        quantity: productQuntity + 1,
      });
    }
  };
  const decreaseQuantity = () => {
    if (productQuntity > 0) {
      setProductQuntity(productQuntity - 1);
      setProduct({
        ...product,
        quantity: productQuntity - 1,
      });
    }
  };
  return (
    <>
      <Container
        maxWidth="xl"
        style={{
          marginTop: "90px",
        }}
      >
        <div>
          <BiArrowBack
            size={35}
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(`/detail/type/${params.id}`);
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                {isLoading ? (
                  <Skeleton variant="rectangular" height={400} />
                ) : (
                  <>
                    <div className="product-image">
                      <div className="detail-img-box">
                        <Carousel
                          //   autoPlay
                          showArrows={false}
                          dynamicHeight={true}
                        >
                          {product?.images?.map((data, index) => {
                            return (
                              <>
                                <img
                                  alt=""
                                  src={data}
                                  height={115}
                                  width={140}
                                />
                              </>
                            );
                          })}
                        </Carousel>

                        <br />
                      </div>
                    </div>
                  </>
                )}
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                {isLoading ? (
                  <section
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      width: "100%",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      height={200}
                      width="200px"
                    />
                    <Skeleton variant="text" height={400} width={700} />
                  </section>
                ) : (
                  <section className="product-details">
                    <Typography variant="h4">{product?.title}</Typography>

                    <Typography
                      style={{
                        width: "413px",
                      }}
                    >
                      {product?.description}
                    </Typography>
                    <Typography>
                      <div className="chip">
                        {/* {data.map((item, index) => (
                    <Chip label={item} key={index} variant="outlined" />
                  ))} */}
                      </div>
                    </Typography>
                    <Chip
                      label={`Upto ${product?.discountPercentage}% off`}
                      variant="outlined"
                      sx={{
                        background: "#1976d2",
                        color: "white",
                        width: "150px",
                        fontWeight: "bold",
                      }}
                      avatar={<TbDiscount2 color="white" />}
                    />
                    <div style={{ display: "flex", gap: 20 }}>
                      <Typography variant="h6" color="red">
                        <s>
                          {" "}
                          ₹
                          {product?.price > 1000
                            ? product?.price + 1000
                            : product?.price + 300}
                        </s>{" "}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ₹{product?.price}
                      </Typography>
                    </div>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        // background: 'red',
                        "& > *": {
                          m: 1,
                        },
                      }}
                    >
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <Button onClick={increaseQuantity}>+</Button>
                        <Button>{productQuntity}</Button>
                        <Button onClick={decreaseQuantity}>-</Button>
                      </ButtonGroup>
                      {product?.stock < 50 && (
                        <p
                          style={{
                            color: "red",
                          }}
                        >
                          hurry! only a few items left
                        </p>
                      )}
                    </Box>
                    <Rating
                      name="read-only"
                      value={Math.round(product?.rating)}
                      readOnly
                      precision={0.5}
                    />
                    <div style={{ display: "flex" }}>
                      <Tooltip title="Add To Cart">
                        <Button
                          variant="contained"
                          className="all-btn"
                          startIcon={<MdAddShoppingCart />}
                          onClick={() => {
                            // setProductQuntity(1);
                            addToCart(product);
                            localStorage.setItem("cart", addToCart);
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Tooltip>
                    </div>
                  </section>
                )}
              </Item>
            </Grid>
          </Grid>
        </div>

        <Typography
          sx={{
            marginTop: 2,
            marginBottom: 2,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Similar Products
        </Typography>
        <Box>
          <Box
            className="similarProduct"
            sx={{ display: "flex", overflowX: "auto", marginBottom: 10 }}
          >
            {allProduct
              .filter((e) => e.category === params.id)
              .map((prod) => (
                <Link to={`/Detail/type/${params.id}/${prod.id}`} key={prod.id}>
                  <ProductCard prod={prod} />
                </Link>
              ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export const Wrapper = () => (
  <AllProductProvider>
    <ProductDetail />
  </AllProductProvider>
);

export default Wrapper;
