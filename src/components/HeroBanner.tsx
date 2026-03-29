"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { RefObject, useRef } from "react";

type HeroBannerProps = {
  heroRef?: RefObject<HTMLElement | null>;
};

const heroCopy = {
  headline: "Perfume Rituals for Modern Calm",
  subline: "For body and home",
  supporting: "Signature scents paired with handcrafted Bengal forms \u2014 made to gift or keep",
} as const;

export default function HeroBanner({ heroRef }: HeroBannerProps) {
  const localRef = useRef<HTMLElement | null>(null);
  const activeRef = heroRef ?? localRef;
  const { scrollYProgress } = useScroll({
    target: activeRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-3.5%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.045]);
  const headlineY = useTransform(scrollYProgress, [0, 0.4], [0, -36]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.5]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.3]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], [0, 0.6]);
  const heroFilter = useMotionTemplate`blur(${heroBlur}px)`;

  return (
    <section
      ref={activeRef}
      className="relative mt-[116px] flex h-[60vh] min-h-[520px] w-screen items-start overflow-hidden bg-[#665a4d] pb-[40px] pt-[76px] sm:mt-[120px] sm:h-[64vh] sm:min-h-[580px] sm:pb-[44px] sm:pt-[82px] md:mt-[124px] md:h-[68vh] md:min-h-[620px] md:pb-[46px] md:pt-[74px] lg:h-[74vh] lg:min-h-[700px] lg:pb-[52px] lg:pt-[88px] xl:h-[80vh] xl:min-h-[780px] xl:pb-[58px] xl:pt-[96px]"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY, scale: imageScale, filter: heroFilter }}
      >
        <motion.div className="relative h-full w-full" style={{ animation: "seijaku-kenburns 32s ease-out infinite" }}>
          <Image
            src="/images/Hero Banner HP_Kolkata summer 3.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[74%_58%] brightness-[0.92] contrast-[1.04] saturate-[1.01] sm:object-[72%_56%] md:object-[70%_54%] lg:object-[68%_52%] xl:object-[66%_50%]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(90deg, rgba(16,13,11,0.46) 0%, rgba(16,13,11,0.24) 24%, rgba(16,13,11,0.06) 52%, rgba(16,13,11,0.02) 100%), linear-gradient(to bottom, rgba(16,13,11,0.05) 0%, rgba(16,13,11,0.08) 40%, rgba(16,13,11,0.12) 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 54% 28%, rgba(255,255,255,0.018), transparent 46%), linear-gradient(90deg, rgba(10,9,8,0.18) 0%, rgba(10,9,8,0.06) 32%, rgba(10,9,8,0.01) 56%, rgba(10,9,8,0.03) 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 70% 74%, rgba(214,181,118,0.08), rgba(214,181,118,0.02) 24%, transparent 48%)",
          animation: "seijaku-diffuser-glow 6.5s ease-in-out infinite",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 64% 80%, rgba(221,188,124,0.05), rgba(221,188,124,0.015) 24%, transparent 46%)",
          animation: "seijaku-oil-glimmer 7.8s ease-in-out infinite",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.35)_0.55px,transparent_0.55px)] [background-size:3px_3px]"
      />

      <div className="relative z-[3] flex w-full items-start justify-start">
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="page-container max-w-none pt-4 text-left sm:pt-5 md:pt-7 lg:pt-8 xl:pt-10"
        >
          <div className="max-w-[420px] sm:max-w-[470px] md:max-w-[430px] lg:max-w-[470px] xl:max-w-[520px]">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.18 }}
              className="mt-0 max-w-[12ch] text-[clamp(28px,3vw,44px)] font-medium leading-[1.06] tracking-[-0.025em] sm:max-w-[13ch] lg:max-w-[14ch]"
              style={{ color: "#F2ECE2", textShadow: "0 2px 18px rgba(0,0,0,0.16)" }}
            >
              {heroCopy.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.26 }}
              className="mt-3 max-w-[20ch] text-[16px] leading-[1.55] text-[#f5ecdc] sm:text-[17px]"
              style={{ color: "#efe4d2", textShadow: "0 2px 16px rgba(0,0,0,0.18)" }}
            >
              {heroCopy.subline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.34 }}
              className="mt-6 max-w-[29ch] rounded-[20px] bg-[rgba(22,15,12,0.3)] px-4 py-3 text-[clamp(24px,3.2vw,34px)] font-bold leading-[1.34] tracking-[0.005em] text-white backdrop-blur-[4px] sm:max-w-[31ch] sm:px-5 sm:py-3.5 lg:max-w-[32ch]"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.42)" }}
            >
              {heroCopy.supporting}
            </motion.p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes seijaku-kenburns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.045);
          }
        }

        @keyframes seijaku-diffuser-glow {
          0% {
            opacity: 0.42;
            transform: scale(1) translate3d(0, 0, 0);
          }
          50% {
            opacity: 0.62;
            transform: scale(1.04) translate3d(0.4%, -0.6%, 0);
          }
          100% {
            opacity: 0.42;
            transform: scale(1) translate3d(0, 0, 0);
          }
        }

        @keyframes seijaku-oil-glimmer {
          0% {
            opacity: 0.36;
            transform: scale(1);
          }
          50% {
            opacity: 0.52;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.36;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}



