"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Lock, ChevronRight, CreditCard, Truck } from 'lucide-react';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import CheckoutItems from '@/components/checkout/CheckoutItems';
import { useCart } from '@/context/CartContext';
import { Link, useRouter } from '@/i18n/routing';

interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
}

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const { items } = useCart();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePaymentInfo = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!paymentInfo.cardNumber.trim() || paymentInfo.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = t('errors.cardNumber');
    }
    if (!paymentInfo.cardName.trim()) {
      newErrors.cardName = t('errors.cardName');
    }
    if (!paymentInfo.expiry.trim() || !/^\d{2}\/\d{2}$/.test(paymentInfo.expiry)) {
      newErrors.expiry = t('errors.expiry');
    }
    if (!paymentInfo.cvc.trim() || paymentInfo.cvc.length < 3) {
      newErrors.cvc = t('errors.cvc');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = () => {
    if (validatePaymentInfo()) {
      setActiveStep(2);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    router.push('/order-confirmation');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4 text-zinc-900">{t('emptyCart')}</h1>
        <Link href="/beats" className="text-blue-600 hover:underline">
          {t('goBack')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-b from-zinc-900 to-black border-b border-zinc-800 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white tracking-wide">
            PRODUCER<span className="text-red-600">.</span>
          </Link>
          <h1 className="text-xl text-zinc-400 font-light">{t('title')}</h1>
          <Lock className="text-zinc-500 w-5 h-5" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Steps */}
        <div className="lg:col-span-2 space-y-6">

          {/* Step 1: Payment Method */}
          <div className={`bg-white rounded-lg shadow-sm border ${activeStep === 1 ? 'border-orange-500 ring-1 ring-orange-500' : 'border-zinc-200'}`}>
            <div
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => setActiveStep(1)}
            >
              <h2 className={`text-lg font-bold flex items-center gap-4 ${activeStep === 1 ? 'text-orange-700' : 'text-zinc-900'}`}>
                <span className="text-sm font-bold text-zinc-500 w-6">1</span>
                {t('paymentMethod')}
              </h2>
              {activeStep !== 1 && <ChevronRight className="w-5 h-5 text-zinc-400" />}
            </div>

            {activeStep === 1 && (
              <div className="px-10 pb-6 animate-in slide-in-from-top-2 duration-300">
                <form className="space-y-4 max-w-md" onSubmit={(e) => { e.preventDefault(); handlePaymentSubmit(); }}>
                  <div className="border border-zinc-300 rounded-md p-4 flex items-center gap-3 bg-orange-50/50 border-orange-200">
                    <input type="radio" name="payment" defaultChecked className="text-orange-600 focus:ring-orange-500" />
                    <CreditCard className="w-5 h-5 text-zinc-600" />
                    <span className="text-sm font-bold text-zinc-800">{t('creditCard')}</span>
                  </div>

                  <div className="pl-6 space-y-3">
                    <div className="flex gap-2 flex-col">
                      <input
                        type="text"
                        placeholder={t('cardNumber')}
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        className={`flex-1 border ${errors.cardNumber ? 'border-red-500' : 'border-zinc-300'} rounded p-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none`}
                      />
                      {errors.cardNumber && <p className="text-red-600 text-xs">{errors.cardNumber}</p>}
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 flex flex-col gap-1">
                        <input
                          type="text"
                          placeholder={t('nameOnCard')}
                          value={paymentInfo.cardName}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                          className={`border ${errors.cardName ? 'border-red-500' : 'border-zinc-300'} rounded p-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none`}
                        />
                        {errors.cardName && <p className="text-red-600 text-xs">{errors.cardName}</p>}
                      </div>
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          placeholder={t('expiry')}
                          value={paymentInfo.expiry}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                          className={`w-20 border ${errors.expiry ? 'border-red-500' : 'border-zinc-300'} rounded p-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none`}
                        />
                        {errors.expiry && <p className="text-red-600 text-xs whitespace-nowrap">{errors.expiry}</p>}
                      </div>
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          placeholder={t('cvc')}
                          value={paymentInfo.cvc}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cvc: e.target.value })}
                          className={`w-16 border ${errors.cvc ? 'border-red-500' : 'border-zinc-300'} rounded p-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none`}
                        />
                        {errors.cvc && <p className="text-red-600 text-xs">{errors.cvc}</p>}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-md shadow-sm text-sm mt-2 transition-colors"
                  >
                    {t('usePaymentMethod')}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Step 2: Review Items */}
          <div className={`bg-white rounded-lg shadow-sm border ${activeStep === 2 ? 'border-orange-500 ring-1 ring-orange-500' : 'border-zinc-200'}`}>
            <div
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => setActiveStep(2)}
            >
              <h2 className={`text-lg font-bold flex items-center gap-4 ${activeStep === 2 ? 'text-orange-700' : 'text-zinc-900'}`}>
                <span className="text-sm font-bold text-zinc-500 w-6">2</span>
                {t('reviewItems')}
              </h2>
              {activeStep !== 2 && <ChevronRight className="w-5 h-5 text-zinc-400" />}
            </div>

            {activeStep === 2 && (
              <div className="px-10 pb-6 animate-in slide-in-from-top-2 duration-300">
                <div className="border border-zinc-200 rounded-md p-4 mb-6">
                  <div className="flex items-center gap-2 text-green-700 font-bold text-sm mb-2">
                    <Truck className="w-4 h-4" />
                    {t('estimatedDelivery')}
                  </div>
                  <CheckoutItems />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed text-black font-medium py-2 px-8 rounded-md shadow-sm text-sm transition-colors flex items-center gap-2"
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
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1">
          <CheckoutSummary onPlaceOrder={handlePlaceOrder} isProcessing={isProcessing} />
        </div>
      </main>
    </div>
  );
}
