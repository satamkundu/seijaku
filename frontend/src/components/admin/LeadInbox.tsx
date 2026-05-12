"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";

import AdminCard from "@/src/components/admin/AdminCard";
import AdminStatusBadge from "@/src/components/admin/AdminStatusBadge";
import { adminButtonClassName } from "@/src/components/admin/AdminField";

type LeadStatus = "NEW" | "REVIEWED" | "CONTACTED" | "CLOSED";
type PaymentStatus = "CREATED" | "PAID" | "FAILED" | "REFUNDED";
type ShipmentStatus =
  | "NOT_CREATED"
  | "PUSHED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "RTO"
  | "CANCELLED"
  | "FAILED";

type ProductNotificationItem = {
  id: string;
  email: string;
  source?: string | null;
  status: LeadStatus;
  createdAt?: string;
  product?: { title?: string; slug?: string; status?: string } | null;
};

type OrderRequestItem = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  notes?: string | null;
  status: LeadStatus;
  items?: Array<{ product?: { title?: string } }>;
  paymentStatus?: PaymentStatus;
  razorpayPaymentId?: string | null;
  totalAmount?: number;
  currency?: string;
  shippingLine1?: string | null;
  shippingCity?: string | null;
  shippingState?: string | null;
  shippingPincode?: string | null;
  shipmentStatus?: ShipmentStatus;
  awbCode?: string | null;
  courierName?: string | null;
  trackingUrl?: string | null;
  shipmentError?: string | null;
};

type LeadInboxProps = {
  orderRequests: OrderRequestItem[];
  newsletterSubscriptions: Array<{ id: string; email: string; source?: string | null; status?: string; subscribedAt?: string }>;
  programReservations: Array<{ id: string; name: string; email: string; phone?: string | null; notes?: string | null; status: LeadStatus; program: { name: string } }>;
  retreatInquiries: Array<{ id: string; name: string; email: string; phone?: string | null; notes?: string | null; status: LeadStatus; retreat: { name: string } }>;
  productNotifications: ProductNotificationItem[];
};

const PAYMENT_BADGE_COLORS: Record<PaymentStatus, string> = {
  CREATED: "bg-[#e8dec9] text-[#7c6849]",
  PAID: "bg-[#cde0d2] text-[#2c6541]",
  FAILED: "bg-[#e7c1ba] text-[#9f4332]",
  REFUNDED: "bg-[#f1e0c1] text-[#8a6431]",
};

const SHIPMENT_BADGE_COLORS: Record<ShipmentStatus, string> = {
  NOT_CREATED: "bg-[#ece2d2] text-[#7d6b56]",
  PUSHED: "bg-[#dde7d1] text-[#4f6638]",
  PICKED_UP: "bg-[#d8dfe6] text-[#3b4f60]",
  IN_TRANSIT: "bg-[#cfd9e0] text-[#3b5060]",
  OUT_FOR_DELIVERY: "bg-[#c2d2dc] text-[#2f4858]",
  DELIVERED: "bg-[#cde0d2] text-[#2c6541]",
  RTO: "bg-[#f1e0c1] text-[#8a6431]",
  CANCELLED: "bg-[#e2dad2] text-[#665d54]",
  FAILED: "bg-[#e7c1ba] text-[#9f4332]",
};

function maskPaymentId(id: string | null | undefined): string | null {
  if (!id) return null;
  if (id.length < 7) return id;
  return `${id.slice(0, 4)}…${id.slice(-3)}`;
}

