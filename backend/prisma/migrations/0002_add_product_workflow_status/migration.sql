-- CreateEnum
CREATE TYPE "ProductWorkflowStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "workflowStatus" "ProductWorkflowStatus" NOT NULL DEFAULT 'DRAFT';

-- Backfill: all pre-existing products were treated as publicly visible under
-- the old model (no draft concept existed). Mark them PUBLISHED so the
-- admin-facing workflow column matches reality and public catalog filtering
-- does not make existing storefront data disappear.
UPDATE "Product" SET "workflowStatus" = 'PUBLISHED';
