"use client";

import Image from "next/image";
import { useState } from "react";

const heroCopy =
  "Seijaku: A multisensory ritual-based cultural house shaped by season, material memory, and the quiet forms that help everyday life return to intention.";

const imageSrc = "/images/our-story-hero-placeholder.jpg";

export default function OurStoryHero() {
  const [showImage, setShowImage] = useState(true);

  return (
    <section
      aria-labelledby="our-story-hero-title"
      className="bg-[#f3eee5] px-6 pb-10 pt-24 sm:px-8 sm:pb-12 sm:pt-28 lg:px-10 lg:pb-14 lg:pt-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="overflow-hidden border border-[#d9d0c2] bg-[#f7f2e9] shadow-[0_1px_0_rgba(255,255,255,0.55)_inset]">
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            <div className="flex flex-col justify-between px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-11">
              <div className="max-w-[36rem]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#7b7164] sm:text-[12px]">
                  Our Story
                </p>
                <div className="mt-5 h-px w-14 bg-[#cfc5b7]" />
                <h1
                  id="our-story-hero-title"
                  className="mt-6 font-serif text-[clamp(1.55rem,2.5vw,2.3rem)] font-normal leading-[1.28] tracking-[-0.025em] text-[#1d1a17]"
                >
                  {heroCopy}
                </h1>
              </div>

              <p className="mt-8 max-w-[30rem] text-[13px] leading-[1.8] tracking-[0.02em] text-[#6a6156] sm:mt-10 sm:text-[14px]">
                Season, atmosphere, and material restraint shape the page opening.
              </p>
            </div>

            <div className="border-t border-[#d9d0c2] lg:border-l lg:border-t-0">
              <div className="relative h-full min-h-[240px] overflow-hidden sm:min-h-[280px] lg:min-h-[100%]">
                <div className="absolute inset-0 bg-[#d8d0c4]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(255,255,255,0.58),transparent_34%),radial-gradient(circle_at_74%_36%,rgba(186,170,149,0.34),transparent_42%),linear-gradient(135deg,#d6cec1_0%,#beb19f_48%,#8e8173_100%)]" />
                <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent)]" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(34,29,24,0.2))]" />
                <div className="absolute inset-y-0 left-[12%] w-px bg-[rgba(255,255,255,0.2)]" />

                {showImage ? (
                  <>
                    <Image
                      src={imageSrc}
                      alt="Atmospheric still life evoking Seijaku's quiet, material sensibility"
                      fill
                      priority
                      sizes="(min-width: 1024px) 36vw, 100vw"
                      className="object-cover object-center"
                      onError={() => setShowImage(false)}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,14,0.08)_0%,rgba(20,17,14,0.16)_38%,rgba(20,17,14,0.3)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(255,255,255,0.12),transparent_26%)]" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,29,24,0.04)_0%,rgba(34,29,24,0.12)_100%)]" />
                    <div className="absolute inset-x-[12%] top-[18%] h-[1px] bg-[rgba(255,255,255,0.28)]" />
                    <div className="absolute bottom-[16%] right-[14%] h-[34%] w-[38%] border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.05)]" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
