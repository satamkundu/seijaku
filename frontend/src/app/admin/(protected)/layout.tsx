import AdminShell from "@/src/components/admin/AdminShell";
import { requireCurrentAdmin } from "@/src/lib/admin-session";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const { admin } = await requireCurrentAdmin();

  return <AdminShell admin={admin}>{children}</AdminShell>;
}
