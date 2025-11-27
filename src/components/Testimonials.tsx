import { Quote } from 'lucide-react';

const reviews = [
  {
    text: "This production team has completely transformed my sound. The attention to detail and creative input was exactly what I needed to take my career to the next level. Highly recommended!",
    author: "Marcus Johnson",
    role: "R&B Artist",
    initials: "MJ"
  },
  {
    text: "Fast, professional, and incredibly talented. My tracks sound radio-ready and I've already signed a distribution deal thanks to the quality of these mixes.",
    author: "Sarah Davis",
    role: "Pop Singer",
    initials: "SD"
  },
  {
    text: "The best beats in the game, hands down. Every instrumental has a unique vibe and the stems are always perfectly organized. A producer's dream to work with.",
    author: "DJ Flexx",
    role: "Music Producer",
    initials: "DF"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#050507] to-[#020203]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            What <span className="text-red-600">Artists Say</span>
          </h2>
          <p className="text-gray-400 text-sm font-medium">
            Don&apos;t just take our word for it. Hear from the artists we&apos;ve worked with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="p-8 bg-[#0a0a0c] border border-white/5 rounded-2xl relative">
              <Quote className="text-red-900/40 absolute top-6 left-6" size={48} />

              <div className="flex gap-1 mb-6 relative z-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-red-600 text-xs">★</span>
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-8 relative z-10 italic">
                &quot;{review.text}&quot;
              </p>

              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">
                  {review.initials}
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
