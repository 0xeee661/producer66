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
      className={`flex items-center justify-center gap-2 bg-[#F2EFDD] text-[#020202] border-2 border-[#020202] rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide shadow-[0_2px_0_#020202] hover:translate-y-px hover:shadow-[0_1px_0_#020202] transition-all cursor-pointer ${className}`}
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
