"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { RefObject, useRef } from "react";

type HeroBannerProps = {
  heroRef?: RefObject<HTMLElement | null>;
};

export default function HeroBanner({ heroRef }: HeroBannerProps) {
  const localRef = useRef<HTMLElement | null>(null);
  const activeRef = heroRef ?? localRef;
  const { scrollYProgress } = useScroll({
    target: activeRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.015, 1.04]);
  const headlineY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.5]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.26, 0.42]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroFilter = useMotionTemplate`blur(${heroBlur}px)`;

  return (
    <section
      ref={activeRef}
      className="relative mt-[72px] flex h-[52vh] min-h-[440px] w-screen items-center overflow-hidden pb-[120px] sm:mt-[76px] sm:h-[56vh] sm:min-h-[500px] md:h-[min(62vh,700px)] md:min-h-[560px]"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY, scale: imageScale, filter: heroFilter }}
      >
        <motion.div className="relative h-full w-full" style={{ animation: "seijaku-kenburns 32s ease-out infinite" }}>
          <Image
            src="/images/hero banner Home.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_42%]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(to bottom, rgba(15,18,15,0.18) 0%, rgba(15,18,15,0.26) 38%, rgba(15,18,15,0.5) 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 58% 38%, rgba(255,255,255,0.08), transparent 56%), linear-gradient(90deg, rgba(8,10,9,0.3) 0%, rgba(8,10,9,0.08) 40%, rgba(8,10,9,0.2) 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 68% 70%, rgba(255,236,187,0.34), rgba(255,236,187,0.11) 28%, transparent 52%)",
          animation: "seijaku-diffuser-glow 6.5s ease-in-out infinite",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 63% 79%, rgba(250,214,138,0.32), rgba(250,214,138,0.12) 24%, transparent 46%)",
          animation: "seijaku-oil-glimmer 7.8s ease-in-out infinite",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.35)_0.55px,transparent_0.55px)] [background-size:3px_3px]"
      />

      <div className="relative z-[3] flex w-full items-center justify-center md:justify-start">
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="page-container max-w-none text-center md:text-left"
        >
          <div className="max-w-[580px] md:max-w-[520px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
              className="inline-flex"
            >
              <Image
                src="/images/Seijaku%20logo_white.png"
                alt="Seijaku"
                width={132}
                height={26}
                priority
                className="h-auto w-[100px] sm:w-[114px] md:w-[122px]"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="mt-2 font-serif text-[clamp(20px,2vw,28px)] font-medium leading-[1.12] tracking-[0.02em]"
              style={{ color: "#F4F2ED" }}
            >
              Multisensory Rituals for Urban Calm
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="mt-3 max-w-[420px] text-[15px] leading-[1.55] md:mx-0"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Crafted in Culture, Guided by Season
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.38 }}
              className="mt-4 max-w-[520px] text-[15px] font-medium leading-[1.65] sm:mt-5 md:hidden"
              style={{ color: "#F4F2ED", textShadow: "0 1px 18px rgba(0,0,0,0.32)" }}
            >
              Design-led scent, tactile, and visual objects inspired by literature - paired with research-informed
              wellness rituals and cultural immersion experiences rooted in Bengal.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
              className="mt-6 flex flex-col gap-5 sm:mx-auto sm:max-w-max sm:flex-row sm:gap-8 md:hidden"
            >
              <Link
                href="/experiences"
                className="group inline-flex flex-col items-center text-center hover:-translate-y-0.5 md:items-start md:text-left"
              >
                <span className="flex items-center gap-3 whitespace-nowrap text-[15px] font-bold uppercase tracking-[0.06em] text-[#f0ece4] group-hover:text-[#d7be87]">
                  <span>Celebrate Experience</span>
                  <span aria-hidden className="text-[16px] leading-none">
                    &rarr;
                  </span>
                </span>
                <span className="mt-1 text-[12px] font-bold uppercase tracking-[0.16em] text-[#ddd3bf] group-hover:text-[#d7be87]">
                  Immersion and Artefacts
                </span>
              </Link>
              <Link
                href="/lifestyle"
                className="group inline-flex flex-col items-center text-center hover:-translate-y-0.5 md:items-start md:text-left"
              >
                <span className="flex items-center gap-3 text-[15px] font-bold uppercase tracking-[0.06em] text-[#f0ece4] group-hover:text-[#2e4a36]">
                  <span>Curate Lifestyle</span>
                  <span aria-hidden className="text-[16px] leading-none">
                    &rarr;
                  </span>
                </span>
                <span className="mt-1 text-[12px] font-bold uppercase tracking-[0.16em] text-[#ddd3bf] group-hover:text-[#2e4a36]">
                  Habits and Objects
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
        className="absolute right-[max(20px,4.5vw)] top-[50%] z-[4] hidden max-w-[460px] -translate-y-1/2 flex-col items-start gap-6 text-left md:flex xl:right-[max(28px,5.5vw)]"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.38 }}
          className="hidden max-w-[380px] text-[15px] font-medium leading-[1.65] md:block"
          style={{ color: "#FFF8EE", textShadow: "0 2px 22px rgba(0,0,0,0.46)" }}
        >
          Design-led scent, tactile, and visual objects inspired by literature - paired with research-informed wellness
          rituals and cultural immersion experiences rooted in Bengal.
        </motion.p>
        <div className="flex flex-row items-end gap-7 text-left">
        <Link
          href="/experiences"
          className="group inline-flex flex-col items-start text-left hover:-translate-y-0.5"
        >
          <span className="flex items-center gap-3 whitespace-nowrap text-[15px] font-bold uppercase tracking-[0.06em] text-[#fff8ee] group-hover:text-[#ecd39b]">
            <span>Celebrate Experience</span>
            <span aria-hidden className="text-[16px] leading-none">
              &rarr;
            </span>
          </span>
          <span className="mt-1 text-[12px] font-bold uppercase tracking-[0.16em] text-[#f1e2c1] group-hover:text-[#ecd39b]">
            Immersion and Artefacts
          </span>
        </Link>
        <Link
          href="/lifestyle"
          className="group inline-flex flex-col items-start text-left hover:-translate-y-0.5"
        >
          <span className="flex items-center gap-3 whitespace-nowrap text-[15px] font-bold uppercase tracking-[0.06em] text-[#fff8ee] group-hover:text-[#d7e5cf]">
            <span>Curate Lifestyle</span>
            <span aria-hidden className="text-[16px] leading-none">
              &rarr;
            </span>
          </span>
          <span className="mt-1 text-[12px] font-bold uppercase tracking-[0.16em] text-[#e4eadf] group-hover:text-[#d7e5cf]">
            Habits and Objects
          </span>
        </Link>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes seijaku-kenburns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.07);
          }
        }

        @keyframes seijaku-diffuser-glow {
          0% {
            opacity: 0.54;
            transform: scale(1) translate3d(0, 0, 0);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.06) translate3d(0.4%, -0.6%, 0);
          }
          100% {
            opacity: 0.54;
            transform: scale(1) translate3d(0, 0, 0);
          }
        }

        @keyframes seijaku-oil-glimmer {
          0% {
            opacity: 0.46;
            transform: scale(1);
          }
          50% {
            opacity: 0.74;
            transform: scale(1.08);
          }
          100% {
            opacity: 0.46;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
