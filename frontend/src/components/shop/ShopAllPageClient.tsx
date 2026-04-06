"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  getShopMaterials,
  getShopProductBySlug,
  getShopProductReleaseDate,
  getShopProductUseCase,
  getShopTypes,
  getShopUseCases,
  matchesShopMaterialFilter,
  matchesShopTypeFilter,
  shopProducts,
  type ShopMaterialFilterOption,
  type ShopProduct,
  type ShopSortOption,
  type ShopTypeFilterOption,
  type ShopUseCase,
} from "@/src/lib/shopAllItems";

import ActiveFilterChips from "./ActiveFilterChips";
import CompactProductCard from "./CompactProductCard";
import ProductDetailDrawer from "./ProductDetailDrawer";
import ShopToolbar from "./ShopToolbar";

const INITIAL_BATCH_SIZE = 8;
const LOAD_MORE_STEP = 8;

function sortProducts(items: ShopProduct[], sortBy: ShopSortOption) {
  const list = [...items];

  if (sortBy === "Newest") {
    return list.sort((a, b) => new Date(getShopProductReleaseDate(b)).getTime() - new Date(getShopProductReleaseDate(a)).getTime());
  }

  if (sortBy === "Price low to high") {
    return list.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "Price high to low") {
    return list.sort((a, b) => b.price - a.price);
  }

  return list;
}

function matchesSearch(item: ShopProduct, query: string) {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const haystack = [item.title, item.shortDescription, item.material, item.type]
    .filter((value): value is string => Boolean(value))
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}

export default function ShopAllPageClient() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState<ShopTypeFilterOption | "All">("All");
  const [selectedMaterial, setSelectedMaterial] = useState<ShopMaterialFilterOption | "All">("All");
  const [selectedUseCase, setSelectedUseCase] = useState<ShopUseCase | "All">("All");
  const [sortBy, setSortBy] = useState<ShopSortOption>("Recommended");
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE);
  const selectedSlug = searchParams.get("item");
  const selectedProduct: ShopProduct | null = selectedSlug ? getShopProductBySlug(selectedSlug) ?? null : null;

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

  const filteredProducts = useMemo(() => {
    const refined = shopProducts.filter((item) => {
      const itemUseCase = getShopProductUseCase(item);
      const bySearch = matchesSearch(item, searchValue);
      const byType = matchesShopTypeFilter(item, selectedType);
      const byMaterial = matchesShopMaterialFilter(item, selectedMaterial);
      const byUseCase = selectedUseCase === "All" || itemUseCase === selectedUseCase;

      return bySearch && byType && byMaterial && byUseCase;
    });

    return sortProducts(refined, sortBy);
  }, [searchValue, selectedMaterial, selectedType, selectedUseCase, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleProducts.length < filteredProducts.length;

  const activeChips = useMemo(() => {
    const chips: Array<{ id: string; label: string }> = [];

    if (searchValue.trim()) {
      chips.push({ id: "search", label: `Search: ${searchValue.trim()}` });
    }

    if (selectedType !== "All") {
      chips.push({ id: "type", label: selectedType });
    }

    if (selectedMaterial !== "All") {
      chips.push({ id: "material", label: selectedMaterial });
    }

    if (selectedUseCase !== "All") {
      chips.push({ id: "useCase", label: selectedUseCase });
    }

    return chips;
  }, [searchValue, selectedMaterial, selectedType, selectedUseCase]);

  const resetFilters = () => {
    setSearchValue("");
    setSelectedType("All");
    setSelectedMaterial("All");
    setSelectedUseCase("All");
    setSortBy("Recommended");
    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  const removeChip = (chipId: string) => {
    if (chipId === "search") {
      setSearchValue("");
    }

    if (chipId === "type") {
      setSelectedType("All");
    }

    if (chipId === "material") {
      setSelectedMaterial("All");
    }

    if (chipId === "useCase") {
      setSelectedUseCase("All");
    }

    setVisibleCount(INITIAL_BATCH_SIZE);
  };

  return (
    <>
      <main className="min-h-screen bg-[#f3efe7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
        <section className="section-primary pb-6 pt-18 sm:pb-7 sm:pt-22">
          <div className="page-container max-w-[1180px]">
            <div className="max-w-[700px]">
              <p className="text-[9px] uppercase tracking-[0.32em] text-[#9a785d]">Collection</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div>
                  <h1 className="text-[clamp(34px,4.2vw,50px)] leading-[1.04] tracking-[-0.03em] text-[#1d1a17]">Shop All</h1>
                  <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.82] text-[#5f584f]">
                    A searchable Seijaku catalog designed for quick scanning, quieter comparison, and detail on demand.
                  </p>
                </div>
                <p className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-[#7c7368]">{filteredProducts.length} results</p>
              </div>
              <ActiveFilterChips chips={activeChips} onRemove={removeChip} onClear={resetFilters} />
            </div>
          </div>
        </section>

        <ShopToolbar
          searchValue={searchValue}
          onSearchChange={(value) => {
            setSearchValue(value);
            setVisibleCount(INITIAL_BATCH_SIZE);
          }}
          selectedType={selectedType}
          onTypeChange={(value) => {
            setSelectedType(value);
            setVisibleCount(INITIAL_BATCH_SIZE);
          }}
          selectedMaterial={selectedMaterial}
          onMaterialChange={(value) => {
            setSelectedMaterial(value);
            setVisibleCount(INITIAL_BATCH_SIZE);
          }}
          selectedUseCase={selectedUseCase}
          onUseCaseChange={(value) => {
            setSelectedUseCase(value);
            setVisibleCount(INITIAL_BATCH_SIZE);
          }}
          sortBy={sortBy}
          onSortChange={(value) => {
            setSortBy(value);
            setVisibleCount(INITIAL_BATCH_SIZE);
          }}
          types={getShopTypes()}
          materials={getShopMaterials()}
          useCases={getShopUseCases()}
          onReset={resetFilters}
        />

        <section className="section-primary pt-10 sm:pt-12">
          <div className="page-container max-w-[1180px]">
            {visibleProducts.length === 0 ? (
              <div className="rounded-[28px] border border-[rgba(111,100,86,0.11)] bg-[linear-gradient(180deg,#fbf8f2_0%,#f7f1e8_100%)] px-7 py-10 text-center sm:px-10 sm:py-12">
                <p className="font-serif text-[30px] leading-[1.14] tracking-[-0.02em] text-[#1f1a16]">No products match this quiet.</p>
                <p className="mx-auto mt-4 max-w-[34ch] text-[15px] leading-[1.85] text-[#5f5850]">
                  Try broadening the filters or clearing the search to return to the full catalog.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {visibleProducts.map((item) => (
                    <CompactProductCard key={item.slug} item={item} onViewDetails={updateQuery} />
                  ))}
                </div>

                {hasMore ? (
                  <div className="mt-12 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
                      className="inline-flex items-center justify-center rounded-full border border-[rgba(111,100,86,0.14)] bg-[linear-gradient(180deg,#fbf8f2_0%,#f3ede4_100%)] px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#4c443c] transition-colors duration-200 hover:border-[rgba(96,86,74,0.22)] hover:bg-[#faf7f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c7b68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3efe7]"
                    >
                      Load More
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>
      </main>

      <ProductDetailDrawer item={selectedProduct} isOpen={Boolean(selectedProduct)} onClose={() => updateQuery()} />
    </>
  );
}
