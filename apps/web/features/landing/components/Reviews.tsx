"use client";
import { colors } from "@shared/constants/colors";
import { cn } from "@shared/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOLD = colors.secondary;
const INK = colors.tertiary;
const WHITE = colors.white;

const SCROLL_DURATION_S = 52;

type Review = {
  id: string;
  brand: string;
  author: string;
  quote: string;
};

const REVIEWS: Review[] = [
  {
    id: "herbellavita",
    brand: "HerbellaVita",
    author: "Laura M., Founder",
    quote:
      "We were getting sales, but email wasn’t doing enough. SharkScale rebuilt our flows, improved our campaigns, and started using our customer data properly. Now email drives 36%+ of our total revenue. We’re simply making more from the customers we already have."
  },
  {
    id: "sleep-on",
    brand: "Sleep-On",
    author: "Marcus Hill, Founder",
    quote:
      "Our biggest problem was repeat purchases. People bought once, then we barely spoke to them again. SharkScale built the post-purchase, replenishment, and winback journeys we were missing. Email finally feels like a retention channel, not just another place to send discounts."
  },
  {
    id: "xpand-laces",
    brand: "XPAND Laces",
    author: "Ryan Cooper, Co-Founder",
    quote:
      "We had a big customer list, but everyone was basically getting the same emails. SharkScale changed that. New customers, repeat buyers, VIPs, and inactive customers now get completely different journeys. The whole account feels smarter, and the numbers followed."
  },
  {
    id: "omg-commerce",
    brand: "OMG Commerce",
    author: "Jason Miller, Founder",
    quote:
      "I didn’t want another agency sending pretty emails and calling it strategy. SharkScale actually looks at AOV, LTV, segments, flow performance, and revenue per recipient. We finally know what’s working, what isn’t, and what we should test next."
  },
  {
    id: "noura-skin",
    brand: "Noura Skin",
    author: "Amelia Reed, Founder",
    quote:
      "We thought we needed more traffic. Turns out, we needed to do more with the traffic we already had. SharkScale found gaps across our welcome, cart, post-purchase, and winback flows. There was revenue sitting there, we just weren’t capturing it."
  },
  {
    id: "mellow-labs",
    brand: "Mellow Labs",
    author: "Chris Bennett, Co-Founder",
    quote:
      "Our Klaviyo had become a mess after years of adding random flows and segments. SharkScale cleaned everything up and gave every email a purpose. Now we have a system we actually understand, and customers get messages that make sense for where they are."
  },
  {
    id: "bare-theory",
    brand: "Bare Theory",
    author: "Sophie Grant, Founder",
    quote:
      "The designs were the first thing we noticed. They actually looked like our brand. But what impressed me more was the thinking behind them. Every campaign has an audience, an angle, and a reason to send. Nothing feels like filler anymore."
  },
  {
    id: "sunday-supply",
    brand: "Sunday Supply",
    author: "Daniel Brooks, Founder",
    quote:
      "We were way too dependent on paid ads. SharkScale helped us focus on the second and third purchase instead of constantly chasing the first. Better segmentation and retention flows have made our existing customer base much more valuable."
  },
  {
    id: "north-bloom",
    brand: "North & Bloom",
    author: "Emma Carter, Co-Founder",
    quote:
      "Before SharkScale, campaigns were basically: ‘What should we send this week?’ Now there’s an actual calendar built around customer behavior, products, segments, and business goals. It feels less like email marketing and more like a real growth channel."
  }
];

const COLUMN_REVIEWS: Review[][] = [
  [REVIEWS[0], REVIEWS[3], REVIEWS[6]].filter((r): r is Review => r !== undefined),
  [REVIEWS[1], REVIEWS[4], REVIEWS[7]].filter((r): r is Review => r !== undefined),
  [REVIEWS[2], REVIEWS[5], REVIEWS[8]].filter((r): r is Review => r !== undefined)
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex flex-none flex-col rounded-xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5">
      <p className="text-[13px] font-bold tracking-[-0.02em] text-white sm:text-sm">
        {review.brand}
        <span className="font-normal text-white/45"> — </span>
        <span className="font-semibold text-white/75">{review.author}</span>
      </p>
      <blockquote className="mt-3 text-[12.5px] leading-[1.55] text-white/82 sm:text-[13px]">&ldquo;{review.quote}&rdquo;</blockquote>
    </article>
  );
}

function ScrollingReviewColumn({ reviews, delayOffsetS }: { reviews: Review[]; delayOffsetS: number }) {
  const loop = [...reviews, ...reviews];

  return (
    <div className="relative min-h-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
      <div
        className="reviews-scroll-up flex flex-col gap-3 sm:gap-4"
        style={{ animationDelay: `${delayOffsetS}s` }}
      >
        {loop.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  const wrapperRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const sticky = stickyRef.current;
            if (!sticky) {
              return;
            }
            if (self.progress < 0.46) {
              sticky.setAttribute("data-nav-theme", "light");
            } else {
              sticky.removeAttribute("data-nav-theme");
            }
          }
        }
      });

      if (headingRef.current) {
        tl.fromTo(headingRef.current, { scale: 1, y: 0 }, { scale: 0.4, y: -24, ease: "none", duration: 0.52, transformOrigin: "center top" }, 0.04);
        tl.fromTo(headingRef.current, { color: INK }, { color: WHITE, ease: "none", duration: 0.26 }, 0.34);
      }

      if (bgRef.current) {
        tl.fromTo(bgRef.current, { backgroundColor: GOLD }, { backgroundColor: INK, ease: "none", duration: 0.32 }, 0.3);
      }

      if (reviewsRef.current) {
        tl.fromTo(reviewsRef.current, { opacity: 0, y: 110 }, { opacity: 1, y: 0, ease: "none", duration: 0.26 }, 0.44);
      }

      tl.to({}, { duration: 0.01 }, 1);
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={wrapperRef} id="reviews" className="relative h-[320vh] w-full">
      <style>{`
        @keyframes reviews-scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .reviews-scroll-up {
          animation: reviews-scroll-up ${SCROLL_DURATION_S}s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .reviews-scroll-up {
            animation: none;
          }
        }
      `}</style>

      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <div ref={bgRef} className="absolute inset-0" style={{ backgroundColor: INK }} />

        <div className="absolute inset-x-0 top-24 bottom-0 flex items-start justify-center px-6 pt-4 sm:top-28 sm:px-10 sm:pt-6">
          <div ref={headingRef} className="w-full text-center" style={{ color: WHITE, willChange: "transform" }}>
            <h2 className="text-[12.4vw] leading-[0.9] font-black tracking-tighter uppercase motion-reduce:text-[6.5vw]">Reviews</h2>
          </div>
        </div>

        <div
          ref={reviewsRef}
          className={cn(
            "absolute inset-x-0 bottom-0 grid h-[min(46vh,420px)] grid-cols-3 items-stretch gap-2 px-4 pb-6 sm:gap-4 sm:px-8 sm:pb-8"
          )}
          style={{ willChange: "transform, opacity" }}
        >
          {COLUMN_REVIEWS.map((columnReviews, index) => (
            <ScrollingReviewColumn key={index} reviews={columnReviews} delayOffsetS={index * -17} />
          ))}
        </div>
      </div>
    </section>
  );
}
