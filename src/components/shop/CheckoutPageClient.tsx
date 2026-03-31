"use client";

import Link from "next/link";

import { canonicalShopRoutes, getShopProductBySlug } from "@/src/lib/shopAllItems";

import { useShopState } from "./ShopStateProvider";

export default function CheckoutPageClient() {
  const { checkoutItemSlug, checkoutVariantLabel, clearCheckout } = useShopState();
  const item = checkoutItemSlug ? getShopProductBySlug(checkoutItemSlug) : null;

  if (!item) {
    return (
      <main className="min-h-screen bg-[#f3efe7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
        <section className="section-primary pt-24 sm:pt-28">
          <div className="page-container max-w-[900px] rounded-[30px] border border-[#d8cec1] bg-[#faf7f1] px-8 py-12 text-center">
            <p className="font-serif text-[34px] leading-[1.12] tracking-[-0.02em] text-[#1f1a16]">No item is ready for checkout yet.</p>
            <p className="mx-auto mt-4 max-w-[36ch] text-[15px] leading-[1.85] text-[#625b53]">
              Choose Buy Now from any product card or detail drawer and the selected object will arrive here ready to complete.
            </p>
            <Link
              href={canonicalShopRoutes.shopAll}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
            >
              Browse Shop All
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3efe7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
      <section className="section-primary pt-24 sm:pt-28">
        <div className="page-container grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[30px] border border-[#d8cec1] bg-[#faf7f1] p-8 sm:p-10">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Checkout</p>
            <h1 className="mt-5 max-w-[12ch] text-[clamp(38px,4vw,56px)] leading-[1.04] tracking-[-0.025em] text-[#1d1a17]">Complete your Seijaku order.</h1>
            <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.85] text-[#5f584f]">
              This route is intentionally minimal: your selected product is held here so the next step feels direct and unambiguous.
            </p>

            <div className="mt-10 space-y-4 rounded-[24px] bg-[#f2eadf] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8f7a65]">Selected product</p>
                  <p className="mt-2 font-serif text-[30px] leading-[1.1] tracking-[-0.02em] text-[#1f1a16]">{item.title}</p>
                </div>
                <p className="text-[16px] text-[#2f2924]">{item.priceLabel}</p>
              </div>
              <p className="max-w-[40ch] text-[14px] leading-[1.85] text-[#625b53]">{item.shortDescription}</p>
              {checkoutVariantLabel ? (
                <div className="rounded-[18px] border border-[rgba(111,100,86,0.12)] bg-[#faf7f1] px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8f7a65]">Selected option</p>
                  <p className="mt-2 text-[14px] leading-[1.7] text-[#4b433b]">{checkoutVariantLabel}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-[30px] border border-[#d8cec1] bg-[#eae3d8] p-8 sm:p-10">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8d7d6d]">Order summary</p>
            <div className="mt-6 space-y-4 text-[14px] leading-[1.8] text-[#5d554b]">
              <div className="flex items-center justify-between gap-4">
                <span>Product</span>
                <span>{item.priceLabel}</span>
              </div>
              {checkoutVariantLabel ? (
                <div className="flex items-start justify-between gap-4">
                  <span>Variant</span>
                  <span className="max-w-[16rem] text-right">{checkoutVariantLabel}</span>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-4">
                <span>Shipping</span>
                <span>Calculated at fulfillment</span>
              </div>
              <div className="h-px bg-black/8" />
              <div className="flex items-center justify-between gap-4 text-[16px] text-[#1f1a16]">
                <span>Total</span>
                <span>{item.priceLabel}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => clearCheckout()}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
            >
              Place Order Request
            </button>
            <p className="mt-4 text-[12px] leading-[1.8] text-[#6c6257]">
              This placeholder checkout confirms the routing and product-state flow. Payment capture can be layered in next.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
