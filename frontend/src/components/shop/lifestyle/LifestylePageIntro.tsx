import Image from "next/image";
import type { ReactNode } from "react";

type LifestylePageIntroProps = {
  title: string;
  intro: string;
  imageSrc: string;
  imageAlt: string;
  children?: ReactNode;
};

export default function LifestylePageIntro({
  title,
  intro,
  imageSrc,
  imageAlt,
  children,
}: LifestylePageIntroProps) {
  return (
    <section className="section-primary pb-8 pt-20 sm:pb-10 sm:pt-24">
      <div className="page-container max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,390px)] lg:items-center lg:gap-14">
          <div className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#8a745e]">Lifestyle / Ritual Sets</p>
            <h1 className="mt-6 max-w-[12ch] text-[clamp(38px,4.8vw,60px)] leading-[1.03] tracking-[-0.03em] text-[#1a1713]">
              {title}
            </h1>
            <p className="mt-9 max-w-[34ch] text-[16px] leading-relaxed text-[#5c564e]">{intro}</p>
            {children ? <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">{children}</div> : null}
          </div>

          <div className="mx-auto w-full max-w-[380px] rounded-[28px] border border-[rgba(86,76,64,0.08)] bg-[linear-gradient(180deg,rgba(250,247,241,0.92)_0%,rgba(244,239,231,0.98)_100%)] p-5 shadow-md">
            <div className="relative mx-auto aspect-[4/4.85] max-w-[320px] overflow-hidden rounded-[22px] bg-[#e6ddd0]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 28vw, 86vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
