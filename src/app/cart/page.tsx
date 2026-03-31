import { redirect } from "next/navigation";

import { canonicalShopRoutes } from "@/src/lib/shopAllItems";

export default function CartPage() {
  redirect(canonicalShopRoutes.collection);
}
