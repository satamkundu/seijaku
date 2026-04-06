import Link from "next/link";

import AdminCard from "@/src/components/admin/AdminCard";
import AdminPage from "@/src/components/admin/AdminPage";
import AdminStatusBadge from "@/src/components/admin/AdminStatusBadge";
import { adminSecondaryButtonClassName } from "@/src/components/admin/AdminField";
import { adminBackendJson } from "@/src/lib/admin-backend";
import type { ProductSummary } from "@/src/lib/admin-types";

export default async function ProductsPage() {
  const data = await adminBackendJson<{ items: ProductSummary[] }>("/products");

  return (
    <AdminPage
      title="Products"
      description="Manage the core shop catalog, then open a product to configure options, media, categories, collections, and bridge page placement."
      action={
        <Link href="/admin/products/new" className={adminSecondaryButtonClassName}>
          New product
        </Link>
      }
    >
      <div className="grid gap-4">
        {data.items.map((item) => (
          <AdminCard key={item.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#8a7e71]">{item.slug}</p>
              <h2 className="mt-3 text-[24px]">{item.title}</h2>
              <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.8] text-[#62574c]">{item.shortDescription || item.longDescription || "No description yet."}</p>
            </div>
            <div className="flex flex-col items-start gap-4 sm:items-end">
              <AdminStatusBadge value={item.status} />
              <Link href={`/admin/products/${item.id}`} className={adminSecondaryButtonClassName}>
                Edit product
              </Link>
            </div>
          </AdminCard>
        ))}
      </div>
    </AdminPage>
  );
}
