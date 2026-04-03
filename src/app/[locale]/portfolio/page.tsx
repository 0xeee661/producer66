import Navbar from '@/components/Navbar';
import Portfolio from '@/components/Portfolio';
import Footer from '@/components/Footer';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-[#F9F9F9] selection:bg-[#F2EFDD] selection:text-black">
      <Navbar />
      <Portfolio />
      <Footer />
    </main>
  );
}
