"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CREAM = "#FFFFFF";
const CARD = "#FFFFFF";
const INK = "#12141F";
const VIOLET = "#4A1AC9";

const REPORT_STATS = [
  { id: "attributed", label: "Attributed revenue", value: "$1,482,910" },
  { id: "per-recipient", label: "Revenue per recipient", value: "$0.94" }
] as const;

const PRINCIPLES = [
  {
    id: "owned",
    title: "Owned, not rented",
    description: "No algorithm sits between you and the person who already bought."
  },
  {
    id: "compounding",
    title: "Compounding, not campaigns",
    description: "Flows earn every day. The calendar adds to them, it does not replace them."
  },
  {
    id: "attributed",
    title: "Attributed, not assumed",
    description: "Every number we report traces back to a send you approved."
  }
] as const;

export default function RevenueProof() {
  const wrapperRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const principleRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const mm = gsap.matchMedia();

    // Card scale, card-content fade and the two text columns are all scrubbed
    // off a single scroll-linked timeline (0 -> 1) while the section is pinned.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Everything below finishes by ~0.68 of scroll progress, leaving the
      // remaining ~0.32 as a dwell period where the fully-revealed card sits
      // still before the section unpins and scrolls away.
      if (cardRef.current) {
        tl.fromTo(cardRef.current, { scale: 0.34 }, { scale: 1, ease: "power2.inOut", duration: 0.45 }, 0);
      }

      if (cardInnerRef.current) {
        tl.fromTo(cardInnerRef.current, { opacity: 0.12 }, { opacity: 1, ease: "none", duration: 0.32 }, 0.22);
      }

      if (headingRef.current) {
        tl.fromTo(headingRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, ease: "none", duration: 0.32 }, 0.32);
      }

      const principles = principleRefs.current.filter((el): el is HTMLLIElement => el !== null);
      principles.forEach((el, index) => {
        const start = 0.35 + index * 0.07;
        const end = 0.6 + index * 0.04;
        tl.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, ease: "none", duration: end - start }, start);
      });

      // Pad the timeline so its total duration maps exactly to scroll progress 0-1,
      // holding the fully-revealed state for the tail end of the scroll.
      tl.to({}, { duration: 0.01 }, 1);
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={wrapperRef} id="revenueProof" data-nav-theme="light" className="relative h-[190vh] w-full" style={{ backgroundColor: CREAM }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-6 sm:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(24,16,48,0.04) 1px, transparent 1px), linear-gradient(rgba(24,16,48,0.04) 1px, transparent 1px)",
            backgroundSize: "156px 140px"
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-260 items-center gap-14 lg:grid-cols-[0.85fr_1.3fr_0.85fr] lg:gap-12">
          <div ref={headingRef}>
            <p className="text-[10px] font-semibold tracking-[0.24em] uppercase" style={{ color: VIOLET }}>
              One number that matters
            </p>
            <h2 className="mt-4 text-[2.4rem] leading-[1.05] font-extrabold tracking-[-0.045em] sm:text-[2.7rem]" style={{ color: INK }}>
              Every send,
              <br />
              measured.
            </h2>
            <p className="mt-5 max-w-72 text-[13px] leading-relaxed text-neutral-500">
              Flows, campaigns and segments all report into revenue per recipient. If a send cannot earn its place in the calendar, it does not get one.
            </p>
          </div>

          <div
            ref={cardRef}
            className="flex min-h-84 flex-col rounded-[18px] border border-black/5 shadow-[0_28px_70px_-34px_rgba(28,16,60,0.4)]"
            style={{ backgroundColor: CARD, transformOrigin: "center center" }}
          >
            <div ref={cardInnerRef} className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-4 border-b border-black/5 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="size-3.5 rounded-[5px]" style={{ backgroundColor: VIOLET }} />
                  <p className="text-[13px] font-semibold" style={{ color: INK }}>
                    Revenue report
                  </p>
                </div>
                <p className="text-[10px] font-medium tracking-[0.18em] text-neutral-400 uppercase">Last 12 months</p>
              </div>

              <div className="m-5 grid grid-cols-2 rounded-[12px] border border-black/5">
                {REPORT_STATS.map((stat, index) => (
                  <div key={stat.id} className={index === 0 ? "border-r border-black/5 px-4 py-3.5" : "px-4 py-3.5"}>
                    <p className="text-[9px] font-medium tracking-[0.16em] text-neutral-400 uppercase">{stat.label}</p>
                    <p className="mt-1.5 text-[1.4rem] leading-none font-bold tracking-[-0.03em] tabular-nums" style={{ color: INK }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto border-t border-black/5 px-5 py-4">
                <p className="text-[13px] font-semibold" style={{ color: INK }}>
                  Twelve months, same team
                </p>
              </div>
            </div>
          </div>

          <ul className="flex flex-col gap-8">
            {PRINCIPLES.map((principle, index) => (
              <li
                key={principle.id}
                ref={(node) => {
                  principleRefs.current[index] = node;
                }}
                className="border-t border-black/10 pt-4"
              >
                <p className="text-[10px] font-medium tracking-[0.14em] text-neutral-400">{`0${index + 1}`}</p>
                <h3 className="mt-3 text-[15px] font-bold tracking-[-0.02em]" style={{ color: INK }}>
                  {principle.title}
                </h3>
                <p className="mt-2 max-w-56 text-[12.5px] leading-relaxed text-neutral-500">{principle.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
