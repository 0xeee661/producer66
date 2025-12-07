'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Filter, Music, ShoppingCart, Play } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { useUser, useClerk } from '@clerk/nextjs';

const beats = [
  {
    id: 1,
    title: "Dark Nights",
    description: "Hard-hitting trap beat with dark atmospheric vibes",
    bpm: 140,
    key: "D# Minor",
    tags: ["Trap", "Featured"],
    subTags: ["dark", "trap", "808"],
    price: 299,
    color: "bg-red-600"
  },
  {
    id: 2,
    title: "Summer Vibes",
    description: "Smooth R&B instrumental perfect for melodic hooks",
    bpm: 95,
    key: "C Major",
    tags: ["R&B", "Featured"],
    subTags: ["smooth", "rnb", "chill"],
    price: 199,
    color: "bg-orange-500"
  },
  {
    id: 3,
    title: "Street Dreams",
    description: "Classic hip hop boom bap with soulful samples",
    bpm: 85,
    key: "A Minor",
    tags: ["Hip Hop", "Featured"],
    subTags: ["boom bap", "classic", "soul"],
    price: 249,
    color: "bg-yellow-500"
  },
  {
    id: 4,
    title: "Midnight Drive",
    description: "Chill lo-fi beat perfect for late night sessions",
    bpm: 130,
    key: "G Minor",
    tags: ["Lo-Fi"],
    subTags: ["lofi", "chill", "study"],
    price: 149,
    color: "bg-purple-600"
  },
  {
    id: 5,
    title: "City Lights",
    description: "Aggressive drill beat with heavy bass",
    bpm: 145,
    key: "F# Minor",
    tags: ["Drill"],
    subTags: ["drill", "uk", "aggressive"],
    price: 349,
    color: "bg-blue-600"
  },
  {
    id: 6,
    title: "Island Breeze",
    description: "Upbeat afrobeat with tropical percussion",
    bpm: 110,
    key: "F Major",
    tags: ["Afrobeat"],
    subTags: ["afrobeat", "tropical", "dance"],
    price: 199,
    color: "bg-green-600"
  }
];

export default function BeatsPage() {
  const t = useTranslations('beatsPage');
  const tBeats = useTranslations('beats');

  const { addToCart } = useCart();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handlePurchase = (beat: typeof beats[0]) => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    addToCart({
      id: beat.id.toString(),
      title: beat.title,
      price: beat.price,
      image: undefined, // Opcional, si tienes imagen
      producer: "Producer66" // Opcional
    });
  };

  return (
    <main className="min-h-screen bg-[#050507] text-white selection:bg-red-600 selection:text-white">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-900/20 border border-red-900/30 text-[10px] font-bold tracking-widest text-red-500 mb-6 uppercase">
            <span className="mr-2">🎵</span> Premium Beat Store
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-4 mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-600/50 transition-colors"
            />
          </div>
          <div className="relative min-w-[200px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <select className="w-full appearance-none bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-10 text-white focus:outline-none focus:border-red-600/50 transition-colors cursor-pointer">
              <option>{t('allGenres')}</option>
              <option>Trap</option>
              <option>R&B</option>
              <option>Hip Hop</option>
              <option>Drill</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </div>
          </div>
        </div>

        <div className="text-gray-500 text-sm font-medium mb-8">
          {t('showing', { count: 6 })}
        </div>

        {/* Beats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beats.map((beat) => (
            <div key={beat.id} className="group bg-[#0a0a0c] border border-white/5 rounded-2xl overflow-hidden hover:border-red-600/30 transition-all duration-300 flex flex-col">
              {/* Cover Art */}
              <div className="aspect-square bg-gradient-to-br from-[#111] to-black relative flex items-center justify-center group-hover:bg-[#151515] transition-colors">
                <div className="absolute top-4 left-4 flex gap-2">
                  {beat.tags.map((tag, idx) => (
                    <span key={idx} className={`px-2 py-1 ${idx === 0 ? 'bg-red-600' : 'bg-yellow-600'} text-white text-[10px] font-bold uppercase rounded-sm`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <Music className="text-red-900/20 group-hover:text-red-600/20 transition-colors duration-500 transform group-hover:scale-110" size={120} />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-900/40 transform scale-90 group-hover:scale-100 transition-all">
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-2">{beat.title}</h3>
                <p className="text-gray-400 text-xs mb-4 line-clamp-2">{beat.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">
                  <span>{beat.bpm} {tBeats('bpm')}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span>{beat.key}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {beat.subTags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-gray-400 font-medium uppercase hover:bg-white/10 transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-2xl font-black text-red-500">${beat.price}</span>
                  <button
                    onClick={() => handlePurchase(beat)}
                    className="flex items-center gap-2 px-6 
                  py-2.5 bg-white/5 hover:bg-white/10 
                  border border-white/10 rounded-lg 
                  text-xs font-bold uppercase tracking-wide 
                  text-white transition-colors group-hover:bg-red-600 
                  group-hover:border-red-60 cursor-pointer">
                    <ShoppingCart size={14} />
                    {tBeats('purchase')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
