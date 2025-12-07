"use client";

import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser, useClerk } from '@clerk/nextjs';
import { Beat } from '../types/cart';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  beat: Beat;
  className?: string;
  children?: React.ReactNode;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ beat, className = "", children }) => {
  const { addToCart } = useCart();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handleClick = () => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }
    addToCart(beat);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors font-medium text-sm cursor-pointer ${className}`}
    >
      {children ? (
        children
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
