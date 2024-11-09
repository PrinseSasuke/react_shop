import { AppContext } from "../App";
import React from "react";
import { useContext } from "react";
export const useCart = () => {
  const { setCartItems, cartItems } = useContext(AppContext);
  const totlaPrice = () => {
    return cartItems.reduce((sum, obj) => {
      return sum + parseInt(obj.price.slice(0, -4), 10);
    }, 0);
  };
  return { cartItems, setCartItems, totlaPrice };
};
