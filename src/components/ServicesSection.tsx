'use client';

import React from 'react';
import Image from 'next/image';
import { Music2, Mic2, Sliders } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useUser, useClerk } from '@clerk/nextjs';

export default function ServicesSection() {
  const t = useTranslations('services');

  const services = [
    {
      icon: Music2,
      title: t('beatmaking.title'),
      desc: t('beatmaking.description'),
      price: "$500",
      action: "Get Started",
      image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&q=80"
    },
    {
      icon: Mic2,
      title: t('production.title'),
      desc: t('production.description'),
      price: "$300",
      action: "Learn More",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80"
    },
    {
      icon: Sliders,
      title: t('mixing.title'),
      desc: t('mixing.description'),
      price: "$800",
      action: "Book Now",
      image: "https://images.unsplash.com/photo-1563330232-57114bb0823c?w=600&q=80"
    }
  ];

  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handleServiceClick = (action: string) => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    if (action === "Book Now") {
      console.log("Proceeding to Book Now...");
    } else if (action === "Get Started") {
      console.log("Proceeding to Get Started...");
    }
  };

  return (
    <section className="py-16 bg-[#020202]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9F9F9] mb-4 font-[family-name:var(--font-heading)] uppercase">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {services.map((service, idx) => (
            <div key={idx} className="group bg-[#0A0A0C] rounded-xl flex flex-col overflow-hidden transition-colors hover:bg-[#111113]">
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                  <service.icon size={24} />
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#F9F9F9] mb-4 font-[family-name:var(--font-heading)]">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                  {service.desc}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Starting at</span>
                    <span className="text-xl font-bold text-[#F9F9F9]">{service.price}</span>
                  </div>
                  <button
                    onClick={() => handleServiceClick(service.action)}
                    className="text-xs font-bold text-white uppercase tracking-widest hover:text-[#F2EFDD] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {service.action} <span className="text-white">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/services">
            <button className="btn-secondary">
              View More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
