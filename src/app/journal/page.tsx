import Link from "next/link";

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE7] pt-[72px] text-[#3a3a3a] sm:pt-[76px]">
      <section className="section-primary bg-[#F3EFE7]">
        <div className="page-container max-w-[900px]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Journal</p>
          <h1 className="mt-5">Journal</h1>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.82] text-[#5e584f]">
            Literature, scent, and seasonal reflections. Journal entries and editorial series can be added here.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex text-[12px] uppercase tracking-[0.18em] text-[#2e4a36] hover:text-[#1d3024]"
          >
            Return Home &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
