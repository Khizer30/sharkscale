"use client";

import { cn } from "@shared/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const services = [
  {
    id: "01",
    eyebrow: "Strategy",
    title: "Email Strategy",
    description: "We design data-driven campaigns that maximize opens, clicks, and sales.",
    accent: "Campaign architecture, audience targeting, testing roadmap"
  },
  {
    id: "02",
    eyebrow: "Creative",
    title: "Content Creation",
    description: "Compelling copy and visuals that resonate with your audience and drive action.",
    accent: "Brand voice, persuasive messaging, high-converting creative"
  },
  {
    id: "03",
    eyebrow: "Design",
    title: "Design & Templates",
    description: "Beautiful, on-brand email templates optimized for Klaviyo and conversions.",
    accent: "Responsive layouts, modular sections, polished brand systems"
  },
  {
    id: "04",
    eyebrow: "Retention",
    title: "Automation & Flows",
    description: "Smart workflows that nurture leads, recover carts, and boost lifetime value.",
    accent: "Lifecycle journeys, triggered sequences, revenue recovery"
  }
] as const;

gsap.registerPlugin(ScrollTrigger);

export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = services[activeIndex] ?? services[0];
  const serviceCount = services.length;
  const progressLabel = useMemo(() => `${String(activeIndex + 1).padStart(2, "0")}/${String(serviceCount).padStart(2, "0")}`, [activeIndex, serviceCount]);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const progressFill = progressFillRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[];

    if (!section || !panel || !progressFill || cards.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(panel, { yPercent: 35, opacity: 0.45, scale: 0.94 });
      gsap.set(progressFill, { scaleY: 0.25, transformOrigin: "top center" });

      cards.forEach((card, index) => {
        gsap.set(card, {
          opacity: index === 0 ? 1 : 0.38,
          y: index === 0 ? 0 : 24
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2400",
          pin: true,
          scrub: 0.6
        }
      });

      timeline.to(panel, { yPercent: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" });

      services.forEach((_, index) => {
        const stepStart = 0.85 + index * 0.7;

        timeline.call(
          () => {
            setActiveIndex(index);
          },
          undefined,
          stepStart
        );

        timeline.to(
          progressFill,
          {
            scaleY: (index + 1) / serviceCount,
            duration: 0.3,
            ease: "power2.out"
          },
          stepStart
        );

        cards.forEach((card, cardIndex) => {
          timeline.to(
            card,
            {
              opacity: cardIndex === index ? 1 : 0.38,
              y: cardIndex === index ? 0 : 24,
              duration: 0.3,
              ease: "power2.out"
            },
            stepStart
          );
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [serviceCount]);

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden bg-tertiary px-6 py-24 text-tertiary-foreground sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,210,31,0.18),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/30 to-transparent" />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center gap-16">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-1 text-xs font-semibold tracking-[0.28em] uppercase text-white/72">
            How can we help?
          </span>

          <div className="space-y-4">
            <h2 className="max-w-5xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Services that rise into focus as your visitors scroll.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              From strategy to execution, we craft digital solutions that move your business forward.
            </p>
          </div>
        </div>

        <div
          ref={panelRef}
          className={cn(
            "relative grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_40px_140px_rgba(0,0,0,0.42)] backdrop-blur-xl",
            "lg:grid-cols-[120px_minmax(0,1.25fr)_minmax(320px,0.95fr)] lg:items-center lg:p-10"
          )}
        >
          <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:justify-between lg:self-stretch">
            <span className="text-sm font-semibold tracking-[0.2em] text-white/60 uppercase">#service_{activeService.id}</span>
            <div className="flex items-center gap-3 lg:flex-col lg:items-start">
              <div className="relative h-20 w-1 overflow-hidden rounded-full bg-white/10 lg:h-36">
                <div ref={progressFillRef} className="absolute inset-x-0 top-0 h-full rounded-full bg-secondary" />
              </div>
              <span className="text-sm font-medium text-white/60">{progressLabel}</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,210,31,0.16),rgba(255,255,255,0.04)_36%,rgba(23,1,73,0.55)_100%)] p-6 sm:p-8 lg:min-h-[30rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,210,31,0.3),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.14),_transparent_28%)]" />
            <div className="relative flex h-full flex-col justify-between gap-10">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border border-secondary/25 bg-secondary/12 px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
                  {activeService.eyebrow}
                </span>
                <div className="space-y-4">
                  <h3 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">{activeService.title}</h3>
                  <p className="max-w-xl text-base leading-7 text-white/78 sm:text-lg">{activeService.description}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/18 p-5">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/52">Focus</span>
                  <p className="mt-3 text-lg font-medium text-white">{activeService.accent}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/8 p-5">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/52">Outcome</span>
                  <p className="mt-3 text-lg font-medium text-white">Clearer campaigns, stronger retention, and more revenue from every send.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {services.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={service.id}
                  type="button"
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group rounded-[1.5rem] border p-5 text-left transition-all duration-300",
                    isActive
                      ? "border-secondary/45 bg-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
                      : "border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <span className={cn("text-xs font-semibold tracking-[0.2em] uppercase", isActive ? "text-secondary" : "text-white/46")}>
                        {service.eyebrow}
                      </span>
                      <div>
                        <h4 className="text-xl font-semibold text-white">{service.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-white/68">{service.description}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        isActive
                          ? "border-secondary/45 bg-secondary text-secondary-foreground"
                          : "border-white/10 bg-white/4 text-white/60 group-hover:border-white/20 group-hover:text-white"
                      )}
                    >
                      <ArrowRight className={cn("size-4 transition-transform duration-300", isActive ? "-rotate-45" : "group-hover:translate-x-0.5")} />
                    </span>
                  </div>
                </button>
              );
            })}

            <a
              href="#contact-us"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              Let&apos;s build your flows
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
