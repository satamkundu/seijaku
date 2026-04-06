"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import AdminCard from "@/src/components/admin/AdminCard";
import AdminStatusBadge from "@/src/components/admin/AdminStatusBadge";
import { AdminField, adminButtonClassName, adminInputClassName, adminSecondaryButtonClassName } from "@/src/components/admin/AdminField";
import type { AdminIdentity } from "@/src/lib/admin-types";

type AdminRecord = AdminIdentity & {
  createdAt?: string;
  updatedAt?: string;
};

function buildDraft(admin: AdminRecord | null) {
  return {
    email: admin?.email ?? "",
    role: admin?.role ?? "EDITOR",
    status: admin?.status ?? "ACTIVE",
    password: "",
  };
}

export default function TeamManager({ items }: { items: AdminRecord[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const selectedItem = items.find((item) => item.id === selectedId) ?? null;
  const [draft, setDraft] = useState(() => buildDraft(selectedItem));
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setDraft(buildDraft(selectedItem));
    setNewPassword("");
  }, [selectedItem]);

  const save = (method: "POST" | "PATCH") => {
    startTransition(async () => {
      setNotice(null);
      setError(null);

      const payload = {
        email: draft.email,
        role: draft.role,
        status: draft.status,
        ...(method === "POST" ? { password: draft.password } : {}),
      };

      const response = await fetch(method === "POST" ? "/api/admin/proxy/admins" : `/api/admin/proxy/admins/${selectedItem?.id}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(data?.error ?? "Unable to save admin.");
        return;
      }

      setNotice(method === "POST" ? "Admin account created." : "Admin account updated.");
      router.refresh();
    });
  };

  const rotatePassword = () => {
    if (!selectedItem || !newPassword.trim()) {
      setError("Enter a new password first.");
      return;
    }

    startTransition(async () => {
      setNotice(null);
      setError(null);

      const response = await fetch(`/api/admin/proxy/admins/${selectedItem.id}/password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(data?.error ?? "Unable to rotate password.");
        return;
      }

      setNotice("Password rotated.");
      setNewPassword("");
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
      <AdminCard className="h-fit">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[22px]">Admins</h2>
          <button
            type="button"
            className={adminSecondaryButtonClassName}
            onClick={() => {
              setSelectedId(null);
              setDraft(buildDraft(null));
            }}
          >
            New
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`block w-full rounded-2xl border px-4 py-4 text-left transition ${
                selectedId === item.id ? "border-[#365b3f] bg-[#eff6f1]" : "border-[#e2d7c7] bg-white hover:border-[#cdbda7]"
              }`}
            >
              <p className="text-[15px] font-medium text-[#201b18]">{item.email}</p>
              <div className="mt-3 flex items-center gap-3">
                <AdminStatusBadge value={item.status} />
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#7d7267]">{item.role.replace("_", " ")}</span>
              </div>
            </button>
          ))}
        </div>
      </AdminCard>

      <div className="space-y-6">
        <AdminCard>
          <div className="flex flex-col gap-4 border-b border-[#e2d7c7] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[24px]">{selectedItem ? "Edit Admin" : "Create Admin"}</h2>
              <p className="mt-2 text-[13px] leading-[1.8] text-[#7b7064]">Only super-admins can manage the team and protect the last active super-admin from being removed.</p>
            </div>
            <button type="button" disabled={isPending} onClick={() => save(selectedItem ? "PATCH" : "POST")} className={adminButtonClassName}>
              {selectedItem ? "Save admin" : "Create admin"}
            </button>
          </div>

          {notice ? <p className="mt-5 rounded-2xl border border-[#cde0d2] bg-[#eef8f0] px-4 py-3 text-[14px] text-[#2c6541]">{notice}</p> : null}
          {error ? <p className="mt-5 rounded-2xl border border-[#e7c1ba] bg-[#fff1ee] px-4 py-3 text-[14px] text-[#9f4332]">{error}</p> : null}

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <AdminField label="Email">
              <input value={draft.email} onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="Role">
              <select value={draft.role} onChange={(event) => setDraft((current) => ({ ...current, role: event.target.value as AdminIdentity["role"] }))} className={adminInputClassName}>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="EDITOR">Editor</option>
              </select>
            </AdminField>
            <AdminField label="Status">
              <select value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value as AdminIdentity["status"] }))} className={adminInputClassName}>
                <option value="ACTIVE">Active</option>
                <option value="DISABLED">Disabled</option>
              </select>
            </AdminField>
            {!selectedItem ? (
              <AdminField label="Password">
                <input type="password" value={draft.password} onChange={(event) => setDraft((current) => ({ ...current, password: event.target.value }))} className={adminInputClassName} />
              </AdminField>
            ) : null}
          </div>
        </AdminCard>

        {selectedItem ? (
          <AdminCard>
            <div className="flex flex-col gap-4 border-b border-[#e2d7c7] pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-[24px]">Rotate Password</h2>
                <p className="mt-2 text-[13px] leading-[1.8] text-[#7b7064]">Use this when an admin needs a new credential without recreating the account.</p>
              </div>
              <button type="button" disabled={isPending} onClick={rotatePassword} className={adminButtonClassName}>
                Update password
              </button>
            </div>

            <div className="mt-6 max-w-md">
              <AdminField label="New password">
                <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className={adminInputClassName} />
              </AdminField>
            </div>
          </AdminCard>
        ) : null}
      </div>
    </div>
  );
}
