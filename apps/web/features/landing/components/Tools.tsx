"use client";
import googleAnalytics from "@shared/assets/google_analytics.webp";
import hubspot from "@shared/assets/hubspot.webp";
import klaviyo from "@shared/assets/klaviyo.webp";
import mailchimp from "@shared/assets/mailchimp.webp";
import notion from "@shared/assets/notion.webp";
import omnisend from "@shared/assets/omnisend.webp";
import shopify from "@shared/assets/shopify.webp";
import wooCommerce from "@shared/assets/woo_commerce.webp";
import zapier from "@shared/assets/zapier.webp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Tool = {
  name: string;
  src: StaticImageData;
  x: number;
  y: number;
  w: string;
  h: string;
  seed: number;
  // Mobile-specific placement/size so wide logos don't overflow narrow viewports.
  mx: number;
  my: number;
  mw: string;
  mh: string;
};

const tools: Tool[] = [
  {
    name: "Klaviyo",
    src: klaviyo,
    x: 4,
    y: 8,
    w: "clamp(96px,10vw,156px)",
    h: "clamp(96px,10vw,156px)",
    seed: 0,
    mx: 3,
    my: 5,
    mw: "clamp(60px,17vw,86px)",
    mh: "clamp(60px,17vw,86px)"
  },
  {
    name: "Shopify",
    src: shopify,
    x: 30,
    y: 3,
    w: "clamp(72px,7.5vw,120px)",
    h: "clamp(72px,7.5vw,120px)",
    seed: 1,
    mx: 42,
    my: 3,
    mw: "clamp(60px,17vw,86px)",
    mh: "clamp(60px,17vw,86px)"
  },
  {
    name: "Mailchimp",
    src: mailchimp,
    x: 62,
    y: 5,
    w: "clamp(92px,9.5vw,144px)",
    h: "clamp(92px,9.5vw,144px)",
    seed: 2,
    mx: 72,
    my: 7,
    mw: "clamp(60px,17vw,86px)",
    mh: "clamp(60px,17vw,86px)"
  },
  {
    name: "HubSpot",
    src: hubspot,
    x: 83,
    y: 10,
    w: "clamp(150px,16vw,240px)",
    h: "clamp(50px,5.3vw,80px)",
    seed: 3,
    mx: 5,
    my: 21,
    mw: "clamp(112px,30vw,152px)",
    mh: "clamp(38px,10vw,50px)"
  },
  {
    name: "WooCommerce",
    src: wooCommerce,
    x: 78,
    y: 48,
    w: "clamp(150px,16vw,240px)",
    h: "clamp(50px,5.3vw,80px)",
    seed: 4,
    mx: 55,
    my: 20,
    mw: "clamp(112px,30vw,152px)",
    mh: "clamp(38px,10vw,50px)"
  },
  {
    name: "Omnisend",
    src: omnisend,
    x: 79,
    y: 78,
    w: "clamp(150px,16vw,240px)",
    h: "clamp(50px,5.3vw,80px)",
    seed: 5,
    mx: 6,
    my: 78,
    mw: "clamp(112px,30vw,152px)",
    mh: "clamp(38px,10vw,50px)"
  },
  {
    name: "Zapier",
    src: zapier,
    x: 54,
    y: 84,
    w: "clamp(150px,16vw,240px)",
    h: "clamp(50px,5.3vw,80px)",
    seed: 6,
    mx: 52,
    my: 82,
    mw: "clamp(112px,30vw,152px)",
    mh: "clamp(38px,10vw,50px)"
  },
  {
    name: "Google Analytics",
    src: googleAnalytics,
    x: 22,
    y: 83,
    w: "clamp(150px,15vw,224px)",
    h: "clamp(75px,7.5vw,112px)",
    seed: 7,
    mx: 30,
    my: 50,
    mw: "clamp(96px,26vw,132px)",
    mh: "clamp(48px,13vw,66px)"
  },
  {
    name: "Notion",
    src: notion,
    x: 3,
    y: 65,
    w: "clamp(88px,9vw,140px)",
    h: "clamp(88px,9vw,140px)",
    seed: 8,
    mx: 73,
    my: 58,
    mw: "clamp(60px,17vw,86px)",
    mh: "clamp(60px,17vw,86px)"
  }
];

