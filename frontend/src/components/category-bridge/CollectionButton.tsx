"use client";

import { useState } from "react";

type CollectionButtonProps = {
  itemName: string;
};

export default function CollectionButton({ itemName }: CollectionButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={isAdded}
      aria-label={isAdded ? `${itemName} added to collection` : `Add ${itemName} to collection`}
      onClick={() => setIsAdded((current) => !current)}
      className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
        isAdded
          ? "border-[#2e4a36] bg-[#2e4a36] text-[#f4efe8]"
          : "border-[#cbbfaf] text-[#4c443c] hover:border-[#9d8c79] hover:bg-[#f5efe6]"
      }`}
    >
      {isAdded ? "Added to Collection" : "Add to Collection"}
    </button>
  );
}
