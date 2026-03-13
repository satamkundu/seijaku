import Link from "next/link";

export default function AdultUnwindPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
      <section className="section-primary bg-[#F3EFE7]">
        <div className="page-container max-w-[900px]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Program Detail</p>
          <h1 className="mt-5">Adult Unwind</h1>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.82] text-[#5e584f]">
            Urban reset for working adults built around breath, scent, reflection, and tactile grounding.
          </p>
          <div className="mt-10 rounded-[28px] border border-[#D8CEC1] bg-[#FAF7F1] p-8">
            <p className="text-[15px] leading-[1.8] text-[#5f584f]">
              Full scheduling and reservation details can be added here as sessions are confirmed.
            </p>
            <Link
              href="/programs"
              className="mt-6 inline-flex text-[12px] uppercase tracking-[0.18em] text-[#2e4a36] hover:text-[#1d3024]"
            >
              Return to Programs &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
