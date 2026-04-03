'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { useUser, useClerk } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handleBookSession = () => {
    if (!isSignedIn) {
      openSignIn();
    } else {
      console.log("Proceeding to Book Session...");
    }
  };
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=80"
        alt="Music studio background"
        fill
        className="object-cover"
        priority
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-[#F9F9F9] mb-8 uppercase backdrop-blur-sm">
          Limited Time Offer
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#F9F9F9] tracking-tight mb-6 leading-[0.9] font-[family-name:var(--font-heading)] uppercase">
          ELEVATE YOUR <br />
          SOUND
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
          Industry-standard music production, mixing, and mastering services <br className="hidden md:block" />
          to transform your tracks into chart-ready hits.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto">
          <button className="btn-primary flex items-center justify-center gap-3 w-full sm:w-auto">
            <Play size={18} fill="currentColor" />
            Browse Beats
          </button>
          <button
            onClick={handleBookSession}
            className="btn-secondary w-full sm:w-auto">
            Book a Session
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 sm:gap-12 lg:gap-24">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F9F9F9] mb-1 font-[family-name:var(--font-heading)]">500+</div>
            <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">Beats Sold</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F9F9F9] mb-1 font-[family-name:var(--font-heading)]">200+</div>
            <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F9F9F9] mb-1 font-[family-name:var(--font-heading)]">10+</div>
            <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">Years Exp</div>
          </div>
        </div>
      </div>
    </section>
  );
}
