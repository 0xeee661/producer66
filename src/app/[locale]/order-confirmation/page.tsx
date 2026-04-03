"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
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
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#020202] text-[#F9F9F9]">
      {/* Header with background image */}
      <header className="relative h-48 flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920&q=80"
          alt="Order confirmed"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-6 w-full">
          <Link href="/" className="text-2xl font-bold text-white tracking-wide font-[family-name:var(--font-heading)] uppercase">
            PRODUCER.
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Success Header */}
        <div className="bg-[#0A0A0C] rounded-xl border border-white/10 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#F2EFDD] rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-[#020202]" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#F9F9F9] mb-2 font-[family-name:var(--font-heading)]">
                Thank you for your order!
              </h1>
              <p className="text-gray-400 text-lg mb-4">
                Your order has been confirmed and is being processed.
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Order number: </span>
                  <span className="font-bold text-white">{orderNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500">Order date: </span>
                  <span className="font-bold text-white">{orderDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-[#0A0A0C] rounded-xl border border-white/10 p-8 mb-6">
          <h2 className="text-xl font-bold text-[#F9F9F9] mb-6 font-[family-name:var(--font-heading)]">What&apos;s next?</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#F2EFDD]" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Order confirmation email</h3>
                <p className="text-sm text-gray-400">
                  We&apos;ve sent you an email with your order details and receipt.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                  <Download className="w-5 h-5 text-[#F2EFDD]" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Download your beats</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Your purchased beats are ready for download. Check your email for download links.
                </p>
                <button className="btn-primary flex items-center gap-2 !py-2 !px-4">
                  <Download className="w-4 h-4" />
                  Download Files
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#F2EFDD]" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">License agreement</h3>
                <p className="text-sm text-gray-400">
                  Review your license terms and usage rights in the confirmation email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-[#0A0A0C] rounded-xl border border-white/10 p-8 mb-6">
          <h2 className="text-xl font-bold text-[#F9F9F9] mb-4 font-[family-name:var(--font-heading)]">Order summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white">---</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tax</span>
              <span className="text-white">$0.00</span>
            </div>
            <div className="border-t border-white/10 mt-2 pt-2 flex justify-between font-bold text-base">
              <span className="text-white">Total</span>
              <span className="text-white">---</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/beats" className="flex-1 btn-primary text-center">
            Continue Shopping
          </Link>
          <Link href="/" className="flex-1 btn-secondary text-center">
            Back to Home
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-[#0A0A0C] border border-white/10 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-400 mb-2">
            <strong className="text-white">Need help?</strong> Contact our support team
          </p>
          <a href="mailto:support@producer66.com" className="text-sm text-[#F2EFDD] hover:text-white font-medium">
            support@producer66.com
          </a>
        </div>
      </main>
    </div>
  );
}
