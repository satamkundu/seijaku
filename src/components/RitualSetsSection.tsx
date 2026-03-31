import Image from "next/image";
import Link from "next/link";

import { canonicalShopRoutes, shopProducts } from "@/src/lib/shopAllItems";

const setCards = [
  {
    title: "The Daily Ritual Set",
    description: "A composed scent-and-object pairing for everyday continuity.",
    slug: "dawn-reset-box",
    fallbackImage: "/images/Home Page hero image 1.png",
    fallbackPrice: "INR 6,800",
  },
  {
    title: "The Seasonal Reading Set",
    description: "A quieter evening pairing shaped by page, scent, and pause.",
    slug: "reading-hour-set",
    fallbackImage: "/images/Hemanta drop HP banner 1.png",
    fallbackPrice: "INR 7,200",
  },
];

export default function RitualSetsSection() {
  return (
    <section className="section-primary bg-[#F3EFE7] pt-0">
      <div className="page-container">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f7455]">Ritual Sets</p>
            <h2 className="mt-4 text-[#1e1d1a]">Each set pairs a signature scent with a handcrafted artifact.</h2>
            <p className="mt-4 text-[15px] leading-[1.82] text-[#5d625d]">Small-batch, composed, and built for return.</p>
          </div>
          <p className="text-[14px] leading-[1.8] text-[#72685c]">Designed to gift, keep, and return to.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6 xl:gap-8">
          {setCards.map((card) => {
            const item = shopProducts.find((entry) => entry.slug === card.slug);
            const price = item?.priceLabel ?? card.fallbackPrice;
            const image = item?.image ?? card.fallbackImage;

            return (
              <article
                key={card.title}
                className="overflow-hidden rounded-[26px] border border-[#d8cec1] bg-[#faf7f1] shadow-[0_12px_32px_rgba(49,57,49,0.04)]"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-[#e7dfd1] lg:aspect-[6/5]">
                  <Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="px-5 pb-6 pt-5 sm:px-6 sm:pb-7">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#a27f58]">Featured Set</p>
                  <h3 className="mt-4 text-[24px] leading-[1.14] text-[#2d2721]">{card.title}</h3>
                  <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.78] text-[#6d645a]">{card.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <p className="text-[12px] uppercase tracking-[0.18em] text-[#574c42]">{price}</p>
                    <Link
                      href={canonicalShopRoutes.lifestyle}
                      className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#516054] transition-colors duration-200 hover:text-[#1f2a21]"
                    >
                      <span>Shop Set</span>
                      <span aria-hidden>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={canonicalShopRoutes.lifestyle}
            className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-[#d2c4b3] bg-[#2f5137] px-9 py-3.5 text-[11px] uppercase tracking-[0.22em] text-[#f4efe8] shadow-[0_14px_28px_rgba(47,81,55,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#25412c] hover:shadow-[0_18px_34px_rgba(47,81,55,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3efe7]"
          >
            Find the right ritual
          </Link>
        </div>
      </div>
    </section>
  );
}
