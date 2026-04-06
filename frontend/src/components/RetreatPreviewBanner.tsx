import Link from "next/link";

export default function RetreatPreviewBanner() {
  return (
    <section className="section-primary bg-[#F3EFE7]">
      <div className="page-container">
        <div className="section-divider grid gap-10 pt-12 md:grid-cols-[0.72fr_1fr] md:items-start md:gap-14">
          <div className="relative overflow-hidden rounded-[24px] bg-[#d9d0c1]">
            <div
              aria-hidden
              className="aspect-[4/5] w-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(236,229,218,0.12), rgba(77,91,73,0.08)), radial-gradient(circle at 30% 24%, rgba(255,255,255,0.35), transparent 34%), linear-gradient(135deg, #b8aa96 0%, #d8ccbc 35%, #a19a85 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-[22px] rounded-[18px] border border-white/35"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(0,0,0,0.02)), radial-gradient(circle at 70% 30%, rgba(68,91,67,0.14), transparent 28%)",
              }}
            />
            <div className="absolute bottom-6 left-6 right-6 text-[#f7f1e7]">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/75">Editorial Placeholder</p>
              <p className="mt-2 max-w-[16ch] font-serif text-[24px] leading-[1.1] text-white/92">
                Sundarban light studies
              </p>
            </div>
          </div>

          <div className="max-w-[520px]">
            <p className="text-[10px] uppercase tracking-[0.26em] text-[#9f7b5e]">Upcoming Retreat Preview</p>
            <h3 className="mt-5 font-serif text-[clamp(30px,3.3vw,42px)] leading-[1.08] tracking-[-0.02em] text-[#1f1d1a]">
              MeenMangal, Sundarban Tides
            </h3>
            <div className="mt-5 space-y-1 text-[15px] leading-[1.8] text-[#4f5b53]">
              <p>August 2026 (dates to be announced soon)</p>
              <p>12-15 participants</p>
            </div>
            <p className="mt-7 max-w-[34ch] text-[16px] leading-[1.9] text-[#5f5952]">
              A quiet river retreat shaped by tide, stillness, reading, and shared ritual.
            </p>
            <p className="mt-4 text-[13px] leading-[1.8] text-[#857b70]">Details released in phases.</p>
            <Link
              href="/retreats"
              className="mt-8 inline-flex rounded-full border border-[#d8cec1] bg-[#FAF7F1] px-6 py-4 text-sm font-medium text-[#1c1c1c] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(44,40,34,0.08)]"
            >
              Pre-book Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
