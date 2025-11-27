'use client';

import { Music, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white">
                <Music size={18} />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">PRODUCER.</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
              {t('copyright')}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
                <Instagram size={16} />
              </Link>
              <Link href="#" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
                <Twitter size={16} />
              </Link>
              <Link href="#" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
                <Youtube size={16} />
              </Link>
              <Link href="#" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
                <Mail size={16} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">{navT('home')}</h4>
            <ul className="space-y-4">
              <li><Link href="/beats" className="text-gray-500 hover:text-red-500 text-sm transition-colors">{navT('beats')}</Link></li>
              <li><Link href="/services" className="text-gray-500 hover:text-red-500 text-sm transition-colors">{navT('services')}</Link></li>
              <li><Link href="/portfolio" className="text-gray-500 hover:text-red-500 text-sm transition-colors">{navT('portfolio')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">{t('contact')}</h4>
            <ul className="space-y-4">
              <li className="text-gray-500 text-sm">info@producer.com</li>
              <li className="text-gray-500 text-sm">+1 (555) 123-4567</li>
              <li className="text-gray-500 text-sm">Los Angeles, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">© 2024 Producer. {t('copyright')}</p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
