"use client";
import { colors } from "@shared/constants/colors";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOLD = colors.secondary;
const INK = colors.tertiary;
const WHITE = colors.white;

function unsplash(id: string): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;
}

const WORKS = [
  {
    id: "lumen",
    name: "Lumen",
    year: "2026",
    ratio: "1 / 1",
    src: unsplash("1540959733332-eab4deabeeaf"),
    alt: "Crowds moving through a night-time city crossing"
  },
  {
    id: "verta",
    name: "Verta",
    year: "2025",
    ratio: "1 / 1",
    src: unsplash("1444703686981-a3abbc4d4fe3"),
    alt: "Starry night sky over a dark landscape"
  },
  {
    id: "oakfield",
    name: "Oakfield",
    year: "2025",
    ratio: "16 / 10",
    src: unsplash("1551288049-bebda4e38f71"),
    alt: "Analytics dashboard displayed on a laptop screen"
  }
] as const;

export default function Reviews() {
  const wrapperRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const sticky = stickyRef.current;
            if (!sticky) {
              return;
            }
            if (self.progress < 0.46) {
              sticky.setAttribute("data-nav-theme", "light");
            } else {
              sticky.removeAttribute("data-nav-theme");
            }
          }
        }
      });

      if (headingRef.current) {
        tl.fromTo(headingRef.current, { scale: 1, y: 0 }, { scale: 0.4, y: -24, ease: "none", duration: 0.52, transformOrigin: "center top" }, 0.04);
        tl.fromTo(headingRef.current, { color: INK }, { color: WHITE, ease: "none", duration: 0.26 }, 0.34);
      }

      if (bgRef.current) {
        tl.fromTo(bgRef.current, { backgroundColor: GOLD }, { backgroundColor: INK, ease: "none", duration: 0.32 }, 0.3);
      }

      const cards = cardRefs.current.filter((el): el is HTMLAnchorElement => el !== null);
      cards.forEach((el, index) => {
        const start = 0.44 + index * 0.05;
        const end = 0.7 + index * 0.03;
        tl.fromTo(el, { opacity: 0, y: 110 }, { opacity: 1, y: 0, ease: "none", duration: end - start }, start);
      });

      // Pad the timeline so its total duration maps exactly to scroll progress 0-1.
      tl.to({}, { duration: 0.01 }, 1);
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={wrapperRef} id="reviews" className="relative h-[320vh] w-full">
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <div ref={bgRef} className="absolute inset-0" style={{ backgroundColor: INK }} />

        <div className="absolute inset-x-0 top-24 bottom-0 flex items-start justify-center px-6 pt-4 sm:top-28 sm:px-10 sm:pt-6">
          <div ref={headingRef} className="w-full text-center" style={{ color: WHITE, willChange: "transform" }}>
            <h2 className="text-[12.4vw] leading-[0.9] font-black tracking-tighter uppercase motion-reduce:text-[6.5vw]">Reviews</h2>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 items-end gap-2 px-4 pb-6 sm:gap-4 sm:px-8 sm:pb-8 md:grid-cols-[1fr_1fr_1.6fr]">
          {WORKS.map((work, index) => (
            <a
              key={work.id}
              href="#contactUs"
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="group block"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="flex items-center justify-between gap-3 pb-2 text-[11px] font-semibold text-white sm:pb-3 sm:text-sm">
                <span>{work.name}</span>
                <span className="opacity-60">{work.year}</span>
              </div>
              <div className="relative overflow-hidden bg-black/60" style={{ aspectRatio: work.ratio }}>
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  unoptimized
                  draggable={false}
                  sizes="(max-width: 767px) 33vw, 30vw"
                  className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.045] group-hover:grayscale-0"
                />
                <span
                  className="pointer-events-none absolute inset-0 flex translate-y-3 items-center justify-center text-[clamp(1rem,3.2vw,3.4rem)] font-black tracking-[-0.03em] uppercase opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ color: GOLD }}
                >
                  {work.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
