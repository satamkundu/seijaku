"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { RefObject, useRef } from "react";

type HeroBannerProps = {
  heroRef?: RefObject<HTMLElement | null>;
};

const heroCopy = {
  headlineTop: "Perfume Rituals",
  headlineBottom: "for Modern Calm",
  subline: "For body and home",
  supportingTop: "Signature scents paired with handcrafted Bengal forms",
  supportingBottom: "— made to gift or keep.",
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
      className="relative mt-[118px] flex h-[60vh] min-h-[560px] w-screen items-start overflow-hidden bg-[#665a4d] pb-[44px] pt-[92px] sm:mt-[124px] sm:h-[62vh] sm:min-h-[600px] sm:pb-[48px] sm:pt-[96px] md:mt-[128px] md:h-[64vh] md:min-h-[640px] md:pb-[52px] md:pt-[92px] lg:mt-[132px] lg:h-[68vh] lg:min-h-[700px] lg:pb-[60px] lg:pt-[104px] xl:h-[72vh] xl:min-h-[760px] xl:pb-[68px] xl:pt-[112px]"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY, scale: imageScale, filter: heroFilter }}
      >
        <motion.div className="relative h-full w-full" style={{ animation: "seijaku-kenburns 32s ease-out infinite" }}>
          <Image
            src="/images/Hero Banner HP_Kolkata summer 4.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.9] contrast-[1.04] saturate-[1.01] sm:object-center md:object-center lg:object-center xl:object-center"
          />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(90deg, rgba(16,13,11,0.46) 0%, rgba(16,13,11,0.24) 28%, rgba(16,13,11,0.08) 56%, rgba(16,13,11,0.03) 100%), linear-gradient(to bottom, rgba(16,13,11,0.08) 0%, rgba(16,13,11,0.08) 42%, rgba(16,13,11,0.14) 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 54% 28%, rgba(255,255,255,0.018), transparent 46%), linear-gradient(90deg, rgba(10,9,8,0.18) 0%, rgba(10,9,8,0.07) 34%, rgba(10,9,8,0.01) 56%, rgba(10,9,8,0.03) 100%)",
        }}
      />

      <div className="relative z-[3] flex w-full items-start justify-start overflow-hidden">
        <motion.div style={{ y: headlineY, opacity: headlineOpacity }} className="page-container max-w-none text-left">
          <div className="max-w-[1180px]">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.18 }}
              className="mt-0 text-[clamp(31px,4vw,52px)] font-medium leading-[1.02] tracking-[-0.03em]"
              style={{ color: "#F2ECE2", textShadow: "0 2px 22px rgba(0,0,0,0.2)" }}
            >
              <span className="block whitespace-nowrap">{heroCopy.headlineTop}</span>
              <span className="mt-1 block whitespace-nowrap">{heroCopy.headlineBottom}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.28 }}
              className="mt-5 whitespace-nowrap text-[16px] leading-[1.55] sm:text-[17px]"
              style={{ color: "#efe4d2", textShadow: "0 2px 16px rgba(0,0,0,0.18)" }}
            >
              {heroCopy.subline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.36 }}
              className="mt-6 text-[clamp(12px,1.85vw,28px)] font-light leading-[1.3] sm:text-[clamp(13px,1.8vw,30px)]"
              style={{ color: "rgba(245,236,223,0.94)", textShadow: "0 2px 18px rgba(0,0,0,0.16)" }}
            >
              <span className="block whitespace-nowrap">{heroCopy.supportingTop}</span>
              <span className="mt-1.5 block whitespace-nowrap">{heroCopy.supportingBottom}</span>
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
      `}</style>
    </section>
  );
}
