"use client";

import React from 'react';
import { useCart } from '../../context/CartContext';
import { Trash2 } from 'lucide-react';

const CheckoutItems = () => {
  const { items, removeFromCart } = useCart();

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 py-4 border-b border-zinc-200 last:border-0">
          {/* Image Placeholder */}
          <div className="w-24 h-24 bg-zinc-100 rounded-md flex-shrink-0 border border-zinc-200 flex items-center justify-center">
            {item.image ? (
              <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
            ) : (
              <span className="text-zinc-400 text-xs">No Image</span>
            )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-zinc-900 text-lg">{item.title}</h4>
                <p className="text-sm text-green-700 font-medium">In Stock</p>
                <p className="text-xs text-zinc-500 mt-1">Sold by: Producer66</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold bg-orange-100 text-orange-800 px-1 rounded">Best Seller</span>
                </div>
              </div>
              <p className="font-bold text-red-700">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 border border-zinc-300 rounded-md px-2 py-1 bg-zinc-50 shadow-sm">
                <span className="text-xs text-zinc-600">Qty:</span>
                <span className="text-sm font-medium text-zinc-900">{item.quantity}</span>
              </div>

              <div className="h-4 w-px bg-zinc-300"></div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-blue-600 hover:underline hover:text-red-700 flex items-center gap-1"
              >
                Delete
              </button>

              <div className="h-4 w-px bg-zinc-300"></div>

              <button className="text-sm text-blue-600 hover:underline">
                Save for later
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutItems;
