import { createContext, useEffect, useState } from "react";
export const CartContext = createContext({});
export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const defaultProducts = ls ? JSON.parse(ls.getItem("cart")) : [];
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  function addProducts(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);
  function removeProducts(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((_, index) => index !== pos);
      }
      return prev;
    });
  }
  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProducts, removeProducts }}
    >
      {children}
    </CartContext.Provider>
  );
}
