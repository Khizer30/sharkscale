"use client";
import services1 from "@shared/assets/services_1.webp";
import services2 from "@shared/assets/services_2.webp";
import services3 from "@shared/assets/services_3.webp";
import services4 from "@shared/assets/services_4.webp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CREAM = "#f5f0e8";
const WHITE = "#ffffff";

const services = [
  {
    id: "01",
    tag: "#service_01",
    image: services1 as StaticImageData,
    eyebrow: "Strategy",
    title: "Email Strategy",
    description: "We design data-driven campaigns that maximize opens, clicks, and sales.",
    bg: "radial-gradient(ellipse 120% 90% at 70% 110%, #ffd21f28 0%, transparent 55%), linear-gradient(160deg, #1b0a50 0%, #2e1478 45%, #24106a 100%)",
    accent: "#ffd21f"
  },
  {
    id: "02",
    tag: "#service_02",
    image: services2 as StaticImageData,
    eyebrow: "Creative",
    title: "Content Creation",
    description: "Compelling copy and visuals that resonate with your audience and drive action.",
    bg: "radial-gradient(ellipse 100% 80% at 20% 80%, #00e5ff20 0%, transparent 50%), linear-gradient(150deg, #170842 0%, #241064 40%, #2c1680 100%)",
    accent: "#00e5ff"
  },
  {
    id: "03",
    tag: "#service_03",
    image: services3 as StaticImageData,
    eyebrow: "Design",
    title: "Design & Templates",
    description: "Beautiful, on-brand email templates optimized for Klaviyo and conversions.",
    bg: "radial-gradient(ellipse 110% 80% at 80% 20%, #ffd21f22 0%, transparent 50%), linear-gradient(145deg, #24106a 0%, #4a1aa5 55%, #2a1275 100%)",
    accent: "#ffd21f"
  },
  {
    id: "04",
    tag: "#service_04",
    image: services4 as StaticImageData,
    eyebrow: "Retention",
    title: "Automation & Flows",
    description: "Smart workflows that nurture leads, recover carts, and boost lifetime value.",
    bg: "radial-gradient(ellipse 100% 90% at 30% 90%, #a78bfa25 0%, transparent 55%), linear-gradient(155deg, #170842 0%, #2b1470 50%, #3a1a90 100%)",
    accent: "#a78bfa"
  }
] as const;

type Service = (typeof services)[number];

function ServiceSlide({ service, index }: { service: Service; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bg = bgRef.current;
    if (!container || !bg) {
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        gsap.set(bg, { yPercent: self.progress * 12 });
      }
    });

    return () => trigger.kill();
  }, []);

  const handleTiltMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const tilt = tiltRef.current;
    if (!tilt) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(tilt, {
      rotateY: px * 16,
      rotateX: -py * 16,
      scale: 1.05,
      transformPerspective: 1000,
      transformOrigin: "center",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleTiltLeave = () => {
    const tilt = tiltRef.current;
    if (!tilt) {
      return;
    }

    gsap.to(tilt, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.7,
      ease: "power3.out"
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        zIndex: index + 1
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          top: "-10%",
          left: 0,
          width: "100%",
          height: "120%",
          background: service.bg,
          zIndex: 0
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 60% 40%, " + service.accent + "18 0%, transparent 65%)",
          zIndex: 1,
          pointerEvents: "none"
        }}
      />

      <div
        onMouseMove={handleTiltMove}
        onMouseLeave={handleTiltLeave}
        style={{
          position: "absolute",
          top: "50%",
          right: "clamp(2rem, 5vw, 5rem)",
          transform: "translateY(-50%)",
          width: "clamp(180px, 30vw, 360px)",
          height: "clamp(180px, 30vw, 360px)",
          perspective: "1000px",
          zIndex: 2
        }}
      >
        <div
          ref={tiltRef}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "1.25rem",
            overflow: "hidden",
            border: "1px solid " + service.accent + "40",
            boxShadow: "0 30px 80px -20px " + service.accent + "55",
            willChange: "transform"
          }}
        >
          <Image src={service.image} alt={service.title} fill placeholder="blur" style={{ objectFit: "cover" }} sizes="(max-width: 768px) 30vw, 360px" />
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(2rem, 5vw, 5rem)",
          paddingBottom: "clamp(3rem, 6vw, 6rem)",
          pointerEvents: "none"
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "clamp(2rem, 4vw, 3.5rem)",
            left: "clamp(2rem, 5vw, 5rem)",
            fontFamily: "Inter Variable, sans-serif",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: CREAM + "50",
            textTransform: "uppercase"
          }}
        >
          {service.tag}
        </span>

        <span
          style={{
            position: "absolute",
            top: "clamp(2rem, 4vw, 3.5rem)",
            right: "clamp(2rem, 5vw, 5rem)",
            fontFamily: "Inter Variable, sans-serif",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: CREAM + "35",
            textTransform: "uppercase"
          }}
        >
          {service.id} / {String(services.length).padStart(2, "0")}
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "56rem" }}>
          <span
            style={{
              display: "inline-flex",
              padding: "0.3rem 0.9rem",
              borderRadius: "9999px",
              border: "1px solid " + service.accent + "35",
              background: service.accent + "12",
              fontFamily: "Inter Variable, sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: service.accent,
              width: "fit-content"
            }}
          >
            {service.eyebrow}
          </span>

          <h2
            style={{
              fontFamily: "Inter Variable, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3rem, 9vw, 8rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: WHITE,
              margin: 0
            }}
          >
            {service.title}
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap"
            }}
          >
            <p
              style={{
                fontFamily: "Inter Variable, sans-serif",
                fontSize: "clamp(0.9rem, 1.4vw, 1.15rem)",
                lineHeight: 1.7,
                color: CREAM + "70",
                maxWidth: "36rem",
                margin: 0
              }}
            >
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesShowcase() {
  return (
    <section id="services" style={{ background: "#1b0a50" }}>
      <h1
        style={{
          position: "relative",
          zIndex: 10,
          fontFamily: "Inter Variable, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(4rem, 14vw, 13rem)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          textAlign: "center",
          textTransform: "uppercase",
          color: WHITE,
          margin: 0,
          padding: "clamp(1.5rem, 3vw, 2.5rem) 0",
          pointerEvents: "none",
          background: "#1b0a50"
        }}
      >
        Services
      </h1>

      <div style={{ marginTop: "-4rem" }}>
        {services.map((service, index) => (
          <ServiceSlide key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
