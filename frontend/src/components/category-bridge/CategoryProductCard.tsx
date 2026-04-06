import Image from "next/image";
import Link from "next/link";

import type { CategoryBridgeProduct } from "@/src/lib/categoryBridge";

import CollectionButton from "./CollectionButton";

type CategoryProductCardProps = {
  product: CategoryBridgeProduct;
};

export default function CategoryProductCard({ product }: CategoryProductCardProps) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[#d8cec1] bg-[#faf7f1] shadow-[0_12px_30px_rgba(44,37,28,0.05)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className={`object-cover transition-transform duration-500 hover:scale-[1.02] ${product.imagePosition ?? "object-center"}`}
        />
      </div>

      <div className="flex min-h-[300px] flex-col px-7 py-7">
        <h3 className="font-serif text-[30px] leading-[1.1] tracking-[-0.02em] text-[#1c1c1c]">{product.name}</h3>
        <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.78] text-[#5f584f]">{product.description}</p>
        <p className="mt-6 text-[15px] font-normal text-[#716961]">{product.price}</p>

        <div className="mt-auto flex flex-col items-start gap-4 pt-8 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={product.href}
            className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c]"
          >
            Buy Now
          </Link>
          <CollectionButton itemName={product.name} />
        </div>
      </div>
    </article>
  );
}
