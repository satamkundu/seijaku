import { redirect } from "next/navigation";

import AdminLoginForm from "@/src/components/admin/AdminLoginForm";
import { getCurrentAdminIdentity } from "@/src/lib/admin-session";

export default async function AdminLoginPage() {
  const session = await getCurrentAdminIdentity();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f6f0e6_0%,#efe4d6_45%,#eaded1_100%)] px-6 py-12 text-[#2f2924]">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1080px] items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[36px] border border-[#d7cec1] bg-[#2e4a36] p-8 text-[#f4efe8] shadow-[0_32px_80px_rgba(34,44,38,0.18)] sm:p-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#e0c98a]">Seijaku Admin</p>
          <h1 className="mt-6 font-serif text-[clamp(34px,4vw,52px)] leading-[1.04] tracking-[-0.03em] text-white">
            Quiet control over catalog, content, and conversations.
          </h1>
          <p className="mt-6 max-w-[30ch] text-[15px] leading-[1.85] text-white/80">
            Use the admin console to shape products, bridge pages, editorial pieces, experience offerings, and every incoming inquiry.
          </p>
        </div>

        <div className="rounded-[36px] border border-[#d7cec1] bg-[#fbf8f3] p-8 shadow-[0_22px_60px_rgba(55,42,31,0.08)] sm:p-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#8d7254]">Admin login</p>
          <h2 className="mt-5 text-[clamp(30px,3.6vw,42px)] leading-[1.08] tracking-[-0.03em] text-[#1e1916]">Sign in with your admin email and password.</h2>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.8] text-[#62574c]">
            Sessions stay inside this app through a secure httpOnly cookie. The browser never stores the backend token directly.
          </p>

          <div className="mt-8">
            <AdminLoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
