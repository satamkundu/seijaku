"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import CategoryTabs from "@/src/components/shop-all/CategoryTabs";
import FeaturedCollectionCallout from "@/src/components/shop-all/FeaturedCollectionCallout";
import FilterPanel from "@/src/components/shop-all/FilterPanel";
import ProductCard from "@/src/components/shop-all/ProductCard";
import ShopHero from "@/src/components/shop-all/ShopHero";
import SortDropdown from "@/src/components/shop-all/SortDropdown";
import {
  shopAllItems,
  shopTopCategories,
  sortOptions,
  type ShopAudience,
  type ShopAvailability,
  type ShopCollection,
  type ShopFormat,
  type ShopItem,
  type ShopItemType,
  type ShopSortOption,
  type ShopTopCategory,
} from "@/src/lib/shopAllItems";

type FilterSelections = {
  types: ShopItemType[];
  audiences: ShopAudience[];
  availability: ShopAvailability[];
  collections: ShopCollection[];
  formats: ShopFormat[];
};

const initialSelections: FilterSelections = {
  types: [],
  audiences: [],
  availability: [],
  collections: [],
  formats: [],
};

function sortItems(items: ShopItem[], sortBy: ShopSortOption) {
  const list = [...items];

  if (sortBy === "Alphabetical") {
    return list.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortBy === "Newest") {
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  if (sortBy === "Price: Low to High") {
    return list.sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER));
  }

  if (sortBy === "Price: High to Low") {
    return list.sort((a, b) => (b.price ?? Number.MIN_SAFE_INTEGER) - (a.price ?? Number.MIN_SAFE_INTEGER));
  }

  return list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
}

export default function ShopAllPage() {
  const [activeCategory, setActiveCategory] = useState<ShopTopCategory>("All");
  const [sortBy, setSortBy] = useState<ShopSortOption>("Featured");
  const [selections, setSelections] = useState<FilterSelections>(initialSelections);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const filteredItems = useMemo(() => {
    const base = shopAllItems.filter((item) => activeCategory === "All" || item.category === activeCategory);

    const refined = base.filter((item) => {
      const byType = selections.types.length === 0 || selections.types.includes(item.type);
      const byAudience = selections.audiences.length === 0 || selections.audiences.includes(item.audience);
      const byAvailability = selections.availability.length === 0 || selections.availability.includes(item.status);
      const byCollection = selections.collections.length === 0 || selections.collections.includes(item.collection);
      const byFormat = selections.formats.length === 0 || selections.formats.includes(item.format);
      const byMinPrice = minPrice === null || (item.price !== null && item.price >= minPrice);
      const byMaxPrice = maxPrice === null || (item.price !== null && item.price <= maxPrice);

      return byType && byAudience && byAvailability && byCollection && byFormat && byMinPrice && byMaxPrice;
    });

    return sortItems(refined, sortBy);
  }, [activeCategory, maxPrice, minPrice, selections, sortBy]);

  const featuredCallouts = [
    {
      title: "Hemanta / Seasonal Drop",
      description: "Limited editions shaped by season, light, and quiet ritual.",
      href: "/seasonaldrops",
      cta: "Explore the Drop",
    },
    {
      title: "Ritual Boxes & Gift Sets",
      description: "Composed sets for gifting, transition, and repeated daily rhythm.",
      href: "/lifestyle",
      cta: "View Gift Sets",
    },
    {
      title: "Programs & Retreats",
      description: "Guided formats for deeper practice across life stages.",
      href: "/programs",
      cta: "Browse Programs",
    },
  ];

  const toggleSelection = (group: keyof FilterSelections, value: string) => {
    setSelections((prev) => {
      const current = prev[group] as string[];
      const next = current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value];

      return { ...prev, [group]: next } as FilterSelections;
    });
  };

  const clearFilters = () => {
    setSelections(initialSelections);
    setMinPrice(null);
    setMaxPrice(null);
    setActiveCategory("All");
    setSortBy("Featured");
  };

  return (
    <main className="min-h-screen bg-[#f3efe7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
        <ShopHero />
      </motion.div>

      <section className="sticky top-[72px] z-30 border-y border-black/5 bg-[#f3efe7]/92 py-4 backdrop-blur-sm sm:top-[76px]">
        <div className="page-container max-w-[1220px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CategoryTabs categories={shopTopCategories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
              <div className="flex items-center gap-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#7f7367]">{filteredItems.length} items</p>
                <SortDropdown options={sortOptions} value={sortBy} onChange={setSortBy} />
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="rounded-full border border-[#d7ccbd] px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-[#3b342d] lg:hidden"
                >
                  Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-secondary pb-0 pt-8">
        <div className="page-container max-w-[1220px]">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredCallouts.map((block) => (
              <FeaturedCollectionCallout
                key={block.title}
                title={block.title}
                description={block.description}
                href={block.href}
                cta={block.cta}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-primary pt-10">
        <div className="page-container max-w-[1220px]">
          <div className="grid gap-8 lg:grid-cols-[290px_1fr] lg:gap-10">
            <aside className="hidden lg:block">
              <div className="sticky top-[172px]">
                <FilterPanel
                  selections={selections}
                  onToggle={toggleSelection}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onMinPriceChange={setMinPrice}
                  onMaxPriceChange={setMaxPrice}
                  onClear={clearFilters}
                />
              </div>
            </aside>

            <div>
              {filteredItems.length === 0 ? (
                <div className="rounded-[22px] bg-[#ede4d6] px-7 py-10 sm:px-10 sm:py-12">
                  <p className="font-serif text-[clamp(28px,3vw,36px)] leading-[1.14] tracking-[-0.02em] text-[#1f1a16]">
                    No offerings match these filters.
                  </p>
                  <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.85] text-[#5f5850]">
                    Try broadening your selection or return to the full collection.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-7 text-[11px] uppercase tracking-[0.18em] text-[#3f3831] underline decoration-black/20 underline-offset-4"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-12%" }}
                      transition={{ duration: 0.45 }}
                    >
                      <ProductCard item={item} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsFilterDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[88vw] max-w-[380px] overflow-y-auto bg-[#f3eee5] p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#5b5043]">Filter offerings</p>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="text-[11px] uppercase tracking-[0.16em] text-[#5e5346]"
              >
                Close
              </button>
            </div>
            <FilterPanel
              compact
              selections={selections}
              onToggle={toggleSelection}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              onClear={clearFilters}
            />
          </div>
        </div>
      )}
    </main>
  );
}
