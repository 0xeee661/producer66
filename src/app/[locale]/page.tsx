import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BeatsSection from "@/components/BeatsSection";
import ServicesSection from "@/components/ServicesSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      <Navbar />
      <Hero />
      <BeatsSection />
      <ServicesSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
