"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '../../context/CartContext';

interface CheckoutSummaryProps {
  onPlaceOrder?: () => void;
  isProcessing?: boolean;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ onPlaceOrder, isProcessing = false }) => {
  const t = useTranslations('checkout');
  const { cartTotal, items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200 sticky top-24">
      {onPlaceOrder && (
        <button
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed text-black font-medium py-2 px-4 rounded-md shadow-sm text-sm mb-4 transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('processing')}
            </>
          ) : (
            t('placeOrder')
          )}
        </button>
      )}

      <div className="text-xs text-center text-zinc-500 mb-4 px-2">
        {t('privacyNotice')}
      </div>

      <div className="border-t border-zinc-200 pt-4 space-y-2">
        <h3 className="text-lg font-bold text-zinc-900 mb-2">{t('orderSummary')}</h3>
        <div className="flex justify-between text-sm text-zinc-600">
          <span>{t('items')} ({itemCount}):</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-600">
          <span>{t('shippingHandling')}:</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-600">
          <span>{t('totalBeforeTax')}:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-600">
          <span>{t('estimatedTax')}:</span>
          <span>$0.00</span>
        </div>

        <div className="border-t border-zinc-200 pt-4 mt-2 flex justify-between items-center">
          <span className="text-lg font-bold text-red-700">{t('orderTotal')}:</span>
          <span className="text-lg font-bold text-red-700">${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 bg-zinc-50 p-4 rounded border border-zinc-200">
        <h4 className="text-sm font-bold text-zinc-800 mb-2">{t('shippingCostInfo')}</h4>
        <p className="text-xs text-zinc-600">
          {t('shippingCostDesc')}
        </p>
      </div>
    </div>
  );
};

export default CheckoutSummary;
