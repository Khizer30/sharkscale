import Hero from "@features/landing/components/Hero";
import Navbar from "@shared/components/layout/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
    </main>
  );
}
