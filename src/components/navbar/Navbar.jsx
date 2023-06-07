import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import style from "./Navbar.module.css";
import { productContext } from "../../App";

const Navbar = () => {
  const navigate = useNavigate();
  const { addCart } = useContext(productContext);

  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <div className={style["navbar-main-div"]}>
        <h3 onClick={handleBack}>E-commerce App</h3>
        <div>
          <Button
            onClick={() => {
              navigate("/cart");
            }}
          >
            <div className={style["add-cart-button"]}>
              <FaShoppingCart size={27} />
              <sup
                style={{
                  color: "#1976d2",
                  fontWeight: 600,
                }}
              >
                {addCart?.length || 0}
              </sup>
            </div>
          </Button>
          <Button>{/* <AiOutlineHeart size={30} /> */}</Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
