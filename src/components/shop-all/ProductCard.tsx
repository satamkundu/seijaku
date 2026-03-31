import Image from "next/image";
import Link from "next/link";

import type { ShopItem } from "@/src/lib/shopAllItems";

type ProductCardProps = {
  item: ShopItem;
};

const tagTone: Record<string, string> = {
  New: "bg-[#efe4d3] text-[#6e5f4d]",
  "Limited Edition": "bg-[#e7dac8] text-[#5c4d3b]",
  Seasonal: "bg-[#eee4d8] text-[#6f6458]",
  Bestsellers: "bg-[#f1e8da] text-[#6e6255]",
};

export default function ProductCard({ item }: ProductCardProps) {
  const badgeTag = item.tags.find((tag) => tag in tagTone);

  return (
    <Link
      href={`/shop/${item.slug}`}
      className="group block overflow-hidden rounded-[18px] bg-[#f8f3ea] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7f715f]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#ddd1c1]">
        <Image
          src={item.image}
          alt={item.imageAlt ?? item.title}
          fill
          sizes="(min-width: 1200px) 28vw, (min-width: 768px) 44vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        {badgeTag && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em] ${
              tagTone[badgeTag]
            }`}
          >
            {badgeTag}
          </span>
        )}
      </div>

      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8f7a65]">{item.category}</p>
        <h3 className="mt-3 text-[clamp(22px,2.2vw,28px)] leading-[1.16] tracking-[-0.018em] text-[#1f1a16] transition-opacity duration-300 group-hover:opacity-85">
          {item.title}
        </h3>
        <p className="mt-3 max-w-[34ch] text-[14px] leading-[1.78] text-[#5f5850]">{item.shortDescription}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#7d7266]">
          <span>{item.type}</span>
          {item.audience !== "All Ages" && <span>{item.audience}</span>}
          {!item.isInStock && <span>{item.status}</span>}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-[14px] text-[#2f2924]">{item.status === "Open for Booking" ? "Booking Open" : item.priceLabel}</p>
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#4f473f] underline decoration-black/15 underline-offset-4">
            {item.ctaLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}

