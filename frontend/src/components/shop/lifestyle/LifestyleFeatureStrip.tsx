type LifestyleFeatureStripProps = {
  items: Array<{
    title: string;
    text: string;
  }>;
};

export default function LifestyleFeatureStrip({ items }: LifestyleFeatureStripProps) {
  return (
    <section className="py-10 sm:py-11">
      <div className="page-container">
        <div className="grid gap-3 rounded-[24px] border border-[rgba(86,76,64,0.035)] bg-[rgba(248,244,238,0.48)] px-5 py-5 text-center sm:px-6 sm:py-5 lg:grid-cols-3 lg:gap-0">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col items-center justify-center px-3 py-2 ${index > 0 ? "lg:border-l lg:border-[rgba(86,76,64,0.045)] lg:pl-6" : ""}`}
            >
              <h2 className="text-[6px] font-medium uppercase tracking-[0.08em] text-[#736c63]">{item.title}</h2>
              <p className="mt-4 text-[12px] leading-[1.75] text-[#847c72]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
