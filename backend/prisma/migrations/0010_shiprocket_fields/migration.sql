-- Shiprocket integration: address fields on OrderRequest, physical
-- dimensions on Product, ShippingSetting singleton for admin-editable
-- pickup-location + default dimensions + auto-push toggle.
--
-- All additions are nullable / have defaults. Down migration drops the
-- columns + tables + enum without data loss (legacy rows had no address
-- or shipment state to lose).
--
-- See DECISIONS.md#34 for the integration shape.

CREATE TYPE "ShipmentStatus" AS ENUM (
  'NOT_CREATED',
  'PUSHED',
  'PICKED_UP',
  'IN_TRANSIT',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'RTO',
  'CANCELLED',
  'FAILED'
);

-- Shipping address + Shiprocket state on each order. Country defaults to
-- "IN" because the storefront is India-only today (Decision #33 wired
-- INR-only Razorpay). Pre-Razorpay legacy rows leave every field null.
ALTER TABLE "OrderRequest"
  ADD COLUMN "shippingLine1"        TEXT,
  ADD COLUMN "shippingLine2"        TEXT,
  ADD COLUMN "shippingCity"         TEXT,
  ADD COLUMN "shippingState"        TEXT,
  ADD COLUMN "shippingPincode"      TEXT,
  ADD COLUMN "shippingCountry"      TEXT DEFAULT 'IN',
  ADD COLUMN "shiprocketOrderId"    TEXT,
  ADD COLUMN "shiprocketShipmentId" TEXT,
  ADD COLUMN "awbCode"              TEXT,
  ADD COLUMN "courierName"          TEXT,
  ADD COLUMN "trackingUrl"          TEXT,
  ADD COLUMN "shipmentStatus"       "ShipmentStatus" NOT NULL DEFAULT 'NOT_CREATED',
  ADD COLUMN "shipmentError"        TEXT,
  ADD COLUMN "shipmentPushedAt"     TIMESTAMP(3);

CREATE UNIQUE INDEX "OrderRequest_shiprocketOrderId_key"
  ON "OrderRequest"("shiprocketOrderId");

CREATE INDEX "OrderRequest_shipmentStatus_idx"
  ON "OrderRequest"("shipmentStatus");

-- Physical dimensions on Product. Nullable so existing rows survive;
-- runtime falls back to ShippingSetting defaults when these are null.
ALTER TABLE "Product"
  ADD COLUMN "weightGrams"  INTEGER,
  ADD COLUMN "lengthCm"     INTEGER,
  ADD COLUMN "breadthCm"    INTEGER,
  ADD COLUMN "heightCm"     INTEGER,
  ADD COLUMN "hsnCode"      TEXT;

-- ShippingSetting singleton (key = "default"). Admin-editable pickup
-- location name (must match the name configured in Shiprocket's
-- dashboard) plus default fallback dimensions + auto-push toggle.
CREATE TABLE "ShippingSetting" (
  "id"                     TEXT NOT NULL,
  "key"                    TEXT NOT NULL DEFAULT 'default',
  "pickupLocationName"     TEXT,
  "defaultWeightGrams"     INTEGER NOT NULL DEFAULT 300,
  "defaultLengthCm"        INTEGER NOT NULL DEFAULT 15,
  "defaultBreadthCm"       INTEGER NOT NULL DEFAULT 10,
  "defaultHeightCm"        INTEGER NOT NULL DEFAULT 8,
  "autoPushEnabled"        BOOLEAN NOT NULL DEFAULT true,
  "lastTestedAt"           TIMESTAMP(3),
  "lastTestStatus"         TEXT,
  "createdAt"              TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"              TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ShippingSetting_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ShippingSetting_key_key" ON "ShippingSetting"("key");

-- Seed the singleton row so admin reads always find one. Idempotent on
-- re-run via ON CONFLICT.
INSERT INTO "ShippingSetting" ("id", "key", "updatedAt")
VALUES ('shipping-setting-default', 'default', CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO NOTHING;
