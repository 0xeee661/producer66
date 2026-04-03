'use client';

import Image from 'next/image';
import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  const reviews = [
    {
      text: t('reviews.1'),
      author: "Marcus Johnson",
      role: "R&B Artist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    },
    {
      text: t('reviews.2'),
      author: "Sarah Davis",
      role: "Pop Singer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
    },
    {
      text: t('reviews.3'),
      author: "DJ Flexx",
      role: "Music Producer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
    }
  ];

  return (
    <section className="py-16 bg-[#020202]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9F9F9] mb-4 font-[family-name:var(--font-heading)] uppercase">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-sm">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {reviews.map((review, idx) => (
            <div key={idx} className="p-8 bg-[#0A0A0C] rounded-xl relative">
              <Quote className="text-white/5 absolute top-6 left-6" size={48} />

              <div className="flex gap-1 mb-6 relative z-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-[#F2EFDD] text-xs">★</span>
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-8 relative z-10 italic">
                &quot;{review.text}&quot;
              </p>

              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{review.author}</div>
                  <div className="text-gray-500 text-xs font-medium">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
