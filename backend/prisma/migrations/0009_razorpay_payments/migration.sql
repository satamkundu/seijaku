-- Razorpay payments wired into the OrderRequest model.
--
-- `OrderRequest` previously functioned as a lead-capture record. With this
-- migration it becomes the persistent record of a real payment as well.
-- The existing `status` (LeadStatus) tracks ops/fulfillment lifecycle and
-- is orthogonal to the new `paymentStatus`.
--
-- Existing rows (pre-Razorpay leads) get `paymentStatus = CREATED` and
-- `totalAmount = 0`. They remain reachable in /admin/leads and should be
-- understood as legacy records, not stuck payments.
--
-- All new columns are reversible: down migration drops the columns + enum.

CREATE TYPE "PaymentStatus" AS ENUM ('CREATED', 'PAID', 'FAILED', 'REFUNDED');

ALTER TABLE "OrderRequest"
  ADD COLUMN "paymentStatus"     "PaymentStatus" NOT NULL DEFAULT 'CREATED',
  ADD COLUMN "razorpayOrderId"   TEXT,
  ADD COLUMN "razorpayPaymentId" TEXT,
  ADD COLUMN "razorpaySignature" TEXT,
  ADD COLUMN "totalAmount"       INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "currency"          TEXT NOT NULL DEFAULT 'INR';

CREATE UNIQUE INDEX "OrderRequest_razorpayOrderId_key"
  ON "OrderRequest"("razorpayOrderId");
