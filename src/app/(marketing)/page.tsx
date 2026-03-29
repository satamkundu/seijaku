"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

import HemantaQuoteStrip from "@/src/components/HemantaQuoteStrip";
import HeroBanner from "@/src/components/HeroBanner";
import RitualRoom from "@/src/components/RitualRoom";
import SeasonalDropBanner from "@/src/components/SeasonalDropBanner";
import SeasonalStoryStrip from "@/src/components/SeasonalStoryStrip";
import BrowseWorldSection from "@/src/components/home/BrowseWorldSection";
import CraftProofSection from "@/src/components/home/CraftProofSection";
import JournalPreviewSection from "@/src/components/home/JournalPreviewSection";
import RitualSetsSection from "@/src/components/home/RitualSetsSection";

export default function HomePage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0.6, 1], [100, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-home-reveal]"));
    if (!targets.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="home-story min-h-screen bg-[#F3EFE7] text-[#3a3a3a]">
      <HeroBanner heroRef={heroRef} />
      <motion.div
        className="relative z-20 home-section-shell home-bridge-soft"
        data-home-reveal
        style={{ y: sectionY, opacity: sectionOpacity }}
      >
        <BrowseWorldSection />
      </motion.div>
      <div className="home-section-shell home-bridge-soft" data-home-reveal>
        <RitualSetsSection />
      </div>
      <div className="home-section-shell home-bridge-soft" data-home-reveal>
        <RitualRoom />
      </div>
      <div className="home-section-shell home-bridge-calm" data-home-reveal>
        <CraftProofSection />
      </div>
      <div className="home-section-shell home-bridge-soft" data-home-reveal>
        <SeasonalStoryStrip />
      </div>
      <div className="home-section-shell home-bridge-warm" data-home-reveal>
        <SeasonalDropBanner />
      </div>
      <div className="home-section-shell home-bridge-soft" data-home-reveal>
        <HemantaQuoteStrip />
      </div>
      <div className="home-section-shell" data-home-reveal>
        <JournalPreviewSection />
      </div>
    </main>
  );
}
