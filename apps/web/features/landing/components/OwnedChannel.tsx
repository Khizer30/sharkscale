"use client";
import emailTemplate1 from "@shared/assets/emailTemplate_1.webp";
import emailTemplate2 from "@shared/assets/emailTemplate_2.webp";
import emailTemplate3 from "@shared/assets/emailTemplate_3.webp";
import { cn } from "@shared/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SURFACE = "#F6F6F3";
const INK = "#0A1033";
const BLUE = "#123CE8";

const SCROLL_DURATION_S = 52;

type ScrollDirection = "up" | "down";

function ScrollingEmailColumn({ src, alt, direction }: { src: StaticImageData; alt: string; direction: ScrollDirection }) {
  return (
    <div
      className="relative min-h-0 overflow-hidden rounded-[14px] bg-white/95 [mask-image:linear-gradient(to_bottom,transparent,black_6%,black_94%,transparent)]"
    >
      <div className={cn("flex flex-col gap-4 px-2 pt-2", direction === "up" ? "owned-scroll-up" : "owned-scroll-down")}>
        {[0, 1].map((key) => (
          <Image
            key={key}
            src={src}
            alt={key === 0 ? alt : ""}
            draggable={false}
            className="h-auto w-full flex-none rounded-[10px] shadow-[0_12px_40px_-20px_rgba(10,16,51,0.45)]"
          />
        ))}
      </div>
    </div>
  );
}

export default function OwnedChannel() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const reveal = { trigger: section, start: "top 72%", once: true };

      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 32,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: reveal
        });
      }

      if (mockRef.current) {
        gsap.from(mockRef.current, {
          opacity: 0,
          y: 70,
          scale: 0.97,
          duration: 1.1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: reveal
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="w-full overflow-hidden px-6 py-20 sm:px-10 sm:py-24"
      style={{ backgroundColor: SURFACE, color: INK }}
    >
      <style>{`
        @keyframes owned-scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes owned-scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .owned-scroll-up {
          animation: owned-scroll-up ${SCROLL_DURATION_S}s linear infinite;
        }
        .owned-scroll-down {
          animation: owned-scroll-down ${SCROLL_DURATION_S}s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .owned-scroll-up,
          .owned-scroll-down {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-260">
        <div ref={headingRef}>
          <span
            className="inline-block rounded-full border px-3.5 py-1.5 text-[12.5px] font-bold tracking-[0.02em]"
            style={{ color: BLUE, borderColor: `${BLUE}59` }}
          >
            Owned channel
          </span>

          <h2 className="mt-6 max-w-[24ch] text-[clamp(32px,4.4vw,62px)] leading-[1.04] font-bold tracking-[-0.04em]">
            Good enough to stop the scroll.
          </h2>

          <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed" style={{ color: "rgba(10,16,51,0.7)" }}>
            Every email is designed around your brand, your customer, and the action we want them to take. Strategy, copy, and design come together to create
            emails people actually want to open, read, and shop.
          </p>

          <a
            href="#revenueProof"
            className="mt-7 inline-flex items-center gap-2.5 rounded-[10px] px-6 py-3.5 text-[14.5px] font-bold text-white"
            style={{ backgroundColor: BLUE }}
          >
            EXPLORE OUR CREATIVE →
          </a>
        </div>

        <div
          ref={mockRef}
          className="mx-auto mt-14 grid h-[min(78vh,720px)] w-full max-w-280 grid-cols-3 gap-2.5 overflow-hidden sm:gap-4"
        >
          <ScrollingEmailColumn src={emailTemplate1} alt="Email creative example one" direction="up" />
          <ScrollingEmailColumn src={emailTemplate2} alt="Email creative example two" direction="down" />
          <ScrollingEmailColumn src={emailTemplate3} alt="Email creative example three" direction="up" />
        </div>
      </div>
    </section>
  );
}
