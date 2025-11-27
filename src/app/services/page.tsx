import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Music2, Mic2, Headphones, Disc, Clock, Check, Calendar } from "lucide-react";

const services = [
  {
    icon: Music2,
    title: "Beat Production",
    duration: "5-7 days",
    description: "Custom beat production tailored to your style. We'll work with you from concept to final product, creating a unique sound that brings your vision to life.",
    features: [
      "Unlimited revisions",
      "Stems included",
      "Commercial rights",
      "Custom sound design",
      "Mix-ready delivery"
    ],
    price: 500,
    iconBg: "bg-red-600"
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
    iconBg: "bg-red-600"
  },
  {
    icon: Headphones,
    title: "Full Mix & Master",
    duration: "5-8 days",
    description: "Complete mixing and mastering service for your entire track. Industry-standard processing that ensures your music sounds professional on all platforms.",
    features: [
      "Full track mixing",
      "Mastering for streaming",
      "Stem mastering",
      "Reference matching",
      "Unlimited revisions"
    ],
    price: 800,
    iconBg: "bg-red-600"
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
    iconBg: "bg-red-600"
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-900/20 border border-red-900/30 text-[10px] font-bold tracking-widest text-red-500 mb-6 uppercase">
            <Calendar size={12} />
            Professional Services
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Our <span className="text-red-600">Services</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
            Industry-standard production services tailored to bring your music to life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="group bg-[#0a0a0c] border border-white/10 rounded-2xl p-8 hover:border-red-600/30 transition-all duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${service.iconBg} rounded-lg flex items-center justify-center text-white shadow-lg shadow-red-900/30`}>
                    <service.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-5 h-5 rounded bg-red-600/10 flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-red-500" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Starting at</div>
                  <div className="text-3xl font-black text-red-500">${service.price}</div>
                </div>
                <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-red-900/30">
                  <Calendar size={14} />
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
