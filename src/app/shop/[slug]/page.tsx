import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getShopItemBySlug, shopAllItems } from "@/src/lib/shopAllItems";

type ShopDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return shopAllItems.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ShopDetailPage({ params }: ShopDetailPageProps) {
  const { slug } = await params;
  const item = getShopItemBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f3efe7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
      <section className="section-primary">
        <div className="page-container max-w-[1180px]">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#ddd1c1]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={`${item.id}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#ddd1c1]">
                    <Image
                      src={item.image}
                      alt={`${item.title} view ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 18vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8f7a65]">{item.category}</p>
              <h1 className="mt-4 max-w-[14ch] text-[clamp(38px,4.6vw,56px)] leading-[1.06] tracking-[-0.025em] text-[#1f1a16]">
                {item.title}
              </h1>
              <p className="mt-4 text-[15px] leading-[1.85] text-[#5f5850]">{item.shortDescription}</p>
              <p className="mt-6 text-[18px] text-[#2f2924]">{item.status === "Open for Booking" ? "Booking Open" : item.priceLabel}</p>

              <div className="mt-7 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={`${item.id}-${tag}`} className="rounded-full bg-[#eee5d8] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#6f6357]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-[18px] bg-[#efe7da] px-6 py-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#897865]">Who it is for</p>
                <p className="mt-2 text-[14px] leading-[1.8] text-[#5d554b]">{item.audience}</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#897865]">Format</p>
                <p className="mt-2 text-[14px] leading-[1.8] text-[#5d554b]">{item.format}</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#897865]">Collection</p>
                <p className="mt-2 text-[14px] leading-[1.8] text-[#5d554b]">{item.collection}</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#897865]">Status</p>
                <p className="mt-2 text-[14px] leading-[1.8] text-[#5d554b]">{item.status}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-[#b9ab97] px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-[#2f2924] transition-colors duration-300 hover:border-[#8f7f6c] hover:bg-[#f7f1e8]"
                >
                  {item.ctaLabel}
                </button>
                <Link
                  href="/shop-all"
                  className="inline-flex items-center text-[11px] uppercase tracking-[0.18em] text-[#4a433c] underline decoration-black/15 underline-offset-4"
                >
                  Back to Shop All
                </Link>
              </div>

              <div className="mt-10 border-t border-black/8 pt-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#897865]">Description</p>
                <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.9] text-[#5f5850]">
                  {item.longDescription ||
                    "Detailed editorial description, includes, and booking or checkout specifics can be expanded here."}
                </p>
                <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[#897865]">FAQs / Notes</p>
                <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.9] text-[#5f5850]">
                  Availability, shipping, waitlist notes, and schedule details can be configured per item type.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
