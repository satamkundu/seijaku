import Image from "next/image";
import Link from "next/link";

const ritualBoxes = [
  {
    name: "Dawn Reset Box",
    description:
      "A grounding morning composition of fragrance, textile, and reflective cues for a slower first hour.",
    includes: "Includes: diffuser stone, oil blend, handwoven cloth, ritual card set",
    price: "INR 6,800",
    image: "/images/Home Page hero image 1.png",
    imagePosition: "object-[center_48%]",
  },
  {
    name: "Reading Hour Set",
    description:
      "Built around page, scent, and pause to help reading become a repeatable evening ritual rather than an intention deferred.",
    includes: "Includes: incense tray, oil vial, brass bookmark, reading prompt folio",
    price: "INR 7,200",
    image: "/images/Hemanta drop HP banner 1.png",
    imagePosition: "object-[center_36%]",
  },
  {
    name: "Quiet Tea Ritual Box",
    description:
      "A composed tea-centred set for breath-led transitions between work, rest, and private stillness.",
    includes: "Includes: tea vessel pair, blend pouch, linen mat, seasonal note",
    price: "INR 8,400",
    image: "/images/Quiet Tea Ritual Box_lifestyle.JPG",
    imagePosition: "object-[center_34%]",
  },
  {
    name: "Evening Unwind Gift Set",
    description:
      "Designed for end-of-day softening through scent, tactile rhythm, and a short sensory close to the evening.",
    includes: "Includes: resin diffuser, brass tealight cup, cotton wrap, guided unwind card",
    price: "INR 5,900",
    image: "/images/Evening Unwind Set.png",
    imagePosition: "object-[center_52%]",
  },
];

const curationNotes = [
  {
    title: "Handcrafted",
    text: "Made in collaboration with artisans across Bengal.",
  },
  {
    title: "Composed",
    text: "Balanced scent, textile, metal, and story.",
  },
  {
    title: "Habit-Forming",
    text: "Designed for daily rhythm, not display.",
  },
];

const programPreviews = ["Adult Unwind", "Elder Reset", "Young Senses"];

