'use client';

import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Music2, Mic2, Headphones, Disc, Clock, Check, Calendar } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ServicesPage() {
  const t = useTranslations('servicesPage');
  const tServices = useTranslations('services');

  const services = [
    {
      icon: Music2,
      title: tServices('beatmaking.title'),
      duration: "5-7 days",
      description: tServices('beatmaking.description'),
      features: [
        "Unlimited revisions",
        "Stems included",
        "Commercial rights",
        "Custom sound design",
        "Mix-ready delivery"
      ],
      price: 500,
      image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=80"
    },
    {
      icon: Mic2,
      title: "Vocal Mixing",
      duration: "2-3 days",
      description: "Professional vocal mixing that makes your voice shine. We'll enhance clarity, add depth, and ensure your vocals sit perfectly in the mix.",
      features: [
        "Pitch correction",
        "Vocal tuning",
        "De-essing",
        "Compression & EQ",
        "Effects processing"
      ],
      price: 300,
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"
    },
    {
      icon: Headphones,
      title: tServices('mixing.title'),
      duration: "5-8 days",
      description: tServices('mixing.description'),
      features: [
        "Full track mixing",
        "Mastering for streaming",
        "Stem mastering",
        "Reference matching",
        "Unlimited revisions"
      ],
      price: 800,
      image: "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=800&q=80"
    },
    {
      icon: Disc,
      title: "Mastering Only",
      duration: "1-2 days",
      description: "Professional mastering to give your track that final polish. We'll ensure your music translates well across all playback systems.",
      features: [
        "Loudness optimization",
        "Stereo enhancement",
        "Final EQ & compression",
        "Format conversion",
        "Fast turnaround"
      ],
      price: 150,
      image: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=800&q=80"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020202] text-[#F9F9F9] selection:bg-[#F2EFDD] selection:text-black">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[30vh] sm:h-[35vh] md:h-[40vh] min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=80"
          alt="Studio background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 sm:px-6 pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-[10px] font-bold tracking-widest text-[#F9F9F9] mb-6 uppercase">
            <Calendar size={12} />
            Professional Services
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F9F9F9] mb-4 font-[family-name:var(--font-heading)] uppercase">
            {t('title')}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div className="pb-20 px-4 sm:px-6 max-w-[1500px] mx-auto pt-16">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service, idx) => (
            <div key={idx} className="group bg-[#0A0A0C] rounded-xl overflow-hidden hover:bg-[#111113] transition-colors">
              {/* Service Image */}
              <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                    <service.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-[family-name:var(--font-heading)]">{service.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <Clock size={12} />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="w-5 h-5 rounded bg-white/5 flex items-center justify-center flex-shrink-0">
                        <Check size={14} className="text-[#F2EFDD]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">{t('startingAt')}</div>
                    <div className="text-3xl font-bold text-[#F9F9F9] font-[family-name:var(--font-heading)]">${service.price}</div>
                  </div>
                  <button className="btn-primary flex items-center gap-2">
                    <Calendar size={14} />
                    {t('bookNow')}
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
