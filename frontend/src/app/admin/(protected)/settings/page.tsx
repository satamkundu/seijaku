import { redirect } from "next/navigation";

import AdminPage from "@/src/components/admin/AdminPage";
import SettingsForm from "@/src/components/admin/SettingsForm";
import { adminBackendJson } from "@/src/lib/admin-backend";
import { requireCurrentAdmin } from "@/src/lib/admin-session";
import type { MediaAsset, SiteSettings } from "@/src/lib/admin-types";

export default async function SettingsPage() {
  const { admin } = await requireCurrentAdmin();

  if (admin.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  const [settings, media] = await Promise.all([
    adminBackendJson<{ item: SiteSettings }>("/site-settings"),
    adminBackendJson<{ items: MediaAsset[] }>("/media"),
  ]);

  return (
    <AdminPage
      title="Settings"
      description="This is the super-admin control room for shared footer copy, contact details, and site-level assets."
    >
      <SettingsForm initialSettings={settings.item} media={media.items} />
    </AdminPage>
  );
}
