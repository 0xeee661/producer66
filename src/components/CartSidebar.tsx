"use client";

import { useCart } from '../context/CartContext';
import { Link } from '@/i18n/routing';
import { X, Trash2, ShoppingBag } from 'lucide-react';

const CartSidebar = () => {
  const { items, removeFromCart, cartTotal, isCartOpen, setIsCartOpen, clearCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform transition-transform duration-500 ease-in-out bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-zinc-800">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Your Cart ({items.length})
            </h2>
            <button
              type="button"
              className="text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsCartOpen(false)}
            >
              <span className="sr-only">Close panel</span>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
                <ShoppingBag className="w-16 h-16 opacity-20" />
                <p className="text-lg">Your cart is empty</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                >
                  Continue Shopping &rarr;
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex py-2">
                    {item.image && (
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-zinc-800">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    )}

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-white">
                          <h3>{item.title}</h3>
                          <p className="ml-4">${item.price.toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-zinc-400">{item.producer}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-zinc-500">Qty {item.quantity}</p>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-zinc-800 px-4 py-6 sm:px-6 bg-zinc-900/50">
              <div className="flex justify-between text-base font-medium text-white mb-4">
                <p>Subtotal</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-zinc-500 mb-6">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="space-y-3">



                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
                >
                  Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full flex items-center justify-center rounded-md border border-zinc-700 bg-transparent px-6 py-3 text-base font-medium text-zinc-300 shadow-sm hover:bg-zinc-800 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-zinc-500">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="font-medium text-indigo-400 hover:text-indigo-300"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