function formatRupees(amountPaise?: number, currency?: string): string | null {
  if (typeof amountPaise !== "number" || amountPaise <= 0) return null;
  const amount = (amountPaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `${currency ?? "INR"} ${amount}`;
}

function renderOrderPayment(item: OrderRequestItem): ReactNode {
  const paymentStatus: PaymentStatus = item.paymentStatus ?? "CREATED";
  const masked = maskPaymentId(item.razorpayPaymentId);
  const total = formatRupees(item.totalAmount, item.currency);
  return (
    <div className="mt-3 space-y-2 text-[12px]">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 uppercase tracking-[0.18em] ${PAYMENT_BADGE_COLORS[paymentStatus]}`}
        >
          {paymentStatus}
        </span>
        {total ? <span className="font-mono text-[#3a3129]">{total}</span> : null}
        {masked ? <span className="font-mono text-[#7d7267]">{masked}</span> : null}
      </div>
      <ShipmentRow item={item} />
      {item.shippingLine1 ? (
        <p className="text-[11px] leading-[1.6] text-[#7d7267]">
          {item.shippingLine1}, {item.shippingCity}, {item.shippingState} {item.shippingPincode}
        </p>
      ) : null}
    </div>
  );
}

function ShipmentRow({ item }: { item: OrderRequestItem }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const status: ShipmentStatus = item.shipmentStatus ?? "NOT_CREATED";
  const canRetry =
    item.paymentStatus === "PAID" && status === "NOT_CREATED";
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      <span
        className={`rounded-full px-3 py-1 uppercase tracking-[0.18em] ${SHIPMENT_BADGE_COLORS[status]}`}
      >
        {status.replaceAll("_", " ")}
      </span>
      {item.courierName ? <span className="text-[11px] text-[#5f574d]">{item.courierName}</span> : null}
      {item.awbCode ? <span className="font-mono text-[11px] text-[#3a3129]">AWB {item.awbCode}</span> : null}
      {item.trackingUrl ? (
        <a
          href={item.trackingUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="text-[11px] underline decoration-[#3a4f30]/40 underline-offset-2 hover:decoration-[#3a4f30]"
        >
          Track
        </a>
      ) : null}
      {canRetry ? (
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              setError(null);
              const res = await fetch(
                `/api/admin/proxy/lead/order-requests/${item.id}/shiprocket/push`,
                { method: "POST" },
              );
              if (!res.ok) {
                const body = (await res.json().catch(() => null)) as { error?: string } | null;
                setError(body?.error ?? "Push failed.");
                return;
              }
              router.refresh();
            });
          }}
          className={`${adminButtonClassName} bg-[#2e4a36] text-[#f4efe8] hover:bg-[#243c2c] disabled:cursor-wait disabled:opacity-70`}
        >
          {isPending ? "Pushing…" : "Push to Shiprocket"}
        </button>
      ) : null}
      {item.shipmentError && status === "NOT_CREATED" ? (
        <span className="text-[11px] text-[#9f4332]">Last error: {item.shipmentError}</span>
      ) : null}
      {error ? <span className="text-[11px] text-[#9f4332]">{error}</span> : null}
    </div>
  );
}

const leadStatuses: LeadStatus[] = ["NEW", "REVIEWED", "CONTACTED", "CLOSED"];

export default function LeadInbox({
  orderRequests,
  newsletterSubscriptions,
  programReservations,
  retreatInquiries,
  productNotifications,
}: LeadInboxProps) {
  const [activeTab, setActiveTab] = useState<"orders" | "newsletter" | "programs" | "retreats" | "notify-me">("orders");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {[
          { key: "orders", label: `Order Requests (${orderRequests.length})` },
          { key: "newsletter", label: `Newsletter (${newsletterSubscriptions.length})` },
          { key: "programs", label: `Program Reservations (${programReservations.length})` },
          { key: "retreats", label: `Retreat Inquiries (${retreatInquiries.length})` },
          { key: "notify-me", label: `Notify Me (${productNotifications.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
              activeTab === tab.key ? "bg-[#2e4a36] text-[#f4efe8]" : "border border-[#cdbfae] bg-[#f8f2e8] text-[#3a3129]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "orders" ? (
        <LeadStatusList
          title="Order Requests"
          items={orderRequests}
          endpoint="lead/order-requests"
          renderExtra={(item) => item.items?.map((entry) => entry.product?.title).filter(Boolean).join(", ")}
          renderPayment={renderOrderPayment}
        />
      ) : null}
      {activeTab === "newsletter" ? (
        <AdminCard>
          <h2 className="text-[24px]">Newsletter Subscribers</h2>
          <div className="mt-6 space-y-4">
            {newsletterSubscriptions.map((item) => (
              <div key={item.id} className="rounded-2xl border border-[#e2d7c7] bg-white px-4 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[15px] font-medium text-[#201b18]">{item.email}</p>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-[#7d7267]">{item.source || "Unknown source"}</p>
                  </div>
                  <AdminStatusBadge value={item.status || "SUBSCRIBED"} />
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      ) : null}
      {activeTab === "programs" ? <LeadStatusList title="Program Reservations" items={programReservations} endpoint="lead/program-reservations" renderExtra={(item) => item.program.name} /> : null}
      {activeTab === "retreats" ? <LeadStatusList title="Retreat Inquiries" items={retreatInquiries} endpoint="lead/retreat-inquiries" renderExtra={(item) => item.retreat.name} /> : null}
      {activeTab === "notify-me" ? <ProductNotificationList items={productNotifications} /> : null}
    </div>
  );
}

function ProductNotificationList({ items }: { items: ProductNotificationItem[] }) {
  const router = useRouter();
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <AdminCard>
      <h2 className="text-[24px]">Notify Me Signups</h2>
      {notice ? <p className="mt-5 rounded-2xl border border-[#cde0d2] bg-[#eef8f0] px-4 py-3 text-[14px] text-[#2c6541]">{notice}</p> : null}
      {error ? <p className="mt-5 rounded-2xl border border-[#e7c1ba] bg-[#fff1ee] px-4 py-3 text-[14px] text-[#9f4332]">{error}</p> : null}

      {items.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-[#e2d7c7] bg-white px-4 py-6 text-[14px] text-[#6c6157]">No Notify Me signups yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#e2d7c7] bg-white px-4 py-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-[15px] font-medium text-[#201b18]">{item.email}</p>
                    <AdminStatusBadge value={item.status} />
                  </div>
                  {item.product?.title ? (
                    <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-[#7d7267]">
                      {item.product.title}
                      {item.product.status ? ` · ${item.product.status}` : ""}
                    </p>
                  ) : null}
                  {item.source ? (
                    <p className="mt-1 text-[12px] text-[#7d7267]">Source: {item.source}</p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  {leadStatuses.map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={isPending || status === item.status}
                      className={`${adminButtonClassName} ${status === item.status ? "opacity-100" : "bg-[#f0e6d8] text-[#3a3129] hover:bg-[#e8dac7]"}`}
                      onClick={() => {
                        startTransition(async () => {
                          setNotice(null);
                          setError(null);
                          const response = await fetch(`/api/admin/proxy/lead/product-notifications/${item.id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status }),
                          });

                          const data = (await response.json().catch(() => null)) as { error?: string } | null;

                          if (!response.ok) {
                            setError(data?.error ?? "Unable to update status.");
                            return;
                          }

                          setNotice("Notification status updated.");
                          router.refresh();
                        });
                      }}
                    >
                      {status.replaceAll("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminCard>
  );
}

