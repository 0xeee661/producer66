'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music, Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';

type Language = 'English' | 'Español' | 'Italiano';

export default function Navbar() {
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages: Language[] = ['English', 'Español', 'Italiano'];

  const isActive = (path: string) => pathname === path;

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
            Home
          </Link>
          <Link
            href="/beats"
            className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/beats') ? 'bg-red-600 text-white px-4 py-2 rounded' : 'text-gray-400 hover:text-white'
              }`}
          >
            Beats
          </Link>
          <Link
            href="/services"
            className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/services') ? 'bg-red-600 text-white px-4 py-2 rounded' : 'text-gray-400 hover:text-white'
              }`}
          >
            Services
          </Link>
          <Link
            href="/portfolio"
            className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/portfolio') ? 'bg-red-600 text-white px-4 py-2 rounded' : 'text-gray-400 hover:text-white'
              }`}
          >
            Portfolio
          </Link>
        </div>

        {/* Right side - Language selector and Book Now */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-2 text-xs font-medium text-white hover:text-red-500 transition-colors"
            >
              <Globe size={16} />
              <span className="hidden sm:inline">{selectedLanguage}</span>
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
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors border-b border-white/5 last:border-b-0 ${selectedLanguage === lang
                      ? 'bg-red-600/20 text-white'
                      : 'text-gray-400 hover:bg-red-600/10 hover:text-white'
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="hidden sm:block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors">
            Book Now
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/5">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/') ? 'text-red-600' : 'text-gray-400 hover:text-white'
                }`}
            >
              Home
            </Link>
            <Link
              href="/beats"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/beats') ? 'text-red-600' : 'text-gray-400 hover:text-white'
                }`}
            >
              Beats
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/services') ? 'text-red-600' : 'text-gray-400 hover:text-white'
                }`}
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm font-bold uppercase tracking-widest transition-colors py-2 ${isActive('/portfolio') ? 'text-red-600' : 'text-gray-400 hover:text-white'
                }`}
            >
              Portfolio
            </Link>
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors w-full sm:hidden">
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