function seededVal(seed: number, index: number): number {
  const x = Math.sin(seed * 9301 + index * 49297 + 233) * 1000;
  return x - Math.floor(x);
}

function floatStyle(seed: number): React.CSSProperties {
  const duration = (3 + seededVal(seed, 0) * 2).toFixed(2);
  const delay = (seededVal(seed, 1) * 2.5).toFixed(2);
  const variant = seed % 4;
  return { animation: `tools-float-${variant} ${duration}s ${delay}s ease-in-out infinite` };
}

export default function Tools() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    const items = itemRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!section || !layer || items.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      const layerRect = layer.getBoundingClientRect();
      const cx = layerRect.left + layerRect.width / 2;
      const cy = layerRect.top + layerRect.height / 2;

      // Start each icon collapsed at the center of the section.
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        gsap.set(el, {
          x: cx - (r.left + r.width / 2),
          y: cy - (r.top + r.height / 2),
          scale: 0,
          opacity: 0,
          rotate: gsap.utils.random(-45, 45)
        });
      });

      gsap.set([badgeRef.current, headingRef.current].filter(Boolean), { y: 32, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 68%",
          once: true
        }
      });

      tl.to(items, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 0.9,
        ease: "back.out(1.4)",
        stagger: { each: 0.06, from: "random" }
      });

      tl.to(
        [badgeRef.current, headingRef.current].filter(Boolean),
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out"
        },
        "-=0.35"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-nav-theme="light" className="relative overflow-hidden" style={{ height: "80vh", minHeight: 560, background: "#ffffff" }}>
      <style>{`
        @keyframes tools-float-0 {
          0%,100% { transform: translate(0,0) rotate(0deg); }
          50%      { transform: translate(3px,-5px) rotate(2deg); }
        }
        @keyframes tools-float-1 {
          0%,100% { transform: translate(0,0) rotate(0deg); }
          33%      { transform: translate(-4px,3px) rotate(-2deg); }
          66%      { transform: translate(3px,-3px) rotate(1.5deg); }
        }
        @keyframes tools-float-2 {
          0%,100% { transform: translate(0,0) rotate(0deg); }
          40%      { transform: translate(4px,4px) rotate(-1.5deg); }
          80%      { transform: translate(-3px,-4px) rotate(2deg); }
        }
        @keyframes tools-float-3 {
          0%,100% { transform: translate(0,0) rotate(0deg); }
          25%      { transform: translate(-3px,-5px) rotate(1deg); }
          75%      { transform: translate(4px,3px) rotate(-1.5deg); }
        }
        .tools-item {
          left: var(--x);
          top: var(--y);
          width: var(--w);
          height: var(--h);
        }
        @media (max-width: 640px) {
          .tools-item {
            left: var(--mx);
            top: var(--my);
            width: var(--mw);
            height: var(--mh);
          }
        }
      `}</style>

      {/* Scattered icons — absolutely positioned */}
      <div ref={layerRef} className="absolute inset-0">
        {tools.map((tool, index) => (
          <div
            key={tool.name}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="tools-item absolute"
            data-cursor-text={tool.name}
            style={
              {
                "--x": `${tool.x}%`,
                "--y": `${tool.y}%`,
                "--w": tool.w,
                "--h": tool.h,
                "--mx": `${tool.mx}%`,
                "--my": `${tool.my}%`,
                "--mw": tool.mw,
                "--mh": tool.mh,
                willChange: "transform"
              } as React.CSSProperties
            }
          >
            <div style={floatStyle(tool.seed)} className="size-full">
              <div className="flex size-full items-center justify-center p-3">
                <Image src={tool.src} alt={tool.name} className="size-full object-contain" draggable={false} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Center text */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span
          ref={badgeRef}
          className="inline-block rounded-full border px-3.5 py-1.5 text-[12.5px] font-bold tracking-[0.02em]"
          style={{ color: "#123CE8", borderColor: "#123CE859" }}
        >
          Integrations
        </span>
        <h2 ref={headingRef} className="mt-4 text-center text-[clamp(32px,4.4vw,62px)] leading-[1.04] font-extrabold uppercase tracking-tight">
          <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-blue-950 bg-clip-text text-transparent">
            The Tools Behind
            <br />
            the Growth
          </span>
        </h2>
      </div>
    </section>
  );
}
