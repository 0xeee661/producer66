'use client';

import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 bg-[#050507] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-red-500 mb-8 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Limited Time Offer
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
          ELEVATE YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-700">SOUND</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Industry-standard music production, mixing, and mastering services <br className="hidden md:block" />
          to transform your tracks into chart-ready hits.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-sm uppercase tracking-widest transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-red-900/20">
            <Play size={18} fill="currentColor" />
            Browse Beats
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-full font-bold text-sm uppercase tracking-widest transition-all">
            Book a Session
          </button>
        </div>

        <div className="grid grid-cols-3 gap-12 md:gap-24">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-red-600 mb-1">500+</div>
            <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest">Beats Sold</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-red-600 mb-1">200+</div>
            <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-red-600 mb-1">10+</div>
            <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest">Years Exp</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-600">
        <div className="w-5 h-9 border-2 border-gray-700 rounded-full flex justify-center pt-2">
          <div className="w-1 h-1.5 bg-gray-600 rounded-full" />
        </div>
      </div>
    </section>
  );
}
