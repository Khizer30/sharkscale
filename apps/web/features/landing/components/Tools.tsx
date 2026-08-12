import googleAnalytics from "@shared/assets/google_analytics.webp";
import hubspot from "@shared/assets/hubspot.webp";
import klaviyo from "@shared/assets/klaviyo.webp";
import mailchimp from "@shared/assets/mailchimp.webp";
import notion from "@shared/assets/notion.webp";
import omnisend from "@shared/assets/omnisend.webp";
import shopify from "@shared/assets/shopify.webp";
import wooCommerce from "@shared/assets/woo_commerce.webp";
import zapier from "@shared/assets/zapier.webp";
import Image, { StaticImageData } from "next/image";

const tools: { name: string; src: StaticImageData; x: number; y: number; w: string; h: string; seed: number }[] = [
  { name: "Klaviyo", src: klaviyo, x: 4, y: 8, w: "clamp(80px,8vw,128px)", h: "clamp(80px,8vw,128px)", seed: 0 },
  { name: "Shopify", src: shopify, x: 30, y: 3, w: "clamp(72px,7.5vw,120px)", h: "clamp(72px,7.5vw,120px)", seed: 1 },
  { name: "Mailchimp", src: mailchimp, x: 62, y: 5, w: "clamp(76px,8vw,124px)", h: "clamp(76px,8vw,124px)", seed: 2 },
  { name: "HubSpot", src: hubspot, x: 83, y: 10, w: "clamp(150px,16vw,240px)", h: "clamp(50px,5.3vw,80px)", seed: 3 },
  { name: "WooCommerce", src: wooCommerce, x: 78, y: 48, w: "clamp(150px,16vw,240px)", h: "clamp(50px,5.3vw,80px)", seed: 4 },
  { name: "Omnisend", src: omnisend, x: 79, y: 78, w: "clamp(150px,16vw,240px)", h: "clamp(50px,5.3vw,80px)", seed: 5 },
  { name: "Zapier", src: zapier, x: 54, y: 84, w: "clamp(150px,16vw,240px)", h: "clamp(50px,5.3vw,80px)", seed: 6 },
  { name: "Google Analytics", src: googleAnalytics, x: 22, y: 83, w: "clamp(130px,13vw,200px)", h: "clamp(65px,6.5vw,100px)", seed: 7 },
  { name: "Notion", src: notion, x: 3, y: 65, w: "clamp(72px,7.5vw,120px)", h: "clamp(72px,7.5vw,120px)", seed: 8 }
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
  return (
    <section className="relative overflow-hidden" style={{ height: "80vh", minHeight: 560, background: "#08001e" }}>
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
      `}</style>

      {/* Scattered icons — absolutely positioned */}
      {tools.map((tool) => (
        <div
          key={tool.name}
          className="absolute"
          style={{
            left: `${tool.x}%`,
            top: `${tool.y}%`,
            width: tool.w,
            height: tool.h,
            ...floatStyle(tool.seed)
          }}
        >
          <div className="flex size-full items-center justify-center rounded-xl bg-white p-3 shadow-md">
            <Image src={tool.src} alt={tool.name} className="size-full object-contain opacity-80" draggable={false} />
          </div>
        </div>
      ))}

      {/* Center text */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h2 className="text-4xl font-extrabold uppercase tracking-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-amber-600 via-yellow-300 to-amber-200 bg-clip-text text-transparent">Tools We Work With</span>
        </h2>
        <p className="max-w-md text-lg text-tertiary-foreground/60 sm:text-xl">We integrate seamlessly with the platforms that power your business.</p>
      </div>
    </section>
  );
}
