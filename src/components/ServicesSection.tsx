'use client';

import { Music2, Mic2, Sliders } from 'lucide-react';
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
      action: "Get Started"
    },
    {
      icon: Mic2,
      title: t('production.title'),
      desc: t('production.description'),
      price: "$300",
      action: "Learn More"
    },
    {
      icon: Sliders,
      title: t('mixing.title'),
      desc: t('mixing.description'),
      price: "$800",
      action: "Book Now"
    }
  ];

  /* Hook para auth */
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handleServiceClick = (action: string) => {
    // Requerir login para cualquiera de estas acciones de servicio
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    // Si la acción es reservar (Book Now) u otras
    if (action === "Book Now") {
      console.log("Proceeding to Book Now...");
    } else if (action === "Get Started") {
      console.log("Proceeding to Get Started...");
    }
    // TODO: Implementar navegación o modal de servicio real
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          {/* ... title ... */}
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t('title')} <span className="text-red-600">Pro</span>
          </h2>
          <p className="text-gray-400 text-sm font-medium max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="group p-8 bg-[#0a0a0c] border border-white/5 rounded-2xl hover:border-red-600/30 transition-all duration-300 flex flex-col">
              <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center text-red-500 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <service.icon size={24} />
              </div>

              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                {service.desc}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Starting at</span>
                  <span className="text-xl font-black text-red-500">{service.price}</span>
                </div>
                <button
                  onClick={() => handleServiceClick(service.action)}
                  className="text-xs font-bold text-white uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {service.action} <span className="text-red-600">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
