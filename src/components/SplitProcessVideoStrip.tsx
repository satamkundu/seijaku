"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProcessPanel = {
  title: string;
  posterSrc: string;
  videoSrc?: string;
  alt: string;
  objectPosition?: string;
};

const processPanels: ProcessPanel[] = [
  {
    title: "Perfume blending in-office",
    posterSrc: "/images/hero banner HP 1.png",
    alt: "Placeholder for Seijaku perfume blending process video in-office.",
    objectPosition: "object-[center_42%]",
  },
  {
    title: "Clay painting and finishing in-office",
    posterSrc: "/images/Seasonal Drop Listen before shaping.jpg",
    alt: "Placeholder for Seijaku clay painting and finishing process video in-office.",
    objectPosition: "object-[center_46%]",
  },
];

export default function SplitProcessVideoStrip() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <section aria-labelledby="process-strip-title" className="bg-[#ece5da] py-6 sm:py-8 lg:py-10">
      <div className="relative min-h-[360px] overflow-hidden sm:min-h-[420px] lg:min-h-[520px]">
        <div className="grid min-h-[360px] grid-cols-2 sm:min-h-[420px] lg:min-h-[520px]">
          {processPanels.map((panel) => (
            <div key={panel.title} className="relative isolate overflow-hidden">
              {prefersReducedMotion || !panel.videoSrc ? (
                <div className="absolute inset-0">
                  <Image
                    src={panel.posterSrc}
                    alt={panel.alt}
                    fill
                    priority={panel.title === processPanels[0].title}
                    sizes="50vw"
                    className={`object-cover ${panel.objectPosition ?? "object-center"}`}
                  />
                </div>
              ) : (
                <video
                  className={`absolute inset-0 h-full w-full object-cover ${panel.objectPosition ?? "object-center"}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={panel.posterSrc}
                  aria-label={panel.alt}
                >
                  <source src={panel.videoSrc} />
                </video>
              )}

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,16,0.10)_0%,rgba(20,18,16,0.24)_100%)]" />
              <span className="sr-only">{panel.title}</span>
            </div>
          ))}
        </div>

        <div aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,16,14,0.12)_0%,rgba(18,16,14,0.34)_62%,rgba(18,16,14,0.48)_100%)]" />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center sm:px-10">
          <div className="max-w-[34rem] text-[#f6efe6]">
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/80 sm:text-[11px]">IN THE MAKING</p>
            <h2 id="process-strip-title" className="mt-4 font-serif text-[clamp(30px,4vw,52px)] leading-[1.04] tracking-[-0.03em] text-white">
              Rituals take form
            </h2>
            <p className="mx-auto mt-4 max-w-[30ch] text-[15px] leading-[1.82] text-white/84 sm:text-[16px]">
              Scent composed by hand. Clay finished in stillness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