function LeadStatusList<T extends { id: string; name: string; email: string; phone?: string | null; notes?: string | null; status: LeadStatus }>({
  title,
  items,
  endpoint,
  renderExtra,
  renderPayment,
}: {
  title: string;
  items: T[];
  endpoint: string;
  renderExtra?: (item: T) => string | undefined;
  renderPayment?: (item: T) => ReactNode;
}) {
  const router = useRouter();
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <AdminCard>
      <h2 className="text-[24px]">{title}</h2>
      {notice ? <p className="mt-5 rounded-2xl border border-[#cde0d2] bg-[#eef8f0] px-4 py-3 text-[14px] text-[#2c6541]">{notice}</p> : null}
      {error ? <p className="mt-5 rounded-2xl border border-[#e7c1ba] bg-[#fff1ee] px-4 py-3 text-[14px] text-[#9f4332]">{error}</p> : null}

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-[#e2d7c7] bg-white px-4 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-[15px] font-medium text-[#201b18]">{item.name}</p>
                  <AdminStatusBadge value={item.status} />
                </div>
                <p className="mt-2 text-[13px] text-[#6c6157]">{item.email}</p>
                {item.phone ? <p className="mt-1 text-[13px] text-[#6c6157]">{item.phone}</p> : null}
                {renderExtra?.(item) ? <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-[#7d7267]">{renderExtra(item)}</p> : null}
                {renderPayment ? renderPayment(item) : null}
                {item.notes ? <p className="mt-3 max-w-[60ch] text-[14px] leading-[1.8] text-[#5f574d]">{item.notes}</p> : null}
              </div>

              <div className="flex flex-wrap gap-2">
                {leadStatuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    disabled={isPending || status === item.status}
                    className={`${adminButtonClassName} ${status === item.status ? "opacity-100" : "bg-[#f0e6d8] text-[#3a3129] hover:bg-[#e8dac7]"}`}
                    onClick={() => {
                      startTransition(async () => {
                        setNotice(null);
                        setError(null);
                        const response = await fetch(`/api/admin/proxy/${endpoint}/${item.id}`, {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ status }),
                        });

                        const data = (await response.json().catch(() => null)) as { error?: string } | null;

                        if (!response.ok) {
                          setError(data?.error ?? "Unable to update status.");
                          return;
                        }

                        setNotice("Lead status updated.");
                        router.refresh();
                      });
                    }}
                  >
                    {status.replaceAll("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}
