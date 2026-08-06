"use client";
import logo from "@shared/assets/logo.webp";
import DotsToPlusIcon from "@shared/components/layout/DotsToPlusIcon";
import NavOverlay from "@shared/components/layout/NavOverlay";
import { colors } from "@shared/constants/colors";
import { navLinks } from "@shared/lib/navLinks";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const homeHref = navLinks.find((link) => link.label === "Home")?.href ?? "#";
  const contactHref = navLinks.find((link) => link.label === "Contact Us")?.href ?? "#";

  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <header
        className="fixed inset-x-4 top-4 z-50 rounded-2xl"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: `${colors.tertiary}CC`
        }}
      >
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-3">
          <Link href={homeHref} className="flex items-center">
            <Image src={logo} alt="SharkScale" priority draggable={false} className="h-28 w-auto" />
          </Link>

          <ul className="hidden items-center justify-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-4">
            <Link
              href={contactHref}
              className="hidden items-center gap-2.5 rounded-full py-1.5 pl-4 pr-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary lg:inline-flex"
              style={{ backgroundColor: `${colors.white}1A` }}
            >
              Book a Call
              <span className="flex size-7 items-center justify-center rounded-full text-white" style={{ backgroundColor: `${colors.white}1F` }}>
                <ArrowRight className="size-3.5" />
              </span>
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setShowOverlay(true)}
              className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-primary"
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
