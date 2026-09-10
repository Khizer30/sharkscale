"use client";
import { cn } from "@shared/lib/utils";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PARALLAX_STRENGTH = 16;
const HERO_BLUE = "#2F5BFF";
const HERO_NAVY = "#12141F";

const TABS = [
  {
    id: "analytics",
    label: "Analytics",
    stats: [
      { label: "Contacted", value: "128,400" },
      { label: "Opened", value: "61,930" },
      { label: "Replied", value: "4,180" },
      { label: "Placed order", value: "9,742" }
    ],
    bars: [18, 24, 30, 36, 48, 54, 58, 52, 66, 78, 90, 100]
  },
  {
    id: "flows",
    label: "Flows",
    stats: [
      { label: "Active flows", value: "24" },
      { label: "Enrolled", value: "86,210" },
      { label: "Converted", value: "7,940" },
      { label: "Flow revenue", value: "$412k" }
    ],
    bars: [28, 32, 30, 38, 44, 58, 62, 70, 68, 80, 88, 96]
  },
  {
    id: "campaigns",
    label: "Campaigns",
    stats: [
      { label: "Sent", value: "42" },
      { label: "Opened", value: "54,180" },
      { label: "Clicked", value: "9,260" },
      { label: "Campaign revenue", value: "$286k" }
    ],
    bars: [22, 26, 40, 34, 46, 42, 60, 55, 72, 76, 84, 92]
  },
  {
    id: "segments",
    label: "Segments",
    stats: [
      { label: "Live segments", value: "18" },
      { label: "In-market", value: "31,450" },
      { label: "VIP", value: "4,920" },
      { label: "Winback", value: "12,780" }
    ],
    bars: [16, 20, 26, 34, 32, 44, 50, 48, 60, 68, 74, 86]
  },
  {
    id: "deliverability",
    label: "Deliverability",
    stats: [
      { label: "Inbox rate", value: "98.4%" },
      { label: "Bounce", value: "0.6%" },
      { label: "Spam", value: "0.08%" },
      { label: "Unsub", value: "0.21%" }
    ],
    bars: [70, 74, 72, 78, 80, 84, 82, 86, 88, 90, 94, 97]
  }
] as const;

const BAR_COLORS = ["#B9D2FF", "#A6C6FF", "#93BAFF", "#80AFFF", "#6DA3FF", "#5A97FF", "#478BFF", "#3B7CFF", "#2F6EFF", "#2863F5", "#2158EB", "#1A4DE0"];

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Tab = (typeof TABS)[number];

function Envelope({ className, stroke }: { className?: string; stroke: string }) {
  return (
    <svg viewBox="0 0 72 52" fill="none" aria-hidden className={className}>
      <rect x="3" y="8" width="66" height="40" rx="6" stroke={stroke} strokeWidth="2.2" />
      <path d="M4 12.5 36 32 68 12.5" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 1.2 14.1 9 22.2 12 14.1 15 12 22.8 9.9 15 1.8 12 9.9 9Z" />
    </svg>
  );
}

