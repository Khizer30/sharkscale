"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SURFACE = "#F6F6F3";
const INK = "#0A1033";
const BLUE = "#123CE8";
const GOLD = "#FFD400";
const LIGHT_BLUE = "#8FB6FF";

const FLOWS = [
  { label: "Welcome", count: 6 },
  { label: "Abandoned cart", count: 4 },
  { label: "Browse abandon", count: 3 },
  { label: "Post-purchase", count: 5 },
  { label: "Winback", count: 3 },
  { label: "Replenishment", count: 2 }
] as const;

const SENDS = [
  { id: "welcome-1", dot: BLUE, name: "Welcome 1", subject: "Start here — no discount needed", revenue: "$41.2k" },
  { id: "cart-2", dot: GOLD, name: "Cart 2", subject: "You left something behind ✱", revenue: "$33.8k" },
  { id: "replenish", dot: BLUE, name: "Replenish", subject: "Your restock is due in 4 days", revenue: "$26.9k" },
  { id: "browse-1", dot: LIGHT_BLUE, name: "Browse 1", subject: "Still thinking it over?", revenue: "$18.4k" },
  { id: "vip-tier", dot: GOLD, name: "VIP tier", subject: "The one thing our VIPs know", revenue: "$15.1k" },
  { id: "winback", dot: BLUE, name: "Winback", subject: "It has been a while", revenue: "$11.6k" },
  { id: "post-purchase", dot: LIGHT_BLUE, name: "Post-purchase", subject: "How Ella uses hers", revenue: "$9.8k" },
  { id: "welcome-2", dot: BLUE, name: "Welcome 2", subject: "The 3-step routine, simplified", revenue: "$8.4k" },
  { id: "cart-3", dot: GOLD, name: "Cart 3", subject: "Last chance on your basket", revenue: "$7.1k" },
  { id: "sunset", dot: LIGHT_BLUE, name: "Sunset", subject: "Should we stop emailing you?", revenue: "$4.6k" }
] as const;

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
      <div className="mx-auto w-full max-w-260">
        <div ref={headingRef}>
          <span
            className="inline-block rounded-full border px-3.5 py-1.5 text-[12.5px] font-bold tracking-[0.02em]"
            style={{ color: BLUE, borderColor: `${BLUE}59` }}
          >
            Owned channel
          </span>

          <h2 className="mt-6 max-w-[24ch] text-[clamp(32px,4.4vw,62px)] leading-[1.04] font-bold tracking-[-0.04em]">
            An inbox where your brand and your data work together
          </h2>

          <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed" style={{ color: "rgba(10,16,51,0.7)" }}>
            Every flow, campaign and segment reports into one view. We read the same numbers you do, so the calendar is argued with data instead of taste.
          </p>

          <a
            href="#revenueProof"
            className="mt-7 inline-flex items-center gap-2.5 rounded-[10px] px-6 py-3.5 text-[14.5px] font-bold text-white"
            style={{ backgroundColor: BLUE }}
          >
            Explore the numbers →
          </a>
        </div>

        <div ref={mockRef} className="mx-auto mt-14 w-full max-w-280">
          <div className="rounded-[30px] p-3 shadow-[0_70px_130px_-60px_rgba(10,16,51,0.85)]" style={{ backgroundColor: INK }}>
            <div className="grid min-h-[min(78vh,720px)] overflow-hidden rounded-[20px] bg-white sm:grid-cols-[minmax(0,270px)_minmax(0,1fr)]">
              <div className="flex flex-col gap-5 border-b border-black/8 px-5.5 py-6.5 sm:border-r sm:border-b-0" style={{ backgroundColor: "#F7F8FB" }}>
                <div className="flex items-center gap-2.5 text-[18px] font-extrabold tracking-tight">
                  <span className="size-7 flex-none rounded-[9px]" style={{ backgroundColor: BLUE }} />
                  Flows
                </div>
                <div className="flex flex-col gap-3.5 text-[16px]" style={{ color: "rgba(10,16,51,0.72)" }}>
                  {FLOWS.map((flow) => (
                    <span key={flow.label} className="flex justify-between gap-2.5">
                      <span>{flow.label}</span>
                      <span className="font-mono text-[13.5px]" style={{ color: "rgba(10,16,51,0.45)" }}>
                        {flow.count}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-4 border-b border-black/8 px-6.5 py-5 text-[15.5px]" style={{ color: "rgba(10,16,51,0.55)" }}>
                  <span className="font-bold" style={{ color: INK }}>
                    All sends
                  </span>
                  <span>Filter</span>
                  <span>Sort</span>
                  <span className="ml-auto font-bold" style={{ color: BLUE }}>
                    + New flow
                  </span>
                </div>

                {SENDS.map((send) => (
                  <div key={send.id} className="flex min-w-0 items-center gap-4.5 border-b border-black/6 px-6.5 py-4.75">
                    <span className="size-3 flex-none rounded-full" style={{ backgroundColor: send.dot }} />
                    <span className="w-38 flex-none truncate text-[16px] font-bold">{send.name}</span>
                    <span className="min-w-0 flex-1 truncate text-[16px]" style={{ color: "rgba(10,16,51,0.62)" }}>
                      {send.subject}
                    </span>
                    <span className="flex-none font-mono text-[14px]" style={{ color: "rgba(10,16,51,0.5)" }}>
                      {send.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
