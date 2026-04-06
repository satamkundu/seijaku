"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import AdminCard from "@/src/components/admin/AdminCard";
import { AdminField, adminButtonClassName, adminInputClassName, adminTextareaClassName } from "@/src/components/admin/AdminField";
import type { MediaAsset, SiteSettings } from "@/src/lib/admin-types";

export default function SettingsForm({ initialSettings, media }: { initialSettings: SiteSettings; media: MediaAsset[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState({
    footerEmail: initialSettings.footerEmail ?? "",
    footerPhone: initialSettings.footerPhone ?? "",
    addressLines: (initialSettings.addressLines ?? []).join("\n"),
    newsletterHeading: initialSettings.newsletterHeading ?? "",
    newsletterBody: initialSettings.newsletterBody ?? "",
    misc: initialSettings.misc ? JSON.stringify(initialSettings.misc, null, 2) : "",
    logoImageId: initialSettings.logoImage?.id ?? "",
  });
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <AdminCard>
      <div className="flex flex-col gap-4 border-b border-[#e2d7c7] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[24px]">Site Settings</h2>
          <p className="mt-2 text-[13px] leading-[1.8] text-[#7b7064]">Control the footer contact information, newsletter copy, misc JSON payload, and logo asset in one place.</p>
        </div>
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              setNotice(null);
              setError(null);

              let misc: Record<string, unknown> | null = null;
              if (draft.misc.trim()) {
                try {
                  misc = JSON.parse(draft.misc) as Record<string, unknown>;
                } catch {
                  setError("Misc JSON is invalid.");
                  return;
                }
              }

              const response = await fetch("/api/admin/proxy/site-settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  footerEmail: draft.footerEmail || null,
                  footerPhone: draft.footerPhone || null,
                  addressLines: draft.addressLines
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                  newsletterHeading: draft.newsletterHeading || null,
                  newsletterBody: draft.newsletterBody || null,
                  misc,
                  logoImageId: draft.logoImageId || null,
                }),
              });

              const data = (await response.json().catch(() => null)) as { error?: string } | null;

              if (!response.ok) {
                setError(data?.error ?? "Unable to save settings.");
                return;
              }

              setNotice("Site settings saved.");
              router.refresh();
            });
          }}
          className={adminButtonClassName}
        >
          Save settings
        </button>
      </div>

      {notice ? <p className="mt-5 rounded-2xl border border-[#cde0d2] bg-[#eef8f0] px-4 py-3 text-[14px] text-[#2c6541]">{notice}</p> : null}
      {error ? <p className="mt-5 rounded-2xl border border-[#e7c1ba] bg-[#fff1ee] px-4 py-3 text-[14px] text-[#9f4332]">{error}</p> : null}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <AdminField label="Footer email">
          <input value={draft.footerEmail} onChange={(event) => setDraft((current) => ({ ...current, footerEmail: event.target.value }))} className={adminInputClassName} />
        </AdminField>
        <AdminField label="Footer phone">
          <input value={draft.footerPhone} onChange={(event) => setDraft((current) => ({ ...current, footerPhone: event.target.value }))} className={adminInputClassName} />
        </AdminField>
        <AdminField label="Newsletter heading">
          <input value={draft.newsletterHeading} onChange={(event) => setDraft((current) => ({ ...current, newsletterHeading: event.target.value }))} className={adminInputClassName} />
        </AdminField>
        <AdminField label="Logo asset">
          <select value={draft.logoImageId} onChange={(event) => setDraft((current) => ({ ...current, logoImageId: event.target.value }))} className={adminInputClassName}>
            <option value="">None</option>
            {media.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.altText || asset.url}
              </option>
            ))}
          </select>
        </AdminField>
      </div>

      <div className="mt-5 grid gap-5">
        <AdminField label="Address lines" hint="One line per row.">
          <textarea rows={5} value={draft.addressLines} onChange={(event) => setDraft((current) => ({ ...current, addressLines: event.target.value }))} className={adminTextareaClassName} />
        </AdminField>
        <AdminField label="Newsletter body">
          <textarea rows={4} value={draft.newsletterBody} onChange={(event) => setDraft((current) => ({ ...current, newsletterBody: event.target.value }))} className={adminTextareaClassName} />
        </AdminField>
        <AdminField label="Misc JSON">
          <textarea rows={10} value={draft.misc} onChange={(event) => setDraft((current) => ({ ...current, misc: event.target.value }))} className={adminTextareaClassName} />
        </AdminField>
      </div>
    </AdminCard>
  );
}
