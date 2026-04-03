'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

import AddToCartButton from './AddToCartButton';

const beats = [
  { id: "1", title: "Dark Nights", bpm: "140 BPM", key: "C# Minor", price: 29.99, tag: "New", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80" },
  { id: "2", title: "Summer Waves", bpm: "95 BPM", key: "A Major", price: 34.99, tag: "Hot", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&q=80" },
  { id: "3", title: "Street Dreams", bpm: "128 BPM", key: "F Minor", price: 24.99, tag: "Sale", image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&q=80" },
];

export default function BeatsSection() {
  const t = useTranslations('beats');

  return (
    <section className="py-16 bg-[#020202]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-[#F9F9F9] mb-4 uppercase">
            {t('title')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9F9F9] mb-4 font-[family-name:var(--font-heading)] uppercase">
            Latest Beats
          </h2>
          <p className="text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">
            {t('viewAll')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
          {beats.map((beat) => (
            <div key={beat.id} className="group relative bg-transparent rounded-xl overflow-hidden">
              {/* Cover Image */}
              <div className="aspect-square relative rounded-xl overflow-hidden">
                <Image
                  src={beat.image}
                  alt={beat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                {/* Play Button */}
                <button className="absolute inset-0 m-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10">
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </button>

                {/* Tag */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase z-10 ${beat.tag === 'Sale' ? 'bg-red-600 text-white' : 'bg-white text-black'}`}>
                  {beat.tag}
                </div>
              </div>

              <div className="py-4 px-1">
                <h3 className="text-lg font-bold text-[#F9F9F9] mb-1 font-[family-name:var(--font-heading)]">{beat.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-4">
                  <span>{beat.bpm}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span>{beat.key}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#F9F9F9]">${beat.price}</span>
                  <AddToCartButton
                    beat={beat}
                    className="!bg-[#F2EFDD] !text-[#020202] !border-2 !border-[#020202] !rounded-full !px-5 !py-2 !text-xs !font-bold !uppercase !tracking-wide !shadow-[0_2px_0_#020202] hover:!translate-y-px hover:!shadow-[0_1px_0_#020202]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="btn-secondary">
            {t('viewAll')}
          </button>
        </div>
      </div>
    </section>
  );
}
