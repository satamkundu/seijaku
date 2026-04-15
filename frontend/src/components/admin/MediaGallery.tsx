"use client";

import Image from "next/image";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { MediaAsset } from "@/src/lib/admin-types";

export type GalleryItem = {
  mediaAssetId: string;
  sortOrder: number;
  mediaType: string;
};

type MediaGalleryProps = {
  items: GalleryItem[];
  assets: Map<string, MediaAsset>;
  primaryImageId: string;
  onReorder: (items: GalleryItem[]) => void;
  onRemove: (mediaAssetId: string) => void;
  onSetPrimary: (mediaAssetId: string) => void;
  onChangeType: (mediaAssetId: string, type: string) => void;
};

const mediaTypeOptions = ["GALLERY", "DETAIL", "VIDEO_POSTER"];

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);
}

function isYouTubeOrVimeo(url: string) {
  return /(youtube\.com|youtu\.be|vimeo\.com)/i.test(url);
}

function MediaThumb({ asset }: { asset: MediaAsset | undefined }) {
  if (!asset) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#efe6d4] text-[10px] uppercase tracking-[0.18em] text-[#a89a86]">
        missing
      </div>
    );
  }

  if (asset.kind === "VIDEO" || isVideoUrl(asset.url) || isYouTubeOrVimeo(asset.url)) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#1d1916] text-[11px] uppercase tracking-[0.2em] text-white">
        <span>▶ video</span>
      </div>
    );
  }

  return (
    <Image
      src={asset.url}
      alt={asset.altText ?? ""}
      fill
      sizes="160px"
      className="object-cover"
      unoptimized
    />
  );
}

function SortableTile({
  item,
  asset,
  isPrimary,
  onRemove,
  onSetPrimary,
  onChangeType,
}: {
  item: GalleryItem;
  asset: MediaAsset | undefined;
  isPrimary: boolean;
  onRemove: () => void;
  onSetPrimary: () => void;
  onChangeType: (type: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.mediaAssetId,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative rounded-2xl border bg-white transition ${
        isPrimary ? "border-[#2e4a36] shadow-[0_0_0_2px_#2e4a36]" : "border-[#d7cec1]"
      }`}
    >
      <div className="relative aspect-square w-full cursor-grab overflow-hidden rounded-t-2xl" {...attributes} {...listeners}>
        <MediaThumb asset={asset} />
        {isPrimary ? (
          <span className="absolute left-2 top-2 rounded-full bg-[#2e4a36] px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[#f4efe8]">
            Featured
          </span>
        ) : null}
      </div>

      <div className="space-y-2 px-3 py-2">
        <p className="truncate text-[11px] text-[#62574c]" title={asset?.altText ?? asset?.url ?? ""}>
          {asset?.altText || asset?.url?.split("/").pop() || "(unnamed)"}
        </p>
        <select
          value={item.mediaType}
          onChange={(e) => onChangeType(e.target.value)}
          className="w-full rounded-lg border border-[#d7cec1] bg-[#fbf8f3] px-2 py-1 text-[11px] text-[#3a3129]"
        >
          {mediaTypeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.replaceAll("_", " ")}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          {!isPrimary ? (
            <button
              type="button"
              onClick={onSetPrimary}
              className="flex-1 rounded-lg border border-[#d7cec1] bg-[#f8f2e8] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#3a3129] hover:bg-[#f0e6d8]"
            >
              Set featured
            </button>
          ) : (
            <span className="flex-1 text-[10px] uppercase tracking-[0.14em] text-[#8a8075]">primary</span>
          )}
          <button
            type="button"
            onClick={onRemove}
            className="rounded-lg border border-[#e3c6bf] bg-[#fff4f2] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#9f4332] hover:bg-[#ffe8e2]"
            title="Remove from product (does not delete the underlying asset)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MediaGallery({
  items,
  assets,
  primaryImageId,
  onReorder,
  onRemove,
  onSetPrimary,
  onChangeType,
}: MediaGalleryProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.mediaAssetId === active.id);
    const newIndex = items.findIndex((item) => item.mediaAssetId === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const next = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
      ...item,
      sortOrder: index,
    }));
    onReorder(next);
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#d7cec1] bg-[#fbf8f3] px-6 py-8 text-center text-[13px] text-[#8a8075]">
        No media yet. Upload a file, paste a URL, or pick from the library to get started.
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.mediaAssetId)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <SortableTile
              key={item.mediaAssetId}
              item={item}
              asset={assets.get(item.mediaAssetId)}
              isPrimary={primaryImageId === item.mediaAssetId}
              onRemove={() => onRemove(item.mediaAssetId)}
              onSetPrimary={() => onSetPrimary(item.mediaAssetId)}
              onChangeType={(type) => onChangeType(item.mediaAssetId, type)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
