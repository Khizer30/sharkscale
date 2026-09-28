"use client";
import { colors } from "@shared/constants/colors";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INK = colors.tertiary;
const CARD = colors.white;

export default function EmailEngine() {
  const wrapperRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

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
            if (self.progress > 0.72) {
              sticky.setAttribute("data-nav-theme", "light");
            } else {
              sticky.removeAttribute("data-nav-theme");
            }
          }
        }
      });

      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { width: "62%", height: "56vh", y: () => window.innerHeight * 0.22 },
          { width: "100%", height: "100vh", y: 0, ease: "none", duration: 0.88 },
          0.02
        );
      }

      if (textRef.current) {
        tl.fromTo(textRef.current, { fontSize: "3.1vw" }, { fontSize: "5.6vw", ease: "none", duration: 0.88 }, 0.02);
      }

      // Pad the timeline so its total duration maps exactly to scroll progress 0-1.
      tl.to({}, { duration: 0.01 }, 1);
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="relative h-[180vh] w-full" style={{ backgroundColor: INK }}>
      <div ref={stickyRef} data-nav-theme="light" className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div
          ref={cardRef}
          className="relative flex h-screen w-full items-center justify-center p-[4vw]"
          style={{ backgroundColor: CARD, willChange: "transform, width, height" }}
        >
          <h2
            ref={textRef}
            className="max-w-[24ch] text-center text-[5.6vw] leading-[0.96] font-black tracking-tighter uppercase motion-reduce:text-[4vw]"
            style={{ color: INK }}
          >
            We turn first purchases into long-term revenue
          </h2>
        </div>
      </div>
    </section>
  );
}
