"use client";

import { useRouter } from "next/navigation";

import { canonicalShopRoutes, type ShopProduct } from "@/src/lib/shopAllItems";

import { useShopState } from "./ShopStateProvider";

type ShopActionRowProps = {
  item: ShopProduct;
  onViewDetails: () => void;
  compact?: boolean;
};

export default function ShopActionRow({ item, onViewDetails, compact = false }: ShopActionRowProps) {
  const router = useRouter();
  const { beginCheckout, isCollected, toggleCollection } = useShopState();
  const collected = isCollected(item.slug);

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => toggleCollection(item.slug)}
          className={`rounded-full border px-3.5 py-2 text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c7b68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f1] ${
            collected
              ? "border-[#2e4a36] bg-[#2e4a36] text-[#f4efe8]"
              : "border-[rgba(111,100,86,0.14)] text-[#655b50] hover:border-[rgba(96,86,74,0.22)] hover:bg-[#f7f1e7]"
          }`}
        >
          {collected ? "Wishlisted" : "Wishlist"}
        </button>
        <button
          type="button"
          onClick={onViewDetails}
          className="text-[10px] uppercase tracking-[0.2em] text-[#4f473f] underline decoration-black/15 underline-offset-4 transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c7b68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f1]"
        >
          View Details
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <button
        type="button"
        onClick={() => {
          beginCheckout(item.slug, null);
          router.push(canonicalShopRoutes.checkout);
        }}
        className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] transition-colors duration-200 hover:bg-[#243c2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c7b68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8]"
      >
        Buy Now
      </button>
      <button
        type="button"
        onClick={() => toggleCollection(item.slug)}
        className={`inline-flex items-center justify-center rounded-full border px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c7b68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8] ${
          collected
            ? "border-[#2e4a36] bg-[#2e4a36] text-[#f4efe8]"
            : "border-[rgba(111,100,86,0.14)] text-[#4c443c] hover:border-[rgba(96,86,74,0.22)] hover:bg-[#f5efe6]"
        }`}
      >
        {collected ? "Wishlisted" : "Add to Wishlist"}
      </button>
      <button
        type="button"
        onClick={onViewDetails}
        className="text-[11px] uppercase tracking-[0.18em] text-[#4f473f] underline decoration-black/15 underline-offset-4 transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c7b68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8]"
      >
        View Details
      </button>
    </div>
  );
}
