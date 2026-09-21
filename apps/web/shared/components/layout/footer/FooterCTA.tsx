"use client";
import { colors } from "@shared/constants/colors";

export default function FooterCTA() {
  return (
    <div className="relative">
      <div className="max-w-[60ch]">
        <p className="text-[clamp(21px,2.5vw,34px)] leading-[1.28] tracking-[-0.03em]" style={{ color: colors.tertiary }}>
          <span style={{ color: `${colors.tertiary}73` }}>Brands that work with SharkScale</span> send fewer campaigns and make more money from them.
        </p>

        <div className="mt-11 flex flex-wrap gap-11 sm:gap-20">
          <div>
            <div className="text-[clamp(38px,4.4vw,58px)] leading-none font-extrabold tracking-[-0.04em]" style={{ color: colors.tertiary }}>
              3.4x
            </div>
            <div className="mt-2 text-sm" style={{ color: `${colors.tertiary}99` }}>
              Median lift in email revenue
            </div>
          </div>
          <div>
            <div className="text-[clamp(38px,4.4vw,58px)] leading-none font-extrabold tracking-[-0.04em]" style={{ color: colors.tertiary }}>
              14 days
            </div>
            <div className="mt-2 text-sm" style={{ color: `${colors.tertiary}99` }}>
              To the first live flow
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[clamp(90px,13vw,180px)] text-center">
        <h2 className="text-[clamp(30px,4vw,56px)] leading-[1.1] font-bold tracking-[-0.035em] text-white">
          Ready whenever
          <br />
          your list is.
        </h2>
        <a
          href="#contactUs"
          className="mt-8 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-extrabold tracking-[0.06em] uppercase transition-transform hover:scale-105"
          style={{ backgroundColor: colors.secondary, color: colors.tertiary }}
        >
          Book a teardown
        </a>
      </div>
    </div>
  );
}
