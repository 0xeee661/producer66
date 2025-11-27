'use client';

import { useState } from 'react';
import { Music, ChevronDown } from 'lucide-react';

type Category = 'All Categories' | 'Full Album' | 'Mixing' | 'Production' | 'Underdub' | 'Mastering';

interface PortfolioItem {
  id: number;
  category: Exclude<Category, 'All Categories'>;
  year: number;
  title: string;
  artist: string;
  description: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    category: 'Full Album',
    year: 2024,
    title: 'Midnight Dreams',
    artist: 'Jay West',
    description: 'Full album production featuring 12 tracks of melodic trap and R&B fusion.',
  },
  {
    id: 2,
    category: 'Mixing',
    year: 2024,
    title: 'Summer Anthem',
    artist: 'Lisa Ray',
    description: 'Chart-topping pop single mixed and mastered to perfection.',
  },
  {
    id: 3,
    category: 'Production',
    year: 2024,
    title: 'Neon Nights',
    artist: 'The Weekend Thieves',
    description: 'Dark hip hop production with atmospheric synths and heavy bass.',
  },
  {
    id: 4,
    category: 'Underdub',
    year: 2023,
    title: 'Street Chronicles',
    artist: 'MC Baron',
    description: 'Hard-hitting hip hop EP with custom production on all 6 tracks.',
  },
  {
    id: 5,
    category: 'Mastering',
    year: 2023,
    title: 'Rise Up',
    artist: 'Mystical Crew',
    description: 'Mastering for motivational rap album with crystal clear vocals.',
  },
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All Categories');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories: Category[] = ['All Categories', 'Full Album', 'Mixing', 'Production', 'Underdub', 'Mastering'];

  const filteredItems = selectedCategory === 'All Categories'
    ? portfolioData
    : portfolioData.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category: Exclude<Category, 'All Categories'>) => {
    const colors = {
      'Full Album': 'bg-red-600',
      'Mixing': 'bg-orange-500',
      'Production': 'bg-red-500',
      'Underdub': 'bg-pink-600',
      'Mastering': 'bg-purple-600',
    };
    return colors[category];
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Music className="text-red-600" size={20} />
            <p className="text-sm text-gray-400 uppercase tracking-widest">Our Work</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Portfolio
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our latest projects and collaborations with top artists.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-lg transition-all duration-300"
            >
              <Music size={16} className="text-red-600" />
              <span className="text-sm font-medium">{selectedCategory}</span>
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-6 py-3 text-sm hover:bg-red-600/20 transition-colors border-b border-white/5 last:border-b-0"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20"
            >
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`${getCategoryColor(item.category)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                  {item.category}
                </span>
              </div>

              {/* Year Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {item.year}
                </span>
              </div>

              {/* Music Icon Background */}
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
                <Music size={80} className="text-red-600/30 group-hover:text-red-600/50 transition-all duration-500 group-hover:scale-110" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 group-hover:text-red-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{item.artist}</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/20 rounded-xl transition-all duration-500 pointer-events-none" />
            </div>
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
