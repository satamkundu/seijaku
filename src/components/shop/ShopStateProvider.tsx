"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ShopStateContextValue = {
  collection: string[];
  checkoutItemSlug: string | null;
  checkoutVariantLabel: string | null;
  isCollected: (slug: string) => boolean;
  toggleCollection: (slug: string) => void;
  beginCheckout: (slug: string, variantLabel?: string | null) => void;
  clearCheckout: () => void;
};

const COLLECTION_KEY = "seijaku-collection";
const CHECKOUT_KEY = "seijaku-checkout-item";
const CHECKOUT_VARIANT_KEY = "seijaku-checkout-variant";

const ShopStateContext = createContext<ShopStateContextValue | null>(null);

function readStorageArray(key: string) {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as string[]) : [];
  } catch {
    return [] as string[];
  }
}

function readStorageString(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(key);
}

export function ShopStateProvider({ children }: { children: React.ReactNode }) {
  const [collection, setCollection] = useState<string[]>(() => readStorageArray(COLLECTION_KEY));
  const [checkoutItemSlug, setCheckoutItemSlug] = useState<string | null>(() => readStorageString(CHECKOUT_KEY));
  const [checkoutVariantLabel, setCheckoutVariantLabel] = useState<string | null>(() => readStorageString(CHECKOUT_VARIANT_KEY));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (checkoutItemSlug) {
      window.localStorage.setItem(CHECKOUT_KEY, checkoutItemSlug);
      return;
    }

    window.localStorage.removeItem(CHECKOUT_KEY);
  }, [checkoutItemSlug]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (checkoutVariantLabel) {
      window.localStorage.setItem(CHECKOUT_VARIANT_KEY, checkoutVariantLabel);
      return;
    }

    window.localStorage.removeItem(CHECKOUT_VARIANT_KEY);
  }, [checkoutVariantLabel]);

  const value = useMemo<ShopStateContextValue>(
    () => ({
      collection,
      checkoutItemSlug,
      checkoutVariantLabel,
      isCollected: (slug) => collection.includes(slug),
      toggleCollection: (slug) => {
        setCollection((current) =>
          current.includes(slug) ? current.filter((entry) => entry !== slug) : [...current, slug]
        );
      },
      beginCheckout: (slug, variantLabel) => {
        setCheckoutItemSlug(slug);
        setCheckoutVariantLabel(variantLabel ?? null);
      },
      clearCheckout: () => {
        setCheckoutItemSlug(null);
        setCheckoutVariantLabel(null);
      },
    }),
    [checkoutItemSlug, checkoutVariantLabel, collection]
  );

  return <ShopStateContext.Provider value={value}>{children}</ShopStateContext.Provider>;
}

export function useShopState() {
  const context = useContext(ShopStateContext);

  if (!context) {
    throw new Error("useShopState must be used within ShopStateProvider");
  }

  return context;
}
