import { Suspense } from "react";

import ShopAllPageClient from "@/src/components/shop/ShopAllPageClient";

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopAllPageClient />
    </Suspense>
  );
}
