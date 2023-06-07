import React from "react";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, CategoryProduct, ProductDetails, Cart } from "./index";

import { LinearProgress } from "@mui/material";

const publicRouts = [
  {
    path: "/",
    component: Home,
  },

  { path: ":product" + "/:type/:id", component: CategoryProduct },
  { path: ":product" + "/:type/:id" + "/:key", component: ProductDetails },
  { path: "/cart", component: Cart },
  ,
];

const Common = (route) => (
  <Suspense
    fallback={
      <LinearProgress
        sx={{
          backgroundColor: "white",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "gray",
          },
        }}
      />
    }
  >
    <route.component />
  </Suspense>
);

const createNestedRoutes = (routes, RouteType) => {
  return routes.map((route, i) => {
    return (
      <Route
        key={i}
        index={route.index}
        path={route.path}
        element={<RouteType component={route.component} />}
      />
    );
  });
};
const Product = () => {
  return <Routes>{createNestedRoutes(publicRouts, Common)}</Routes>;
};

export default Product;
