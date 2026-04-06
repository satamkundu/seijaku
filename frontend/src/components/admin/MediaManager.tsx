"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import AdminCard from "@/src/components/admin/AdminCard";
import { AdminField, adminButtonClassName, adminDangerButtonClassName, adminInputClassName, adminSecondaryButtonClassName } from "@/src/components/admin/AdminField";
import type { MediaAsset } from "@/src/lib/admin-types";

type MediaManagerProps = {
  items: MediaAsset[];
  canDelete: boolean;
};

export default function MediaManager({ items, canDelete }: MediaManagerProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [kind, setKind] = useState<MediaAsset["kind"]>("IMAGE");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const upload = () => {
    if (!selectedFile) {
      setError("Choose a file first.");
      return;
    }

    startTransition(async () => {
      setError(null);
      setNotice(null);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("altText", altText);
      formData.append("kind", kind);

      const response = await fetch("/api/admin/proxy/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(data?.error ?? "Unable to upload file.");
        return;
      }

      setNotice("Media asset uploaded.");
      setSelectedFile(null);
      setAltText("");
      router.refresh();
    });
  };

  const updateAsset = (id: string, payload: Record<string, unknown>) => {
    startTransition(async () => {
      setError(null);
      setNotice(null);

      const response = await fetch(`/api/admin/proxy/media/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(data?.error ?? "Unable to update asset.");
        return;
      }

      setNotice("Media asset updated.");
      router.refresh();
    });
  };

  const deleteAsset = (id: string) => {
    startTransition(async () => {
      setError(null);
      setNotice(null);

      const response = await fetch(`/api/admin/proxy/media/${id}`, {
        method: "DELETE",
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(data?.error ?? "Unable to delete asset.");
        return;
      }

      setNotice("Media asset deleted.");
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <AdminCard>
        <div className="flex flex-col gap-4 border-b border-[#e2d7c7] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-[24px]">Upload Media</h2>
            <p className="mt-2 text-[13px] leading-[1.8] text-[#7b7064]">Files flow through the Next proxy and land in local storage for development or S3-compatible storage in production.</p>
          </div>
          <button type="button" onClick={upload} disabled={isPending} className={adminButtonClassName}>
            Upload asset
          </button>
        </div>

        {notice ? <p className="mt-5 rounded-2xl border border-[#cde0d2] bg-[#eef8f0] px-4 py-3 text-[14px] text-[#2c6541]">{notice}</p> : null}
        {error ? <p className="mt-5 rounded-2xl border border-[#e7c1ba] bg-[#fff1ee] px-4 py-3 text-[14px] text-[#9f4332]">{error}</p> : null}

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <AdminField label="File">
            <input type="file" onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)} className={adminInputClassName} />
          </AdminField>
          <AdminField label="Kind">
            <select value={kind} onChange={(event) => setKind(event.target.value as MediaAsset["kind"])} className={adminInputClassName}>
              <option value="IMAGE">Image</option>
              <option value="VIDEO">Video</option>
              <option value="DOCUMENT">Document</option>
            </select>
          </AdminField>
          <AdminField label="Alt text">
            <input value={altText} onChange={(event) => setAltText(event.target.value)} className={adminInputClassName} />
          </AdminField>
        </div>
      </AdminCard>

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((asset) => (
          <EditableMediaCard key={asset.id} asset={asset} onSave={updateAsset} onDelete={deleteAsset} canDelete={canDelete} />
        ))}
      </div>
    </div>
  );
}

function EditableMediaCard({
  asset,
  onSave,
  onDelete,
  canDelete,
}: {
  asset: MediaAsset;
  onSave: (id: string, payload: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
  canDelete: boolean;
}) {
  const [draft, setDraft] = useState({
    url: asset.url,
    altText: asset.altText ?? "",
    kind: asset.kind,
    width: asset.width ? String(asset.width) : "",
    height: asset.height ? String(asset.height) : "",
  });

  return (
    <AdminCard>
      <div className="flex flex-col gap-4">
        <div className="rounded-[24px] border border-[#e2d7c7] bg-white p-4">
          {asset.kind === "IMAGE" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={asset.url} alt={asset.altText ?? "Media preview"} className="h-48 w-full rounded-[18px] object-cover" />
          ) : (
            <div className="flex h-48 items-center justify-center rounded-[18px] bg-[#efe8de] text-[14px] text-[#6f655a]">{asset.kind}</div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AdminField label="URL">
            <input value={draft.url} onChange={(event) => setDraft((current) => ({ ...current, url: event.target.value }))} className={adminInputClassName} />
          </AdminField>
          <AdminField label="Kind">
            <select value={draft.kind} onChange={(event) => setDraft((current) => ({ ...current, kind: event.target.value as MediaAsset["kind"] }))} className={adminInputClassName}>
              <option value="IMAGE">Image</option>
              <option value="VIDEO">Video</option>
              <option value="DOCUMENT">Document</option>
            </select>
          </AdminField>
          <AdminField label="Alt text">
            <input value={draft.altText} onChange={(event) => setDraft((current) => ({ ...current, altText: event.target.value }))} className={adminInputClassName} />
          </AdminField>
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Width">
              <input value={draft.width} onChange={(event) => setDraft((current) => ({ ...current, width: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="Height">
              <input value={draft.height} onChange={(event) => setDraft((current) => ({ ...current, height: event.target.value }))} className={adminInputClassName} />
            </AdminField>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className={adminButtonClassName}
            onClick={() =>
              onSave(asset.id, {
                url: draft.url,
                altText: draft.altText || null,
                kind: draft.kind,
                width: draft.width ? Number(draft.width) : null,
                height: draft.height ? Number(draft.height) : null,
              })
            }
          >
            Save asset
          </button>
          {canDelete ? (
            <button type="button" className={adminDangerButtonClassName} onClick={() => onDelete(asset.id)}>
              Delete asset
            </button>
          ) : null}
          <a href={asset.url} target="_blank" rel="noreferrer" className={adminSecondaryButtonClassName}>
            Open asset
          </a>
        </div>
      </div>
    </AdminCard>
  );
}
