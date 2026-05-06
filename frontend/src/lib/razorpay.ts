// Single-shot loader for the Razorpay Checkout SDK script.
//
// The SDK is a small browser script tag (`checkout.razorpay.com/v1/checkout.js`)
// that exposes a global `Razorpay` constructor. We inject it once on first
// call and cache the resulting promise so subsequent calls (re-mounts,
// repeated submits) reuse the same script tag — no double-load, no leaks.
//
// 10-second hard timeout via AbortController. No retries.

const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
const RAZORPAY_LOAD_TIMEOUT_MS = 10_000;

export type RazorpayCheckoutOptions = {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name?: string;
  description?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: { color?: string };
  handler?: (response: RazorpayPaymentResponse) => void;
  modal?: { ondismiss?: () => void };
};

export type RazorpayPaymentResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type RazorpayInstance = { open: () => void };

export type RazorpayCtor = new (options: RazorpayCheckoutOptions) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay?: RazorpayCtor;
  }
}

let cachedPromise: Promise<RazorpayCtor> | null = null;

export function loadRazorpayCheckout(): Promise<RazorpayCtor> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("razorpay_window_unavailable"));
  }

  if (window.Razorpay) {
    return Promise.resolve(window.Razorpay);
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  cachedPromise = new Promise<RazorpayCtor>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_SCRIPT_SRC}"]`,
    );
    const script = existing ?? document.createElement("script");

    let settled = false;
    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cachedPromise = null;
      reject(new Error("razorpay_sdk_timeout"));
    }, RAZORPAY_LOAD_TIMEOUT_MS);

    const onLoad = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      if (window.Razorpay) {
        resolve(window.Razorpay);
      } else {
        cachedPromise = null;
        reject(new Error("razorpay_sdk_missing_global"));
      }
    };

    const onError = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      cachedPromise = null;
      reject(new Error("razorpay_sdk_load_error"));
    };

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });

    if (!existing) {
      script.src = RAZORPAY_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    } else if (window.Razorpay) {
      // Already loaded by a previous instance.
      onLoad();
    }
  });

  return cachedPromise;
}
