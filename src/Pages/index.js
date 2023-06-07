import { lazy } from "react";

const Home = lazy(
  async () => await import(/* webpackChunkName: "Home" */ "./Home/Home")
);
const CategoryProduct = lazy(
  async () =>
    await import(
      /* webpackChunkName: "CategoryProduct" */ "./CategoryProduct/CategoryProduct"
    )
);
const ProductDetails = lazy(
  async () =>
    await import(
      /* webpackChunkName: "ProductDetails" */ "./ProductDetails/ProductDetails"
    )
);
const Cart = lazy(
  async () => await import(/* webpackChunkName: "cart" */ "./Cart/Cart")
);

export { Home, CategoryProduct, ProductDetails, Cart };
