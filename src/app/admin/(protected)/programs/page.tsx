import AdminPage from "@/src/components/admin/AdminPage";
import ResourceManager, { type ResourceField } from "@/src/components/admin/ResourceManager";
import { adminBackendJson } from "@/src/lib/admin-backend";
import { requireCurrentAdmin } from "@/src/lib/admin-session";
import type { Program } from "@/src/lib/admin-types";

const fields: ResourceField[] = [
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "name", label: "Name", type: "text", required: true },
  { name: "shortDescription", label: "Short description", type: "textarea", rows: 3, required: true },
  { name: "detailDescription", label: "Detail description", type: "textarea", rows: 5 },
  { name: "durationLabel", label: "Duration label", type: "text" },
  { name: "groupSizeLabel", label: "Group size label", type: "text" },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Draft", value: "DRAFT" },
      { label: "Upcoming", value: "UPCOMING" },
      { label: "Booking Open", value: "BOOKING_OPEN" },
      { label: "Closed", value: "CLOSED" },
    ],
  },
];

export default async function ProgramsPage() {
  const { admin } = await requireCurrentAdmin();
  const data = await adminBackendJson<{ items: Program[] }>("/programs");

  return (
    <AdminPage
      title="Programs"
      description="Keep program records structured so the public pages and reservation flows stay aligned."
    >
      <ResourceManager
        items={data.items}
        resourcePath="programs"
        fields={fields}
        titleField="name"
        subtitleField="status"
        newItem={{
          slug: "",
          name: "",
          shortDescription: "",
          detailDescription: "",
          durationLabel: "",
          groupSizeLabel: "",
          status: "DRAFT",
        }}
        canDelete={admin.role === "SUPER_ADMIN"}
      />
    </AdminPage>
  );
}
