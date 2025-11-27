'use client';

import { Play, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

const beats = [
  { id: 1, title: "Dark Nights", bpm: "140 BPM", key: "C# Minor", price: 29.99, tag: "Free" },
  { id: 2, title: "Summer Waves", bpm: "95 BPM", key: "A Major", price: 34.99, tag: "Hot" },
  { id: 3, title: "Street Dreams", bpm: "128 BPM", key: "F Minor", price: 24.99, tag: "New" },
];

export default function BeatsSection() {
  const t = useTranslations('beats');

  return (
    <section className="py-24 bg-[#050507]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-red-900/20 border border-red-900/30 text-[10px] font-bold tracking-widest text-red-500 mb-4 uppercase">
            {t('title')}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Hot <span className="text-red-600">Beats</span>
          </h2>
          <p className="text-gray-400 text-sm font-medium">{t('viewAll')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {beats.map((beat) => (
            <div key={beat.id} className="group relative bg-[#0a0a0c] border border-white/5 rounded-2xl overflow-hidden hover:border-red-600/30 transition-all duration-300">
              {/* Image Placeholder with Overlay */}
              <div className="aspect-square bg-gradient-to-br from-gray-900 to-black relative flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <button className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center transform scale-90 group-hover:scale-110 transition-all shadow-xl shadow-red-900/40 z-10">
                  <Play size={24} fill="currentColor" className="ml-1" />
                </button>

                {/* Tag */}
                <div className="absolute top-4 left-4 px-2 py-1 bg-red-600 text-white text-[10px] font-bold uppercase rounded-sm">
                  {beat.tag}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{beat.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-6">
                  <span>{beat.bpm}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span>{beat.key}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-red-500">${beat.price}</span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-wide text-white transition-colors">
                    <ShoppingCart size={14} />
                    {t('purchase')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-colors">
            {t('viewAll')}
          </button>
        </div>
      </div>
    </section>
  );
}
