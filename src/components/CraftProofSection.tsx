import Image from "next/image";
import Link from "next/link";

const proofTiles = [
  "Heritage craft, contemporary design",
  "Direct collaboration with Bengal artisans",
  "Limited-run collectibles",
];

export default function CraftProofSection() {
  return (
    <section className="section-editorial bg-[#F3EFE7] pt-0">
      <div className="page-container">
        <section className="relative overflow-hidden rounded-[30px] border border-[#d8cec1] bg-[#ede6da] px-6 py-8 sm:px-8 md:px-10 md:py-10">
          <Image
            src="/images/local craft placeholder HP 1.png"
            alt="Local craft placeholder showing artisan work in Bengal."
            fill
            sizes="100vw"
            className="object-cover object-[center_34%] opacity-[0.62] saturate-[0.94] contrast-[0.96] brightness-[0.92]"
          />

          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(243,239,231,0.76)_0%,rgba(243,239,231,0.56)_38%,rgba(243,239,231,0.24)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(239,232,222,0.02)_38%,rgba(230,220,206,0.10)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-[42%] bg-[radial-gradient(circle_at_70%_36%,rgba(140,108,76,0.10)_0%,rgba(140,108,76,0.03)_28%,transparent_64%)]"
          />

          <div className="relative z-10">
            <div className="max-w-[760px]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f7455]">Local Craft Focus</p>
              <h2 className="mt-4 text-[#1f1d1a]">Handcrafted Fragrance Objects with Artisans in Bengal</h2>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.82] text-[#61584f]">
                Handcrafted dokra metalwork, textiles, ceramics, and scent objects from Bengal made in small,
                sustainable batches.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {proofTiles.map((tile) => (
                <div key={tile} className="rounded-[22px] border border-[#d7ccbd]/80 bg-[#f7f2ea]/80 px-5 py-5 backdrop-blur-[1px]">
                  <p className="font-serif text-[24px] leading-[1.22] text-[#2e2822]">{tile}</p>
                </div>
              ))}
            </div>

            <Link
              href="/our-story"
              className="mt-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#516054] transition-colors duration-200 hover:text-[#1f2a21]"
            >
              <span>Discover our craft traditions</span>
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}

