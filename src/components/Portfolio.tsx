'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Music, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { portfolioData, type Category } from '@/data/portfolio';

export default function Portfolio() {
  const t = useTranslations('portfolio');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All Categories');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories: Category[] = ['All Categories', 'Full Album', 'Mixing', 'Production', 'Underdub', 'Mastering'];

  const filteredItems = selectedCategory === 'All Categories'
    ? portfolioData
    : portfolioData.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#020202] text-[#F9F9F9] pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-[1500px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <p className="text-sm text-gray-400 uppercase tracking-widest">{t('subtitle')}</p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-[#F9F9F9] font-[family-name:var(--font-heading)] uppercase">
            {t('title')}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border-2 border-white/10 px-6 py-3 rounded-full transition-colors"
            >
              <span className="text-sm font-medium">{selectedCategory}</span>
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-[#0A0A0C] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-6 py-3 text-sm hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.id}`}
              className="group relative block bg-[#0A0A0C] rounded-xl overflow-hidden hover:bg-[#111113] transition-colors"
            >
              {/* Category Badge */}
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
                <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              {/* Year Badge */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {item.year}
                </span>
              </div>

              {/* Project Image */}
              <div className="h-48 sm:h-56 md:h-64 relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 group-hover:text-[#F2EFDD] transition-colors font-[family-name:var(--font-heading)]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{item.artist}</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <Music size={60} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
