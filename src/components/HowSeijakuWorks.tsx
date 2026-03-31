import Image from "next/image";
import Link from "next/link";

type StepCard = {
  number: string;
  title: string;
  image: string;
  alt: string;
  href: string;
  external?: boolean;
};

const stepCards: StepCard[] = [
  {
    number: "01",
    title: "Choose a scent",
    image: "/images/Quiet Tea Ritual Box_lifestyle.JPG",
    alt: "Perfume ritual box and scent objects",
    href: "/shop/evening-ritual-box",
  },
  {
    number: "02",
    title: "Choose an artifact",
    image: "/images/Seijaku section img 1.png",
    alt: "Handcrafted Seijaku artifact",
    href: "/shop/hand-thrown-tea-bowl",
  },
  {
    number: "03",
    title: "Follow a 2-minute ritual",
    image: "/images/hero banner Home.png",
    alt: "Editorial ritual imagery for Seijaku practice",
    href: "https://www.youtube.com/",
    external: true,
  },
];

function StepLink({ card }: { card: StepCard }) {
  const content = (
    <>
      <div className="relative mx-auto aspect-square w-[180px] overflow-hidden rounded-full border border-[#ddd2c4] bg-[#e8dfd2] shadow-[0_10px_28px_rgba(49,57,49,0.05)] sm:w-[190px] lg:w-[210px]">
        <Image
          src={card.image}
          alt={card.alt}
          fill
          sizes="(min-width: 1024px) 210px, (min-width: 640px) 190px, 180px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-[#a27f58]">{card.number}</p>
      <p className="mt-3 font-serif text-[24px] leading-[1.18] text-[#302a23] sm:text-[25px]">{card.title}</p>
    </>
  );

  const commonClassName =
    "group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e806e] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f8f3eb]";

  if (card.external) {
    return (
      <a href={card.href} target="_blank" rel="noreferrer" className={commonClassName} aria-label={`${card.title} on Seijaku YouTube`}>
        {content}
      </a>
    );
  }

  return (
    <Link href={card.href} className={commonClassName}>
      {content}
    </Link>
  );
}

export default function HowSeijakuWorks() {
  return (
    <section className="section-editorial bg-[#F3EFE7] pt-0">
      <div className="page-container">
        <div className="rounded-[28px] border border-[#ddd2c4] bg-[#f8f3eb] px-6 py-8 sm:px-8 md:px-10 md:py-10">
          <div className="max-w-[560px]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f7455]">How Seijaku works</p>
            <p className="mt-3 text-[15px] leading-[1.8] text-[#61574d]">A quiet ritual can begin in three simple gestures.</p>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-8 xl:gap-10">
            {stepCards.map((card) => (
              <StepLink key={card.number} card={card} />
            ))}
          </div>
        </div>
      </div>
      {/* TODO: Replace the temporary YouTube homepage URL with Seijaku's exact YouTube channel once the final channel slug is confirmed. */}
    </section>
  );
}
