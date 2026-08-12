import Hero from "@features/landing/components/Hero";
import ServicesShowcase from "@features/landing/components/ServicesShowcase";
import FooterLazy from "@shared/components/layout/FooterLazy";
import Navbar from "@shared/components/layout/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ServicesShowcase />
      <FooterLazy />
    </main>
  );
}