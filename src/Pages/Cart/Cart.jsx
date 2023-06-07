import React, { useContext, useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { AllProductProvider, useAllProduct } from "../../Hooks/useProduct";
import { productContext } from "../../App";
import CartCard from "../../components/cart_card/CartCard";
import { EmptyCart } from "../../Assets/Images";
import OrderSummary from "../../components/order_summery/OrderSummery";
import { toast } from "react-hot-toast";
import style from "./Cart.module.css";

const Cart = () => {
  const navigate = useNavigate();
  const { removeFromCart } = useAllProduct();
  const { addCart } = useContext(productContext);
  const [total, setTotal] = useState(0);

  let shippingCoast = 100;

  const proceedToCheckout = async () => {
    if (addCart.length <= 0) {
      toast.error("Please add items in cart to proceed", {
        autoClose: 500,
        theme: "colored",
      });
    } else {
      sessionStorage.setItem("totalAmount", total);
      navigate("/");
    }
  };
  useEffect(() => {
    setTotal(
      addCart.reduce(
        (acc, curr) => acc + (curr?.price * curr.quantity + shippingCoast),
        0
      )
    );
  }, [addCart]);

  return (
    <Container fixed maxWidth>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginTop: 10,
          color: "#1976d2",
          fontWeight: "bold",
        }}
      >
        Cart
      </Typography>
      {addCart.length <= 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={style["main-card"]}>
            <img
              src={EmptyCart}
              alt="Empty_cart"
              className={style["empty-cart-img"]}
            />
            <Typography
              variant="h6"
              sx={{ textAlign: "center", color: "#1976d2", fontWeight: "bold" }}
            >
              Your Cart is Empty
            </Typography>
          </div>
        </Box>
      )}

      <Container>
        <Box sx={{ flexGrow: 1, marginTop: 6 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 6 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {addCart.length > 0 &&
              addCart.map((product, index) => (
                <Grid
                  xs={2}
                  sm={4}
                  md={4}
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CartCard
                    product={product}
                    removeFromCart={removeFromCart}
                    key={product.id}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        {addCart.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <OrderSummary
              proceedToCheckout={proceedToCheckout}
              total={total}
              shippingCoast={shippingCoast}
            />
          </Box>
        )}
      </Container>
    </Container>
  );
};

export const Wrapper = () => (
  <AllProductProvider>
    <Cart />
  </AllProductProvider>
);

export default Wrapper;
