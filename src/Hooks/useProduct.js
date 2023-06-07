import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { productContext } from "../App";
import { removeDuplicateValue } from "../utils/arrayDuplicate";
import { toast } from "react-hot-toast";

const ctx = createContext();

export const useAllProduct = () => useContext(ctx);
export const AllProductProvider = ({ children }) => {
  const { setIsLoading, addCart, setAddCart } = useContext(productContext);
  const [allProduct, setAllProduct] = useState([]);
  const [category, setCatogory] = useState([]);
  const [productQuntity, setProductQuntity] = useState(1);

  //*--------------------- fetch product api---------
  const FetchProduct = () => {
    setIsLoading(true);

    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((data) => {
        setAllProduct(data?.data?.products);

        const catogoryArray = [
          ...new Set(
            data?.data?.products.map((e) => {
              return { name: e.category, image: e.thumbnail };
            })
          ),
        ];

        setCatogory(removeDuplicateValue(catogoryArray));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  //*------------------- handle add to cart----------------
  const addToCart = async (product) => {
    console.log(product);
    if (productQuntity >= 1) {
      const existingProduct = addCart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        setAddCart([
          ...addCart,
          {
            ...product,
          },
        ]);
      }
      toast.success("Added To Cart", { autoClose: 500, theme: "colored" });
      setProductQuntity(1);
    } else {
      toast.error("Please select at least 1 Quntity", {
        autoClose: 500,
        theme: "colored",
      });
    }
  };
  //*-------------------  handle remove cart-------------------
  const removeFromCart = async (product) => {
    setAddCart(addCart.filter((item) => item.id !== product.id));
  };
  return (
    <ctx.Provider
      value={{
        FetchProduct,
        allProduct,
        category,
        productQuntity,
        setProductQuntity,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </ctx.Provider>
  );
};
