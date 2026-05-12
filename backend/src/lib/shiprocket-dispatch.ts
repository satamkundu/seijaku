import { prisma } from "./prisma.js";
import {
  createShiprocketOrder,
  type CreateShiprocketOrderInput,
} from "./shiprocket.js";

// Orchestrates the post-payment Shiprocket push:
//   1. Re-read the OrderRequest with its items + products
//   2. Re-read the ShippingSetting singleton for pickup + dimension fallbacks
//   3. Build the payload, call Shiprocket
//   4. Persist the result (success → shiprocketOrderId + shipmentStatus=PUSHED,
//      failure → shipmentError + status untouched)
//
// All failures are logged + persisted to `shipmentError`, never re-thrown.
// Callers MUST be able to ignore the return value — this is fire-and-forget
// from the customer's POV. Returns the final state so the admin retry route
// can echo it back in the response.

export type DispatchOutcome =
  | { ok: true; shiprocketOrderId: string; shiprocketShipmentId: string }
  | { ok: false; error: string };

// Re-attempt criteria. Centralized so both the payment-success callsites
// and the admin retry route share identical guards.
export function canPushToShiprocket(order: {
  paymentStatus: string;
  shiprocketOrderId: string | null;
  shippingLine1: string | null;
  shippingPincode: string | null;
}): boolean {
  return (
    order.paymentStatus === "PAID" &&
    !order.shiprocketOrderId &&
    !!order.shippingLine1 &&
    !!order.shippingPincode
  );
}

export async function pushOrderToShiprocket(
  orderRequestId: string,
): Promise<DispatchOutcome> {
  const order = await prisma.orderRequest.findUnique({
    where: { id: orderRequestId },
    include: { items: { include: { product: true } } },
  });
  if (!order) return { ok: false, error: "order_not_found" };

  if (!canPushToShiprocket(order)) {
    // Could be a duplicate webhook delivery, a missing address (legacy
    // row), or an already-pushed order. All silent no-ops.
    return { ok: false, error: "not_eligible" };
  }

  const settings = await prisma.shippingSetting.findUnique({
    where: { key: "default" },
  });
  if (!settings?.pickupLocationName) {
    const error = "pickup_location_not_configured";
    await persistError(orderRequestId, error);
    return { ok: false, error };
  }
  if (!settings.autoPushEnabled) {
    // Admin explicitly paused auto-push. Leave the order at NOT_CREATED
    // so it surfaces on the admin retry list once they re-enable.
    return { ok: false, error: "auto_push_disabled" };
  }

  // Aggregate dimensions across line items. Total weight = sum of
  // (per-product weight × qty); use the *max* of L/B/H across items as
  // a conservative single-package estimate. Falls back to settings
  // defaults when a product's own field is null.
  let totalWeightGrams = 0;
  let maxLength = 0;
  let maxBreadth = 0;
  let maxHeight = 0;
  let subTotal = 0;
  const items = order.items.map((item) => {
    const product = item.product;
    const w = product.weightGrams ?? settings.defaultWeightGrams;
    const l = product.lengthCm ?? settings.defaultLengthCm;
    const b = product.breadthCm ?? settings.defaultBreadthCm;
    const h = product.heightCm ?? settings.defaultHeightCm;
    totalWeightGrams += w * item.quantity;
    if (l > maxLength) maxLength = l;
    if (b > maxBreadth) maxBreadth = b;
    if (h > maxHeight) maxHeight = h;
    subTotal += item.unitPriceAmount * item.quantity;
    return {
      name: product.title,
      sku: product.slug,
      units: item.quantity,
      selling_price: item.unitPriceAmount,
      hsn: product.hsnCode ?? undefined,
    };
  });

  const input: CreateShiprocketOrderInput = {
    orderId: order.id,
    orderDate: order.createdAt,
    pickupLocation: settings.pickupLocationName,
    billing: {
      customerName: order.name,
      line1: order.shippingLine1 ?? "",
      line2: order.shippingLine2,
      city: order.shippingCity ?? "",
      state: order.shippingState ?? "",
      pincode: order.shippingPincode ?? "",
      country: order.shippingCountry ?? "IN",
      email: order.email,
      phone: order.phone ?? "",
    },
    items,
    subTotal,
    weightKg: totalWeightGrams / 1000,
    lengthCm: maxLength,
    breadthCm: maxBreadth,
    heightCm: maxHeight,
  };

  try {
    const result = await createShiprocketOrder(input);
    await prisma.orderRequest.updateMany({
      where: {
        id: orderRequestId,
        shiprocketOrderId: null,
      },
      data: {
        shiprocketOrderId: result.shiprocketOrderId,
        shiprocketShipmentId: result.shiprocketShipmentId,
        awbCode: result.awbCode ?? null,
        courierName: result.courierName ?? null,
        shipmentStatus: "PUSHED",
        shipmentPushedAt: new Date(),
        shipmentError: null,
      },
    });
    return {
      ok: true,
      shiprocketOrderId: result.shiprocketOrderId,
      shiprocketShipmentId: result.shiprocketShipmentId,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "shiprocket_unknown_error";
    console.error("[shiprocket-dispatch]", orderRequestId, message);
    await persistError(orderRequestId, message);
    return { ok: false, error: message };
  }
}

async function persistError(orderRequestId: string, message: string) {
  try {
    await prisma.orderRequest.update({
      where: { id: orderRequestId },
      data: { shipmentError: message.slice(0, 500) },
    });
  } catch (err) {
    console.error("[shiprocket-dispatch] persistError failed", err);
  }
}
