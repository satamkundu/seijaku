"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

import AdminStatusBadge from "@/src/components/admin/AdminStatusBadge";
import {
  adminDangerButtonClassName,
  adminInputClassName,
  adminSecondaryButtonClassName,
} from "@/src/components/admin/AdminField";
import type { ProductSummary } from "@/src/lib/admin-types";

type WorkflowCounts = {
  all: number;
  draft: number;
  published: number;
};

type ProductTableProps = {
  items: ProductSummary[];
  counts: WorkflowCounts;
  canDelete: boolean;
  currentWorkflow: "all" | "draft" | "published";
  currentSearch: string;
};

const workflowTabs: Array<{ key: ProductTableProps["currentWorkflow"]; label: string }> = [
  { key: "all", label: "All" },
  { key: "draft", label: "Draft" },
  { key: "published", label: "Published" },
];

function formatPrice(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

function formatRelative(iso: string) {
  const then = new Date(iso);
  const diffSec = Math.round((Date.now() - then.getTime()) / 1000);
  if (diffSec < 60) return "just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 86400 * 14) return `${Math.floor(diffSec / 86400)}d ago`;
  return then.toLocaleDateString();
}

export default function ProductTable({
  items,
  counts,
  canDelete,
  currentWorkflow,
  currentSearch,
}: ProductTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchDraft, setSearchDraft] = useState(currentSearch);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Debounce the search input into the URL so the server component can re-fetch.
  useEffect(() => {
    if (searchDraft === currentSearch) return;
    const handle = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchDraft) {
        params.set("search", searchDraft);
      } else {
        params.delete("search");
      }
      router.replace(`/admin/products?${params.toString()}`);
    }, 300);
    return () => window.clearTimeout(handle);
  }, [searchDraft, currentSearch, searchParams, router]);

  const allIds = useMemo(() => items.map((item) => item.id), [items]);
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.has(id));
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(allIds));
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const changeWorkflowTab = (next: ProductTableProps["currentWorkflow"]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") {
      params.delete("workflow");
    } else {
      params.set("workflow", next);
    }
    router.replace(`/admin/products?${params.toString()}`);
  };

  const runBulk = (action: "publish" | "unpublish" | "delete") => {
    if (selected.size === 0) return;

    if (action === "delete" && !window.confirm(`Permanently delete ${selected.size} product(s)? This cannot be undone.`)) {
      return;
    }

    startTransition(async () => {
      setError(null);
      setNotice(null);

      const response = await fetch("/api/admin/proxy/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ids: Array.from(selected) }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string; count?: number } | null;

      if (!response.ok) {
        setError(data?.error ?? `Bulk ${action} failed.`);
        return;
      }

      setNotice(`${action === "delete" ? "Deleted" : action === "publish" ? "Published" : "Unpublished"} ${data?.count ?? selected.size} product(s).`);
      setSelected(new Set());
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      {/* Tabs + search row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {workflowTabs.map((tab) => {
            const isActive = tab.key === currentWorkflow;
            const count = tab.key === "all" ? counts.all : tab.key === "draft" ? counts.draft : counts.published;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => changeWorkflowTab(tab.key)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] transition ${
                  isActive
                    ? "border-[#2e4a36] bg-[#2e4a36] text-[#f4efe8]"
                    : "border-[#d7cec1] bg-white text-[#3a3129] hover:bg-[#f0e6d8]"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    isActive ? "bg-[#f4efe8]/20 text-[#f4efe8]" : "bg-[#efe6d4] text-[#62574c]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <input
          type="search"
          value={searchDraft}
          onChange={(e) => setSearchDraft(e.target.value)}
          placeholder="Search by title or slug…"
          className={`${adminInputClassName} lg:max-w-sm`}
          aria-label="Search products"
        />
      </div>

      {/* Bulk action bar (only visible when rows are selected) */}
      {selected.size > 0 ? (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#d7cec1] bg-[#fff7e8] px-4 py-3">
          <span className="text-[12px] text-[#5a4b3a]">{selected.size} selected</span>
          <div className="ml-auto flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => runBulk("publish")}
              disabled={isPending}
              className={adminSecondaryButtonClassName}
            >
              Publish
            </button>
            <button
              type="button"
              onClick={() => runBulk("unpublish")}
              disabled={isPending}
              className={adminSecondaryButtonClassName}
            >
              Move to draft
            </button>
            {canDelete ? (
              <button
                type="button"
                onClick={() => runBulk("delete")}
                disabled={isPending}
                className={adminDangerButtonClassName}
              >
                Delete
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      {notice ? <p className="text-[13px] text-emerald-700">{notice}</p> : null}
      {error ? <p className="text-[13px] text-[#9f4332]">{error}</p> : null}

      {/* Table */}
      <div className="overflow-hidden rounded-[24px] border border-[#d7cec1] bg-white">
        <table className="w-full border-collapse text-left text-[14px]">
          <thead className="bg-[#fbf8f3] text-[11px] uppercase tracking-[0.16em] text-[#6a5d50]">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={toggleAll}
                  aria-label="Select all products"
                />
              </th>
              <th className="w-14 px-2 py-3"></th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Workflow</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Updated</th>
              <th className="w-28 px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-[13px] text-[#8a8075]">
                  No products match the current filter.
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const isSelected = selected.has(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`border-t border-[#ece2d2] transition ${isSelected ? "bg-[#f8f2e8]" : "hover:bg-[#fbf8f3]"}`}
                  >
                    <td className="px-4 py-3 align-middle">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(item.id)}
                        aria-label={`Select ${item.title}`}
                      />
                    </td>
                    <td className="px-2 py-3 align-middle">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-[#efe6d4]">
                        {item.primaryImage?.url ? (
                          <Image
                            src={item.primaryImage.url}
                            alt={item.primaryImage.altText ?? item.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.18em] text-[#a89a86]">
                            no image
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="font-medium text-[#1d1916]">{item.title}</div>
                      <div className="mt-0.5 text-[11px] text-[#8a8075]">{item.slug}</div>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <AdminStatusBadge value={item.workflowStatus} />
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <AdminStatusBadge value={item.status} />
                    </td>
                    <td className="px-4 py-3 align-middle text-[#3a3129]">{formatPrice(item.priceAmount, item.currency)}</td>
                    <td className="px-4 py-3 align-middle text-[#6a5d50]">{formatRelative(item.updatedAt)}</td>
                    <td className="px-4 py-3 text-right align-middle">
                      <Link
                        href={`/admin/products/${item.id}`}
                        className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#2e4a36] hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
