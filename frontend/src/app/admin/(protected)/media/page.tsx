import MediaManager from "@/src/components/admin/MediaManager";
import AdminPage from "@/src/components/admin/AdminPage";
import { adminBackendJson } from "@/src/lib/admin-backend";
import { requireCurrentAdmin } from "@/src/lib/admin-session";
import type { MediaAsset } from "@/src/lib/admin-types";

export default async function MediaPage() {
  const { admin } = await requireCurrentAdmin();
  const data = await adminBackendJson<{ items: MediaAsset[] }>("/media");

  return (
    <AdminPage
      title="Media Library"
      description="Upload and manage the assets used across products, articles, retreats, and site settings."
    >
      <MediaManager items={data.items} canDelete={admin.role === "SUPER_ADMIN"} />
    </AdminPage>
  );
}
