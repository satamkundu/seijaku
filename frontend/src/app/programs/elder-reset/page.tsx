import Link from "next/link";
import ProgramReservationForm from "@/src/components/ProgramReservationForm";

const sessionFlow = [
  "Arrival tea and settling-in",
  "Guided breath and grounding ritual",
  "Memory and reflection circle",
  "Gentle movement and sensory pause",
  "Closing tea meditation",
];

export default function ElderResetPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
      <section className="section-primary bg-[#F3EFE7]">
        <div className="page-container">
          <div className="max-w-[760px]">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Program Detail</p>
            <h1 className="mt-5">Elder Reset</h1>
            <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.82] text-[#5e584f]">
              A structured half-day guided program for gentle regulation, memory dialogue, and sensory anchoring.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[28px] border border-[#D8CEC1] bg-[#FAF7F1] p-8">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d6d]">Session Information</p>
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-[#8d7d6d]">Date</p>
                  <p className="mt-1 text-[16px] text-[#1c1c1c]">14 April 2026</p>
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-[#8d7d6d]">Time</p>
                  <p className="mt-1 text-[16px] text-[#1c1c1c]">10 AM – 2 PM</p>
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-[#8d7d6d]">Location</p>
                  <p className="mt-1 text-[16px] text-[#1c1c1c]">Kolkata</p>
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-[#8d7d6d]">Seats</p>
                  <p className="mt-1 text-[16px] text-[#1c1c1c]">12 participants</p>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-[14px] leading-[1.8] text-[#5f584f]">Reservation requests are live. Seijaku will follow up with confirmation and final logistics.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-[28px] border border-[#D8CEC1] bg-[#FAF7F1] p-8">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d6d]">What the Session Includes</p>
                <div className="mt-5 grid gap-4">
                  {sessionFlow.map((item) => (
                    <div key={item} className="rounded-[18px] border border-[#e0d5c9] bg-[#fcf9f4] px-5 py-4">
                      <p className="text-[15px] leading-[1.75] text-[#4f4943]">{item}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/programs"
                  className="mt-6 inline-flex text-[12px] uppercase tracking-[0.18em] text-[#2e4a36] hover:text-[#1d3024]"
                >
                  Return to Programs &rarr;
                </Link>
              </div>

              <ProgramReservationForm slug="elder-reset" title="Elder Reset" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
