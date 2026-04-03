'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useCart } from '@/context/CartContext';
import { useUser, useClerk } from '@clerk/nextjs';

const allProducts = [
  { id: "10", title: "Eternal Flame", bpm: "128 BPM", key: "G Minor", price: 39.99, compareAt: 49.99, genre: "Reggaeton", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&q=80" },
  { id: "11", title: "Neon Lights", bpm: "140 BPM", key: "D# Minor", price: 29.99, compareAt: null, genre: "Trap", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80" },
  { id: "12", title: "Ocean Drive", bpm: "105 BPM", key: "C Major", price: 34.99, compareAt: 44.99, genre: "Pop", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80" },
  { id: "13", title: "Velvet Sky", bpm: "95 BPM", key: "A Minor", price: 24.99, compareAt: null, genre: "R&B", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80" },
  { id: "14", title: "Thunder", bpm: "150 BPM", key: "F Minor", price: 44.99, compareAt: null, genre: "Drill", image: "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=500&q=80" },
  { id: "15", title: "Paradise", bpm: "110 BPM", key: "Bb Major", price: 29.99, compareAt: 39.99, genre: "Afrobeat", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&q=80" },
  { id: "16", title: "Midnight Sun", bpm: "130 BPM", key: "E Minor", price: 34.99, compareAt: null, genre: "Lo-Fi", image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&q=80" },
  { id: "17", title: "Golden Hour", bpm: "120 BPM", key: "Ab Major", price: 39.99, compareAt: 54.99, genre: "Pop", image: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=500&q=80" },
];

export default function FeaturedProducts() {
  const t = useTranslations('featured');
  const { addToCart } = useCart();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handlePurchase = (product: typeof allProducts[0]) => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      producer: "Producer66"
    });
  };

  return (
    <section className="py-16 bg-[#020202]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9F9F9] font-[family-name:var(--font-heading)] uppercase">
            {t('title')}
          </h2>
          <Link
            href="/beats"
            className="text-sm text-gray-400 hover:text-white transition-colors font-bold uppercase tracking-widest"
          >
            {t('viewAll')} →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {allProducts.map((product) => (
            <div key={product.id} className="group relative bg-transparent rounded-xl overflow-hidden">
              {/* Image */}
              <div className="aspect-square relative rounded-xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                {/* Play button on hover */}
                <button className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10">
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </button>

                {/* Sale Badge */}
                {product.compareAt && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase z-10">
                    Sale
                  </div>
                )}

                {/* Genre Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase z-10">
                  {product.genre}
                </div>
              </div>

              {/* Content */}
              <div className="py-3 px-1">
                <h3 className="text-sm font-bold text-[#F9F9F9] mb-1 font-[family-name:var(--font-heading)]">{product.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span>{product.bpm}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span>{product.key}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#F9F9F9]">${product.price}</span>
                  {product.compareAt && (
                    <span className="text-sm text-gray-500 line-through">${product.compareAt}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
