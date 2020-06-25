import React from "react";
import { Nav } from "../../components";
import { CartBooks } from "./components/CartBooks";

export const CartPage = (props) => {
  return (
    <div>
      <Nav />
      <CartBooks />
    </div>
  );
};
