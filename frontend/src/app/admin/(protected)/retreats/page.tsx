import AdminPage from "@/src/components/admin/AdminPage";
import ResourceManager, { type ResourceField } from "@/src/components/admin/ResourceManager";
import { adminBackendJson } from "@/src/lib/admin-backend";
import { requireCurrentAdmin } from "@/src/lib/admin-session";
import type { MediaAsset, Retreat } from "@/src/lib/admin-types";

const baseFields = (media: MediaAsset[]): ResourceField[] => [
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "name", label: "Name", type: "text", required: true },
  { name: "shortDescription", label: "Short description", type: "textarea", rows: 3, required: true },
  { name: "detailDescription", label: "Detail description", type: "textarea", rows: 6, required: true },
  { name: "location", label: "Location", type: "text", required: true },
  { name: "season", label: "Season", type: "text", required: true },
  { name: "format", label: "Format", type: "text", required: true },
  { name: "groupSize", label: "Group size", type: "text", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Draft", value: "DRAFT" },
      { label: "Upcoming", value: "UPCOMING" },
      { label: "Inquiry Open", value: "INQUIRY_OPEN" },
      { label: "Closed", value: "CLOSED" },
    ],
  },
  {
    name: "primaryImageId",
    label: "Primary image",
    type: "select",
    options: [{ label: "None", value: "" }, ...media.map((asset) => ({ label: asset.altText || asset.url, value: asset.id }))],
  },
];

export default async function RetreatsPage() {
  const { admin } = await requireCurrentAdmin();
  const [retreats, media] = await Promise.all([
    adminBackendJson<{ items: Retreat[] }>("/retreats"),
    adminBackendJson<{ items: MediaAsset[] }>("/media"),
  ]);
  const items = retreats.items.map((item) => ({
    ...item,
    primaryImageId: item.primaryImage?.id ?? "",
  }));

  return (
    <AdminPage
      title="Retreats"
      description="Maintain the place-led retreat records that power experience detail pages and inquiry intake."
    >
      <ResourceManager
        items={items}
        resourcePath="retreats"
        fields={baseFields(media.items)}
        titleField="name"
        subtitleField="status"
        newItem={{
          slug: "",
          name: "",
          shortDescription: "",
          detailDescription: "",
          location: "",
          season: "",
          format: "",
          groupSize: "",
          status: "DRAFT",
          primaryImageId: "",
        }}
        canDelete={admin.role === "SUPER_ADMIN"}
      />
    </AdminPage>
  );
}
