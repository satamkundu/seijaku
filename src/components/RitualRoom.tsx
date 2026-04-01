import Link from "next/link";

const ritualSteps = [
  {
    title: "Sign in with Email OTP",
    detail: "Access your private ritual room.",
  },
  {
    title: "Complete one daily ritual",
    detail: "Breath, reflection, or literary pause.",
  },
  {
    title: "Track your continuity",
    detail: "See your margins accumulate over time.",
  },
];

export default function RitualRoom() {
  return (
    <section id="daily-ritual-room" className="section-primary bg-[#F3EFE7]">
      <div className="page-container">
        <div className="section-divider grid gap-6 pt-12">
          <div className="grid gap-6 rounded-[30px] border border-[#D8CEC1] bg-[#FAF7F1] p-5 shadow-[0_10px_30px_rgba(70,50,25,0.035)] lg:grid-cols-[1.12fr_0.88fr] sm:p-7">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#1c1c1c]">Seijaku Dailies</p>
              <div className="mt-5 h-px w-10 bg-[#c9a86a]" />
              <h2 className="mt-9 text-[#1c1c1c]">The Daily Ritual Room</h2>
              <p className="mt-4 max-w-[40ch] text-[15px] leading-[1.8] text-[#3a3a3a]">
                A private space for continuity - slow, secure, and self-paced.
              </p>
              <p className="mt-9 text-[10px] uppercase tracking-[0.18em] text-[#1c1c1c]">3-Step Flow</p>
              <ol className="mt-4 space-y-3">
                {ritualSteps.map((step, index) => (
                  <li key={step.title} className="rounded-2xl border border-[#e1d7ca] bg-[#f8f4ee] px-4 py-3.5">
                    <p className="text-sm text-[#5d5b59]">
                      {index + 1}. {step.title}
                    </p>
                    <p className="mt-2 max-w-[40ch] text-[15px] leading-[1.85] text-[#6a6763]">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#1c1c1c]">Ritual Snapshot</p>
              <div className="mt-4 rounded-2xl border border-[#e1d7ca] bg-[#f8f4ee] p-4 sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#5a5a5a]">Your Continuity</p>
                <div className="mt-5 space-y-3.5">
                  <div className="rounded-[28px] border border-[#dbcdbb] bg-[linear-gradient(180deg,#f4ede3_0%,#ede3d6_100%)] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_8px_22px_rgba(67,49,30,0.04)]">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#6b6258]">Streak</p>
                    <p className="mt-2 font-serif text-[22px] leading-none text-[#1c1c1c]">07 days</p>
                    <p className="mt-3 text-[15px] leading-[1.75] text-[#3f3a34]">A page completed each day.</p>
                  </div>
                  <div className="rounded-[28px] border border-[#dbcdbb] bg-[linear-gradient(180deg,#f4ede3_0%,#ede3d6_100%)] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_8px_22px_rgba(67,49,30,0.04)]">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#6b6258]">Minutes</p>
                    <p className="mt-2 font-serif text-[22px] leading-none text-[#1c1c1c]">940</p>
                  </div>
                  <div className="rounded-[28px] border border-[#dbcdbb] bg-[linear-gradient(180deg,#f4ede3_0%,#ede3d6_100%)] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_8px_22px_rgba(67,49,30,0.04)]">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#6b6258]">Rituals Completed</p>
                    <p className="mt-2 font-serif text-[22px] leading-none text-[#1c1c1c]">126</p>
                  </div>
                </div>
                <p className="mt-4 max-w-[28ch] text-[15px] leading-[1.8] text-[#3a3a3a]">
                  Personal reflections are encrypted on-device with client-side E2EE before sync.
                </p>
            <Link
              href="/ritual"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#2e4a36] px-6 py-4 text-sm font-medium text-[#f4efe8] hover:bg-[#243c2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e4a36] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf7f1]"
            >
                  Enter Your Ritual Room
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

