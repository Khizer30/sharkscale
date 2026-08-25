import Hero from "@features/landing/components/Hero";
import LatestWorksLazy from "@features/landing/components/LatestWorksLazy";
import ServicesShowcaseLazy from "@features/landing/components/ServicesShowcaseLazy";
import TeamLazy from "@features/landing/components/TeamLazy";
import ToolsLazy from "@features/landing/components/ToolsLazy";
import FooterLazy from "@shared/components/layout/FooterLazy";
import Navbar from "@shared/components/layout/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ServicesShowcaseLazy />
      <div aria-hidden style={{ height: "22rem", background: "linear-gradient(180deg, #341a7c 0%, #46266f 14%, #664272 28%, #895f76 42%, #ac817d 56%, #c9a48f 68%, #e0cdb4 82%, #efe7d8 93%, #f5f0e8 100%)" }} />
      <TeamLazy />
      <ToolsLazy />
      <LatestWorksLazy />
      <div aria-hidden style={{ height: "16rem", background: "linear-gradient(180deg, #ffffff 0%, #efe9e0 20%, #d9c3b4 38%, #b48d86 54%, #7d5378 68%, #4a2a72 82%, #29135a 92%, #170941 100%)" }} />
      <FooterLazy />
    </main>
  );
}
