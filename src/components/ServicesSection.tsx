import { Music2, Mic2, Sliders } from 'lucide-react';

const services = [
  {
    icon: Music2,
    title: "Beat Production",
    desc: "Custom exclusive beats tailored to your style. You keep 100% of the royalties and rights.",
    price: "$500",
    action: "Get Started"
  },
  {
    icon: Mic2,
    title: "Vocal Mixing",
    desc: "Professional vocal tuning, alignment, and mixing to make your voice sit perfectly in the mix.",
    price: "$300",
    action: "Learn More"
  },
  {
    icon: Sliders,
    title: "Full Mix & Master",
    desc: "Complete mixing and mastering service to give your tracks that radio-ready polish and loudness.",
    price: "$800",
    action: "Book Now"
  }
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Professional <span className="text-red-600">Services</span>
          </h2>
          <p className="text-gray-400 text-sm font-medium max-w-xl mx-auto">
            Take your music to the next level with our industry-standard production and engineering services.
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
                <button className="text-xs font-bold text-white uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-1">
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
