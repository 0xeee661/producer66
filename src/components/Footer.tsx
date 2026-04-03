'use client';

import { Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import NewsletterSignup from './NewsletterSignup';

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52V6.78a4.83 4.83 0 0 1-1-.09z" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');

  return (
    <footer className="bg-[#020202] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Brand + Newsletter */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl font-bold text-[#F9F9F9] tracking-wide font-[family-name:var(--font-heading)] uppercase">PRODUCER.</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
              {t('copyright')}
            </p>

            {/* Newsletter Signup */}
            <NewsletterSignup />

            {/* Social Icons */}
            <div className="flex gap-3">
              <Link href="#" className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all">
                <Instagram size={22} />
              </Link>
              <Link href="#" className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all">
                <TikTokIcon size={22} />
              </Link>
              <Link href="#" className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all">
                <Youtube size={22} />
              </Link>
              <Link href="#" className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all">
                <Mail size={22} />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-[family-name:var(--font-heading)]">{navT('home')}</h4>
            <ul className="space-y-4">
              <li><Link href="/beats" className="text-gray-500 hover:text-white text-sm transition-colors">{navT('beats')}</Link></li>
              <li><Link href="/services" className="text-gray-500 hover:text-white text-sm transition-colors">{navT('services')}</Link></li>
              <li><Link href="/portfolio" className="text-gray-500 hover:text-white text-sm transition-colors">{navT('portfolio')}</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-white text-sm transition-colors">{navT('contact')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-[family-name:var(--font-heading)]">{t('contact')}</h4>
            <ul className="space-y-4">
              <li className="text-gray-500 text-sm">info@producer.com</li>
              <li className="text-gray-500 text-sm">+1 (555) 123-4567</li>
              <li className="text-gray-500 text-sm">Los Angeles, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">&copy; 2024 Producer. {t('copyright')}</p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
