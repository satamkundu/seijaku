import type {
  ShopAudience,
  ShopAvailability,
  ShopCollection,
  ShopFormat,
  ShopItemType,
} from "@/src/lib/shopAllItems";

type FilterSelections = {
  types: ShopItemType[];
  audiences: ShopAudience[];
  availability: ShopAvailability[];
  collections: ShopCollection[];
  formats: ShopFormat[];
};

type FilterGroup = "types" | "audiences" | "availability" | "collections" | "formats";

type FilterPanelProps = {
  selections: FilterSelections;
  onToggle: (group: FilterGroup, value: string) => void;
  minPrice: number | null;
  maxPrice: number | null;
  onMinPriceChange: (value: number | null) => void;
  onMaxPriceChange: (value: number | null) => void;
  onClear: () => void;
  compact?: boolean;
};

const typeOptions: ShopItemType[] = ["Box / Set", "Individual Object", "Seasonal Drop", "Program", "Retreat"];
const audienceOptions: ShopAudience[] = ["Elderly", "Adults", "Teenagers", "All Ages"];
const availabilityOptions: ShopAvailability[] = [
  "In Stock",
  "Limited Edition",
  "Upcoming",
  "Open for Booking",
  "Sold Out",
  "Waitlist",
];
const collectionOptions: ShopCollection[] = ["Hemanta", "Seasonal Drop", "Core Collection"];
const formatOptions: ShopFormat[] = ["Physical", "Digital", "In-Person"];

function FilterSection({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#8c7a68]">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-full px-3 py-1.5 text-[11px] transition-colors duration-300 ${
                isActive ? "bg-[#efe6d8] text-[#2f2924]" : "bg-[#f8f3ea] text-[#6f6458] hover:text-[#3d3731]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterPanel({
  selections,
  onToggle,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
  compact = false,
}: FilterPanelProps) {
  return (
    <div className={`rounded-[20px] bg-[#efe7da] ${compact ? "p-5" : "p-6"}`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#5b5043]">Filters</p>
        <button
          type="button"
          onClick={onClear}
          className="text-[10px] uppercase tracking-[0.18em] text-[#6e6254] underline decoration-black/15 underline-offset-4"
        >
          Clear Filters
        </button>
      </div>

      <div className="mt-5 space-y-6">
        <FilterSection
          title="Type"
          options={typeOptions}
          selected={selections.types}
          onToggle={(value) => onToggle("types", value)}
        />
        <FilterSection
          title="Audience"
          options={audienceOptions}
          selected={selections.audiences}
          onToggle={(value) => onToggle("audiences", value)}
        />
        <FilterSection
          title="Availability"
          options={availabilityOptions}
          selected={selections.availability}
          onToggle={(value) => onToggle("availability", value)}
        />
        <FilterSection
          title="Season / Collection"
          options={collectionOptions}
          selected={selections.collections}
          onToggle={(value) => onToggle("collections", value)}
        />
        <FilterSection
          title="Format"
          options={formatOptions}
          selected={selections.formats}
          onToggle={(value) => onToggle("formats", value)}
        />

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8c7a68]">Price range</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input
              type="number"
              min={0}
              value={minPrice ?? ""}
              onChange={(event) => onMinPriceChange(event.target.value ? Number(event.target.value) : null)}
              placeholder="Min"
              className="w-full rounded-[12px] border border-[#d7ccbd] bg-[#f8f3ea] px-3 py-2 text-[13px] text-[#2e2923] outline-none placeholder:text-[#9a8d7d] focus-visible:border-[#8c7c6b]"
            />
            <input
              type="number"
              min={0}
              value={maxPrice ?? ""}
              onChange={(event) => onMaxPriceChange(event.target.value ? Number(event.target.value) : null)}
              placeholder="Max"
              className="w-full rounded-[12px] border border-[#d7ccbd] bg-[#f8f3ea] px-3 py-2 text-[13px] text-[#2e2923] outline-none placeholder:text-[#9a8d7d] focus-visible:border-[#8c7c6b]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
