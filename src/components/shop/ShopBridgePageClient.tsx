"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  canonicalShopRoutes,
  getShopProductBySlug,
  type ShopBridgePageConfig,
  type ShopProduct,
} from "@/src/lib/shopAllItems";

import EditorialProductRow from "./EditorialProductRow";
import ProductDetailDrawer from "./ProductDetailDrawer";
import { useShopState } from "./ShopStateProvider";

type ShopBridgePageClientProps = {
  page: ShopBridgePageConfig;
  products: ShopProduct[];
};

type PerfumeSectionId = "skin" | "textiles" | "objects";

type PerfumeSectionLink = {
  id: PerfumeSectionId;
  label: string;
};

type PerfumeDivider = {
  kind: "divider";
  title: string;
  description: string;
};

type PerfumeProductEntry = {
  kind: "product";
  item: ShopProduct;
};

type PerfumeSpacesEntry = PerfumeDivider | PerfumeProductEntry;

const perfumeSectionLinks: PerfumeSectionLink[] = [
  { id: "skin", label: "Skin" },
  { id: "textiles", label: "Textiles" },
  { id: "objects", label: "Objects" },
];

const perfumeContainerClasses = "mx-auto w-full max-w-[1200px] px-6 md:px-12";

function DokraBroochRow({
  item,
  index,
  onViewDetails,
}: {
  item: ShopProduct;
  index: number;
  onViewDetails: (slug: string) => void;
}) {
  const { isCollected, toggleCollection } = useShopState();
  const collected = isCollected(item.slug);
  const reverse = index % 2 === 1;

  return (
    <article className="py-20">
      <div className={`grid items-center gap-12 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-16 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-lg bg-[#e6ddd1]">
          <div className="relative aspect-[4/4.8] w-full">
            <Image src={item.image} alt={item.imageAlt ?? item.title} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>

        <div className="max-w-[460px]">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8f7a65]/80">Dokra Brooch</p>
          <h3 className="mt-4 font-serif text-[32px] leading-[1.06] tracking-[-0.025em] text-[#1f1a16] sm:text-[38px]">
            {item.title}
          </h3>
          <p
            className="mt-5 text-[16px] leading-[1.9] text-[#60584f]"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.shortDescription ?? "A dokra brooch shaped for quiet daily ritual."}
          </p>
          {item.ritualTag ? (
            <p className="mt-5 inline-flex rounded-full border border-[rgba(116,99,77,0.14)] bg-[#F5F1EA] px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] text-[#6d604f]">
              {item.ritualTag}
            </p>
          ) : null}
          <p className="mt-5 text-[15px] text-[#5f584f]">{item.priceLabel}</p>
          <div className="mt-7 flex items-center gap-5">
            <button
              type="button"
              onClick={() => onViewDetails(item.slug)}
              className="text-[11px] uppercase tracking-[0.2em] text-[#2e4a36] underline decoration-black/10 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c7b68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8]"
            >
              View Object
            </button>
            <button
              type="button"
              onClick={() => toggleCollection(item.slug)}
              className={`text-[11px] uppercase tracking-[0.18em] transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c7b68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8] ${
                collected ? "text-[#2e4a36]" : "text-[#5d5449] hover:opacity-70"
              }`}
            >
              {collected ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function PerfumeScrollStrip({ children }: { children: React.ReactNode }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="relative mt-14">
      <div
        className={`flex snap-x snap-proximity gap-12 overflow-x-auto pl-4 pr-8 pb-2 pt-1 [scroll-padding-left:2rem] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-14 md:pl-8 md:pr-12 xl:gap-16 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <div aria-hidden className="w-1 shrink-0 md:w-2" />
        {children}
        <div aria-hidden className="w-3 shrink-0 md:w-6" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#F3EFE7] via-[#F3EFE7]/88 to-transparent md:w-12" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#F3EFE7] via-[#F3EFE7]/88 to-transparent md:w-14" />
    </div>
  );
}

