import ArticleManager from "@/src/components/admin/ArticleManager";
import AdminPage from "@/src/components/admin/AdminPage";
import { adminBackendJson } from "@/src/lib/admin-backend";
import { requireCurrentAdmin } from "@/src/lib/admin-session";
import type { Article, MediaAsset } from "@/src/lib/admin-types";

export default async function ArticlesPage() {
  const { admin } = await requireCurrentAdmin();
  const [articles, media] = await Promise.all([
    adminBackendJson<{ items: Article[] }>("/articles"),
    adminBackendJson<{ items: MediaAsset[] }>("/media"),
  ]);

  return (
    <AdminPage
      title="Articles"
      description="Shape editorial pieces in markdown, manage featured placement, and keep article SEO metadata close to the publishing workflow."
    >
      <ArticleManager items={articles.items} media={media.items} canDelete={admin.role === "SUPER_ADMIN"} />
    </AdminPage>
  );
}
