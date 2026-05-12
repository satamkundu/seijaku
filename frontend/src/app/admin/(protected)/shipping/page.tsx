import { redirect } from "next/navigation";

import AdminPage from "@/src/components/admin/AdminPage";
import ShippingSettingsEditor, {
  type ShippingSetting,
} from "@/src/components/admin/ShippingSettingsEditor";
import { adminBackendJson } from "@/src/lib/admin-backend";
import { requireCurrentAdmin } from "@/src/lib/admin-session";

export default async function ShippingPage() {
  const { admin } = await requireCurrentAdmin();

  if (admin.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  const data = await adminBackendJson<{ item: ShippingSetting }>("/shipping-settings");

  return (
    <AdminPage
      title="Shipping"
      description="Shiprocket pickup location, default dimensions, and auto-push toggle. Edits here take effect immediately — no redeploy required."
    >
      <ShippingSettingsEditor initialSettings={data.item} />
    </AdminPage>
  );
}
