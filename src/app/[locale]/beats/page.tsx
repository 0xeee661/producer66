'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import { Search, Filter, Music, ShoppingCart, Play, SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { useUser, useClerk } from '@clerk/nextjs';

const beats = [
  { id: 1, title: "Dark Nights", description: "Hard-hitting trap beat with dark atmospheric vibes", bpm: 140, key: "D# Minor", tags: ["Trap", "Featured"], subTags: ["dark", "trap", "808"], price: 299, compareAt: null, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80" },
  { id: 2, title: "Summer Vibes", description: "Smooth R&B instrumental perfect for melodic hooks", bpm: 95, key: "C Major", tags: ["R&B", "Featured"], subTags: ["smooth", "rnb", "chill"], price: 199, compareAt: 249, image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=500&q=80" },
  { id: 3, title: "Street Dreams", description: "Classic hip hop boom bap with soulful samples", bpm: 85, key: "A Minor", tags: ["Hip Hop", "Featured"], subTags: ["boom bap", "classic", "soul"], price: 249, compareAt: null, image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=500&q=80" },
  { id: 4, title: "Midnight Drive", description: "Chill lo-fi beat perfect for late night sessions", bpm: 130, key: "G Minor", tags: ["Lo-Fi"], subTags: ["lofi", "chill", "study"], price: 149, compareAt: null, image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&q=80" },
  { id: 5, title: "City Lights", description: "Aggressive drill beat with heavy bass", bpm: 145, key: "F# Minor", tags: ["Drill"], subTags: ["drill", "uk", "aggressive"], price: 349, compareAt: 449, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80" },
  { id: 6, title: "Island Breeze", description: "Upbeat afrobeat with tropical percussion", bpm: 110, key: "F Major", tags: ["Afrobeat"], subTags: ["afrobeat", "tropical", "dance"], price: 199, compareAt: null, image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&q=80" },
  { id: 7, title: "Neon Pulse", description: "Futuristic synth-driven beat with hard 808s", bpm: 135, key: "Bb Minor", tags: ["Trap"], subTags: ["synth", "futuristic", "808"], price: 279, compareAt: null, image: "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=500&q=80" },
  { id: 8, title: "Velvet Touch", description: "Smooth slow jam with lush piano chords", bpm: 72, key: "Eb Major", tags: ["R&B"], subTags: ["slow jam", "piano", "romantic"], price: 189, compareAt: 239, image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80" },
  { id: 9, title: "Crown Royal", description: "Hard-hitting drill with cinematic strings", bpm: 142, key: "C Minor", tags: ["Drill"], subTags: ["strings", "cinematic", "hard"], price: 329, compareAt: null, image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&q=80" },
];

const ITEMS_PER_PAGE = 6;

export default function BeatsPage() {
  const t = useTranslations('beatsPage');
  const tBeats = useTranslations('beats');
  const { addToCart } = useCart();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredAndSorted = useMemo(() => {
    let result = [...beats];

    // Search
    if (searchQuery.trim()) {
      result = result.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Genre
    if (genreFilter !== 'All') {
      result = result.filter(b => b.tags.includes(genreFilter));
    }

    // Price range
    if (minPrice) result = result.filter(b => b.price >= Number(minPrice));
    if (maxPrice) result = result.filter(b => b.price <= Number(maxPrice));

    // Sort
    switch (sortBy) {
      case 'nameAZ': result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'nameZA': result.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'priceLow': result.sort((a, b) => a.price - b.price); break;
      case 'priceHigh': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => b.id - a.id); break;
      case 'oldest': result.sort((a, b) => a.id - b.id); break;
    }

    return result;
  }, [searchQuery, genreFilter, sortBy, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginatedBeats = filteredAndSorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSearchQuery('');
    setGenreFilter('All');
    setSortBy('featured');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || genreFilter !== 'All' || minPrice || maxPrice || sortBy !== 'featured';

  const handlePurchase = (beat: typeof beats[0]) => {
    if (!isSignedIn) { openSignIn(); return; }
    addToCart({ id: beat.id.toString(), title: beat.title, price: beat.price, producer: "Producer66" });
  };

  return (
    <main className="min-h-screen bg-[#020202] text-[#F9F9F9] selection:bg-[#F2EFDD] selection:text-black">
      <Navbar />

      <div className="pt-40 pb-20 px-4 sm:px-6 max-w-[1500px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-[#F9F9F9] mb-6 uppercase">
            Premium Beat Store
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F9F9F9] mb-6 font-[family-name:var(--font-heading)] uppercase">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Search + Sort Bar */}
        <div className="bg-[#0A0A0C] rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-transparent border-2 border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="relative min-w-[180px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <select
              value={genreFilter}
              onChange={(e) => { setGenreFilter(e.target.value); setCurrentPage(1); }}
              className="w-full appearance-none bg-transparent border-2 border-white/10 rounded-xl py-3 pl-12 pr-10 text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
            >
              <option value="All">{t('allGenres')}</option>
              <option value="Trap">Trap</option>
              <option value="R&B">R&B</option>
              <option value="Hip Hop">Hip Hop</option>
              <option value="Drill">Drill</option>
              <option value="Lo-Fi">Lo-Fi</option>
              <option value="Afrobeat">Afrobeat</option>
            </select>
          </div>
          <div className="relative min-w-[180px]">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-transparent border-2 border-white/10 rounded-xl py-3 pl-12 pr-10 text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
            >
              <option value="featured">{t('featured')}</option>
              <option value="nameAZ">{t('nameAZ')}</option>
              <option value="nameZA">{t('nameZA')}</option>
              <option value="priceLow">{t('priceLow')}</option>
              <option value="priceHigh">{t('priceHigh')}</option>
              <option value="newest">{t('newest')}</option>
              <option value="oldest">{t('oldest')}</option>
            </select>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('priceRange')}:</span>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
            placeholder={t('minPrice')}
            className="w-24 bg-transparent border-2 border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
          />
          <span className="text-gray-600">—</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
            placeholder={t('maxPrice')}
            className="w-24 bg-transparent border-2 border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
          />
          {hasActiveFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
              <X size={14} />
              {t('clearFilters')}
            </button>
          )}
          <span className="ml-auto text-gray-500 text-sm">
            {t('showing', { count: filteredAndSorted.length })}
          </span>
        </div>

        {/* Beats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {paginatedBeats.map((beat) => (
            <div key={beat.id} className="group bg-transparent rounded-xl overflow-hidden flex flex-col">
              <div className="aspect-square relative rounded-xl overflow-hidden">
                <Image src={beat.image} alt={beat.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  {beat.compareAt && (
                    <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase">Sale</span>
                  )}
                  {beat.tags.slice(0, 1).map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-bold uppercase">{tag}</span>
                  ))}
                </div>
                <button className="absolute inset-0 m-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10">
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </button>
              </div>

              <div className="py-4 px-1 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#F9F9F9] mb-2 font-[family-name:var(--font-heading)]">{beat.title}</h3>
                <p className="text-gray-400 text-xs mb-4 line-clamp-2">{beat.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">
                  <span>{beat.bpm} {tBeats('bpm')}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span>{beat.key}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {beat.subTags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-400 font-medium uppercase">{tag}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#F9F9F9]">${beat.price}</span>
                    {beat.compareAt && (
                      <span className="text-sm text-gray-500 line-through">${beat.compareAt}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handlePurchase(beat)}
                    className="flex items-center gap-2 bg-[#F2EFDD] text-[#020202] border-2 border-[#020202] rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide shadow-[0_2px_0_#020202] hover:translate-y-px hover:shadow-[0_1px_0_#020202] transition-all cursor-pointer"
                  >
                    <ShoppingCart size={14} />
                    {tBeats('purchase')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      <Footer />
    </main>
  );
}
