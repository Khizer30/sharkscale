import Image from "next/image";

const SURFACE = "#F3F4F8";
const INK = "#12141F";
const GOLD = "#FFD21F";

const FLOW_TICKER = [
  "Flow",
  "Welcome series",
  "Abandoned cart",
  "Browse abandon",
  "Post-purchase",
  "Winback",
  "Replenishment",
  "VIP tier",
  "Sunset flow"
] as const;

function unsplash(id: string): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&q=80`;
}

const WORKS = [
  {
    id: "flow",
    title: "Flow architecture",
    description:
      "Welcome, browse, cart, checkout, post-purchase, winback. Built as one connected system with logic that reflects how people actually buy from you.",
    tags: ["Welcome & browse flows", "Cart & checkout recovery", "Post-purchase sequences", "Winback & sunset logic", "Segment architecture"],
    background: "#2F5BFF",
    color: "#ffffff",
    muted: "rgba(255,255,255,0.72)",
    navTheme: "dark",
    image: {
      src: unsplash("1540959733332-eab4deabeeaf"),
      alt: "Crowds moving through a night-time city crossing",
      grayscale: false
    }
  },
  {
    id: "campaign",
    title: "Campaign calendar",
    description: "A planned month of sends: launches, offers, editorial and reactivation. Written, designed and scheduled by us, approved by you.",
    tags: ["Monthly send plan", "Copywriting", "Offer strategy", "Scheduling & QA", "SMS pairing"],
    background: "#FFD21F",
    color: INK,
    muted: "rgba(18,20,31,0.62)",
    navTheme: "light",
    image: {
      src: unsplash("1419242902214-272b3f66ee7a"),
      alt: "Starry night sky over a dark landscape",
      grayscale: false
    }
  },
  {
    id: "design",
    title: "Design & build",
    description: "On-brand templates that render everywhere, load fast and slay out of the promotions tab. Mobile first, because 70% of opens are.",
    tags: ["Template systems", "Mobile-first layouts", "Deliverability setup", "Accessible markup", "Brand guidelines"],
    background: "#171D4F",
    color: "#ffffff",
    muted: "rgba(255,255,255,0.7)",
    navTheme: "dark",
    image: {
      src: unsplash("1501612780327-45045538702b"),
      alt: "Band performing on a darkened concert stage",
      grayscale: true
    }
  },
  {
    id: "testing",
    title: "Testing & reporting",
    description: "Subject lines, offers, send times and flow timing tested against revenue per recipient. One report a month, in plain language.",
    tags: ["A/B test roadmap", "Revenue per recipient", "Flow timing tests", "List health tracking", "Monthly reporting"],
    background: "#0E1328",
    color: "#ffffff",
    muted: "rgba(255,255,255,0.7)",
    navTheme: "dark",
    image: {
      src: unsplash("1449505278894-297fdb3edbc1"),
      alt: "Brown leather boots on a wooden floor",
      grayscale: false
    }
  }
] as const;

type Work = (typeof WORKS)[number];

function TickerRow() {
  return (
    <div className="flex items-center gap-x-5 pr-10">
      {FLOW_TICKER.map((item, index) => (
        <span key={item} className="inline-flex items-center gap-x-5">
          {index > 0 && <span aria-hidden className="size-1.5 shrink-0 rotate-45" style={{ background: GOLD }} />}
          <span className="text-[11px] font-semibold tracking-[0.18em] text-[#8B90A0] uppercase">{item}</span>
        </span>
      ))}
    </div>
  );
}

function FlowTicker() {
  return (
    <div className="overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
      <div className="what-we-do-ticker flex w-max items-center">
        <TickerRow />
        <div aria-hidden>
          <TickerRow />
        </div>
      </div>
    </div>
  );
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  return (
    <article
      data-nav-theme={work.navTheme === "light" ? "light" : undefined}
      className="sticky top-0 grid h-dvh grid-rows-[auto_minmax(11rem,1fr)_auto] overflow-hidden rounded-t-[2.25rem] shadow-[0_-18px_50px_rgba(18,20,31,0.18)] md:grid-cols-2 md:grid-rows-[1fr_auto]"
      style={{ zIndex: index + 1, background: work.background, color: work.color }}
    >
      <h3
        className="self-start px-6 pt-20 font-extrabold tracking-[-0.045em] sm:px-10 md:col-start-1 md:row-start-1 md:px-12 md:pt-24 lg:px-14 lg:pt-28"
        style={{ fontSize: "clamp(2.35rem, 6vw, 5.25rem)", lineHeight: 0.95, maxWidth: "14ch" }}
      >
        {work.title}
      </h3>

      <div className="relative mx-5 min-h-0 overflow-hidden rounded-2xl bg-black/20 sm:mx-8 md:col-start-2 md:row-span-2 md:row-start-1 md:mx-0 md:rounded-none">
        <Image
          src={work.image.src}
          alt={work.image.alt}
          fill
          unoptimized
          sizes="(max-width: 767px) 100vw, 50vw"
          className={work.image.grayscale ? "object-cover grayscale" : "object-cover"}
          draggable={false}
        />
      </div>

      <div className="px-6 pt-4 pb-8 sm:px-10 md:col-start-1 md:row-start-2 md:px-12 md:pb-10 lg:px-14 lg:pb-12">
        <ul className="flex flex-col gap-1.5">
          {work.tags.map((tag) => (
            <li key={tag} className="text-[10px] font-semibold tracking-[0.16em] uppercase lg:whitespace-nowrap sm:text-[11px]" style={{ color: work.muted }}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative isolate" style={{ background: SURFACE }}>
      <header data-nav-theme="light" className="relative z-0 flex min-h-[46svh] flex-col pt-28 pb-6 sm:min-h-[50svh] sm:pt-32">
        <FlowTicker />
        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:py-12">
          <h2 className="text-center font-extrabold tracking-tighter text-[#111111]" style={{ fontSize: "clamp(3.25rem, 9vw, 6.75rem)", lineHeight: 0.95 }}>
            What we do
          </h2>
        </div>
      </header>

      {WORKS.map((work, index) => (
        <WorkCard key={work.id} work={work} index={index} />
      ))}
    </section>
  );
}
