import React from "react";
import Navbar from "../navbar/Navbar";

const Container = (props) => {
  return (
    <div className="container mx-auto">
      <Navbar />
      <div
        style={{
          zIndex: 6,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Container;
