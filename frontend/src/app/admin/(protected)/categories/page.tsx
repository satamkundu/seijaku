import AdminPage from "@/src/components/admin/AdminPage";
import ResourceManager, { type ResourceField } from "@/src/components/admin/ResourceManager";
import { adminBackendJson } from "@/src/lib/admin-backend";
import { requireCurrentAdmin } from "@/src/lib/admin-session";
import type { ProductCategory } from "@/src/lib/admin-types";

const fields: ResourceField[] = [
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "name", label: "Name", type: "text", required: true },
  {
    name: "kind",
    label: "Kind",
    type: "select",
    required: true,
    options: [
      { label: "Shop Bridge", value: "SHOP_BRIDGE" },
      { label: "Program", value: "PROGRAM" },
      { label: "Retreat", value: "RETREAT" },
    ],
  },
];

export default async function CategoriesPage() {
  const { admin } = await requireCurrentAdmin();
  const data = await adminBackendJson<{ items: ProductCategory[] }>("/categories");

  return (
    <AdminPage
      title="Categories"
      description="Maintain the category structure that powers bridge pages, program tagging, and retreat grouping."
    >
      <ResourceManager
        items={data.items}
        resourcePath="categories"
        fields={fields}
        titleField="name"
        subtitleField="kind"
        newItem={{ slug: "", name: "", kind: "SHOP_BRIDGE" }}
        canDelete={admin.role === "SUPER_ADMIN"}
      />
    </AdminPage>
  );
}
