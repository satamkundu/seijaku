import Image from "next/image";
import Link from "next/link";

import type { CategoryBridgePageData } from "@/src/lib/categoryBridge";
import { lifestyleRoute, shopAllRoute } from "@/src/lib/categoryBridge";

import CategoryProductCard from "./CategoryProductCard";

type CategoryBridgePageProps = {
  page: CategoryBridgePageData;
};

export default function CategoryBridgePage({ page }: CategoryBridgePageProps) {
  return (
    <main className="min-h-screen bg-[#f3efe7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
      <section className="section-primary bg-[#f3efe7]">
        <div className="page-container grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="max-w-[540px]">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">{page.heroEyebrow}</p>
            <h1 className="mt-5">{page.heroTitle}</h1>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.82] text-[#5e584f]">{page.heroDescription}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href="#category-products"
                className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
              >
                Explore This Category
              </Link>
              <Link
                href={shopAllRoute}
                className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#2e4a36] hover:text-[#1d3024]"
              >
                <span>Shop All</span>
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-[420px] justify-self-center overflow-hidden rounded-[24px] border border-[#d8cec1] bg-[#faf7f1] p-3 shadow-[0_18px_40px_rgba(48,40,30,0.06)] md:max-w-[460px]">
            <div className="relative aspect-[4/4.9] overflow-hidden rounded-[20px]">
              <Image
                src={page.heroImage}
                alt={page.heroImageAlt}
                fill
                priority
                sizes="(min-width: 768px) 55vw, 100vw"
                className={`object-cover ${page.heroImagePosition ?? "object-center"}`}
              />
            </div>
            <div className="pointer-events-none absolute inset-x-7 bottom-7 rounded-[18px] border border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.08))] p-4 backdrop-blur-[1.5px] md:inset-x-8 md:bottom-8 md:p-5">
              <p className="max-w-[24ch] font-serif text-[22px] leading-[1.14] text-white md:text-[24px]">{page.heroQuote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-editorial bg-[#eae3d8]">
        <div className="page-container">
          <div className="section-divider pt-10">
            <div className="max-w-[740px]">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Bridge Page Logic</p>
              <h2 className="mt-4 text-[#1c1c1c]">{page.introTitle}</h2>
              <p className="mt-4 max-w-[58ch] text-[16px] leading-[1.82] text-[#5e584f]">{page.introDescription}</p>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
              {page.introNotes.map((item) => (
                <div key={item.title} className="max-w-[26ch]">
                  <p className="font-serif text-[28px] leading-[1.15] tracking-[-0.02em] text-[#1c1c1c]">{item.title}</p>
                  <p className="mt-3 text-[15px] leading-[1.82] text-[#625b53]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="category-products" className="section-primary bg-[#f3efe7]">
        <div className="page-container">
          {page.productSections.map((section, index) => (
            <div
              key={section.title}
              className={`${index === 0 ? "section-divider pt-12" : "section-divider pt-14"}`}
            >
              <div className="max-w-[640px]">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">{section.eyebrow}</p>
                <h2 className="mt-4 text-[#1c1c1c]">{section.title}</h2>
                <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.82] text-[#5e584f]">{section.description}</p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {section.products.map((product) => (
                  <CategoryProductCard key={product.name} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-secondary bg-[#eae3d8]">
        <div className="page-container">
          <div className="section-divider flex flex-col gap-5 pt-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="max-w-[32ch] font-serif text-[clamp(26px,2.6vw,34px)] leading-[1.2] tracking-[-0.02em] text-[#1c1c1c]">
                Prefer to browse broadly before choosing?
              </p>
              <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.8] text-[#625b53]">
                Shop All remains the complete catalog view, while Lifestyle stays the narrative home for curated fragrance sets.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={shopAllRoute}
                className="inline-flex items-center justify-center rounded-full border border-[#d8cec1] bg-[#faf7f1] px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#2e4a36] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(44,40,34,0.08)]"
              >
                Shop All
              </Link>
              <Link
                href={lifestyleRoute}
                className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
              >
                Visit Lifestyle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
