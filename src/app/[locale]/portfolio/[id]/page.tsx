import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, User, Mic2, Music } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function PortfolioItemPage({ params }: Props) {
  const { id } = await params;
  const item = portfolioData.find((p) => p.id === Number(id));

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#020202] text-[#F9F9F9]">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[30vh] sm:h-[38vh] md:h-[45vh] min-h-[250px] sm:min-h-[300px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-black/50 to-black/30" />

        {/* Badges on image */}
        <div className="absolute bottom-8 left-0 right-0 px-6 max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {item.category}
            </span>
            <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-white">
              {item.year}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] uppercase">{item.title}</h1>
          <p className="text-xl text-gray-300 font-medium mt-2">by {item.artist}</p>
        </div>
      </div>

      <div className="pb-20 px-4 sm:px-6 max-w-4xl mx-auto pt-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>

        {/* Content Card */}
        <div className="bg-[#0A0A0C] border border-white/10 rounded-xl p-8 md:p-12 mb-8">
          {/* Audio Player Section */}
          <div className="bg-black/40 border border-white/5 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-4 text-sm font-bold uppercase tracking-widest text-gray-500">
              <Music size={16} className="text-[#F2EFDD]" />
              Audio Preview
            </div>

            {item.audioUrl ? (
              <audio controls className="w-full h-10 block rounded-lg outline-none" style={{ filter: 'invert(0.9) hue-rotate(180deg)' }}>
                <source src={item.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="text-gray-500 text-sm italic">Audio preview not available.</div>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide font-[family-name:var(--font-heading)]">Project Details</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {item.description}
            </p>

            {/* Extra Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 mb-2 text-xs uppercase font-bold">
                  <User size={14} /> Client
                </div>
                <div className="font-semibold">{item.artist}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 mb-2 text-xs uppercase font-bold">
                  <Mic2 size={14} /> Service
                </div>
                <div className="font-semibold">{item.category}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
