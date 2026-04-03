"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Beat, CartItem, CartContextType } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (beat: Beat) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === beat.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === beat.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...beat, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (beatId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== beatId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
