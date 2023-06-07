import React, { createContext, useContext } from "react";
import { Suspense } from "react";

import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useProduct } from "./context/useProduct";
import Product from "./Pages/Product";
import { LinearProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Container from "./components/container/Container";
export const productContext = createContext();

function App() {
  const { value } = useProduct();

  return (
    <>
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
        <BrowserRouter>
          <productContext.Provider value={value}>
            <Toaster position="top-center" reverseOrder={false} />
            <Container>
              <Product />
            </Container>
          </productContext.Provider>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
