import Footer from "@shared/components/layout/Footer";
import Hero from "@features/landing/components/Hero";
import ServicesShowcase from "@features/landing/components/ServicesShowcase";
import Navbar from "@shared/components/layout/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      {/* <ServicesShowcase /> */}
      <Footer />
    </main>
  );
}
