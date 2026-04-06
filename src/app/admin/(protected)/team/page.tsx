import { redirect } from "next/navigation";

import AdminPage from "@/src/components/admin/AdminPage";
import TeamManager from "@/src/components/admin/TeamManager";
import { adminBackendJson } from "@/src/lib/admin-backend";
import { requireCurrentAdmin } from "@/src/lib/admin-session";
import type { AdminIdentity } from "@/src/lib/admin-types";

export default async function TeamPage() {
  const { admin } = await requireCurrentAdmin();

  if (admin.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  const data = await adminBackendJson<{ items: Array<AdminIdentity & { createdAt: string; updatedAt: string }> }>("/admins");

  return (
    <AdminPage
      title="Team"
      description="Super-admin account management for login access, role assignments, and password rotation."
    >
      <TeamManager items={data.items} />
    </AdminPage>
  );
}
