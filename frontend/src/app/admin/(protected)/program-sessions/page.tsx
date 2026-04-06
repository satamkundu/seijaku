import AdminPage from "@/src/components/admin/AdminPage";
import ResourceManager, { type ResourceField } from "@/src/components/admin/ResourceManager";
import { adminBackendJson } from "@/src/lib/admin-backend";
import { requireCurrentAdmin } from "@/src/lib/admin-session";
import type { Program, ProgramSession } from "@/src/lib/admin-types";

const buildFields = (programs: Program[]): ResourceField[] => [
  {
    name: "programId",
    label: "Program",
    type: "select",
    required: true,
    options: programs.map((program) => ({ label: program.name, value: program.id })),
  },
  { name: "startsAt", label: "Starts at", type: "datetime", required: true },
  { name: "endsAt", label: "Ends at", type: "datetime", required: true },
  { name: "timezone", label: "Timezone", type: "text", required: true },
  { name: "city", label: "City", type: "text", required: true },
  { name: "venueName", label: "Venue name", type: "text" },
  { name: "capacity", label: "Capacity", type: "number", required: true },
  { name: "spotsRemaining", label: "Spots remaining", type: "number", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Upcoming", value: "UPCOMING" },
      { label: "Booking Open", value: "BOOKING_OPEN" },
      { label: "Full", value: "FULL" },
      { label: "Closed", value: "CLOSED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
  },
];

export default async function ProgramSessionsPage() {
  const { admin } = await requireCurrentAdmin();
  const [sessions, programs] = await Promise.all([
    adminBackendJson<{ items: ProgramSession[] }>("/program-sessions"),
    adminBackendJson<{ items: Program[] }>("/programs"),
  ]);
  const items = sessions.items.map((item) => ({
    ...item,
    programId: item.program?.id ?? item.programId,
  }));

  return (
    <AdminPage
      title="Program Sessions"
      description="Manage dated instances of each program and keep booking availability in sync."
    >
      <ResourceManager
        items={items}
        resourcePath="program-sessions"
        fields={buildFields(programs.items)}
        titleField="city"
        subtitleField="status"
        newItem={{
          programId: programs.items[0]?.id ?? "",
          startsAt: "",
          endsAt: "",
          timezone: "Asia/Kolkata",
          city: "",
          venueName: "",
          capacity: 12,
          spotsRemaining: 12,
          status: "UPCOMING",
        }}
        canDelete={admin.role === "SUPER_ADMIN"}
      />
    </AdminPage>
  );
}
