import type { ShopSortOption } from "@/src/lib/shopAllItems";

type SortDropdownProps = {
  value: ShopSortOption;
  onChange: (value: ShopSortOption) => void;
  options: readonly ShopSortOption[];
};

export default function SortDropdown({ value, onChange, options }: SortDropdownProps) {
  return (
    <label className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#8c7c6b]">
      <span>Sort</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as ShopSortOption)}
        className="rounded-full border border-[#d7ccbd] bg-[#f8f3ea] px-4 py-2.5 text-[11px] tracking-[0.12em] text-[#2e2923] outline-none transition-colors duration-300 hover:border-[#bcaf9c] focus-visible:border-[#8c7c6b]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