function PerfumeGalleryItem({ item, onViewDetails }: { item: ShopProduct; onViewDetails: (slug: string) => void }) {
  return (
    <article className="group w-[220px] shrink-0 snap-start text-left sm:w-[236px] lg:w-[252px]">
      <button
        type="button"
        onClick={() => onViewDetails(item.slug)}
        className="block w-full text-left transition-opacity duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c7b68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3efe7] md:hover:opacity-95"
      >
        <div className="relative aspect-[4/4.75] overflow-hidden rounded-[20px]">
          <Image
            src={item.image}
            alt={item.imageAlt ?? item.title}
            fill
            sizes="(min-width: 1024px) 18vw, 220px"
            className="object-cover opacity-[0.96] transition-all duration-500 ease-out md:group-hover:opacity-100"
          />
        </div>
        <div className="mt-3">
          <p className="text-xs uppercase tracking-[0.24em] text-[#8c775f]">
            {item.useCase === "cloth" ? "Cloth" : item.useCase === "diffusion objects" ? "Spaces" : "Skin"}
          </p>
          <h3 className="mt-3 font-serif text-[24px] leading-[1.12] tracking-[-0.02em] text-[#1f1a16] transition-transform duration-300 ease-out md:group-hover:translate-x-[1px]">
            {item.title}
          </h3>
          <p className="mt-3 text-[14px] leading-[1.95] text-[#5f574d]/80">{item.priceLabel}</p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#5e5549] opacity-0 transition-opacity duration-300 ease-out md:group-hover:opacity-100">
            View Details
          </p>
        </div>
      </button>
    </article>
  );
}

function PerfumeDividerItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex w-[220px] shrink-0 snap-start items-end sm:w-[236px] lg:w-[252px]">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-[#9a785d]">Section</p>
        <h3 className="mt-3 font-serif text-[28px] leading-[1.08] tracking-[-0.02em] text-[#1e1915]">{title}</h3>
        <p className="mt-3 max-w-[18ch] text-[14px] leading-[1.95] text-[#635a50]/80">{description}</p>
      </div>
    </div>
  );
}

