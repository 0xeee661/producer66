import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BeatsSection from "@/components/BeatsSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ServicesSection from "@/components/ServicesSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020202] text-[#F9F9F9] selection:bg-[#F2EFDD] selection:text-black">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <BeatsSection />
      <FeaturedProducts />
      <ServicesSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
