// shop-context.js
import React, { createContext, useState, useEffect } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const updateLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const navigateToProductDetail = (productId) => {
    // Zde můžete implementovat navigaci na stránku s detaily produktu
    console.log(`Navigating to product detail page for product ID: ${productId}`);
  };

  const contextValue = {
    cartItems,
    addToCart,
    navigateToProductDetail,
    getTotalCartAmount,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
