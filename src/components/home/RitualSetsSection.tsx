import Image from "next/image";
import Link from "next/link";

import { getShopItemBySlug } from "@/src/lib/shopAllItems";

type FeaturedSet = {
  title: string;
  slug?: string;
  image?: string;
  description: string;
  priceLabel?: string;
  href?: string;
  cta: string;
};

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const featuredSets: FeaturedSet[] = [
  {
    title: "The Daily Ritual Set",
    slug: "evening-ritual-box",
    description: "A composed companion for the hour between work and rest.",
    cta: "Shop Set",
  },
  {
    title: "The Seasonal Drop Set",
    slug: "hemanta-collectors-box",
    description: "A limited seasonal pairing of scent, object, and atmosphere.",
    cta: "View Set",
  },
  {
    title: "The Gift Ritual Set",
    slug: "seijaku-gift-set-i",
    description: "A quieter gift of scent, textile, and table ritual.",
    cta: "View Set",
  },
  {
    title: "The Home Ritual Set",
    image: "/images/Hemanta drop HP banner 1.png",
    description: "A home-facing composition of fragrance, vessel, and softly kept materials.",
    priceLabel: "Coming soon",
    href: "/shop-all?category=Ritual+Boxes+%26+Gift+Sets",
    cta: "Shop Set",
  },
];

function getPriceLabel(price: number | null, fallback?: string) {
  if (price === null) {
    return fallback ?? "Price on request";
  }

  return formatter.format(price);
}

export default function RitualSetsSection() {
  return (
    <section className="section-primary bg-[#F3EFE7]">
      <div className="page-container">
        <div className="section-divider pt-12">
          <div className="max-w-[620px]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#9a785d]">Small-batch • Limited drops</p>
            <h2 className="mt-4 text-[#1c1c1c]">Ritual Sets</h2>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.85] text-[#5f5850]">
              Each set pairs a signature scent with a handcrafted artifact.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredSets.map((setItem) => {
              const product = setItem.slug ? getShopItemBySlug(setItem.slug) : undefined;
              const href = product ? `/shop/${product.slug}` : (setItem.href ?? "/shop-all");
              const imageSrc = product?.image ?? setItem.image ?? "/images/Home Page hero image 1.png";
              const description = product?.shortDescription ?? setItem.description;
              const priceLabel = product ? getPriceLabel(product.price, product.priceLabel) : setItem.priceLabel;

              return (
                <article
                  key={setItem.title}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#d8cec1] bg-[#faf7f1] shadow-[0_10px_28px_rgba(49,57,49,0.035)]"
                >
                  <div className="relative aspect-[4/4.8] overflow-hidden bg-[#e4d9cc]">
                    <Image
                      src={imageSrc}
                      alt={setItem.title}
                      fill
                      sizes="(min-width: 1280px) 24vw, (min-width: 768px) 48vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-5 pb-6 pt-6 sm:px-6">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#8f7a65]">Featured set</p>
                    <h3 className="mt-4 text-[clamp(26px,2.2vw,32px)] leading-[1.08] tracking-[-0.02em] text-[#1f1a16]">
                      {setItem.title}
                    </h3>
                    <p className="mt-4 max-w-[28ch] text-[15px] leading-[1.82] text-[#5f5850]">{description}</p>
                    <p className="mt-5 text-[14px] text-[#2f2924]">{priceLabel}</p>
                    <Link
                      href={href}
                      className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#46554b] underline decoration-black/10 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f1]"
                    >
                      <span>{setItem.cta}</span>
                      <span aria-hidden className="text-[13px] leading-none">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      {/* TODO: Replace the Home Ritual Set fallback card with live product data once the dedicated set is added to shopAllItems. */}
    </section>
  );
}
