'use client';

import { Music, Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import CartTrigger from './CartTrigger';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';


type Locale = 'en' | 'es' | 'it';

const languageNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  it: 'Italiano'
};

export default function Navbar() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations('nav');

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const locales: Locale[] = ['en', 'es', 'it'];

  const isActive = (path: string) => pathname === path;

  const handleLanguageChange = (newLocale: Locale) => {
    router.push(pathname, { locale: newLocale });
    setIsLangDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo - Only visible on desktop (md and above) */}
        <div className="hidden md:flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white">
            <Music size={18} />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">PRODUCER.</span>
        </div>

        {/* Mobile Menu Button - Only visible on mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/') ? 'bg-red-600 text-white px-4 py-2 rounded' : 'text-gray-400 hover:text-white'
              }`}
          >
            {t('home')}
          </Link>
          <Link
            href="/beats"
            className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/beats') ? 'bg-red-600 text-white px-4 py-2 rounded' : 'text-gray-400 hover:text-white'
              }`}
          >
            {t('beats')}
          </Link>
          <Link
            href="/services"
            className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/services') ? 'bg-red-600 text-white px-4 py-2 rounded' : 'text-gray-400 hover:text-white'
              }`}
          >
            {t('services')}
          </Link>
          <Link
            href="/portfolio"
            className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/portfolio') ? 'bg-red-600 text-white px-4 py-2 rounded' : 'text-gray-400 hover:text-white'
              }`}
          >
            {t('portfolio')}
          </Link>
        </div>

        {/* Right side - Auth, Cart, Language */}
        <div className="flex items-center gap-4">

          {/* Authentication Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-white hover:text-red-500 px-2 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Sign Up
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "bg-zinc-900 border border-zinc-800",
                    userButtonPopoverText: "text-white",
                    userButtonPopoverActionButton: "text-zinc-300 hover:text-white hover:bg-zinc-800",
                    userButtonPopoverActionButtonText: "text-zinc-300",
                    userButtonPopoverFooter: "hidden"
                  }
                }}
              />
            </SignedIn>
          </div>

          <CartTrigger />

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-2 text-xs font-medium text-white hover:text-red-500 transition-colors"
            >
              <Globe size={16} />
              <span className="hidden sm:inline">{languageNames[locale]}</span>
              <svg
                className={`w-3 h-3 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLangDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl min-w-[120px]">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLanguageChange(loc)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors border-b border-white/5 last:border-b-0 ${locale === loc
                      ? 'bg-red-600/20 text-white'
                      : 'text-gray-400 hover:bg-red-600/10 hover:text-white'
                      }`}
                  >
                    {languageNames[loc]}
                  </button>
                ))}
              </div>
            )}
          </div>


        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {
        isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/5">
            <div className="flex flex-col px-6 py-4 space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/') ? 'text-red-600' : 'text-gray-400 hover:text-white'
                  }`}
              >
                {t('home')}
              </Link>
              <Link
                href="/beats"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/beats') ? 'text-red-600' : 'text-gray-400 hover:text-white'
                  }`}
              >
                {t('beats')}
              </Link>
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/services') ? 'text-red-600' : 'text-gray-400 hover:text-white'
                  }`}
              >
                {t('services')}
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/portfolio') ? 'text-red-600' : 'text-gray-400 hover:text-white'
                  }`}
              >
                {t('portfolio')}
              </Link>

              {/* Mobile Auth Buttons */}
              <SignedOut>
                <Link
                  href="/sign-in"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-red-500 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors text-center border border-white/20 rounded"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors w-full text-center"
                >
                  Sign Up
                </Link>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center justify-center py-2">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10",
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        )
      }
    </nav >
  );
}
