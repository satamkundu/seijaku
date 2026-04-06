"use client";

import { ChevronDown, Search } from "lucide-react";

import type {
  ShopMaterialFilterOption,
  ShopSortOption,
  ShopTypeFilterOption,
  ShopUseCase,
} from "@/src/lib/shopAllItems";

type ShopToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedType: ShopTypeFilterOption | "All";
  onTypeChange: (value: ShopTypeFilterOption | "All") => void;
  selectedMaterial: ShopMaterialFilterOption | "All";
  onMaterialChange: (value: ShopMaterialFilterOption | "All") => void;
  selectedUseCase: ShopUseCase | "All";
  onUseCaseChange: (value: ShopUseCase | "All") => void;
  sortBy: ShopSortOption;
  onSortChange: (value: ShopSortOption) => void;
  types: ShopTypeFilterOption[];
  materials: ShopMaterialFilterOption[];
  useCases: ShopUseCase[];
  onReset: () => void;
};

function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  includeAll = true,
}: {
  label: string;
  value: T | "All";
  onChange: (value: T | "All") => void;
  options: T[];
  includeAll?: boolean;
}) {
  return (
    <label className="flex min-w-[170px] flex-col gap-2.5 text-[9px] uppercase tracking-[0.28em] text-[#7b7064]">
      <span className="pl-3">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as T | "All")}
          className="h-[54px] w-full appearance-none rounded-[22px] border border-[rgba(111,100,86,0.14)] bg-[linear-gradient(180deg,#fcfaf5_0%,#f3ede4_100%)] px-5 pr-12 text-[11px] font-medium uppercase tracking-[0.18em] text-[#342d26] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] outline-none transition-all duration-200 hover:border-[rgba(96,86,74,0.22)] hover:bg-[#fcf8f2] focus:border-[#8c7b68] focus:bg-[#fcfaf6] focus:shadow-[0_0_0_3px_rgba(175,160,137,0.14)]"
        >
          {includeAll ? <option value="All">All</option> : null}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          size={16}
          strokeWidth={1.4}
          className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#766b5d]"
        />
      </div>
    </label>
  );
}

export default function ShopToolbar({
  searchValue,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedMaterial,
  onMaterialChange,
  selectedUseCase,
  onUseCaseChange,
  sortBy,
  onSortChange,
  types,
  materials,
  useCases,
  onReset,
}: ShopToolbarProps) {
  return (
    <section className="sticky top-[72px] z-30 border-y border-[rgba(76,67,57,0.06)] bg-[#f3efe7]/93 py-4 backdrop-blur-[14px] sm:top-[76px] sm:py-5">
      <div className="page-container max-w-[1180px]">
        <div className="rounded-[30px] border border-[rgba(111,100,86,0.1)] bg-[linear-gradient(180deg,rgba(250,246,239,0.96),rgba(243,236,227,0.96))] px-4 py-4 shadow-[0_10px_26px_rgba(54,45,34,0.05)] sm:px-5 sm:py-5 lg:px-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(250px,1.15fr)_repeat(4,minmax(150px,0.72fr))_auto] lg:items-end lg:gap-3 xl:gap-4">
            <label className="flex flex-col gap-2.5 text-[9px] uppercase tracking-[0.28em] text-[#7b7064]">
              <span className="pl-3">Search</span>
              <div className="relative">
                <Search
                  aria-hidden
                  size={16}
                  strokeWidth={1.5}
                  className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#766b5d]"
                />
                <input
                  type="search"
                  value={searchValue}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder="Search objects, scent, textile..."
                  className="h-[54px] w-full rounded-[22px] border border-[rgba(111,100,86,0.14)] bg-[linear-gradient(180deg,#fcfaf5_0%,#f3ede4_100%)] pl-12 pr-5 text-[13px] text-[#342d26] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] outline-none transition-all duration-200 placeholder:text-[#988c7e] hover:border-[rgba(96,86,74,0.22)] hover:bg-[#fcf8f2] focus:border-[#8c7b68] focus:bg-[#fcfaf6] focus:shadow-[0_0_0_3px_rgba(175,160,137,0.14)]"
                />
              </div>
            </label>

            <SelectField label="By Type" value={selectedType} onChange={onTypeChange} options={types} />
            <SelectField label="By Material" value={selectedMaterial} onChange={onMaterialChange} options={materials} />
            <SelectField label="By Use Case" value={selectedUseCase} onChange={onUseCaseChange} options={useCases} />
            <SelectField
              label="Sort"
              value={sortBy}
              onChange={(value) => {
                if (value !== "All") {
                  onSortChange(value);
                }
              }}
              options={["Recommended", "Newest", "Price low to high", "Price high to low"]}
              includeAll={false}
            />

            <button
              type="button"
              onClick={onReset}
              className="h-[54px] rounded-[22px] border border-[rgba(111,100,86,0.14)] px-5 text-[10px] uppercase tracking-[0.22em] text-[#4f463d] transition-all duration-200 hover:border-[rgba(96,86,74,0.22)] hover:bg-[#faf7f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c7b68] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3efe7]"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
