"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

import AdminCard from "@/src/components/admin/AdminCard";
import { AdminField, adminButtonClassName, adminDangerButtonClassName, adminInputClassName, adminSecondaryButtonClassName, adminTextareaClassName } from "@/src/components/admin/AdminField";
import AdminStatusBadge from "@/src/components/admin/AdminStatusBadge";
import type { BridgePage, CollectionSummary, MediaAsset, ProductCategory, ProductSummary } from "@/src/lib/admin-types";

type ProductEditorProps = {
  product: ProductSummary | null;
  media: MediaAsset[];
  categories: ProductCategory[];
  collections: CollectionSummary[];
  bridgePages: BridgePage[];
  canDelete: boolean;
};

type ProductOptionDraft = {
  id: string;
  code: string;
  label: string;
  selectionMode: "SINGLE" | "MULTI";
  required: boolean;
  sortOrder: number;
  values: Array<{
    id: string;
    value: string;
    label: string;
    priceDeltaAmount: number;
    sortOrder: number;
  }>;
};

const tabs = ["Core", "Media", "Options", "Categories", "Collections", "Bridge Pages", "Advanced"] as const;
type ProductTab = (typeof tabs)[number];

function buildCoreState(product: ProductSummary | null) {
  return {
    slug: product?.slug ?? "",
    title: product?.title ?? "",
    shortDescription: product?.shortDescription ?? "",
    longDescription: product?.longDescription ?? "",
    type: product?.type ?? "",
    material: product?.material ?? "",
    useCase: product?.useCase ?? "",
    priceAmount: product?.priceAmount ?? 0,
    currency: product?.currency ?? "INR",
    status: product?.status ?? "IN_STOCK",
    releaseDate: product?.releaseDate ? product.releaseDate.slice(0, 16) : "",
    seoTitle: product?.seoTitle ?? "",
    seoDescription: product?.seoDescription ?? "",
    imageAlt: product?.imageAlt ?? "",
    ctaLabel: product?.ctaLabel ?? "",
    publishedAt: product?.publishedAt ? product.publishedAt.slice(0, 16) : "",
  };
}

function buildAdvancedState(product: ProductSummary | null) {
  return {
    metadata: product?.metadata ? JSON.stringify(product.metadata, null, 2) : "",
  };
}

function buildMediaState(product: ProductSummary | null) {
  return {
    primaryImageId: product?.primaryImage?.id ?? "",
    items:
      product?.media.map((item) => ({
        mediaAssetId: item.asset.id,
        sortOrder: item.sortOrder,
        mediaType: item.type,
      })) ?? [],
  };
}

function buildAssignmentState(entries: Array<{ id: string; sortOrder: number }>) {
  return entries.map((entry) => ({
    id: entry.id,
    sortOrder: entry.sortOrder,
  }));
}

function buildOptionsState(product: ProductSummary | null): ProductOptionDraft[] {
  return (
    product?.options.map((option) => ({
      id: option.id,
      code: option.code,
      label: option.label,
      selectionMode: option.selectionMode,
      required: option.required,
      sortOrder: option.sortOrder,
      values: option.values.map((value) => ({
        id: value.id,
        value: value.value,
        label: value.label,
        priceDeltaAmount: value.priceDeltaAmount,
        sortOrder: value.sortOrder,
      })),
    })) ?? []
  );
}

