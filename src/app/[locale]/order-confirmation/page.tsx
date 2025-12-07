"use client";

import React, { useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { CheckCircle, Download, Mail, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function OrderConfirmationPage() {
  const { clearCart } = useCart();
  const orderNumber = `PD66-${Date.now().toString().slice(-8)}`;
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    // Clear the cart when order is confirmed
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-gradient-to-b from-zinc-900 to-black border-b border-zinc-800 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-white tracking-wide">
            PRODUCER<span className="text-red-600">.</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-zinc-900 mb-2">
                Thank you for your order!
              </h1>
              <p className="text-zinc-600 text-lg mb-4">
                Your order has been confirmed and is being processed.
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-zinc-500">Order number: </span>
                  <span className="font-bold text-zinc-900">{orderNumber}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Order date: </span>
                  <span className="font-bold text-zinc-900">{orderDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-8 mb-6">
          <h2 className="text-xl font-bold text-zinc-900 mb-6">What's next?</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Order confirmation email</h3>
                <p className="text-sm text-zinc-600">
                  We've sent you an email with your order details and receipt.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                  <Download className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">Download your beats</h3>
                <p className="text-sm text-zinc-600 mb-3">
                  Your purchased beats are ready for download. Check your email for download links.
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Files
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 mb-1">License agreement</h3>
                <p className="text-sm text-zinc-600">
                  Review your license terms and usage rights in the confirmation email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-8 mb-6">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">Order summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600">Subtotal</span>
              <span className="text-zinc-900">---</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Tax</span>
              <span className="text-zinc-900">$0.00</span>
            </div>
            <div className="border-t border-zinc-200 mt-2 pt-2 flex justify-between font-bold text-base">
              <span className="text-zinc-900">Total</span>
              <span className="text-red-700">---</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/beats"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium text-center transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex-1 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 px-6 py-3 rounded-md font-medium text-center transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-sm text-blue-900 mb-2">
            <strong>Need help?</strong> Contact our support team
          </p>
          <a href="mailto:support@producer66.com" className="text-sm text-blue-600 hover:underline font-medium">
            support@producer66.com
          </a>
        </div>
      </main>
    </div>
  );
}
