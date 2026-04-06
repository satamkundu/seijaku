import type { ShopTopCategory } from "@/src/lib/shopAllItems";

type CategoryTabsProps = {
  categories: readonly ShopTopCategory[];
  activeCategory: ShopTopCategory;
  onCategoryChange: (category: ShopTopCategory) => void;
};

export default function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max items-center gap-1.5 rounded-full bg-[#ece4d7] p-1.5">
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`rounded-full px-3.5 py-2 text-[10px] uppercase tracking-[0.17em] transition-colors duration-300 sm:px-4 sm:text-[11px] ${
                isActive ? "bg-[#f9f5ed] text-[#1f1a16]" : "text-[#7d7368] hover:text-[#3f3933]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
