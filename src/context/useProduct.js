import { useState } from "react";

export const useProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addCart, setAddCart] = useState([]);
  const value = {
    isLoading,
    setIsLoading,
    addCart,
    setAddCart,
  };
  return {
    value,
  };
};
