import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CartProvider } from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';
import { ClerkProvider } from '@clerk/nextjs';
import UserSync from '@/components/UserSync';
import "../globals.css";

const robotoSlab = localFont({
  src: [
    {
      path: "../../../public/fonts/roboto-slab/roboto-slab-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/roboto-slab/roboto-slab-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

const fjallaOne = localFont({
  src: [
    {
      path: "../../../public/fonts/fjalla-one/fjalla-one-400.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Producer - Music Producer & Beat Maker",
  description: "Professional music production and beats",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${robotoSlab.variable} ${fjallaOne.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <UserSync />
          <NextIntlClientProvider messages={messages} locale={locale}>
            <CartProvider>
              {children}
              <CartSidebar />
            </CartProvider>
          </NextIntlClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
