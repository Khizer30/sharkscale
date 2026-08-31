"use client";
import work1 from "@shared/assets/work_1.webp";
import work2 from "@shared/assets/work_2.webp";
import work3 from "@shared/assets/work_3.webp";
import { ArrowRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";

const TERTIARY = "#1b0a50";

type Project = {
  title: string;
  tagline: string;
  image: StaticImageData;
  accent: string;
};

const projects: Project[] = [
  { title: "E-Commerce Promotions", tagline: "Revenue & Retention", image: work1, accent: "#d97706" },
  { title: "Newsletter Management", tagline: "Audience Loyalty", image: work2, accent: "#7c3aed" },
  { title: "Analytics & Optimization", tagline: "A/B Testing & Insights", image: work3, accent: "#0891b2" }
] as const;

export default function LatestWorks() {
  const [active, setActive] = useState<number | null>(null);
  const [cardTop, setCardTop] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleEnter = (index: number, event: React.SyntheticEvent<HTMLElement>) => {
    setActive(index);
    const preview = previewRef.current;
    if (preview) {
      const rowRect = event.currentTarget.getBoundingClientRect();
      const previewRect = preview.getBoundingClientRect();
      setCardTop(rowRect.top - previewRect.top + rowRect.height / 2);
    }
  };

  return (
    <section id="ourWork" data-nav-theme="light" style={{ background: "#ffffff", padding: "clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem)" }}>
      <div style={{ margin: "0 auto", maxWidth: "80rem" }}>
        <div style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: TERTIARY + "80"
            }}
          >
            Selected Projects
          </span>
          <h2
            style={{
              marginTop: "0.75rem",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: TERTIARY
            }}
          >
            Latest Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(2rem, 5vw, 5rem)", alignItems: "stretch" }}>
          <ul onMouseLeave={() => setActive(null)} style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {projects.map((project, index) => {
              const isActive = index === active;
              return (
                <li key={project.title} onMouseEnter={(event) => handleEnter(index, event)} onFocus={(event) => handleEnter(index, event)}>
                  <a
                    href="#"
                    tabIndex={0}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
                      padding: "clamp(1.5rem, 3vw, 2.5rem) 0.5rem",
                      textDecoration: "none",
                      transition: "padding-left 0.4s ease, opacity 0.4s ease",
                      paddingLeft: isActive ? "3rem" : "0.5rem",
                      opacity: active === null || isActive ? 1 : 0.35
                    }}
                  >
                    <ArrowRight
                      aria-hidden
                      style={{
                        width: "clamp(1.75rem, 3vw, 2.5rem)",
                        height: "clamp(1.75rem, 3vw, 2.5rem)",
                        flexShrink: 0,
                        color: project.accent,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateX(0)" : "translateX(-0.75rem)",
                        transition: "transform 0.4s ease, opacity 0.4s ease"
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        color: project.accent,
                        minWidth: "2rem"
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      <span
                        style={{
                          fontSize: "clamp(1.6rem, 4vw, 3rem)",
                          fontWeight: 800,
                          lineHeight: 1,
                          letterSpacing: "-0.03em",
                          color: TERTIARY
                        }}
                      >
                        {project.title}
                      </span>
                      <span
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: TERTIARY + "80"
                        }}
                      >
                        {project.tagline}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Preview area — empty by default, shows a card aligned to the hovered row */}
          <div
            ref={previewRef}
            aria-hidden
            className="relative hidden md:block"
            style={{
              minHeight: "clamp(340px, 40vw, 560px)"
            }}
          >
            {projects.map((project, index) => {
              const isActive = index === active;
              const tilt = index % 2 === 0 ? 6 : -6;
              return (
                <div
                  key={project.title}
                  style={{
                    position: "absolute",
                    top: isActive ? cardTop + "px" : "50%",
                    left: "50%",
                    width: "clamp(340px, 36vw, 520px)",
                    aspectRatio: "4 / 3",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    boxShadow: "0 30px 70px -30px rgba(27,10,80,0.5)",
                    transformOrigin: "center",
                    transform: "translate(-50%, -50%) rotate(" + (isActive ? tilt : tilt * 0.4) + "deg) scale(" + (isActive ? 1 : 0.9) + ")",
                    opacity: isActive ? 1 : 0,
                    transition: "top 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
                    pointerEvents: "none"
                  }}
                >
                  <Image src={project.image} alt="" fill sizes="520px" style={{ objectFit: "cover" }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
