import Hero from "@features/landing/components/Hero";
import ServicesShowcaseLazy from "@features/landing/components/ServicesShowcaseLazy";
import ToolsLazy from "@features/landing/components/ToolsLazy";
import FooterLazy from "@shared/components/layout/FooterLazy";
import Navbar from "@shared/components/layout/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ServicesShowcaseLazy />
      <ToolsLazy />
      <FooterLazy />
    </main>
  );
}
