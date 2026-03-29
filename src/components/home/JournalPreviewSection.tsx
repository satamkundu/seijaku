import Image from "next/image";
import Link from "next/link";

const journalEntries = [
  {
    title: "How to scent textiles safely and beautifully",
    href: "/a-seijaku-life/on-materials-that-age-beautifully",
    category: "Textiles",
    image: "/images/Breath of Pines_Mockup 2.png",
    imageAlt: "Breath of Pines textile fragrance mockup styled in the Seijaku editorial language.",
    imageClassName: "object-cover object-center",
  },
  {
    title: "The calm ritual: a 2-minute evening reset",
    href: "/a-seijaku-life/ritual-objects-for-urban-evenings",
    category: "Rituals",
    image: "/images/Quiet Tea Ritual Box_lifestyle.JPG",
    imageAlt: "Quiet Tea Ritual Box arranged in a calm lifestyle setting.",
    imageClassName: "object-cover object-center",
  },
  {
    title: "Inside Dokra: from heritage to wearable artifacts",
    href: "/a-seijaku-life/bengal-in-place-and-form",
    category: "Materials",
    image: "/images/bell.jpeg",
    imageAlt: "A bell object photographed with warm material detail and artisanal character.",
    imageClassName: "object-cover object-center",
  },
] as const;

export default function JournalPreviewSection() {
  return (
    <section className="section-editorial bg-[#F3EFE7] pb-2">
      <div className="page-container">
        <div className="section-divider pt-10">
          <div className="max-w-[620px]">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#9a785d]">Editorial preview</p>
            <h2 className="mt-4 text-[#1c1c1c]">From the journal</h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {journalEntries.map((entry) => (
              <Link
                key={entry.title}
                href={entry.href}
                className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#d8cec1] bg-[#faf7f1] shadow-[0_8px_24px_rgba(45,38,28,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(45,38,28,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3efe7]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ddd1c1]">
                  <Image
                    src={entry.image}
                    alt={entry.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`${entry.imageClassName} transition-transform duration-700 ease-out group-hover:scale-[1.025]`}
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 py-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f7a65]">{entry.category}</p>
                  <h3 className="mt-5 text-[clamp(24px,2vw,30px)] leading-[1.14] tracking-[-0.018em] text-[#1f1a16] transition-opacity duration-300 group-hover:opacity-85">
                    {entry.title}
                  </h3>
                  <span className="mt-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#46554b]">
                    <span>Read entry</span>
                    <span aria-hidden className="text-[13px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#46554b] underline decoration-black/12 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3efe7]"
            >
              <span>Read all journal entries</span>
              <span aria-hidden className="text-[13px] leading-none">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
