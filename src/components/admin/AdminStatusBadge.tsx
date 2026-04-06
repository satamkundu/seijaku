export default function AdminStatusBadge({ value }: { value: string }) {
  const normalized = value.toUpperCase();
  const tone =
    normalized === "ACTIVE" || normalized === "PUBLISHED" || normalized === "IN_STOCK" || normalized === "BOOKING_OPEN"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : normalized === "DRAFT" || normalized === "REVIEWED"
        ? "bg-amber-100 text-amber-800 border-amber-200"
        : normalized === "CONTACTED" || normalized === "UPCOMING"
          ? "bg-sky-100 text-sky-800 border-sky-200"
          : "bg-stone-200 text-stone-700 border-stone-300";

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] ${tone}`}>
      {value.replaceAll("_", " ")}
    </span>
  );
}
