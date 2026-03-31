"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import type { ShopProduct } from "@/src/lib/shopAllItems";
import { canonicalShopRoutes } from "@/src/lib/shopAllItems";

import { useShopState } from "../ShopStateProvider";

type DiffuserProductCardProps = {
  item: ShopProduct;
  categoryLabel: string;
  description: string;
  variantLabel: string;
  options: string[];
  selectedOption: string;
  onSelectOption: (value: string) => void;
  onViewDetails: () => void;
};

export default function DiffuserProductCard({
  item,
  categoryLabel,
  description,
  variantLabel,
  options,
  selectedOption,
  onSelectOption,
  onViewDetails,
}: DiffuserProductCardProps) {
  const router = useRouter();
  const { beginCheckout, isCollected, toggleCollection } = useShopState();
  const isWishlisted = isCollected(item.slug);
  const selectId = `${item.slug}-variant`;

  return (
    <article className="group mx-auto flex w-full max-w-[420px] flex-col overflow-hidden rounded-[28px] border border-[rgba(86,76,64,0.1)] bg-[linear-gradient(180deg,rgba(251,248,242,0.96)_0%,rgba(246,240,232,0.98)_100%)] shadow-[0_14px_30px_rgba(41,34,27,0.04)] transition-all duration-300 hover:-translate-y-[2px] hover:border-[rgba(86,76,64,0.16)] hover:shadow-[0_20px_36px_rgba(41,34,27,0.06)]">
      <button
        type="button"
        onClick={onViewDetails}
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c7b68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8]"
        aria-label={`View details for ${item.title}`}
      >
        <div className="relative mx-5 mt-5 aspect-[5/5.4] overflow-hidden rounded-[20px] bg-[#e7dfd4] sm:mx-6 sm:mt-6">
          <Image
            src={item.image}
            alt={item.imageAlt ?? item.title}
            fill
            sizes="(min-width: 1280px) 320px, (min-width: 768px) 34vw, 88vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </button>

      <div className="px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#8b775f]">{categoryLabel}</p>
        <h3 className="mt-3 text-[27px] leading-[1.08] tracking-[-0.025em] text-[#1b1714]">{item.title}</h3>
        <p className="mt-4 text-[14px] leading-[1.82] text-[#5f574d]">{description}</p>
        <p className="mt-4 text-[14px] text-[#312b25]">{item.priceLabel}</p>

        <div className="mt-6">
          <label htmlFor={selectId} className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-[#837260]">
            {variantLabel}
          </label>
          <select
            id={selectId}
            value={selectedOption}
            onChange={(event) => onSelectOption(event.target.value)}
            className="w-full rounded-[16px] border border-[rgba(86,76,64,0.14)] bg-[#fbf8f3] px-4 py-3 text-[14px] text-[#3f3831] outline-none transition-colors focus:border-[#2e4a36] focus:ring-2 focus:ring-[#2e4a36]/15"
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
          <button
            type="button"
            disabled={!selectedOption}
            onClick={() => {
              beginCheckout(item.slug, selectedOption);
              router.push(canonicalShopRoutes.checkout);
            }}
            className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#294536] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#f4efe8] transition-all duration-200 hover:bg-[#21382c] disabled:cursor-not-allowed disabled:bg-[#a8a095] disabled:text-[#f4efe8]/90"
          >
            Buy Now
          </button>
          <button
            type="button"
            onClick={onViewDetails}
            className="text-[11px] uppercase tracking-[0.2em] text-[#4f473f] underline decoration-black/10 underline-offset-4 transition-opacity duration-200 hover:opacity-70"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={() => toggleCollection(item.slug)}
            className={`text-[11px] uppercase tracking-[0.18em] transition-opacity duration-200 hover:opacity-70 ${
              isWishlisted ? "text-[#2e4a36]" : "text-[#5d5449]"
            }`}
          >
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </article>
  );
}
