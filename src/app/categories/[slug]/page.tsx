import { redirect } from "next/navigation";

import { canonicalBridgeSlugs, canonicalShopRoutes } from "@/src/lib/shopAllItems";

type LegacyCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LegacyCategoryPage({ params }: LegacyCategoryPageProps) {
  const { slug } = await params;

  if (canonicalBridgeSlugs.includes(slug as (typeof canonicalBridgeSlugs)[number])) {
    redirect(`/shop/${slug}`);
  }

  redirect(canonicalShopRoutes.shopAll);
}