export default function ProductEditor({ product, media, categories, collections, bridgePages, canDelete }: ProductEditorProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProductTab>("Core");
  const [core, setCore] = useState(buildCoreState(product));
  const [advanced, setAdvanced] = useState(buildAdvancedState(product));
  const [mediaState, setMediaState] = useState(buildMediaState(product));
  const [categoryAssignments, setCategoryAssignments] = useState(buildAssignmentState(product?.categories ?? []));
  const [collectionAssignments, setCollectionAssignments] = useState(buildAssignmentState(product?.collections ?? []));
  const [bridgeAssignments, setBridgeAssignments] = useState(buildAssignmentState(product?.bridgePages ?? []));
  const [options, setOptions] = useState<ProductOptionDraft[]>(buildOptionsState(product));
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setCore(buildCoreState(product));
    setAdvanced(buildAdvancedState(product));
    setMediaState(buildMediaState(product));
    setCategoryAssignments(buildAssignmentState(product?.categories ?? []));
    setCollectionAssignments(buildAssignmentState(product?.collections ?? []));
    setBridgeAssignments(buildAssignmentState(product?.bridgePages ?? []));
    setOptions(buildOptionsState(product));
  }, [product]);

  const isExistingProduct = Boolean(product?.id);

  const selectedMediaIds = useMemo(() => new Set(mediaState.items.map((item) => item.mediaAssetId)), [mediaState.items]);
  const selectedCategoryIds = useMemo(() => new Set(categoryAssignments.map((item) => item.id)), [categoryAssignments]);
  const selectedCollectionIds = useMemo(() => new Set(collectionAssignments.map((item) => item.id)), [collectionAssignments]);
  const selectedBridgePageIds = useMemo(() => new Set(bridgeAssignments.map((item) => item.id)), [bridgeAssignments]);

  const persistCore = () => {
    startTransition(async () => {
      setNotice(null);
      setError(null);

      let metadata: Record<string, unknown> | null = null;
      if (advanced.metadata.trim()) {
        try {
          metadata = JSON.parse(advanced.metadata) as Record<string, unknown>;
        } catch {
          setError("Metadata JSON is invalid.");
          return;
        }
      }

      const payload = {
        ...core,
        priceAmount: Number(core.priceAmount),
        releaseDate: core.releaseDate ? new Date(core.releaseDate).toISOString() : null,
        publishedAt: core.publishedAt ? new Date(core.publishedAt).toISOString() : null,
        metadata,
        primaryImageId: mediaState.primaryImageId || null,
      };

      const response = await fetch(isExistingProduct ? `/api/admin/proxy/products/${product!.id}` : "/api/admin/proxy/products", {
        method: isExistingProduct ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as { error?: string; item?: { id: string } } | null;

      if (!response.ok) {
        setError(data?.error ?? "Unable to save product.");
        return;
      }

      setNotice(isExistingProduct ? "Core product details saved." : "Product created. You can now configure media and relationships.");

      if (!isExistingProduct && data?.item?.id) {
        router.push(`/admin/products/${data.item.id}`);
      }

      router.refresh();
    });
  };

  const persistMedia = () => {
    if (!product) {
      return;
    }

    startTransition(async () => {
      setNotice(null);
      setError(null);

      const response = await fetch(`/api/admin/proxy/products/${product.id}/media`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          primaryImageId: mediaState.primaryImageId || null,
          items: mediaState.items,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Unable to save media.");
        return;
      }

      setNotice("Media assignments saved.");
      router.refresh();
    });
  };

  const persistAssignments = async (path: string, assignments: Array<{ id: string; sortOrder: number }>, key: "categoryId" | "collectionId" | "bridgePageId", successMessage: string) => {
    if (!product) {
      return;
    }

    const response = await fetch(`/api/admin/proxy/products/${product.id}/${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignments: assignments.map((entry) => ({
          [key]: entry.id,
          sortOrder: entry.sortOrder,
        })),
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(data?.error ?? `Unable to save ${path}.`);
    }

    setNotice(successMessage);
  };

  const persistSimpleAssignments = (path: string, assignments: Array<{ id: string; sortOrder: number }>, key: "categoryId" | "collectionId" | "bridgePageId", message: string) => {
    startTransition(async () => {
      setNotice(null);
      setError(null);
      try {
        await persistAssignments(path, assignments, key, message);
        router.refresh();
      } catch (assignmentError) {
        setError(assignmentError instanceof Error ? assignmentError.message : "Unable to save assignments.");
      }
    });
  };

  const updateOption = async (option: ProductOptionDraft) => {
    if (!product) {
      return;
    }

    const response = await fetch(`/api/admin/proxy/product-options/${option.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        code: option.code,
        label: option.label,
        selectionMode: option.selectionMode,
        required: option.required,
        sortOrder: option.sortOrder,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(data?.error ?? "Unable to save option.");
    }
  };

  const createOption = async () => {
    if (!product) {
      return;
    }

    const response = await fetch("/api/admin/proxy/product-options", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        code: `option-${options.length + 1}`,
        label: "New Option",
        selectionMode: "SINGLE",
        required: false,
        sortOrder: options.length,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(data?.error ?? "Unable to create option.");
    }
  };

  const deleteOption = async (optionId: string) => {
    const response = await fetch(`/api/admin/proxy/product-options/${optionId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(data?.error ?? "Unable to delete option.");
    }
  };

  const createValue = async (optionId: string, index: number) => {
    const response = await fetch("/api/admin/proxy/product-option-values", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productOptionId: optionId,
        value: `value-${index + 1}`,
        label: "New Value",
        priceDeltaAmount: 0,
        sortOrder: index,
        isActive: true,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(data?.error ?? "Unable to create option value.");
    }
  };

  const updateValue = async (value: ProductOptionDraft["values"][number], optionId: string) => {
    const response = await fetch(`/api/admin/proxy/product-option-values/${value.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productOptionId: optionId,
        value: value.value,
        label: value.label,
        priceDeltaAmount: value.priceDeltaAmount,
        sortOrder: value.sortOrder,
        isActive: true,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(data?.error ?? "Unable to save option value.");
    }
  };

  const deleteValue = async (valueId: string) => {
    const response = await fetch(`/api/admin/proxy/product-option-values/${valueId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(data?.error ?? "Unable to delete option value.");
    }
  };

  const removeProduct = () => {
    if (!product) {
      return;
    }

    startTransition(async () => {
      const response = await fetch(`/api/admin/proxy/products/${product.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Unable to delete product.");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
              activeTab === tab ? "bg-[#2e4a36] text-[#f4efe8]" : "border border-[#cdbfae] bg-[#f8f2e8] text-[#3a3129]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {notice ? <p className="rounded-2xl border border-[#cde0d2] bg-[#eef8f0] px-4 py-3 text-[14px] text-[#2c6541]">{notice}</p> : null}
      {error ? <p className="rounded-2xl border border-[#e7c1ba] bg-[#fff1ee] px-4 py-3 text-[14px] text-[#9f4332]">{error}</p> : null}

      {activeTab === "Core" ? (
        <AdminCard>
          <div className="flex flex-col gap-4 border-b border-[#e2d7c7] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[24px]">Core Product Details</h2>
              {product ? (
                <div className="mt-3 flex items-center gap-3">
                  <AdminStatusBadge value={product.status} />
                  <span className="text-[12px] uppercase tracking-[0.18em] text-[#807568]">{product.slug}</span>
                </div>
              ) : null}
            </div>
            <div className="flex gap-3">
              <button type="button" disabled={isPending} onClick={persistCore} className={adminButtonClassName}>
                {product ? "Save core" : "Create product"}
              </button>
              {product && canDelete ? (
                <button type="button" disabled={isPending} onClick={removeProduct} className={adminDangerButtonClassName}>
                  Delete
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <AdminField label="Slug">
              <input value={core.slug} onChange={(event) => setCore((current) => ({ ...current, slug: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="Title">
              <input value={core.title} onChange={(event) => setCore((current) => ({ ...current, title: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="Type">
              <input value={core.type} onChange={(event) => setCore((current) => ({ ...current, type: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="Material">
              <input value={core.material} onChange={(event) => setCore((current) => ({ ...current, material: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="Use case">
              <input value={core.useCase} onChange={(event) => setCore((current) => ({ ...current, useCase: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="Currency">
              <input value={core.currency} onChange={(event) => setCore((current) => ({ ...current, currency: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="Price amount">
              <input
                type="number"
                value={core.priceAmount}
                onChange={(event) => setCore((current) => ({ ...current, priceAmount: Number(event.target.value) }))}
                className={adminInputClassName}
              />
            </AdminField>
            <AdminField label="Status">
              <select value={core.status} onChange={(event) => setCore((current) => ({ ...current, status: event.target.value }))} className={adminInputClassName}>
                {["IN_STOCK", "LIMITED_EDITION", "UPCOMING", "OPEN_FOR_BOOKING", "SOLD_OUT", "WAITLIST", "BOOKING_OPEN"].map((status) => (
                  <option key={status} value={status}>
                    {status.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Release date">
              <input type="datetime-local" value={core.releaseDate} onChange={(event) => setCore((current) => ({ ...current, releaseDate: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="Published at">
              <input type="datetime-local" value={core.publishedAt} onChange={(event) => setCore((current) => ({ ...current, publishedAt: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="CTA label">
              <input value={core.ctaLabel} onChange={(event) => setCore((current) => ({ ...current, ctaLabel: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="Image alt">
              <input value={core.imageAlt} onChange={(event) => setCore((current) => ({ ...current, imageAlt: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="SEO title">
              <input value={core.seoTitle} onChange={(event) => setCore((current) => ({ ...current, seoTitle: event.target.value }))} className={adminInputClassName} />
            </AdminField>
            <AdminField label="SEO description">
              <textarea rows={3} value={core.seoDescription} onChange={(event) => setCore((current) => ({ ...current, seoDescription: event.target.value }))} className={adminTextareaClassName} />
            </AdminField>
          </div>

          <div className="mt-5 grid gap-5">
            <AdminField label="Short description">
              <textarea rows={4} value={core.shortDescription} onChange={(event) => setCore((current) => ({ ...current, shortDescription: event.target.value }))} className={adminTextareaClassName} />
            </AdminField>
            <AdminField label="Long description">
              <textarea rows={8} value={core.longDescription} onChange={(event) => setCore((current) => ({ ...current, longDescription: event.target.value }))} className={adminTextareaClassName} />
            </AdminField>
          </div>
        </AdminCard>
      ) : null}

      {activeTab === "Advanced" ? (
        <AdminCard>
          <div className="flex flex-col gap-4 border-b border-[#e2d7c7] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[24px]">Advanced Metadata</h2>
              <p className="mt-2 text-[13px] leading-[1.8] text-[#7b7064]">Use JSON to preserve catalog fields that are not yet modeled in the structured editor.</p>
            </div>
            <button type="button" disabled={isPending} onClick={persistCore} className={adminButtonClassName}>
              Save metadata
            </button>
          </div>

          <div className="mt-6">
            <AdminField label="Metadata JSON">
              <textarea rows={14} value={advanced.metadata} onChange={(event) => setAdvanced({ metadata: event.target.value })} className={adminTextareaClassName} />
            </AdminField>
          </div>
        </AdminCard>
      ) : null}

      {activeTab !== "Core" && activeTab !== "Advanced" && !isExistingProduct ? (
        <AdminCard>
          <p className="text-[15px] leading-[1.8] text-[#62574c]">Create the product first, then return to configure media, options, and relationships.</p>
        </AdminCard>
      ) : null}

      {activeTab === "Media" && product ? (
        <AdminCard>
          <div className="flex flex-col gap-4 border-b border-[#e2d7c7] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[24px]">Media Assignments</h2>
              <p className="mt-2 text-[13px] leading-[1.8] text-[#7b7064]">Choose the primary asset and define the ordered gallery for the product.</p>
            </div>
            <button type="button" disabled={isPending} onClick={persistMedia} className={adminButtonClassName}>
              Save media
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {media.map((asset) => {
              const selectedItem = mediaState.items.find((item) => item.mediaAssetId === asset.id);

              return (
                <div key={asset.id} className="rounded-2xl border border-[#e2d7c7] bg-white p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[14px] font-medium text-[#1f1a16]">{asset.altText || asset.url}</p>
                      <p className="mt-1 text-[12px] leading-[1.7] text-[#7b7064]">{asset.kind}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedMediaIds.has(asset.id)}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setMediaState((current) => ({
                            ...current,
                            items: [...current.items, { mediaAssetId: asset.id, sortOrder: current.items.length, mediaType: "GALLERY" }],
                          }));
                        } else {
                          setMediaState((current) => ({
                            ...current,
                            primaryImageId: current.primaryImageId === asset.id ? "" : current.primaryImageId,
                            items: current.items.filter((item) => item.mediaAssetId !== asset.id),
                          }));
                        }
                      }}
                    />
                  </div>

                  {selectedItem ? (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <AdminField label="Primary image">
                        <input
                          type="radio"
                          checked={mediaState.primaryImageId === asset.id}
                          onChange={() => setMediaState((current) => ({ ...current, primaryImageId: asset.id }))}
                        />
                      </AdminField>
                      <AdminField label="Sort order">
                        <input
                          type="number"
                          value={selectedItem.sortOrder}
                          onChange={(event) =>
                            setMediaState((current) => ({
                              ...current,
                              items: current.items.map((item) =>
                                item.mediaAssetId === asset.id ? { ...item, sortOrder: Number(event.target.value) } : item
                              ),
                            }))
                          }
                          className={adminInputClassName}
                        />
                      </AdminField>
                      <AdminField label="Media type">
                        <select
                          value={selectedItem.mediaType}
                          onChange={(event) =>
                            setMediaState((current) => ({
                              ...current,
                              items: current.items.map((item) =>
                                item.mediaAssetId === asset.id ? { ...item, mediaType: event.target.value } : item
                              ),
                            }))
                          }
                          className={adminInputClassName}
                        >
                          {["PRIMARY", "GALLERY", "DETAIL", "VIDEO_POSTER"].map((type) => (
                            <option key={type} value={type}>
                              {type.replaceAll("_", " ")}
                            </option>
                          ))}
                        </select>
                      </AdminField>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </AdminCard>
      ) : null}

      {activeTab === "Options" && product ? (
        <AdminCard>
          <div className="flex flex-col gap-4 border-b border-[#e2d7c7] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[24px]">Options & Variant Values</h2>
              <p className="mt-2 text-[13px] leading-[1.8] text-[#7b7064]">Configure selectors used by diffusers, textiles, and lifestyle bundle flows.</p>
            </div>
            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  setNotice(null);
                  setError(null);
                  try {
                    await createOption();
                    setNotice("Option created.");
                    router.refresh();
                  } catch (optionError) {
                    setError(optionError instanceof Error ? optionError.message : "Unable to create option.");
                  }
                });
              }}
              className={adminSecondaryButtonClassName}
            >
              Add option
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {options.length === 0 ? (
              <p className="text-[14px] leading-[1.8] text-[#62574c]">No options configured yet.</p>
            ) : (
              options.map((option, optionIndex) => (
                <div key={option.id} className="rounded-[26px] border border-[#e2d7c7] bg-white p-5">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <AdminField label="Code">
                      <input
                        value={option.code}
                        onChange={(event) =>
                          setOptions((current) =>
                            current.map((entry, index) => (index === optionIndex ? { ...entry, code: event.target.value } : entry))
                          )
                        }
                        className={adminInputClassName}
                      />
                    </AdminField>
                    <AdminField label="Label">
                      <input
                        value={option.label}
                        onChange={(event) =>
                          setOptions((current) =>
                            current.map((entry, index) => (index === optionIndex ? { ...entry, label: event.target.value } : entry))
                          )
                        }
                        className={adminInputClassName}
                      />
                    </AdminField>
                    <AdminField label="Selection mode">
                      <select
                        value={option.selectionMode}
                        onChange={(event) =>
                          setOptions((current) =>
                            current.map((entry, index) =>
                              index === optionIndex ? { ...entry, selectionMode: event.target.value as "SINGLE" | "MULTI" } : entry
                            )
                          )
                        }
                        className={adminInputClassName}
                      >
                        <option value="SINGLE">Single</option>
                        <option value="MULTI">Multi</option>
                      </select>
                    </AdminField>
                    <AdminField label="Sort order">
                      <input
                        type="number"
                        value={option.sortOrder}
                        onChange={(event) =>
                          setOptions((current) =>
                            current.map((entry, index) => (index === optionIndex ? { ...entry, sortOrder: Number(event.target.value) } : entry))
                          )
                        }
                        className={adminInputClassName}
                      />
                    </AdminField>
                  </div>

                  <label className="mt-4 flex items-center gap-3 text-[13px] text-[#62574c]">
                    <input
                      type="checkbox"
                      checked={option.required}
                      onChange={(event) =>
                        setOptions((current) =>
                          current.map((entry, index) => (index === optionIndex ? { ...entry, required: event.target.checked } : entry))
                        )
                      }
                    />
                    Required selection
                  </label>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className={adminButtonClassName}
                      onClick={() => {
                        startTransition(async () => {
                          setNotice(null);
                          setError(null);
                          try {
                            await updateOption(option);
                            setNotice("Option saved.");
                            router.refresh();
                          } catch (optionError) {
                            setError(optionError instanceof Error ? optionError.message : "Unable to save option.");
                          }
                        });
                      }}
                    >
                      Save option
                    </button>
                    <button
                      type="button"
                      className={adminSecondaryButtonClassName}
                      onClick={() => {
                        startTransition(async () => {
                          setNotice(null);
                          setError(null);
                          try {
                            await createValue(option.id, option.values.length);
                            setNotice("Option value created.");
                            router.refresh();
                          } catch (valueError) {
                            setError(valueError instanceof Error ? valueError.message : "Unable to create option value.");
                          }
                        });
                      }}
                    >
                      Add value
                    </button>
                    {canDelete ? (
                      <button
                        type="button"
                        className={adminDangerButtonClassName}
                        onClick={() => {
                          startTransition(async () => {
                            setNotice(null);
                            setError(null);
                            try {
                              await deleteOption(option.id);
                              setNotice("Option deleted.");
                              router.refresh();
                            } catch (optionError) {
                              setError(optionError instanceof Error ? optionError.message : "Unable to delete option.");
                            }
                          });
                        }}
                      >
                        Delete option
                      </button>
                    ) : null}
                  </div>

                  <div className="mt-5 space-y-4">
                    {option.values.map((value, valueIndex) => (
                      <div key={value.id} className="rounded-2xl border border-[#ebe2d7] bg-[#fbf8f3] p-4">
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                          <AdminField label="Value">
                            <input
                              value={value.value}
                              onChange={(event) =>
                                setOptions((current) =>
                                  current.map((entry, index) =>
                                    index === optionIndex
                                      ? {
                                          ...entry,
                                          values: entry.values.map((item, itemIndex) =>
                                            itemIndex === valueIndex ? { ...item, value: event.target.value } : item
                                          ),
                                        }
                                      : entry
                                  )
                                )
                              }
                              className={adminInputClassName}
                            />
                          </AdminField>
                          <AdminField label="Label">
                            <input
                              value={value.label}
                              onChange={(event) =>
                                setOptions((current) =>
                                  current.map((entry, index) =>
                                    index === optionIndex
                                      ? {
                                          ...entry,
                                          values: entry.values.map((item, itemIndex) =>
                                            itemIndex === valueIndex ? { ...item, label: event.target.value } : item
                                          ),
                                        }
                                      : entry
                                  )
                                )
                              }
                              className={adminInputClassName}
                            />
                          </AdminField>
                          <AdminField label="Price delta">
                            <input
                              type="number"
                              value={value.priceDeltaAmount}
                              onChange={(event) =>
                                setOptions((current) =>
                                  current.map((entry, index) =>
                                    index === optionIndex
                                      ? {
                                          ...entry,
                                          values: entry.values.map((item, itemIndex) =>
                                            itemIndex === valueIndex ? { ...item, priceDeltaAmount: Number(event.target.value) } : item
                                          ),
                                        }
                                      : entry
                                  )
                                )
                              }
                              className={adminInputClassName}
                            />
                          </AdminField>
                          <AdminField label="Sort order">
                            <input
                              type="number"
                              value={value.sortOrder}
                              onChange={(event) =>
                                setOptions((current) =>
                                  current.map((entry, index) =>
                                    index === optionIndex
                                      ? {
                                          ...entry,
                                          values: entry.values.map((item, itemIndex) =>
                                            itemIndex === valueIndex ? { ...item, sortOrder: Number(event.target.value) } : item
                                          ),
                                        }
                                      : entry
                                  )
                                )
                              }
                              className={adminInputClassName}
                            />
                          </AdminField>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            type="button"
                            className={adminButtonClassName}
                            onClick={() => {
                              startTransition(async () => {
                                setNotice(null);
                                setError(null);
                                try {
                                  await updateValue(value, option.id);
                                  setNotice("Option value saved.");
                                  router.refresh();
                                } catch (valueError) {
                                  setError(valueError instanceof Error ? valueError.message : "Unable to save option value.");
                                }
                              });
                            }}
                          >
                            Save value
                          </button>
                          {canDelete ? (
                            <button
                              type="button"
                              className={adminDangerButtonClassName}
                              onClick={() => {
                                startTransition(async () => {
                                  setNotice(null);
                                  setError(null);
                                  try {
                                    await deleteValue(value.id);
                                    setNotice("Option value deleted.");
                                    router.refresh();
                                  } catch (valueError) {
                                    setError(valueError instanceof Error ? valueError.message : "Unable to delete option value.");
                                  }
                                });
                              }}
                            >
                              Delete value
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </AdminCard>
      ) : null}

      {activeTab === "Categories" && product ? (
        <AdminCard>
          <div className="flex flex-col gap-4 border-b border-[#e2d7c7] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[24px]">Category Memberships</h2>
            </div>
            <button
              type="button"
              className={adminButtonClassName}
              onClick={() => persistSimpleAssignments("categories", categoryAssignments, "categoryId", "Category memberships saved.")}
            >
              Save categories
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {categories.map((category) => {
              const selected = categoryAssignments.find((entry) => entry.id === category.id);

              return (
                <div key={category.id} className="rounded-2xl border border-[#e2d7c7] bg-white p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[15px] font-medium text-[#201b18]">{category.name}</p>
                      <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-[#7d7267]">{category.kind.replaceAll("_", " ")}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedCategoryIds.has(category.id)}
                      onChange={(event) =>
                        setCategoryAssignments((current) =>
                          event.target.checked ? [...current, { id: category.id, sortOrder: current.length }] : current.filter((entry) => entry.id !== category.id)
                        )
                      }
                    />
                  </div>
                  {selected ? (
                    <div className="mt-4">
                      <AdminField label="Sort order">
                        <input
                          type="number"
                          value={selected.sortOrder}
                          onChange={(event) =>
                            setCategoryAssignments((current) =>
                              current.map((entry) => (entry.id === category.id ? { ...entry, sortOrder: Number(event.target.value) } : entry))
                            )
                          }
                          className={adminInputClassName}
                        />
                      </AdminField>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </AdminCard>
      ) : null}

      {activeTab === "Collections" && product ? (
        <AdminCard>
          <div className="flex flex-col gap-4 border-b border-[#e2d7c7] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[24px]">Collection Memberships</h2>
            </div>
            <button
              type="button"
              className={adminButtonClassName}
              onClick={() => persistSimpleAssignments("collections", collectionAssignments, "collectionId", "Collection memberships saved.")}
            >
              Save collections
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {collections.map((collection) => {
              const selected = collectionAssignments.find((entry) => entry.id === collection.id);

              return (
                <div key={collection.id} className="rounded-2xl border border-[#e2d7c7] bg-white p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[15px] font-medium text-[#201b18]">{collection.name}</p>
                      <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-[#7d7267]">{collection.kind.replaceAll("_", " ")}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedCollectionIds.has(collection.id)}
                      onChange={(event) =>
                        setCollectionAssignments((current) =>
                          event.target.checked ? [...current, { id: collection.id, sortOrder: current.length }] : current.filter((entry) => entry.id !== collection.id)
                        )
                      }
                    />
                  </div>
                  {selected ? (
                    <div className="mt-4">
                      <AdminField label="Sort order">
                        <input
                          type="number"
                          value={selected.sortOrder}
                          onChange={(event) =>
                            setCollectionAssignments((current) =>
                              current.map((entry) => (entry.id === collection.id ? { ...entry, sortOrder: Number(event.target.value) } : entry))
                            )
                          }
                          className={adminInputClassName}
                        />
                      </AdminField>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </AdminCard>
      ) : null}

      {activeTab === "Bridge Pages" && product ? (
        <AdminCard>
          <div className="flex flex-col gap-4 border-b border-[#e2d7c7] pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[24px]">Bridge Page Placement</h2>
              <p className="mt-2 text-[13px] leading-[1.8] text-[#7b7064]">Attach the product to one or more bridge pages and set its order within each page.</p>
            </div>
            <button
              type="button"
              className={adminButtonClassName}
              onClick={() => persistSimpleAssignments("bridge-pages", bridgeAssignments, "bridgePageId", "Bridge page assignments saved.")}
            >
              Save bridge pages
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {bridgePages.map((page) => {
              const selected = bridgeAssignments.find((entry) => entry.id === page.id);

              return (
                <div key={page.id} className="rounded-2xl border border-[#e2d7c7] bg-white p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[15px] font-medium text-[#201b18]">{page.navLabel}</p>
                      <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-[#7d7267]">{page.slug}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedBridgePageIds.has(page.id)}
                      onChange={(event) =>
                        setBridgeAssignments((current) =>
                          event.target.checked ? [...current, { id: page.id, sortOrder: current.length }] : current.filter((entry) => entry.id !== page.id)
                        )
                      }
                    />
                  </div>
                  {selected ? (
                    <div className="mt-4">
                      <AdminField label="Sort order">
                        <input
                          type="number"
                          value={selected.sortOrder}
                          onChange={(event) =>
                            setBridgeAssignments((current) =>
                              current.map((entry) => (entry.id === page.id ? { ...entry, sortOrder: Number(event.target.value) } : entry))
                            )
                          }
                          className={adminInputClassName}
                        />
                      </AdminField>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </AdminCard>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <Link href="/admin/products" className={adminSecondaryButtonClassName}>
          Back to products
        </Link>
      </div>
    </div>
  );
}
