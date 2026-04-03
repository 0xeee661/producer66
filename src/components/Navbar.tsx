'use client';

import { Globe, Menu, X, Shield, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import CartTrigger from './CartTrigger';
import SearchModal from './SearchModal';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';


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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      setIsAdmin(false);
      return;
    }
    fetch('/api/me')
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.role === 'admin'))
      .catch(() => setIsAdmin(false));
  }, [isSignedIn]);

  const locales: Locale[] = ['en', 'es', 'it'];

  const isActive = (path: string) => pathname === path;

  const handleLanguageChange = (newLocale: Locale) => {
    router.push(pathname, { locale: newLocale });
    setIsLangDropdownOpen(false);
  };

  return (
    <>
      <nav className="fixed top-[33px] sm:top-[37px] left-0 right-0 z-50 bg-[#020202] border-b border-white/10">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-[1500px] mx-auto">
          {/* Logo - Text only */}
          <div className="hidden md:flex items-center">
            <Link href="/" className="text-xl font-bold text-[#F9F9F9] tracking-wide font-[family-name:var(--font-heading)] uppercase">
              PRODUCER.
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`text-xs font-bold uppercase tracking-widest transition-colors pb-1 ${isActive('/') ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('home')}
            </Link>
            <Link
              href="/beats"
              className={`text-xs font-bold uppercase tracking-widest transition-colors pb-1 ${isActive('/beats') ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('beats')}
            </Link>
            <Link
              href="/services"
              className={`text-xs font-bold uppercase tracking-widest transition-colors pb-1 ${isActive('/services') ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('services')}
            </Link>
            <Link
              href="/portfolio"
              className={`text-xs font-bold uppercase tracking-widest transition-colors pb-1 ${isActive('/portfolio') ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('portfolio')}
            </Link>
            <Link
              href="/contact"
              className={`text-xs font-bold uppercase tracking-widest transition-colors pb-1 ${isActive('/contact') ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('contact')}
            </Link>
            {isAdmin && (
              <Link
                href="/panel"
                className={`text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1 pb-1 ${isActive('/panel') ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Shield size={14} />
                {t('panel')}
              </Link>
            )}
          </div>

          {/* Right side - Search, Auth, Cart, Language */}
          <div className="flex items-center gap-4">

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Authentication Buttons */}
            <div className="hidden sm:flex items-center gap-4">
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="text-white hover:text-[#F2EFDD] px-2 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="btn-primary"
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
                className="flex items-center gap-2 text-xs font-medium text-white hover:text-[#F2EFDD] transition-colors"
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
                <div className="absolute top-full mt-2 right-0 bg-[#0A0A0C] border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[120px]">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLanguageChange(loc)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors border-b border-white/5 last:border-b-0 ${locale === loc
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
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
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#020202] border-t border-white/5">
            <div className="flex flex-col px-6 py-4 space-y-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                {t('home')}
              </Link>
              <Link href="/beats" onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/beats') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                {t('beats')}
              </Link>
              <Link href="/services" onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/services') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                {t('services')}
              </Link>
              <Link href="/portfolio" onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/portfolio') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                {t('portfolio')}
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/contact') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                {t('contact')}
              </Link>
              {isAdmin && (
                <Link href="/panel" onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 flex items-center gap-2 ${isActive('/panel') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                  <Shield size={16} />
                  {t('panel')}
                </Link>
              )}

              <SignedOut>
                <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)} className="btn-secondary text-center">
                  Sign In
                </Link>
                <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary text-center">
                  Sign Up
                </Link>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center justify-center py-2">
                  <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
