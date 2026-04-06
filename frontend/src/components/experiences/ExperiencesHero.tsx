import Link from "next/link";
import Image from "next/image";

export default function ExperiencesHero() {
  return (
    <section className="section-primary bg-[#F3EFE7] pb-[72px] md:pb-[96px]">
      <div className="page-container">
        <div className="relative overflow-hidden rounded-[34px] border border-[#d8cec1] bg-[#1f1c18]">
          <Image
            src="/images/seijaku_seasonal_drop_cinematic_banner.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_52%]"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(18,16,14,0.72) 0%, rgba(18,16,14,0.36) 42%, rgba(18,16,14,0.18) 100%), linear-gradient(to top, rgba(18,16,14,0.62) 0%, rgba(18,16,14,0.18) 42%, rgba(18,16,14,0.18) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 18% 24%, rgba(255,244,223,0.08), transparent 34%), radial-gradient(circle at 100% 100%, rgba(0,0,0,0.22), transparent 30%)",
            }}
          />

          <div className="relative z-[1] px-8 py-18 sm:px-12 sm:py-24 lg:px-16 lg:py-28">
            <div className="max-w-[700px]">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#d8c8aa]">Experiences</p>
              <h1 className="mt-5 max-w-[11ch] text-[clamp(44px,6.3vw,78px)] leading-[0.96] tracking-[-0.04em] text-[#f7f2ea]">
                Bengal, In Place and Form
              </h1>
              <p className="mt-7 max-w-[44ch] text-[16px] leading-[1.92] text-[rgba(247,242,234,0.86)] sm:text-[17px]">
                Seasonal immersions shaped by landscape, craft, ritual, memory, and the slower cultural encounters that
                emerge when one stays with place.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href="#retreat-gallery"
                  className="inline-flex items-center justify-center rounded-full border border-[#efe4d0]/20 bg-[#f3eee5] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#1d1b18] hover:bg-white"
                >
                  Explore Retreats
                </Link>
                <Link
                  href="#seasonal-drops"
                  className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f3e7d0] hover:text-white"
                >
                  <span>Explore Seasonal Drops</span>
                  <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
