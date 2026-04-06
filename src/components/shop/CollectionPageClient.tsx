"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { canonicalShopRoutes, getShopProductBySlug } from "@/src/lib/shopAllItems";

import EditorialProductRow from "./EditorialProductRow";
import ProductDetailDrawer from "./ProductDetailDrawer";
import { useShopState } from "./ShopStateProvider";

export default function CollectionPageClient() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { collection } = useShopState();
  const items = useMemo(
    () => collection.map((slug) => getShopProductBySlug(slug)).filter((item): item is NonNullable<ReturnType<typeof getShopProductBySlug>> => Boolean(item)),
    [collection]
  );
  const selectedSlug = searchParams.get("item");
  const selectedItem = selectedSlug ? getShopProductBySlug(selectedSlug) ?? null : null;

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

  return (
    <>
      <main className="min-h-screen bg-[#f3efe7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
        <section className="section-primary pb-10 pt-24 sm:pt-28">
          <div className="page-container max-w-[980px]">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Collection</p>
            <h1 className="mt-5 text-[clamp(40px,5vw,60px)] leading-[1.04] tracking-[-0.03em] text-[#1d1a17]">Saved for Later</h1>
            <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.85] text-[#5f584f]">
              Your wishlisted objects remain here so you can compare calmly and move into checkout only when the choice feels clear.
            </p>
          </div>
        </section>

        <section className="section-primary pt-0">
          <div className="page-container max-w-[1180px]">
            {items.length === 0 ? (
              <div className="rounded-[30px] border border-[#d8cec1] bg-[#faf7f1] px-8 py-12 text-center">
                <p className="font-serif text-[32px] leading-[1.14] tracking-[-0.02em] text-[#1f1a16]">Your collection is quiet for now.</p>
                <p className="mx-auto mt-4 max-w-[36ch] text-[15px] leading-[1.85] text-[#625b53]">
                  Add products from any shop page and they will gather here without interrupting your browsing flow.
                </p>
                <Link
                  href={canonicalShopRoutes.shopAll}
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
                >
                  Return to Shop All
                </Link>
              </div>
            ) : (
              items.map((item, index) => (
                <EditorialProductRow key={item.slug} item={item} index={index} onViewDetails={updateQuery} />
              ))
            )}
          </div>
        </section>
      </main>

      <ProductDetailDrawer item={selectedItem} isOpen={Boolean(selectedItem)} onClose={() => updateQuery()} />
    </>
  );
}
