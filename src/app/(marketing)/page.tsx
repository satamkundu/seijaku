import Link from "next/link";

type OfferingCard = {
  title: string;
  description: string;
  bullets: string[];
};

const offerings: OfferingCard[] = [
  {
    title: "Objects of Stillness",
    description:
      "Curated diffusers, fragrances, and home decor designed to make everyday spaces feel grounded and intentional.",
    bullets: [
      "Diffusers for slow atmospheric layering",
      "Fragrance profiles for home and self",
      "Minimal decor for ritual corners",
    ],
  },
  {
    title: "Guided Days",
    description:
      "One-day wellness sessions for elderly participants, children with special abilities, and general audiences.",
    bullets: [
      "Dedicated elder-friendly formats",
      "Inclusive child-centered experiences",
      "Open community sessions for all",
    ],
  },
  {
    title: "Immersive Retreats",
    description:
      "Three-night retreats in Sundarbans, Purulia, and Darjeeling with yoga, cultural sessions, and fragrance work.",
    bullets: [
      "3-night guided itineraries",
      "Daily yoga and movement",
      "Culture and fragrance experiences",
    ],
  },
];

const ritualSteps = [
  {
    title: "Sign in with Email OTP",
    detail: "Access your private ritual space quickly and securely.",
  },
  {
    title: "Complete one daily ritual",
    detail: "Choose a short reflection, breath, or grounding prompt.",
  },
  {
    title: "Track your continuity",
    detail: "See steady progress through gentle, non-pressured markers.",
  },
];

const ritualStats = [
  { label: "Streak", value: "07 days" },
  { label: "Minutes", value: "940" },
  { label: "Rituals completed", value: "126" },
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#F4EBDD] text-zinc-900">
      <section className="relative overflow-hidden border-b border-[#2F6F6D]/20">
        <div aria-hidden className="hero-breathe absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_82%_14%,rgba(47,111,109,0.14)_0,transparent_42%),repeating-radial-gradient(circle_at_0_0,rgba(40,30,22,0.05)_0_1px,transparent_1px_5px)]"
        />

        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center px-6 py-24 text-center sm:px-8">
          <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#6E9E9C]">Quiet Structure</p>
          <h1 className="text-5xl font-light tracking-tight text-[#9E4E35] sm:text-6xl md:text-7xl">Seijaku</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-700 sm:text-lg">
            Objects, guided days, and immersive retreats woven together by a daily digital ritual that keeps your
            practice continuous.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/ritual"
              className="rounded-full bg-[#C56A4A] px-7 py-3 text-sm font-medium text-[#F4EBDD] transition hover:bg-[#9E4E35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E4E35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EBDD]"
            >
              Begin Daily Ritual
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-[#2F6F6D]/55 bg-[#F4EBDD]/85 px-7 py-3 text-sm font-medium text-[#2F6F6D] transition hover:bg-[#F4EBDD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6F6D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EBDD]"
            >
              Explore the Collection
            </Link>
          </div>

          <p className="mt-7 max-w-2xl text-xs leading-relaxed text-zinc-600">
            Your reflections are encrypted on your device. Seijaku cannot read your personal entries.
          </p>
        </div>
      </section>

      <section aria-labelledby="offerings" className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <h2 id="offerings" className="text-2xl font-medium tracking-tight text-[#9E4E35] sm:text-3xl">
          Three Offerings
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-700">
          Each path stands on its own while supporting ritual continuity through everyday practice.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {offerings.map((offering) => (
            <article key={offering.title} className="rounded-2xl border border-[#2F6F6D]/25 bg-[#F4EBDD]/80 p-6">
              <h3 className="text-xl font-medium tracking-tight text-zinc-900">{offering.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">{offering.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                {offering.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#6E9E9C]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="daily-rituals" className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-8 sm:pb-20">
        <div className="rounded-3xl border border-[#C56A4A]/30 bg-gradient-to-br from-[#C56A4A]/10 via-[#F4EBDD] to-[#2F6F6D]/10 p-6 sm:p-8">
          <h2 id="daily-rituals" className="text-2xl font-medium tracking-tight text-[#9E4E35] sm:text-3xl">
            Daily Rituals
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-700">
            Our digital ritual flow creates a calm habit loop with email OTP access, privacy-first design, and
            lightweight progress tracking.
          </p>

          <div className="mt-7 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-[#2F6F6D]">3-step flow</h3>
              <ol className="mt-3 space-y-3">
                {ritualSteps.map((step, index) => (
                  <li key={step.title} className="rounded-xl border border-[#2F6F6D]/20 bg-[#F4EBDD]/80 p-4">
                    <p className="text-sm font-medium text-zinc-900">
                      {index + 1}. {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-700">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-[#2F6F6D]">Ritual snapshot</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {ritualStats.map((stat) => (
                  <div key={stat.label} className="rounded-full border border-[#2F6F6D]/25 bg-[#F4EBDD]/90 px-4 py-2">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-600">{stat.label}</p>
                    <p className="text-sm font-medium text-zinc-900">{stat.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-zinc-600">
                Personal reflections are encrypted on-device with client-side E2EE before sync.
              </p>
              <Link
                href="/auth"
                className="mt-5 inline-flex rounded-full bg-[#2F6F6D] px-6 py-3 text-sm font-medium text-[#F4EBDD] transition hover:bg-[#245957] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6F6D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EBDD]"
              >
                Continue with Email OTP
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
