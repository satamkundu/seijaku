"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import SeijakuLifeArticleCard from "@/src/components/SeijakuLifeArticleCard";
import {
  featuredSeijakuLifeArticle,
  recentSeijakuLifeArticles,
  seijakuLifeCategories,
  type SeijakuLifeCategory,
} from "@/src/lib/seijakuLifeArticles";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ASeijakuLifePage() {
  const [activeCategory, setActiveCategory] = useState<SeijakuLifeCategory>("All");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") {
      return recentSeijakuLifeArticles;
    }

    return recentSeijakuLifeArticles.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-[#f3efe7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
      <section className="section-primary pb-14 pt-24 sm:pt-28">
        <motion.div
          className="page-container max-w-[980px]"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Journal</p>
          <h1 className="mt-5 max-w-[10ch] text-[clamp(44px,5.2vw,68px)] leading-[1.02] tracking-[-0.028em] text-[#1d1a17]">
            A Seijaku Life
          </h1>
          <p className="mt-7 max-w-[42ch] text-[17px] leading-[1.9] text-[#5f584f]">
            Notes on ritual, season, making, and the quieter textures of living.
          </p>
          <p className="mt-5 max-w-[62ch] text-[13px] leading-[1.9] tracking-[0.01em] text-[#7c7368]">
            A journal of reflections, processes, objects, places, and slow observations from the world of Seijaku.
          </p>
          <div className="mt-16 h-px w-full bg-black/6" />
        </motion.div>
      </section>

      {featuredSeijakuLifeArticle && (
        <section className="section-editorial pb-10 pt-0 sm:pb-14">
          <motion.div
            className="page-container max-w-[1080px]"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <SeijakuLifeArticleCard article={featuredSeijakuLifeArticle} featured priority />
          </motion.div>
        </section>
      )}

      <section className="section-primary pt-6">
        <div className="page-container max-w-[1080px]">
          <motion.div
            className="flex flex-col gap-10"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <h2 className="text-[clamp(28px,3vw,38px)] leading-[1.14] tracking-[-0.02em] text-[#1f1a16]">
                Recent Entries
              </h2>
              <div className="mt-8 overflow-x-auto pb-2">
                <div className="flex min-w-max items-center gap-2 rounded-full bg-[#ece4d7] p-1.5">
                  {seijakuLifeCategories.map((category) => {
                    const isActive = category === activeCategory;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.17em] transition-colors duration-300 ${
                          isActive ? "bg-[#f9f5ed] text-[#1f1a16]" : "text-[#7d7368] hover:text-[#3f3933]"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid gap-7 md:grid-cols-2 md:gap-9">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.slug}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SeijakuLifeArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-secondary pb-0">
        <motion.div
          className="page-container max-w-[1080px]"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-[26px] bg-[#e9e1d4] px-7 py-12 sm:px-10 sm:py-14 md:px-14 md:py-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8d7a66]">Seijaku Notes</p>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(31px,3.6vw,46px)] leading-[1.1] tracking-[-0.02em] text-[#1f1a16]">
              Stay close to the season.
            </h2>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.85] text-[#5f5850]">
              Receive occasional notes from Seijaku on new writings, seasonal releases, and quiet offerings.
            </p>
            <Link
              href="#"
              className="mt-9 inline-flex items-center justify-center rounded-full border border-[#b9ab97] px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-[#2f2924] transition-colors duration-300 hover:border-[#8f7f6c] hover:bg-[#f7f1e8]"
            >
              Join the Newsletter
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
