"use client";

import Image from "next/image";
import Link from "next/link";
import { RefObject, useRef, useState } from "react";

type HeroBannerProps = {
  heroRef?: RefObject<HTMLElement | null>;
};

type HeroPanel = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: string;
  imagePosition?: string;
};

const heroPanels: HeroPanel[] = [
  {
    id: "lifestyle",
    title: "Build a Ritual Set",
    description: "Compose a daily ritual with scent, object, and atmosphere.",
    ctaLabel: "Explore Lifestyle",
    href: "/shop/lifestyle",
    image: "/images/Ritual set HP Hero 1.png",
    imagePosition: "object-[right_center]",
  },
  {
    id: "perfumes",
    title: "Find a Fragrance",
    description: "Discover scents for skin, textiles, home, and quieter routines.",
    ctaLabel: "Shop Perfumes",
    href: "/shop/perfumes",
    image: "/images/Perfume HP hero 2.png",
    imagePosition: "object-[right_center]",
  },
  {
    id: "dokra",
    title: "Pick your Dokra Brooch",
    description: "Wear Bengal craft as a meaningful everyday object.",
    ctaLabel: "Shop Dokra Ornaments",
    href: "/shop/dokra-ornaments",
    image: "/images/Dokra brooch HP Hero 3.png",
    imagePosition: "object-[right_center]",
  },
  {
    id: "seasonal-drops",
    title: "Smell the Red Oleanders",
    description: "Enter the seasonal world of Nerium and limited releases.",
    ctaLabel: "View Seasonal Drop",
    href: "/seasonaldrops",
    image: "/images/Red oleaners HP Hero 4.png",
    imagePosition: "object-[right_center]",
  },
];

const heroHeadlineColor = "#d8f0da";
const heroSubtextColor = "#c8e6cc";

