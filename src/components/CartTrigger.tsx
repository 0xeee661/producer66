"use client";

import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

const CartTrigger = () => {
  const { items, setIsCartOpen } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 text-zinc-400 hover:text-white transition-colors"
      aria-label="Open cart"
    >
      <ShoppingBag className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartTrigger;
