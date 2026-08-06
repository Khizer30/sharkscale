"use client";
import { colors } from "@shared/constants/colors";
import { navLinks } from "@shared/lib/navLinks";
import gsap from "gsap";
import { X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface NavOverlayProps {
  onClose: () => void;
}

const overlayLinks = [...navLinks, { label: "Book a Call", href: "#contact-us" }];

export default function NavOverlay({ onClose }: NavOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    if (isExiting) {
      return;
    }
    setIsExiting(true);

    const container = containerRef.current;
    const content = contentRef.current;
    const backdrop = backdropRef.current;

    if (!container || !content) {
      onClose();
      return;
    }

    gsap.killTweensOf([container, content, backdrop]);
    gsap
      .timeline({ defaults: { ease: "power3.inOut" }, onComplete: onClose })
      .to(content, { opacity: 0, y: -20, scale: 0.97, duration: 0.5, ease: "power2.inOut" }, 0)
      .to(container, { y: "-100%", opacity: 0, duration: 0.7 }, 0.1)
      .to(backdrop, { opacity: 0, duration: 0.4, ease: "power2.inOut" }, 0.2);
  }, [isExiting, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const container = containerRef.current;
    const content = contentRef.current;
    const backdrop = backdropRef.current;

    if (container && content) {
      gsap.killTweensOf([container, content, backdrop]);
      gsap.set(container, { y: "-100%", opacity: 1 });
      gsap.set(content, { opacity: 0, y: 30, scale: 0.98 });
      gsap.set(backdrop, { opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(backdrop, { opacity: 1, duration: 0.8, ease: "power2.out" }, 0)
        .to(container, { y: "0%", duration: 0.9, ease: "back.out(1.2)" }, 0.1)
        .to(content, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.6)" }, 0.3);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div
        ref={backdropRef}
        className="fixed inset-0 z-[998] backdrop-blur-sm"
        style={{ backgroundColor: `${colors.black}E6`, opacity: 0 }}
        onClick={handleClose}
      />

      <div ref={containerRef} className="fixed inset-0 z-[999] overflow-y-auto" style={{ backgroundColor: colors.tertiary, transform: "translateY(-100%)" }}>
        <div ref={contentRef} className="flex min-h-screen flex-col p-6">
          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={handleClose}
              className="inline-flex size-11 items-center justify-center rounded-full text-tertiary-foreground transition-colors hover:bg-tertiary-foreground/10"
            >
              <X className="size-6" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2">
            {overlayLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleClose}
                className="text-4xl font-semibold tracking-tight text-tertiary-foreground/70 transition-colors hover:text-tertiary-foreground sm:text-6xl"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
