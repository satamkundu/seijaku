import Link from "next/link";

const objects = [
  { name: "Amber Resin Diffuser", price: "INR 4,800" },
  { name: "Quiet Cedar Oil Blend", price: "INR 2,400" },
  { name: "Ritual Tea Vessel Set", price: "INR 5,200" },
  { name: "Smoked Clay Incense Tray", price: "INR 3,100" },
];

export default function SeasonObjects() {
  return (
    <section className="section-primary bg-[#F3EFE7]">
      <div className="page-container">
        <div className="section-divider pt-12">
          <div className="max-w-[540px]">
            <h2 className="text-[#1c1c1c]">Selected Objects of the Season</h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-[#645d55]">
              A quiet edit of forms, vessels, and fragrance chosen for slower rooms and attentive rituals.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {objects.map((item) => (
              <article
                key={item.name}
                className="group flex h-full flex-col rounded-[24px] border border-[#D8CEC1] bg-[#FAF7F1] p-5 shadow-[0_8px_24px_rgba(45,38,28,0.04)] hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(45,38,28,0.08)]"
              >
                <div className="aspect-[4/4.8] rounded-[18px] bg-[#e5dbcf]" />
                <div className="mt-6 flex flex-1 flex-col">
                  <h3 className="font-serif text-[24px] leading-[1.2] tracking-[-0.01em] text-[#1c1c1c]">{item.name}</h3>
                  <p className="mt-2 text-[14px] font-normal text-[#756d66]">{item.price}</p>
                </div>
                <Link
                  href="/shop"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[#2e4a36]/28 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[#2e4a36] hover:bg-[#2e4a36] hover:text-[#f4efe8]"
                >
                  Add to Collection
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