export default function ShopBridgePageClient({ page, products }: ShopBridgePageClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get("item");
  const selectedProduct = selectedSlug ? getShopProductBySlug(selectedSlug) ?? null : null;
  const isDokraPage = page.slug === "dokra-ornaments";
  const isPerfumePage = page.slug === "perfumes";
  const [activePerfumeSection, setActivePerfumeSection] = useState<PerfumeSectionId>("skin");

  const updateQuery = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (slug) {
      params.set("item", slug);
    } else {
      params.delete("item");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const perfumeProductsBySlug = useMemo(() => new Map(products.map((product) => [product.slug, product])), [products]);

  const skinItems = useMemo(
    () =>
      [
        "spirit-01-breath-of-pines",
        "body-01-summer-held-close",
        "mind-01-the-morning-desk",
        "trilogy-discovery-kit",
      ]
        .map((slug) => perfumeProductsBySlug.get(slug))
        .filter((item): item is ShopProduct => Boolean(item)),
    [perfumeProductsBySlug]
  );

  const textileItems = useMemo(
    () =>
      [
        "jasmine-neroli-textile-oil",
        "lotus-jasmine-textile-oil",
        "hinoki-cedar-textile-oil",
        "rose-vetiver-textile-oil",
        "tea-blossom-rice-textile-oil",
      ]
        .map((slug) => perfumeProductsBySlug.get(slug))
        .filter((item): item is ShopProduct => Boolean(item)),
    [perfumeProductsBySlug]
  );

  const spacesEntries = useMemo<PerfumeSpacesEntry[]>(() => {
    const product = (slug: string): PerfumeProductEntry | null => {
      const item = perfumeProductsBySlug.get(slug);
      return item ? { kind: "product", item } : null;
    };

    return [
      { kind: "divider", title: "Floral & Fruity", description: "Soft atmospheres for rest" },
      product("neroli-bloom-diffusion-vessel"),
      product("plum-orchard-room-stone"),
      { kind: "divider", title: "Tea & Steam", description: "Quiet warmth and pause" },
      product("tea-steam-stone-diffuser"),
      product("kyusu-warmth-reed-vessel"),
      { kind: "divider", title: "Living & Sensory", description: "Rice, citrus, spice, and comfort" },
      product("rice-citrus-bowl-diffuser"),
      product("cardamom-hearth-vessel"),
    ].filter((entry): entry is PerfumeSpacesEntry => Boolean(entry));
  }, [perfumeProductsBySlug]);

  useEffect(() => {
    if (!isPerfumePage || typeof window === "undefined") {
      return undefined;
    }

    const sectionIds: PerfumeSectionId[] = ["skin", "textiles", "objects"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActivePerfumeSection(visible.target.id as PerfumeSectionId);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.6],
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isPerfumePage]);

  const scrollToPerfumeSection = (sectionId: PerfumeSectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <main className="min-h-screen bg-[#F3EFE7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
        <section className="section-primary bg-[#F3EFE7]">
          <div className="page-container grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="max-w-[520px]">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">{page.heroEyebrow}</p>
              <h1 className="mt-5">{page.heroTitle}</h1>
              <div className="mt-5 space-y-3 text-[16px] leading-[1.82] text-[#5e584f]">
                {page.heroDescription.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href={isPerfumePage ? "#skin" : "#bridge-products"}
                  className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
                >
                  {isDokraPage ? "Explore Brooches" : isPerfumePage ? "Explore the trilogy" : `Explore ${page.navLabel}`}
                </a>
                {!isPerfumePage ? (
                  <a
                    href={canonicalShopRoutes.shopAll}
                    className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#6b6257] hover:text-[#2e4a36]"
                  >
                    <span>Shop All</span>
                    <span aria-hidden>&rarr;</span>
                  </a>
                ) : null}
              </div>
            </div>

            <div className="relative w-full max-w-[420px] justify-self-center overflow-hidden rounded-[24px] border border-[#D8CEC1] bg-[#FAF7F1] p-3 shadow-[0_18px_40px_rgba(48,40,30,0.06)] md:max-w-[460px]">
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

        {isPerfumePage ? (
          <>
            <nav className="sticky top-[72px] z-20 border-y border-black/5 bg-[rgba(243,239,231,0.92)] backdrop-blur-md sm:top-[76px]">
              <div className={`${perfumeContainerClasses} flex items-center gap-7 overflow-x-auto py-4 text-[11px] uppercase tracking-[0.24em] text-[#6d6459] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
                {perfumeSectionLinks.map((section) => {
                  const active = activePerfumeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToPerfumeSection(section.id)}
                      className={`relative whitespace-nowrap pb-1 transition-colors duration-300 ${active ? "text-[#2e4a36]" : "hover:text-[#302922]"}`}
                    >
                      {section.label}
                      <span
                        className={`absolute inset-x-0 -bottom-px h-px origin-left bg-[#2e4a36] transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </nav>

            <section id="skin" className="py-24 md:py-28">
              <div className={perfumeContainerClasses}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a785d]">FOR SKIN</p>
                <h2 className="mt-5 text-[clamp(32px,4vw,44px)] leading-[1.08] text-[#1b1714]">A trilogy in three states</h2>
                <p className="mt-5 max-w-[52ch] text-[16px] leading-[2] text-[#645c52]/78">
                  Breath. Body. Mind. Compositions to be worn, not displayed.
                </p>
              </div>
              <PerfumeScrollStrip>
                {skinItems.map((item) => (
                  <PerfumeGalleryItem key={item.slug} item={item} onViewDetails={updateQuery} />
                ))}
              </PerfumeScrollStrip>
              <div className={`${perfumeContainerClasses} pt-14 text-center`}>
                <p className="mx-auto max-w-[760px] font-serif text-[32px] leading-[1.4] tracking-[-0.02em] text-[#746b60] md:text-[38px]">
                  This is an evolving series. Future compositions will extend each state — Spirit 02, Body 02, Mind 02.
                </p>
              </div>
            </section>

            <section id="textiles" className="py-24 md:py-28">
              <div className={perfumeContainerClasses}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a785d]">FOR TEXTILES</p>
                <h2 className="mt-5 text-[clamp(32px,4vw,44px)] leading-[1.08] text-[#1b1714]">Fragrance that stays with what you wear</h2>
                <p className="mt-5 max-w-[52ch] text-[16px] leading-[2] text-[#645c52]/78">
                  Oil-based blends that settle into fabric and move with you.
                </p>
              </div>
              <PerfumeScrollStrip>
                {textileItems.map((item) => (
                  <PerfumeGalleryItem key={item.slug} item={item} onViewDetails={updateQuery} />
                ))}
              </PerfumeScrollStrip>
              <div className={`${perfumeContainerClasses} pt-14 text-center`}>
                <p className="mx-auto max-w-[760px] font-serif text-[32px] leading-[1.4] tracking-[-0.02em] text-[#746b60] md:text-[38px]">
                  Scent does not announce. It settles.
                </p>
              </div>
            </section>

            <section id="objects" className="py-24 md:py-28">
              <div className={perfumeContainerClasses}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a785d]">FOR SPACES</p>
                <h2 className="mt-5 text-[clamp(32px,4vw,44px)] leading-[1.08] text-[#1b1714]">Scent that inhabits space</h2>
                <p className="mt-5 max-w-[52ch] text-[16px] leading-[2] text-[#645c52]/78">
                  Placed, not sprayed. Experienced, not announced.
                </p>
              </div>
              <PerfumeScrollStrip>
                {spacesEntries.map((entry, index) =>
                  entry.kind === "divider" ? (
                    <PerfumeDividerItem key={`${entry.title}-${index}`} title={entry.title} description={entry.description} />
                  ) : (
                    <PerfumeGalleryItem key={entry.item.slug} item={entry.item} onViewDetails={updateQuery} />
                  )
                )}
              </PerfumeScrollStrip>
              <div className={`${perfumeContainerClasses} pt-14 text-center`}>
                <p className="mx-auto max-w-[760px] font-serif text-[32px] leading-[1.4] tracking-[-0.02em] text-[#746b60] md:text-[38px]">
                  Space keeps what scent leaves behind.
                </p>
              </div>
            </section>

            {page.postCtaTitle ? (
              <section className="pt-8 text-center">
                <div className={`${perfumeContainerClasses} mt-24`}>
                  <div className="mx-auto max-w-[640px]">
                    <h2 className="text-[#1c1c1c]">{page.postCtaTitle}</h2>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                      {page.postCtaPrimaryLabel && page.postCtaPrimaryHref ? (
                        <a
                          href={page.postCtaPrimaryHref}
                          className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
                        >
                          {page.postCtaPrimaryLabel}
                        </a>
                      ) : null}
                      {page.postCtaSecondaryLabel && page.postCtaSecondaryHref ? (
                        <a
                          href={page.postCtaSecondaryHref}
                          className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#5e5549] underline decoration-black/10 underline-offset-4 hover:text-[#2e4a36]"
                        >
                          {page.postCtaSecondaryLabel}
                        </a>
                      ) : null}
                    </div>
                  </div>
                  {page.seoFootnote ? (
                    <p className="mx-auto mt-14 max-w-[860px] text-center text-xs leading-[1.9] text-[#847a6d]">{page.seoFootnote}</p>
                  ) : null}
                </div>
              </section>
            ) : null}
          </>
        ) : (
          <>
            <section className="section-editorial bg-[#EAE3D8]">
              <div className="page-container">
                <div className="section-divider pt-10">
                  <div className="max-w-[760px]">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">{page.introEyebrow}</p>
                    <h2 className="mt-4 text-[#1c1c1c]">{page.introTitle}</h2>
                    <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.82] text-[#625b53]">{page.introDescription}</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="bridge-products" className="section-primary bg-[#F3EFE7]">
              <div className="page-container max-w-[1180px]">
                {isDokraPage ? (
                  <>
                    <div className="max-w-[760px]">
                      {page.productSectionEyebrow ? (
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">{page.productSectionEyebrow}</p>
                      ) : null}
                      {page.productSectionTitle ? <h2 className="mt-4 text-[#1c1c1c]">{page.productSectionTitle}</h2> : null}
                      {page.productSectionDescription ? (
                        <p className="mt-4 max-w-[58ch] text-[16px] leading-[1.82] text-[#625b53]">{page.productSectionDescription}</p>
                      ) : null}
                    </div>

                    <div className="mt-6">
                      {products.map((product, index) => (
                        <div key={product.slug}>
                          <DokraBroochRow item={product} index={index} onViewDetails={updateQuery} />
                          {index === 1 ? (
                            <div className="py-24 text-center">
                              <p className="mx-auto max-w-[600px] font-serif text-[28px] leading-[1.45] tracking-[-0.02em] text-[#7a7065] md:text-[32px]">
                                These objects are not worn for display.
                                <br />
                                They are carried, placed, and returned to.
                              </p>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>

                    {page.postCtaTitle ? (
                      <div className="mx-auto mt-14 max-w-[720px] py-20 text-center xl:mt-16">
                        <h2 className="text-[#1c1c1c]">{page.postCtaTitle}</h2>
                        {page.postCtaDescription ? (
                          <p className="mt-4 text-[16px] leading-[1.82] text-[#625b53]">{page.postCtaDescription}</p>
                        ) : null}
                        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                          {page.postCtaPrimaryLabel && page.postCtaPrimaryHref ? (
                            <a
                              href={page.postCtaPrimaryHref}
                              className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
                            >
                              {page.postCtaPrimaryLabel}
                            </a>
                          ) : null}
                          {page.postCtaSecondaryLabel && page.postCtaSecondaryHref ? (
                            <a
                              href={page.postCtaSecondaryHref}
                              className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#5e5549] underline decoration-black/10 underline-offset-4 hover:text-[#2e4a36]"
                            >
                              {page.postCtaSecondaryLabel}
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ) : null}

                    {page.seoFootnote ? (
                      <p className="mx-auto mt-12 max-w-[900px] text-center text-xs leading-[1.9] text-[#847a6d]">
                        {page.seoFootnote}
                      </p>
                    ) : null}
                  </>
                ) : (
                  products.map((product, index) => (
                    <EditorialProductRow key={product.slug} item={product} index={index} onViewDetails={updateQuery} />
                  ))
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <ProductDetailDrawer item={selectedProduct} isOpen={Boolean(selectedProduct)} onClose={() => updateQuery()} />
    </>
  );
}

