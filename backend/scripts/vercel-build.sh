#!/usr/bin/env bash
# Vercel build hook for the seijaku-backend project.
#
# Runs on every Vercel build (Production, Preview, Development). Generates
# the Prisma client and compiles TypeScript. On Production builds only,
# applies pending database migrations BEFORE the new function starts
# serving traffic, using the unpooled Postgres URL if available.
#
# Intentionally inert on local `npm run build` / `npm run build:all` — only
# triggered when Vercel invokes `npm run vercel-build`.

set -euo pipefail

echo "→ prisma generate"
npx prisma generate

echo "→ tsc"
npx tsc -p tsconfig.json

if [ "${VERCEL_ENV:-}" = "production" ]; then
  # Prefer the direct (unpooled) connection for migrations; Prisma warns
  # against running migrate against a PgBouncer-pooled URL.
  MIGRATE_URL="${DATABASE_URL_UNPOOLED:-${POSTGRES_URL_NON_POOLING:-${DATABASE_URL:-}}}"

  if [ -z "${MIGRATE_URL}" ]; then
    echo "✗ No DATABASE_URL / DATABASE_URL_UNPOOLED / POSTGRES_URL_NON_POOLING set — cannot run migrations."
    exit 1
  fi

  echo "→ prisma migrate deploy (production)"
  DATABASE_URL="${MIGRATE_URL}" npx prisma migrate deploy
else
  echo "→ skipping prisma migrate deploy (VERCEL_ENV=${VERCEL_ENV:-unset})"
fi