function DashboardCard() {
  const [activeId, setActiveId] = useState<Tab["id"]>("analytics");
  const tab = TABS.find((item) => item.id === activeId) ?? TABS[0];

  return (
    <div className="relative mx-auto w-full max-w-245">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute -inset-x-16 -bottom-16 top-8 rounded-[48px] bg-[radial-gradient(ellipse_at_50%_70%,rgba(47,91,255,0.5)_0%,rgba(47,91,255,0.16)_38%,transparent_72%)] blur-3xl"
      />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-[#2F5BFF]/25 blur-3xl" />

      <div className="relative overflow-hidden rounded-[22px] border border-black/5 bg-white shadow-[0_28px_80px_-24px_rgba(47,91,255,0.5),0_12px_40px_-20px_rgba(15,23,42,0.16)]">
        <div className="flex items-center gap-1 overflow-x-auto border-b border-black/5 px-5 pt-4 scrollbar-none sm:px-7">
          {TABS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 px-3 pb-3.5 text-[13px] font-medium transition-colors",
                  isActive ? "text-[#2F5BFF]" : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                {isActive && <span className="size-3.5 rounded-lg bg-[#2F5BFF]" />}
                {item.label}
                {isActive && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[#2F5BFF]" />}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 border-b border-black/5 sm:grid-cols-4">
          {tab.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "px-5 py-5 sm:px-7",
                index % 2 === 0 && "border-r border-black/5",
                index < 2 && "border-b border-black/5 sm:border-b-0",
                index === 1 && "sm:border-r sm:border-black/5",
                index === 2 && "border-b-0"
              )}
            >
              <p className="text-[11px] font-medium tracking-[0.14em] text-neutral-400 uppercase">{stat.label}</p>
              <p className="mt-2 text-[1.65rem] leading-none font-bold tracking-tight text-[#12141F] sm:text-[1.85rem]">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex h-55 flex-col px-5 pt-5 pb-4 sm:h-80 sm:px-7 sm:pb-6">
          <div className="mb-3 flex items-start justify-between">
            <p className="text-[15px] font-semibold text-[#12141F]">Attributed revenue</p>
            <p className="text-[12px] text-neutral-400">Last 12 months</p>
          </div>
          <div key={tab.id} className="flex min-h-0 flex-1 items-end gap-2 sm:gap-3.5">
            {tab.bars.map((height, index) => (
              <div
                key={`${tab.id}-${index}`}
                className="hero-bar origin-bottom flex-1 rounded-t-[6px]"
                style={{
                  height: `${height}%`,
                  backgroundColor: BAR_COLORS[index] ?? HERO_BLUE,
                  animationDelay: `${index * 40}ms`
                }}
              />
            ))}
          </div>
          <div className="mt-2 flex gap-2 sm:gap-3.5">
            {tab.bars.map((_, index) => (
              <span
                key={`${tab.id}-label-${index}`}
                className="flex-1 text-center text-[10px] font-medium text-neutral-400 sm:text-[11px]"
              >
                {MONTH_LABELS[index % MONTH_LABELS.length]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    function handleMouseMove(event: MouseEvent) {
      if (!section) {
        return;
      }
      const rect = section.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: relativeX * PARALLAX_STRENGTH, y: relativeY * PARALLAX_STRENGTH });
    }

    function handleMouseLeave() {
      setOffset({ x: 0, y: 0 });
    }

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" data-nav-theme="light" className="relative flex min-h-svh w-full flex-col overflow-hidden bg-[#FBFBFD] text-[#12141F]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_85%_-10%,rgba(255,210,31,0.22)_0%,transparent_55%),radial-gradient(ellipse_70%_45%_at_10%_20%,rgba(47,91,255,0.06)_0%,transparent_60%),radial-gradient(ellipse_90%_40%_at_50%_100%,rgba(47,91,255,0.10)_0%,transparent_70%)]"
      />

      <div
        aria-hidden
        className="hero-float pointer-events-none absolute top-[30%] left-[5%] hidden w-16 opacity-70 lg:block"
        style={{ transform: `translate3d(${offset.x * -0.6}px, ${offset.y * -0.6}px, 0)` }}
      >
        <Envelope className="w-14 rotate-[-18deg]" stroke="#C5CAD6" />
      </div>
      <div
        aria-hidden
        className="hero-float pointer-events-none absolute top-[28%] right-[8%] hidden w-16 lg:block"
        style={{ transform: `translate3d(${offset.x * 0.8}px, ${offset.y * 0.7}px, 0)`, animationDelay: "1.2s" }}
      >
        <Envelope className="w-14 rotate-12" stroke="#E8C21A" />
      </div>
      <div
        aria-hidden
        className="hero-float pointer-events-none absolute top-[44%] right-[12%] hidden text-[#E8C21A] lg:block"
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`, animationDelay: "0.6s" }}
      >
        <Sparkle className="size-4" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-28 text-center sm:pt-40">
        <h1 className="text-[2.6rem] leading-[1.05] font-extrabold tracking-[-0.045em] sm:text-6xl lg:text-[4.75rem]">
          <span style={{ color: HERO_NAVY }}>Run on revenue,</span>
          <br />
          <span className="hero-phrase" style={{ color: HERO_BLUE }}>
            not{" "}
            <span className="relative inline-block">
              <span className="relative z-10">open</span>
              <span
                aria-hidden
                className="hero-highlight absolute -inset-x-0.5 bottom-[0.1em] z-0 h-[0.2em] rounded-[1px] bg-[#FFD21F]"
              />
            </span>{" "}
            rates.
          </span>
        </h1>

        <p className="mt-6 max-w-152 text-[15px] leading-relaxed text-neutral-500 sm:text-base">
          SharkScale builds and runs the Klaviyo flows, campaigns and segmentation that turn a dormant list into 30–40% of monthly store revenue. No guessing
          which send paid for itself.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#contactUs"
            data-cursor-magnetic
            data-cursor-text="Book"
            className={cn(
              "group inline-flex items-center gap-1 rounded-full px-5 py-3 text-sm font-semibold text-white",
              "bg-[#2F5BFF] transition-colors hover:bg-[#244CE6]"
            )}
          >
            Book a free teardown
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#ourWork"
            data-cursor-magnetic
            data-cursor-text="View"
            className={cn(
              "group inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-[#12141F]",
              "transition-colors hover:bg-neutral-50"
            )}
          >
            See the numbers
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 w-full max-w-260 flex-1 px-4 pb-10 sm:mt-16 sm:px-6 sm:pb-20">
        <div className="translate-y-4 sm:translate-y-10">
          <DashboardCard />
        </div>
      </div>
    </section>
  );
}
