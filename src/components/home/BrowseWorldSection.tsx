import Link from "next/link";

const browseCards = [
  {
    category: "Skin",
    description: "Perfume for self and gifting",
    href: "/shop-all?category=Ritual+Boxes+%26+Gift+Sets",
  },
  {
    category: "Textiles",
    description: "Fragrance rituals for scarves, pocket squares, and cloth",
    href: "/lifestyle",
  },
  {
    category: "Home",
    description: "Diffusers, scented wax, and space-setting fragrance",
    href: "/seasonaldrops",
  },
  {
    category: "Objects",
    description: "Crafted scent artifacts in terracotta, ceramic, and metal",
    href: "/shop-all?category=Individual+Objects",
  },
] as const;

const ritualSteps = [
  {
    number: "01",
    title: "Choose a scent",
    href: "/shop-all?category=Ritual+Boxes+%26+Gift+Sets",
  },
  {
    number: "02",
    title: "Choose an artifact",
    href: "/shop-all?category=Individual+Objects",
  },
  {
    number: "03",
    title: "Follow a 2-minute ritual",
    href: "https://www.youtube.com/",
    external: true,
  },
] as const;

export default function BrowseWorldSection() {
  return (
    <section className="section-secondary bg-[#EAE3D8]">
      <div className="page-container">
        <div className="max-w-[820px]">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#a57f5b]">How scent finds its place</p>
          <h2 className="mt-4 whitespace-nowrap text-[clamp(22px,3.6vw,48px)] leading-[1.08] tracking-[-0.02em] text-[#1e1d1a]">
            Inside Seijaku: Fragrance Shapes Craft
          </h2>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.85] text-[#5c665e]">
            Begin with where the ritual lives: on skin, across textiles, within the home, or through crafted objects.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {browseCards.map((card) => (
            <Link
              key={card.category}
              href={card.href}
              className="group flex h-full flex-col rounded-[24px] border border-[#d8cec1] bg-[#faf7f1] px-6 py-7 shadow-[0_10px_28px_rgba(49,57,49,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(49,57,49,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#eae3d8]"
            >
              <div
                aria-hidden="true"
                className="h-[210px] rounded-[18px] border border-dashed border-[#d7ccbe] bg-[linear-gradient(180deg,rgba(247,242,233,0.95)_0%,rgba(241,235,226,0.92)_100%)]"
              />
              <h3 className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[clamp(30px,3vw,38px)] leading-[1.02] tracking-[-0.03em] text-[#2b2520]">
                <span className="text-[0.4em] font-medium uppercase tracking-[0.22em] text-[#9d7f61] [font-variant-caps:all-small-caps]">
                  For
                </span>
                <span>{card.category}</span>
              </h3>
              <p className="mt-4 max-w-[24ch] text-[15px] leading-[1.82] text-[#70675e]">{card.description}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#46554b]">
                <span>Explore</span>
                <span aria-hidden className="text-[13px] leading-none transition-transform duration-300 group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-[28px] border border-[#d8cec1] bg-[#f8f3ea]/88 px-6 py-6 shadow-[0_10px_30px_rgba(49,57,49,0.03)] sm:px-7">
          <div className="max-w-[720px]">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#a57f5b]">How it works</p>
            <h3 className="mt-3 text-[clamp(16px,2vw,32px)] leading-[1.12] tracking-[-0.01em] text-[#1e1d1a]">
              Seijaku means <em>active calm</em>. Find your calm amidst everyday chaos.
            </h3>
          </div>
          <ol className="mt-7 grid gap-4 md:grid-cols-3">
            {ritualSteps.map((step) => {
              const cardClasses =
                "group flex h-full flex-col rounded-[20px] border border-[#dfd4c6] bg-[#fbf8f3] px-5 py-4 text-left text-[#4f473f] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(49,57,49,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f3ea]";

              const content = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#9a7a5c]">{step.number}</p>
                    <div
                      aria-hidden="true"
                      className="h-24 w-24 shrink-0 rounded-full border border-dashed border-[#d3c5b5] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.7),rgba(241,234,223,0.92)_62%,rgba(232,222,209,0.96)_100%)] sm:h-28 sm:w-28"
                    />
                  </div>
                  <p className="mt-5 max-w-[18ch] text-[15px] leading-[1.75] text-[#37312c]">{step.title}</p>
                </>
              );

              return (
                <li key={step.title}>
                  {step.external ? (
                    <a href={step.href} target="_blank" rel="noreferrer" className={cardClasses}>
                      {content}
                    </a>
                  ) : (
                    <Link href={step.href} className={cardClasses}>
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

