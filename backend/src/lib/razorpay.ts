import crypto from "node:crypto";

import { env } from "../config.js";
import { HttpError } from "../utils/http.js";

const RAZORPAY_API_BASE = "https://api.razorpay.com/v1";
const REQUEST_TIMEOUT_MS = 10_000;

type CreateOrderInput = {
  amountPaise: number;
  receipt: string;
};

type RazorpayOrderResponse = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  receipt: string | null;
};

function basicAuthHeader(): string {
  const token = Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString("base64");
  return `Basic ${token}`;
}

// Single-shot POST to Razorpay's Orders API. Throws on timeout or non-2xx;
// no retry — the caller surfaces the error to the user, who decides whether
// to retry from the UI.
export async function createRazorpayOrder({
  amountPaise,
  receipt,
}: CreateOrderInput): Promise<RazorpayOrderResponse> {
  if (!Number.isInteger(amountPaise) || amountPaise <= 0) {
    throw new HttpError(400, "invalid_amount");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${RAZORPAY_API_BASE}/orders`, {
      method: "POST",
      headers: {
        Authorization: basicAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt,
        payment_capture: 1,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[razorpay] orders.create non-2xx", res.status, body);
      throw new HttpError(502, "razorpay_rejected");
    }

    return (await res.json()) as RazorpayOrderResponse;
  } catch (err) {
    if (err instanceof HttpError) throw err;
    if ((err as { name?: string })?.name === "AbortError") {
      throw new HttpError(504, "razorpay_unreachable");
    }
    console.error("[razorpay] orders.create unexpected", err);
    throw new HttpError(502, "razorpay_unreachable");
  } finally {
    clearTimeout(timer);
  }
}

// Browser callback signature check.
// Razorpay computes HMAC-SHA256 over `${order_id}|${payment_id}` using the
// account's `key_secret`. `timingSafeEqual` to avoid timing oracles.
export function verifyCheckoutSignature(
  orderId: string,
  paymentId: string,
  signature: string,
): boolean {
  const expected = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  try {
    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(signature, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// Webhook signature check. The webhook secret is configured separately in
// the Razorpay Dashboard (Settings → Webhooks). The HMAC is computed over
// the RAW REQUEST BODY — Express's express.json() parser would mangle this,
// so the webhook route must use express.raw() and pass the Buffer here.
export function verifyWebhookSignature(rawBody: Buffer, headerSignature: string): boolean {
  const expected = crypto
    .createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  try {
    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(headerSignature, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
