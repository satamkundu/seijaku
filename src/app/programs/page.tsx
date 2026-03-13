import Link from "next/link";

const programPathways = [
  {
    title: "Adult Unwind",
    description: "Urban reset for working adults. Breath, scent, reflection, tactile grounding.",
    duration: "Half-day",
    group: "10–15 participants",
    href: "/programs/adult-unwind",
  },
  {
    title: "Elder Reset",
    description: "Gentle movement, memory dialogue, sensory anchoring.",
    duration: "Half-day",
    group: "12 participants",
    href: "/programs/elder-reset",
  },
  {
    title: "Teen Senses",
    description: "Digital detox and embodied awareness through craft and guided reflection.",
    duration: "3 hours",
    group: "8–12 participants",
    href: "/programs/teen-senses",
  },
];

const trustNotes = ["Intimate group size", "Research-rooted design", "Facilitator-led guidance"];

const expectations = [
  "Guided breath and grounding ritual",
  "Memory and reflection circle",
  "Gentle movement",
  "Closing tea meditation",
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
      <section className="section-primary bg-[#F3EFE7]">
        <div className="page-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-[560px]">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Guided Programs</p>
            <h1 className="mt-5">Guided Programs</h1>
            <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.82] text-[#5e584f]">
              Daytime sensory immersions designed to reset rhythm and deepen everyday practice.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href="#upcoming-program"
                className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
              >
                View Upcoming Program
              </Link>
              <Link
                href="/lifestyle"
                className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#2e4a36] hover:text-[#1d3024]"
              >
                <span>Explore Ritual Boxes</span>
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#D8CEC1] bg-[#FAF7F1] p-8 sm:p-10">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8d7d6d]">Daytime Format</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[20px] border border-[#e0d5c9] bg-[#f7f2eb] px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d6d]">Designed For</p>
                <p className="mt-2 font-serif text-[28px] leading-[1.08] tracking-[-0.02em] text-[#1c1c1c]">Small groups</p>
              </div>
              <div className="rounded-[20px] border border-[#e0d5c9] bg-[#f7f2eb] px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d6d]">Format</p>
                <p className="mt-2 font-serif text-[28px] leading-[1.08] tracking-[-0.02em] text-[#1c1c1c]">Guided sessions</p>
              </div>
              <div className="rounded-[20px] border border-[#e0d5c9] bg-[#f7f2eb] px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d6d]">Intent</p>
                <p className="mt-2 font-serif text-[28px] leading-[1.08] tracking-[-0.02em] text-[#1c1c1c]">Daily continuity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-primary bg-[#EAE3D8]">
        <div className="page-container">
          <div className="section-divider pt-12">
            <div className="max-w-[620px]">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Program Pathways</p>
              <h2 className="mt-4 text-[#1c1c1c]">Three daytime formats</h2>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {programPathways.map((program) => (
                <article
                  key={program.title}
                  className="flex h-full flex-col rounded-[24px] border border-[#D8CEC1] bg-[#FAF7F1] p-7 shadow-[0_10px_24px_rgba(45,38,28,0.04)]"
                >
                  <h3 className="font-serif text-[28px] leading-[1.1] tracking-[-0.02em] text-[#1c1c1c]">{program.title}</h3>
                  <p className="mt-4 max-w-[30ch] text-[15px] leading-[1.8] text-[#5f584f]">{program.description}</p>
                  <div className="mt-6 space-y-3 border-t border-[rgba(0,0,0,0.06)] pt-5">
                    <p className="text-[12px] uppercase tracking-[0.18em] text-[#8d7d6d]">
                      Duration <span className="ml-2 normal-case tracking-normal text-[#4f4943]">{program.duration}</span>
                    </p>
                    <p className="text-[12px] uppercase tracking-[0.18em] text-[#8d7d6d]">
                      Ideal group <span className="ml-2 normal-case tracking-normal text-[#4f4943]">{program.group}</span>
                    </p>
                  </div>
                  <Link
                    href={program.href}
                    className="mt-auto pt-8 text-[12px] uppercase tracking-[0.18em] text-[#2e4a36] hover:text-[#1d3024]"
                  >
                    View Details &rarr;
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="upcoming-program" className="section-primary bg-[#F3EFE7]">
        <div className="page-container">
          <div className="section-divider pt-12">
            <div className="rounded-[30px] border border-[#cdbfaa] bg-[#f8f3ec] p-8 shadow-[0_18px_40px_rgba(48,40,30,0.06)] sm:p-10 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Featured Upcoming Program</p>
                <h2 className="mt-4 text-[#1c1c1c]">Elder Reset — Upcoming Session</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-[#ddd2c5] bg-[#fcf9f4] px-5 py-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d6d]">Date</p>
                    <p className="mt-2 text-[16px] text-[#1c1c1c]">14 April 2026</p>
                  </div>
                  <div className="rounded-[20px] border border-[#ddd2c5] bg-[#fcf9f4] px-5 py-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d6d]">Time</p>
                    <p className="mt-2 text-[16px] text-[#1c1c1c]">10 AM – 2 PM</p>
                  </div>
                  <div className="rounded-[20px] border border-[#ddd2c5] bg-[#fcf9f4] px-5 py-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d6d]">Seats</p>
                    <p className="mt-2 text-[16px] text-[#1c1c1c]">12 participants</p>
                  </div>
                  <div className="rounded-[20px] border border-[#ddd2c5] bg-[#fcf9f4] px-5 py-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d6d]">Location</p>
                    <p className="mt-2 text-[16px] text-[#1c1c1c]">Kolkata</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:mt-0">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#8d7d6d]">What to Expect</p>
                <div className="mt-5 grid gap-4">
                  {expectations.map((item) => (
                    <div key={item} className="rounded-[18px] border border-[#ddd2c5] bg-[#fcf9f4] px-5 py-4">
                      <p className="text-[15px] leading-[1.75] text-[#4f4943]">{item}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/programs/elder-reset"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
                >
                  Reserve Your Spot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-secondary bg-[#EAE3D8]">
        <div className="page-container">
          <div className="section-divider flex flex-col gap-6 pt-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[520px]">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Practice Beyond the Day</p>
              <h3 className="mt-4 font-serif text-[clamp(28px,3vw,36px)] leading-[1.12] tracking-[-0.02em] text-[#1c1c1c]">
                Practice Beyond the Day
              </h3>
              <p className="mt-4 text-[16px] leading-[1.82] text-[#5f584f]">
                Our ritual boxes are designed to sustain what begins in these programs.
              </p>
            </div>
            <Link
              href="/lifestyle"
              className="inline-flex items-center justify-center rounded-full border border-[#D8CEC1] bg-[#FAF7F1] px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#2e4a36] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(44,40,34,0.08)]"
            >
              Explore Ritual Boxes &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="section-editorial bg-[#F3EFE7]">
        <div className="page-container">
          <div className="section-divider grid gap-4 pt-10 text-center sm:grid-cols-3 sm:text-left">
            {trustNotes.map((item) => (
              <p
                key={item}
                className="rounded-[18px] border border-[#e0d5c9] bg-[#FAF7F1] px-5 py-4 text-[12px] uppercase tracking-[0.22em] text-[#4f4943]"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
