import Link from "next/link";
import OurStoryHero from "./OurStoryHero";

type EditorialSectionProps = {
  children: React.ReactNode;
  className?: string;
  width?: string;
};

function EditorialSection({ children, className = "", width = "max-w-4xl" }: EditorialSectionProps) {
  return (
    <section className={className}>
      <div className="page-container">
        <div className={width}>{children}</div>
      </div>
    </section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-0 text-[#1c1c1c]">{children}</h2>;
}

const whyLines = [
  "Urban life is efficient.",
  "It is rarely intentional.",
  "Fragrance has become decorative.",
  "Gifting, transactional.",
  "Space, curated but restless.",
  "We design against drift.",
  "Scent as practice.",
  "Object as anchor.",
  "Ritual as continuity.",
  "Not ornament.",
  "Not intervention.",
  "Presence.",
];

const nameLines = [
  "Our name comes from the Japanese word for energised calm, tranquility within activity.",
  "At the heart of our mark:",
  "the juiful, jasmine, beloved by Tagore.",
  "Fragrant. Precise. Enduring.",
  "Bengal is not reference.",
  "It is foundation.",
  "Terracotta shaped by hand.",
  "Seasonal collections moving with Hemanta.",
  "Immersions across craft landscapes.",
  "Material carries memory.",
  "Ritual gives it form.",
];

const deliberateLines = [
  "You notice light.",
  "You arrange space.",
  "You mark the shift of seasons.",
  "You gift with meaning.",
  "Our objects are meant to be used.",
  "Returned to.",
  "Lived with.",
];

const pathways = [
  {
    title: "Objects of Stillness",
    body: "Design-led scent and tactile forms. Made to anchor space.",
    href: "/lifestyle",
    linkText: "Explore Objects of Stillness",
  },
  {
    title: "Guided Rituals",
    body: "Short multisensory practices. Released monthly. Designed for return.",
    href: "/ritual",
    linkText: "Enter Guided Rituals",
  },
  {
    title: "Immersive Retreats",
    body: "Seasonal, small-cohort immersions. Craft. Movement. Stillness.",
    href: "/experiences",
    linkText: "View Immersive Retreats",
  },
];

const heldItems = ["Literature", "Material", "Scent", "Season"];

const testimonials = [
  {
    quote: "A Seijaku object changes the room without announcing itself.",
    name: "A. Chatterjee",
    title: "Reader and Collector",
  },
  {
    quote: "The ritual felt less like an event and more like a return to attention.",
    name: "R. Sen",
    title: "Program Participant",
  },
  {
    quote: "Everything carries a sense of thought, season, and lived use.",
    name: "M. Dutta",
    title: "Gift Recipient",
  },
];

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
      <OurStoryHero />

      <EditorialSection className="bg-[#eee7dc] py-16 sm:py-18 lg:py-20" width="max-w-3xl">
        <SectionHeading>Why Seijaku</SectionHeading>
        <div className="mt-7 space-y-2.5 text-[16px] font-light leading-[1.84] text-[#4f4943] sm:text-[17px] lg:text-[18px]">
          {whyLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </EditorialSection>

      <section className="bg-[#F3EFE7] py-18 sm:py-20 lg:py-22">
        <div className="page-container max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-3xl">
              <SectionHeading>Seijaku</SectionHeading>
              <div className="mt-7 space-y-3 text-[16px] font-light leading-[1.84] text-[#5d574e] sm:text-[17px] lg:text-[18px]">
                {nameLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            <div className="lg:pt-1">
              <div className="relative overflow-hidden rounded-[24px]">
                <div className="relative aspect-[4/5] sm:aspect-[4/4.6] lg:aspect-[4/5]">
                  <img
                    src="/images/seijaku sec img 2.png"
                    alt="Editorial image representing Seijaku's cultural foundation"
                    className="h-full w-full object-cover object-[center_48%]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(20,18,16,0.22) 0%, rgba(20,18,16,0.04) 28%, rgba(20,18,16,0) 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditorialSection className="bg-[#F3EFE7] py-16 sm:py-18 lg:py-20" width="max-w-3xl">
        <SectionHeading>For Those Who Live Deliberately</SectionHeading>
        <div className="mt-7 space-y-3 text-[16px] font-light leading-[1.85] text-[#5d574e] sm:text-[17px] lg:text-[18px]">
          {deliberateLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </EditorialSection>

      <section className="bg-[#ece5da] py-16 sm:py-18 lg:py-20">
        <div className="page-container max-w-[1200px]">
          <div className="max-w-3xl">
            <SectionHeading>Three Pathways</SectionHeading>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {pathways.map((pathway) => (
              <article key={pathway.title} className="rounded-[22px] bg-[#f6f1e9] px-6 py-7 sm:px-7 sm:py-8">
                <h3 className="mt-0 font-serif text-[28px] leading-[1.12] tracking-[-0.02em] text-[#1c1c1c] sm:text-[30px]">
                  {pathway.title}
                </h3>
                <p className="mt-4 text-[16px] font-light leading-[1.82] text-[#5d574e]">{pathway.body}</p>
                <Link
                  href={pathway.href}
                  className="mt-6 inline-flex text-[13px] font-normal tracking-[0.04em] text-[#2e4a36] hover:underline"
                >
                  {pathway.linkText}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="whatWeHold">
        <div className="whatWeHold__inner">
          <h2 className="whatWeHold__title">What We Hold</h2>

          <div className="whatWeHold__pillars">
            {heldItems.map((item) => (
              <div key={item} className="whatWeHold__pillar">
                {item}
              </div>
            ))}
          </div>

          <div className="whatWeHold__statement">
            <p>Calm, not cure.</p>
            <p>Continuity, not intensity.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EFE7] py-16 sm:py-18 lg:py-20">
        <div className="page-container max-w-[1200px]">
          <div className="max-w-3xl">
            <SectionHeading>In Their Words</SectionHeading>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-12">
            {testimonials.map((item) => (
              <article key={item.name} className="max-w-[34ch]">
                <p className="font-serif text-[26px] leading-[1.46] tracking-[-0.02em] text-[#1c1c1c] sm:text-[28px]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-6 text-[14px] leading-[1.8] text-[#4f4943]">{item.name}</p>
                <p className="text-[14px] font-light leading-[1.8] text-[#7a7268]">{item.title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ece5da] py-18 sm:py-20 lg:py-22">
        <div className="page-container">
          <div className="max-w-3xl">
            <SectionHeading>Begin Anywhere</SectionHeading>
            <div className="mt-6 space-y-2 text-[16px] font-light leading-[1.84] text-[#5d574e] sm:text-[17px] lg:text-[18px]">
              <p>With a scent.</p>
              <p>With a page.</p>
              <p>With a season.</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-10">
            <Link
              href="/lifestyle"
              className="text-[13px] font-normal tracking-[0.05em] text-[#2e4a36] hover:underline"
            >
              Explore Objects of Stillness
            </Link>
            <Link
              href="/ritual"
              className="text-[13px] font-normal tracking-[0.05em] text-[#2e4a36] hover:underline"
            >
              Enter Guided Rituals
            </Link>
            <Link
              href="/experiences"
              className="text-[13px] font-normal tracking-[0.05em] text-[#2e4a36] hover:underline"
            >
              View Immersive Retreats
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
