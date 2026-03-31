import Link from "next/link";

const proofTiles = [
  "Heritage craft, contemporary design",
  "Direct collaboration with Bengal artisans",
  "Limited-run handcrafted collectibles",
];

export default function CraftProofSection() {
  return (
    <section className="section-editorial bg-[#F3EFE7] pt-0">
      <div className="page-container">
        <section className="relative overflow-hidden rounded-[30px] border border-[#d8cec1] bg-[#ede6da] px-6 py-8 sm:px-8 md:px-10 md:py-10">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-[0.15] blur-[2px]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/videos/craft-artisan.mp4" type="video/mp4" />
          </video>

          <div aria-hidden className="absolute inset-0 bg-[rgba(245,241,232,0.85)]" />

          <div className="relative z-10">
            <div className="max-w-[760px]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f7455]">Artisan Craft + Impact</p>
              <h2 className="mt-4 text-[#1f1d1a]">Handcrafted Fragrance Objects with Artisans in Bengal</h2>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.82] text-[#61584f]">
                Handcrafted dokra metalwork, textiles, ceramics, and scent objects from Bengal \u2014 made in small,
                sustainable batches.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {proofTiles.map((tile) => (
                <div key={tile} className="rounded-[22px] border border-[#d7ccbd]/80 bg-[#f7f2ea]/88 px-5 py-5 backdrop-blur-[2px]">
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
      {/* TODO: Add the ambient background video file at /public/videos/craft-artisan.mp4. */}
    </section>
  );
}
