import { Suspense } from "react";

import CheckoutPageClient from "@/src/components/shop/CheckoutPageClient";

// /checkout is per-user and reads ?item= via useSearchParams. Skip the
// static prerender pass; the page is meaningless without the request URL.
export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  // useSearchParams() inside the client component requires a Suspense
  // boundary at the page level (Next 15+ static-prerender requirement).
  return (
    <Suspense fallback={null}>
      <CheckoutPageClient />
    </Suspense>
  );
}
