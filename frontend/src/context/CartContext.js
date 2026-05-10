'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty, size, color) => {
    const existItem = cartItems.find((x) => x.product === product._id && x.size === size && x.color === color);

    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x.product === product._id && x.size === size && x.color === color ? { ...existItem, qty: existItem.qty + qty } : x
        )
      );
    } else {
      setCartItems([...cartItems, {
        product: product._id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        countInStock: product.stockQuantity,
        qty,
        size,
        color
      }]);
    }
  };

  const removeFromCart = (id, size, color) => {
    setCartItems(cartItems.filter((x) => !(x.product === id && x.size === size && x.color === color)));
  };

  const updateQty = (id, size, color, qty) => {
    setCartItems(
      cartItems.map((x) =>
        x.product === id && x.size === size && x.color === color ? { ...x, qty } : x
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
