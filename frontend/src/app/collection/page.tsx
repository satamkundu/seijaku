import { Suspense } from "react";

import CollectionPageClient from "@/src/components/shop/CollectionPageClient";

export default function CollectionPage() {
  return (
    <Suspense fallback={null}>
      <CollectionPageClient />
    </Suspense>
  );
}
