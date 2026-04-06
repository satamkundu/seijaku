import AdminPage from "@/src/components/admin/AdminPage";
import ResourceManager, { type ResourceField } from "@/src/components/admin/ResourceManager";
import { adminBackendJson } from "@/src/lib/admin-backend";
import { requireCurrentAdmin } from "@/src/lib/admin-session";
import type { CollectionSummary } from "@/src/lib/admin-types";

const fields: ResourceField[] = [
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "name", label: "Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", rows: 4 },
  {
    name: "kind",
    label: "Kind",
    type: "select",
    required: true,
    options: [
      { label: "Core Collection", value: "CORE_COLLECTION" },
      { label: "Seasonal Drop", value: "SEASONAL_DROP" },
      { label: "Hemanta", value: "HEMANTA" },
    ],
  },
];

export default async function CollectionsPage() {
  const { admin } = await requireCurrentAdmin();
  const data = await adminBackendJson<{ items: CollectionSummary[] }>("/collections");

  return (
    <AdminPage
      title="Collections"
      description="Curate the named collection groupings that products can belong to across the public storefront and bridge pages."
    >
      <ResourceManager
        items={data.items}
        resourcePath="collections"
        fields={fields}
        titleField="name"
        subtitleField="kind"
        newItem={{ slug: "", name: "", description: "", kind: "CORE_COLLECTION" }}
        canDelete={admin.role === "SUPER_ADMIN"}
      />
    </AdminPage>
  );
}
