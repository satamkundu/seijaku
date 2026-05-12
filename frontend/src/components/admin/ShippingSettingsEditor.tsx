"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import AdminCard from "@/src/components/admin/AdminCard";
import {
  AdminField,
  adminButtonClassName,
  adminInputClassName,
  adminSecondaryButtonClassName,
} from "@/src/components/admin/AdminField";

export type ShippingSetting = {
  id: string;
  key: string;
  pickupLocationName: string | null;
  defaultWeightGrams: number;
  defaultLengthCm: number;
  defaultBreadthCm: number;
  defaultHeightCm: number;
  autoPushEnabled: boolean;
  lastTestedAt: string | null;
  lastTestStatus: string | null;
  updatedAt: string;
};

type PickupLocation = {
  pickupLocation: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
};

export default function ShippingSettingsEditor({
  initialSettings,
}: {
  initialSettings: ShippingSetting;
}) {
  const router = useRouter();
  const [pickup, setPickup] = useState<string>(initialSettings.pickupLocationName ?? "");
  const [weight, setWeight] = useState<string>(String(initialSettings.defaultWeightGrams));
  const [length, setLength] = useState<string>(String(initialSettings.defaultLengthCm));
  const [breadth, setBreadth] = useState<string>(String(initialSettings.defaultBreadthCm));
  const [height, setHeight] = useState<string>(String(initialSettings.defaultHeightCm));
  const [autoPush, setAutoPush] = useState<boolean>(initialSettings.autoPushEnabled);
  const [pickupOptions, setPickupOptions] = useState<PickupLocation[]>([]);
  const [pickupLoadError, setPickupLoadError] = useState<string | null>(null);
  const [isPickupLoading, setIsPickupLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, startSave] = useTransition();
  const [isTesting, startTest] = useTransition();

  const loadPickupLocations = () => {
    setPickupLoadError(null);
    setIsPickupLoading(true);
    (async () => {
      try {
        const res = await fetch("/api/admin/proxy/shipping-settings/pickup-locations", {
          method: "GET",
        });
        const body = (await res.json().catch(() => null)) as
          | { items?: PickupLocation[]; error?: string }
          | null;
        if (!res.ok) {
          setPickupLoadError(body?.error ?? "Couldn't reach Shiprocket. Check credentials and try again.");
          return;
        }
        setPickupOptions(body?.items ?? []);
        if ((body?.items ?? []).length === 0) {
          setPickupLoadError("Shiprocket returned no pickup locations. Configure one in their dashboard first.");
        }
      } catch (err) {
        setPickupLoadError(err instanceof Error ? err.message : "Network error.");
      } finally {
        setIsPickupLoading(false);
      }
    })();
  };

  const handleSave = () => {
    setNotice(null);
    setError(null);
    startSave(async () => {
      const num = (s: string): number | undefined => {
        const v = Number(s);
        return Number.isFinite(v) && Number.isInteger(v) && v > 0 ? v : undefined;
      };
      const payload = {
        pickupLocationName: pickup.trim() || null,
        defaultWeightGrams: num(weight),
        defaultLengthCm: num(length),
        defaultBreadthCm: num(breadth),
        defaultHeightCm: num(height),
        autoPushEnabled: autoPush,
      };
      const res = await fetch("/api/admin/proxy/shipping-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(body?.error ?? "Unable to save shipping settings.");
        return;
      }
      setNotice("Saved.");
      router.refresh();
    });
  };

  const handleTest = () => {
    setNotice(null);
    setError(null);
    startTest(async () => {
      const res = await fetch("/api/admin/proxy/shipping-settings/test-connection", {
        method: "POST",
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean; status?: string; error?: string } | null;
      if (!res.ok || !body?.ok) {
        setError(`Connection failed: ${body?.status ?? body?.error ?? "unknown error"}`);
        router.refresh();
        return;
      }
      setNotice("Connection OK — Shiprocket auth succeeded.");
      router.refresh();
    });
  };

  return (
    <AdminCard>
      {notice ? (
        <p className="mb-5 rounded-2xl border border-[#cde0d2] bg-[#eef8f0] px-4 py-3 text-[14px] text-[#2c6541]">{notice}</p>
      ) : null}
      {error ? (
        <p className="mb-5 rounded-2xl border border-[#e7c1ba] bg-[#fff1ee] px-4 py-3 text-[14px] text-[#9f4332]">{error}</p>
      ) : null}

      <h2 className="text-[18px] font-medium text-[#201b18]">Shiprocket connection</h2>
      <p className="mt-2 text-[13px] leading-[1.7] text-[#62574c]">
        Pickup location must already exist in your Shiprocket dashboard
        (Settings → Company → Pickup Addresses). Click <span className="font-mono">Refresh from Shiprocket</span>
        {" "}to fetch the configured names; pick one to avoid typos.
      </p>

      <div className="mt-5 space-y-4">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <AdminField label="Pickup location name">
              <input
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="e.g. Primary"
                className={adminInputClassName}
                list="pickup-location-options"
              />
            </AdminField>
            {pickupOptions.length > 0 ? (
              <datalist id="pickup-location-options">
                {pickupOptions.map((opt) => (
                  <option key={opt.pickupLocation} value={opt.pickupLocation}>
                    {`${opt.addressLine1}, ${opt.city}, ${opt.state} ${opt.pincode}`}
                  </option>
                ))}
              </datalist>
            ) : null}
          </div>
          <button
            type="button"
            onClick={loadPickupLocations}
            disabled={isPickupLoading}
            className={adminSecondaryButtonClassName}
          >
            {isPickupLoading ? "Refreshing…" : "Refresh from Shiprocket"}
          </button>
        </div>
        {pickupLoadError ? (
          <p className="rounded-2xl border border-[#e7c1ba] bg-[#fff1ee] px-4 py-3 text-[13px] text-[#9f4332]">
            {pickupLoadError}
          </p>
        ) : null}
        {pickupOptions.length > 0 ? (
          <p className="text-[12px] text-[#7d7267]">
            {pickupOptions.length} location{pickupOptions.length === 1 ? "" : "s"} available — type into the field above and the dropdown suggestions will appear.
          </p>
        ) : null}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleTest}
            disabled={isTesting}
            className={adminSecondaryButtonClassName}
          >
            {isTesting ? "Testing…" : "Test connection"}
          </button>
          {initialSettings.lastTestStatus ? (
            <span
              className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${
                initialSettings.lastTestStatus === "ok"
                  ? "bg-[#cde0d2] text-[#2c6541]"
                  : "bg-[#e7c1ba] text-[#9f4332]"
              }`}
            >
              {initialSettings.lastTestStatus === "ok" ? "OK" : initialSettings.lastTestStatus}
            </span>
          ) : null}
          {initialSettings.lastTestedAt ? (
            <span className="text-[11px] text-[#7d7267]">
              Last tested {new Date(initialSettings.lastTestedAt).toLocaleString()}
            </span>
          ) : null}
        </div>
      </div>

      <hr className="my-8 border-[#e2d7c7]" />

      <h2 className="text-[18px] font-medium text-[#201b18]">Default package dimensions</h2>
      <p className="mt-2 text-[13px] leading-[1.7] text-[#62574c]">
        Used when a product has no per-product dimensions set. Update each product under <span className="font-mono">/admin/products</span> when you have real measurements.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <AdminField label="Default weight (grams)">
          <input type="number" min={1} value={weight} onChange={(e) => setWeight(e.target.value)} className={adminInputClassName} />
        </AdminField>
        <AdminField label="Default length (cm)">
          <input type="number" min={1} value={length} onChange={(e) => setLength(e.target.value)} className={adminInputClassName} />
        </AdminField>
        <AdminField label="Default breadth (cm)">
          <input type="number" min={1} value={breadth} onChange={(e) => setBreadth(e.target.value)} className={adminInputClassName} />
        </AdminField>
        <AdminField label="Default height (cm)">
          <input type="number" min={1} value={height} onChange={(e) => setHeight(e.target.value)} className={adminInputClassName} />
        </AdminField>
      </div>

      <hr className="my-8 border-[#e2d7c7]" />

      <h2 className="text-[18px] font-medium text-[#201b18]">Auto-push</h2>
      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#e2d7c7] bg-white px-4 py-4">
        <input
          type="checkbox"
          checked={autoPush}
          onChange={(e) => setAutoPush(e.target.checked)}
          className="mt-1 h-4 w-4"
        />
        <span className="space-y-1">
          <span className="block text-[14px] text-[#201b18]">Automatically push paid orders to Shiprocket</span>
          <span className="block text-[12px] text-[#62574c]">
            When off, orders stay at <span className="font-mono">NOT_CREATED</span> until you click <span className="font-mono">Push to Shiprocket</span> in
            <span className="font-mono"> /admin/leads</span>. Useful when reconciling a Shiprocket outage.
          </span>
        </span>
      </label>

      <div className="mt-8 flex justify-end">
        <button type="button" onClick={handleSave} disabled={isSaving} className={adminButtonClassName}>
          {isSaving ? "Saving…" : "Save shipping settings"}
        </button>
      </div>
    </AdminCard>
  );
}