export default function LifestylePage() {
  return (
    <main className="min-h-screen bg-[#F3EFE7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
      <section className="section-primary bg-[#F3EFE7]">
        <div className="page-container grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="max-w-[520px]">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Objects of Stillness</p>
            <h1 className="mt-5">Objects of Stillness</h1>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.82] text-[#5e584f]">
              Mindfully composed ritual boxes and fragrant gift sets — crafted with artisans and designed to anchor
              everyday ritual.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href="#ritual-boxes"
                className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
              >
                Explore Ritual Boxes
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#2e4a36] hover:text-[#1d3024]"
              >
                <span>Browse Individual Objects</span>
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-[420px] justify-self-center overflow-hidden rounded-[24px] border border-[#D8CEC1] bg-[#FAF7F1] p-3 shadow-[0_18px_40px_rgba(48,40,30,0.06)] md:max-w-[460px]">
            <div className="relative aspect-[4/4.9] overflow-hidden rounded-[20px]">
              <Image
                src="/images/Seijaku Lifestyle img 1.png"
                alt="A composed Seijaku ritual box arranged with scent, textile, and stillness objects."
                fill
                priority
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover object-[center_18%]"
              />
            </div>
            <div className="pointer-events-none absolute inset-x-7 bottom-7 rounded-[18px] border border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.08))] p-4 backdrop-blur-[1.5px] md:inset-x-8 md:bottom-8 md:p-5">
              <p className="max-w-[24ch] font-serif text-[22px] leading-[1.14] text-white md:text-[24px]">
                A ritual shaped for repetition, not ornament.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-editorial bg-[#EAE3D8]">
        <div className="page-container">
          <div className="section-divider grid gap-10 pt-10 md:grid-cols-3 md:gap-12">
            {curationNotes.map((item) => (
              <div key={item.title} className="max-w-[26ch]">
                <p className="font-serif text-[28px] leading-[1.15] tracking-[-0.02em] text-[#1c1c1c]">{item.title}</p>
                <p className="mt-3 text-[15px] leading-[1.82] text-[#625b53]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ritual-boxes" className="section-primary bg-[#F3EFE7]">
        <div className="page-container">
          <div className="section-divider pt-12">
            <div className="max-w-[620px]">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Featured Ritual Boxes</p>
              <h2 className="mt-4 text-[#1c1c1c]">Curated sets for slower daily rhythm</h2>
              <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.82] text-[#5e584f]">
                Each box is assembled to help scent, touch, and small acts return at the same hour each day.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {ritualBoxes.map((box) => (
                <article
                  key={box.name}
                  className="overflow-hidden rounded-[28px] border border-[#D8CEC1] bg-[#FAF7F1] shadow-[0_12px_30px_rgba(44,37,28,0.05)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={box.image}
                      alt={box.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className={`object-cover transition-transform duration-500 hover:scale-[1.02] ${box.imagePosition}`}
                    />
                  </div>
                  <div className="flex min-h-[300px] flex-col px-7 py-7">
                    <h3 className="font-serif text-[30px] leading-[1.1] tracking-[-0.02em] text-[#1c1c1c]">{box.name}</h3>
                    <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.78] text-[#5f584f]">{box.description}</p>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#8c7b69]">{box.includes}</p>
                    <p className="mt-6 text-[15px] font-normal text-[#716961]">{box.price}</p>
                    <div className="mt-auto flex flex-col items-start gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
                      <Link
                        href="/shop"
                        className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
                      >
                        View Set
                      </Link>
                      <Link
                        href="/shop"
                        className="text-[12px] uppercase tracking-[0.18em] text-[#5a5a5a] hover:text-[#2e4a36]"
                      >
                        Buy Items Individually &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-secondary bg-[#EAE3D8]">
        <div className="page-container">
          <div className="section-divider flex flex-col gap-5 pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[32ch] font-serif text-[clamp(26px,2.6vw,34px)] leading-[1.2] tracking-[-0.02em] text-[#1c1c1c]">
              Each object may also be purchased individually.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full border border-[#D8CEC1] bg-[#FAF7F1] px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#2e4a36] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(44,40,34,0.08)]"
            >
              Shop Individual Objects &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="section-primary bg-[#F3EFE7]">
        <div className="page-container">
          <div className="section-divider grid gap-10 pt-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div className="rounded-[28px] border border-[#D8CEC1] bg-[#FAF7F1] p-8 sm:p-10">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">From Object to Practice</p>
              <h2 className="mt-4 text-[#1c1c1c]">From Object to Practice</h2>
              <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.82] text-[#5f584f]">
                These ritual boxes are designed to be lived with. Our one-day guided programs help you integrate
                breath, scent, and sensory rhythm into daily life.
              </p>
              <Link
                href="/programs"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
              >
                Explore Guided Programs &rarr;
              </Link>
            </div>

            <div className="rounded-[28px] border border-[#D8CEC1] bg-[#EAE3D8] p-8 sm:p-10">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#8d7d6d]">Program Preview</p>
              <div className="mt-6 grid gap-4">
                {programPreviews.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-[20px] border border-[#d7ccbf] bg-[#F6F1E9] px-5 py-5"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d6d]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-2 font-serif text-[28px] leading-[1.1] tracking-[-0.02em] text-[#1c1c1c]">{item}</p>
                    </div>
                    <span className="text-[12px] uppercase tracking-[0.18em] text-[#5a5a5a]">One-day format</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-editorial bg-[#EAE3D8]">
        <div className="page-container">
          <div className="section-divider flex flex-col gap-3 pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[36ch] text-[14px] leading-[1.8] text-[#625b53]">
              Seasonal material releases are first explored in immersive retreats.
            </p>
            <Link
              href="/seasonaldrops"
              className="text-[12px] uppercase tracking-[0.18em] text-[#2e4a36] hover:text-[#1d3024]"
            >
              Explore Seasonal Drops &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
