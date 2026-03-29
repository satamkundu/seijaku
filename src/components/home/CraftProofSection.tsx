import Image from "next/image";
import Link from "next/link";

const proofPoints = [
  "Heritage technique, modern design",
  "Direct artisan collaboration",
  "Limited-run, collectible objects",
] as const;

export default function CraftProofSection() {
  return (
    <section className="section-editorial bg-[#F3EFE7]">
      <div className="page-container">
        <div className="section-divider pt-10">
          <div className="relative overflow-hidden rounded-[32px] border border-[#d8cec1] bg-[#f5efe5] px-6 py-8 shadow-[0_14px_36px_rgba(45,38,28,0.05)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="absolute inset-0">
              <div className="absolute inset-0">
                <Image
                  src="/images/seasonal-drop-character-before-clay.png"
                  alt=""
                  fill
                  priority={false}
                  sizes="(max-width: 768px) 100vw, 1240px"
                  className="object-cover object-center opacity-55"
                />
              </div>
              <video
                className="absolute inset-0 hidden h-full w-full object-cover motion-safe:block"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/seasonal-drop-character-before-clay.png"
                aria-hidden="true"
              >
                <source src="/videos/craft-provenance-loop.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,239,231,0.72)_0%,rgba(244,237,228,0.78)_28%,rgba(241,232,221,0.84)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.32),transparent_34%),radial-gradient(circle_at_78%_26%,rgba(214,196,170,0.18),transparent_32%)]" />
            </div>

            <div className="relative z-10">
              <div className="max-w-[680px]">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#9a785d]">Craft and provenance</p>
                <h2 className="mt-4 text-[#1c1c1c]">Crafted with artisans in Bengal</h2>
                <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.85] text-[#5f5850]">
                  Dokra metalwork, textiles, ceramics, and stone&#8212;made in small runs.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {proofPoints.map((point) => (
                  <article
                    key={point}
                    className="rounded-[22px] border border-[rgba(216,206,193,0.9)] bg-[rgba(250,247,241,0.86)] px-5 py-5 shadow-[0_8px_24px_rgba(45,38,28,0.04)] backdrop-blur-[2px]"
                  >
                    <p className="text-[15px] leading-[1.8] text-[#3f3a34]">{point}</p>
                  </article>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#46554b] underline decoration-black/12 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3efe7]"
                >
                  <span>Learn about our craft</span>
                  <span aria-hidden className="text-[13px] leading-none">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