export default function HeroBanner({ heroRef }: HeroBannerProps) {
  const localRef = useRef<HTMLElement | null>(null);
  const sectionRef = heroRef ?? localRef;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      ref={sectionRef}
      aria-label="Featured Seijaku pathways"
      className="relative isolate mt-[118px] min-h-[72svh] w-full overflow-hidden bg-[#352d27] pb-[40px] pt-[128px] sm:mt-[124px] sm:min-h-[75svh] sm:pb-[46px] sm:pt-[140px] md:mt-[128px] md:min-h-[78svh] md:pb-[54px] md:pt-[150px] lg:mt-[132px] lg:min-h-[84vh] lg:pb-[64px] lg:pt-[162px] xl:min-h-[88vh] xl:pb-[72px] xl:pt-[172px]"
    >
      <div aria-hidden className="absolute inset-0 z-0">
        {heroPanels.map((panel, index) => (
          <Image
            key={panel.id}
            src={panel.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={[
              "object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              panel.imagePosition ?? "object-center",
              activeIndex === index ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        ))}
      </div>

      <div aria-hidden className="absolute inset-0 z-[1] bg-[rgba(10,8,7,0.18)]" />
      <div
        aria-hidden
        className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(10,8,7,0.14)_0%,rgba(10,8,7,0.18)_22%,rgba(10,8,7,0.24)_56%,rgba(10,8,7,0.44)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 z-10 w-[84%] bg-[linear-gradient(90deg,rgba(9,8,7,0.82)_0%,rgba(9,8,7,0.72)_20%,rgba(9,8,7,0.56)_38%,rgba(9,8,7,0.32)_56%,rgba(9,8,7,0.12)_76%,rgba(9,8,7,0)_100%)] sm:w-[76%] lg:w-[60%] xl:w-[54%]"
      />
      <div
        aria-hidden
        className="absolute left-[20px] top-[118px] z-[15] h-[230px] w-[min(640px,calc(100%-40px))] rounded-[30px] bg-[radial-gradient(circle_at_18%_24%,rgba(10,8,7,0.62)_0%,rgba(10,8,7,0.48)_42%,rgba(10,8,7,0.2)_72%,rgba(10,8,7,0)_100%)] blur-2xl sm:left-[28px] sm:top-[126px] sm:h-[250px] sm:w-[min(680px,calc(100%-56px))] md:left-[36px] md:top-[136px] lg:left-[52px] lg:top-[148px] lg:h-[290px] lg:w-[620px] xl:left-[72px] xl:top-[160px] xl:w-[660px]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-[36%] bg-[linear-gradient(180deg,rgba(10,8,7,0)_0%,rgba(10,8,7,0.1)_20%,rgba(10,8,7,0.28)_68%,rgba(10,8,7,0.54)_100%)]"
      />

      <div className="page-container relative z-20 flex min-h-[calc(72svh-168px)] flex-col sm:min-h-[calc(75svh-178px)] md:min-h-[calc(78svh-192px)] lg:min-h-[calc(84vh-226px)] xl:min-h-[calc(88vh-244px)]">
        <div className="relative z-30 max-w-[700px] pt-2 sm:pt-4 md:pt-6 lg:pt-8 xl:pt-10">
          <div className="max-w-[620px] text-left">
            <h1
              className="font-serif text-[clamp(44px,6vw,80px)] font-medium leading-[0.94] tracking-[-0.035em] [text-wrap:balance] drop-shadow-[0_4px_18px_rgba(0,0,0,0.52)]"
              style={{ color: heroHeadlineColor }}
            >
              Perfume rituals for modern calm
            </h1>
            <p
              className="mt-6 max-w-[35rem] text-[15px] font-medium leading-[1.9] drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)] sm:text-[16px] sm:leading-[1.95]"
              style={{ color: heroSubtextColor }}
            >
              Signature scents paired with handcrafted Bengal forms - made to gift or keep.
            </p>
          </div>
        </div>

        <div className="mt-auto pt-14 sm:pt-16 lg:pt-20">
          <div className="relative z-20 overflow-hidden rounded-[26px] border border-[rgba(255,245,232,0.12)] bg-[linear-gradient(180deg,rgba(22,17,14,0.42)_0%,rgba(22,17,14,0.3)_100%)] shadow-[0_26px_60px_rgba(8,6,5,0.12)] backdrop-blur-[12px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_100%)]"
            />
            <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-5 sm:px-5 sm:py-5 lg:mx-0 lg:overflow-visible lg:px-6 lg:py-6">
              <div className="flex min-w-max gap-5 lg:min-w-0 lg:grid lg:grid-cols-4 lg:gap-8 xl:gap-10">
                {heroPanels.map((panel, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <article
                      key={panel.id}
                      className="group relative min-w-[276px] pt-5 text-left sm:min-w-[292px] lg:min-w-0"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocusCapture={() => setActiveIndex(index)}
                    >
                      <span
                        aria-hidden
                        className={[
                          "absolute left-0 top-0 h-px rounded-full bg-[#f0dfcb] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                          isActive ? "w-[4.5rem] opacity-100" : "w-10 opacity-55",
                        ].join(" ")}
                      />

                      <button
                        type="button"
                        aria-pressed={isActive}
                        aria-label={`Reveal ${panel.title}`}
                        onClick={() => setActiveIndex(index)}
                        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2e4cf] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
                      >
                        <span
                          className={[
                            "block font-serif text-[28px] leading-[1.06] tracking-[-0.022em] sm:text-[30px] lg:text-[31px] xl:text-[32px]",
                            isActive ? "text-[#fff4e7]" : "text-[#eadfce]",
                          ].join(" ")}
                        >
                          {panel.title}
                        </span>
                        <span
                          className={[
                            "mt-3.5 block max-w-[24ch] text-[14px] leading-[1.8] sm:text-[15px]",
                            isActive ? "text-[#f0e4d6]" : "text-[#d8ccbd]",
                          ].join(" ")}
                        >
                          {panel.description}
                        </span>
                      </button>

                      <div className="mt-6">
                        <Link
                          href={panel.href}
                          className={[
                            "inline-flex items-center gap-2 border-b pb-[3px] text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2e4cf] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
                            isActive
                              ? "border-[rgba(240,225,205,0.82)] text-[#f4e7d6]"
                              : "border-[rgba(240,225,205,0.44)] text-[#e6d8c8] hover:border-[rgba(240,225,205,0.72)] hover:text-[#f4e7d6]",
                          ].join(" ")}
                        >
                          <span>{panel.ctaLabel}</span>
                          <span aria-hidden className="translate-y-[-1px] text-[13px]">&rarr;</span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


