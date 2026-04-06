import ProductEditor from "@/src/components/admin/ProductEditor";
import AdminPage from "@/src/components/admin/AdminPage";
import { adminBackendJson } from "@/src/lib/admin-backend";
import { requireCurrentAdmin } from "@/src/lib/admin-session";
import type { BridgePage, CollectionSummary, MediaAsset, ProductCategory, ProductSummary } from "@/src/lib/admin-types";

type ProductEditorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductEditorPage({ params }: ProductEditorPageProps) {
  const { admin } = await requireCurrentAdmin();
  const { id } = await params;

  const [media, categories, collections, bridgePages, productData] = await Promise.all([
    adminBackendJson<{ items: MediaAsset[] }>("/media"),
    adminBackendJson<{ items: ProductCategory[] }>("/categories"),
    adminBackendJson<{ items: CollectionSummary[] }>("/collections"),
    adminBackendJson<{ items: BridgePage[] }>("/bridge-pages"),
    id === "new"
      ? Promise.resolve<{ item: ProductSummary | null }>({ item: null })
      : adminBackendJson<{ item: ProductSummary }>(`/products/${id}`),
  ]);

  return (
    <AdminPage
      title={id === "new" ? "New Product" : productData.item?.title ?? "Product"}
      description="Use the tabbed editor to keep product data, relationships, and variant options consistent with the backend catalog model."
    >
      <ProductEditor
        product={productData.item}
        media={media.items}
        categories={categories.items}
        collections={collections.items}
        bridgePages={bridgePages.items}
        canDelete={admin.role === "SUPER_ADMIN"}
      />
    </AdminPage>
  );
}
