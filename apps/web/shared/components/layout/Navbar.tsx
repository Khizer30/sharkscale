"use client";
import logo from "@shared/assets/logo.webp";
import DotsToPlusIcon from "@shared/components/layout/DotsToPlusIcon";
import NavOverlay from "@shared/components/layout/NavOverlay";
import { colors } from "@shared/constants/colors";
import { navLinks } from "@shared/lib/navLinks";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const homeHref = navLinks.find((link) => link.label === "Home")?.href ?? "#";
  const contactHref = navLinks.find((link) => link.label === "Contact Us")?.href ?? "#";

  const [showOverlay, setShowOverlay] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 100;
      const progress = Math.min(scrollTop / scrollThreshold, 1);
      setScrollProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const minHeight = 60;
  const maxHeight = 88;

  const currentHeight = maxHeight - (maxHeight - minHeight) * scrollProgress;
  const horizontalInset = 16 + scrollProgress * 8;
  const minLogoHeight = 36;
  const maxLogoHeight = 56;
  const logoHeight = maxLogoHeight - (maxLogoHeight - minLogoHeight) * scrollProgress;
  const gapScale = 1 - scrollProgress * 0.3;

  return (
    <>
      <header
        className="fixed top-4 z-50 rounded-2xl"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: "#12013b",
          left: `${horizontalInset}px`,
          right: `${horizontalInset}px`,
          width: `calc(100% - ${horizontalInset * 2}px)`,
          height: `${currentHeight}px`,
          overflow: "hidden",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center px-6 h-full" style={{ gap: `${24 * gapScale}px` }}>
          <Link href={homeHref} className="flex items-center flex-shrink-0">
            <Image src={logo} alt="SharkScale" priority draggable={false} className="w-auto" style={{ height: `${logoHeight}px` }} />
          </Link>

          <ul className="hidden items-center justify-center lg:flex flex-shrink-0" style={{ gap: `${32 * gapScale}px` }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-medium text-white/80 transition-colors hover:text-white whitespace-nowrap">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-3 flex-shrink-0">
            <Link
              href={contactHref}
              className="hidden items-center gap-2.5 rounded-full py-1.5 pl-4 pr-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary lg:inline-flex"
              style={{ backgroundColor: `${colors.white}1A` }}
            >
              <span style={{ display: scrollProgress > 0.7 ? "none" : "inline" }}>Book a Call</span>
              <span className="flex size-7 items-center justify-center rounded-full text-white flex-shrink-0" style={{ backgroundColor: `${colors.white}1F` }}>
                <ArrowRight className="size-3.5" />
              </span>
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setShowOverlay(true)}
              className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-primary flex-shrink-0"
              style={{ backgroundColor: `${colors.white}1A` }}
            >
              <DotsToPlusIcon />
            </button>
          </div>
        </div>
      </header>

      {showOverlay && <NavOverlay onClose={() => setShowOverlay(false)} />}
    </>
  );
}
