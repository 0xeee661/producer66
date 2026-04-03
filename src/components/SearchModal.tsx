'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface SearchResult {
  id: string;
  title: string;
  price: number;
  genre?: string;
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const t = useTranslations('search');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/beats?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setResults(Array.isArray(data) ? data.slice(0, 6) : []);
        }
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-32">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl mx-2 sm:mx-4 bg-[#0A0A0C] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search size={20} className="text-gray-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('placeholder')}
            className="flex-1 bg-transparent text-white text-lg outline-none placeholder-gray-500"
          />
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[calc(100vh-200px)] sm:max-h-[400px] overflow-y-auto">
          {isLoading && (
            <div className="px-5 py-8 text-center text-gray-500 text-sm">
              {t('searching')}
            </div>
          )}

          {!isLoading && query.trim().length >= 2 && results.length === 0 && (
            <div className="px-5 py-8 text-center text-gray-500 text-sm">
              {t('noResults')}
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <ul>
              {results.map((result) => (
                <li key={result.id}>
                  <Link
                    href="/beats"
                    onClick={onClose}
                    className="flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                  >
                    <div>
                      <p className="text-white font-bold text-sm">{result.title}</p>
                      {result.genre && (
                        <p className="text-gray-500 text-xs mt-0.5">{result.genre}</p>
                      )}
                    </div>
                    <span className="text-[#F9F9F9] font-bold text-sm">${result.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!isLoading && query.trim().length < 2 && (
            <div className="px-5 py-8 text-center text-gray-500 text-sm">
              {t('hint')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
