import Link from "next/link";

type FeaturedCollectionCalloutProps = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

export default function FeaturedCollectionCallout({ title, description, href, cta }: FeaturedCollectionCalloutProps) {
  return (
    <article className="rounded-[20px] bg-[#efe7da] px-6 py-6 sm:px-7 sm:py-7">
      <h3 className="text-[clamp(24px,2.4vw,30px)] leading-[1.14] tracking-[-0.02em] text-[#1f1a16]">{title}</h3>
      <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.82] text-[#61594f]">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex text-[11px] uppercase tracking-[0.17em] text-[#3a332d] underline decoration-black/20 underline-offset-4 transition-colors duration-300 hover:text-[#1f1a16]"
      >
        {cta}
      </Link>
    </article>
  );
}
