# CLAUDE.md — backend workspace

Complements the repo-root `CLAUDE.md`. Read that first.

## Stack

Express 4, Prisma 6, PostgreSQL (Neon in prod), Zod, JWT, bcryptjs, multer, morgan. TypeScript ESM with `"module": "NodeNext"`. Runs via `tsx watch` in dev, compiled to `dist/` via `tsc`, served as a long-running Node process on Render in production.

## Key Paths

- `src/server.ts` — entry; starts Express on `PORT` (default 4001; Render injects one automatically in prod)
- `src/app.ts` — middleware chain (cors → json → morgan → optional `/uploads` static → `/health` → public router → `/admin` router → error middleware)
- `src/config.ts` — Zod-validated env loader; fail-fast on missing `DATABASE_URL` or short `JWT_SECRET`
- `src/routes/public.ts` — unauthenticated catalog/content reads + lead writes
- `src/routes/admin.ts` — JWT-guarded admin CRUD; 1400+ lines; organized by resource
- `src/middleware/requireAdmin.ts` — verifies JWT, attaches admin to `req`, exports `requireAdmin` and `requireAdminRole`
- `src/lib/auth.ts` — `signAdminToken`, `verifyPassword`, `hashPassword` (bcrypt)
- `src/lib/prisma.ts` — shared Prisma client (singleton)
- `src/lib/storage.ts` — upload handling, local/S3 driver switch with lazy-loaded AWS SDK
- `src/utils/http.ts` — `asyncHandler`, `HttpError`, `parseBody`, error middleware
- `src/utils/serializers.ts` — Prisma record → API payload shape (keep admin and public shapes in sync)
- `prisma/schema.prisma` — enums + models
- `prisma/migrations/0001_init/` — initial SQL. Latest migrations: `0007_bridge_page_editorial_slots` (adds 26 nullable columns to `ShopBridgePage` for editorial-page media), `0008_seed_editorial_bridges` (idempotent INSERT...ON CONFLICT DO NOTHING that creates the `home` / `our-story` / `seasonaldrops-hemanta` bridge rows). See Decision #31
- `prisma/seed.ts` — imports current frontend content into the DB so admin starts with realistic data

## ESM Rules (important)

- `tsconfig.json` uses `"module": "NodeNext"`. All **local** imports MUST use the `.js` extension even though the source is `.ts`:
  ```ts
  import { prisma } from "../lib/prisma.js";  // ✓
  import { prisma } from "../lib/prisma";     // ✗ fails at runtime
  ```
- `package.json` has `"type": "module"`. No CommonJS `require()`.
- Prisma is excluded from the TS build (`prisma/**/*.ts` in `tsconfig.exclude`); `seed.ts` runs through `tsx`, not `tsc`.
- `tsconfig.json` has `rootDir: "src"`, `outDir: "dist"`. Compiled entry lands at `dist/server.js` (matching `"start": "node dist/server.js"`).

## Auth Flow

1. `POST /admin/auth/login` validates email/password, returns `{ token, admin }`.
2. Tokens are 7-day JWTs signed with `JWT_SECRET`. The Next BFF wraps them in a signed httpOnly cookie — backend never sees the cookie.
3. `requireAdmin` decodes the bearer token and loads the admin. `requireAdminRole("SUPER_ADMIN")` additionally enforces role.
4. `GET /admin/auth/me` returns the current admin — used by the Next session route to populate the admin identity.

## Routes At A Glance

Public:
- `GET  /health`
- `GET  /catalog/products`, `/catalog/products/:slug`, `/catalog/bridge-pages/:slug`
- `GET  /content/articles`, `/content/articles/:slug`, `/content/retreats`, `/content/retreats/:slug`, `/content/programs`, `/content/programs/:slug`, `/content/story/current`, `/content/site-settings`
- `POST /lead/order-requests`, `/lead/newsletter-subscriptions`, `/lead/program-reservations`, `/lead/retreat-inquiries`, `/lead/product-notifications`
- `POST /payments/orders`, `/payments/verify`, `/payments/webhook`; `GET /payments/orders/:id` (Decision #33 — Razorpay-backed checkout). The webhook path is the only route that takes raw bytes — see the Webhooks section below. The legacy `/lead/order-requests` POST is no longer called by `/checkout` after Decision #33; kept around for rollback parity. `/payments/orders` now also accepts the shipping address — required since Decision #34 (Shiprocket). Both `/verify` and the `payment.captured` webhook fire `pushOrderToShiprocket(orderId)` fire-and-forget after the `paymentStatus → PAID` row flip.

Admin (all under `/admin`, all JWT-guarded):
- `auth/login`, `auth/me`
- `admins/*` (SUPER_ADMIN only)
- `media/*`, `categories/*`, `products/*`, `product-options/*`
- `POST /admin/products` — create a product. On save, the handler consults `defaultBridgeSlugForProductType(payload.type)` in `src/lib/product-bridge.ts` and best-effort auto-creates a `ShopBridgePageProduct` link to the default bridge page for that `type` (Perfume/Fragrance Oil → `perfumes`, Scarf/Square → `scarves-and-squares`, etc.). Failure of the link step is logged and swallowed — the product save itself is the primary contract. Does NOT run on PATCH (no re-sync when `type` is later edited). See Decision #28.
- `stories/*` — admin CRUD for the homepage `Story` model that drives the "How Seijaku Works" section (3 perfumes + 3 artifacts + launch date + video URL + ACTIVE/INACTIVE). Cross-slot validation: perfume slots must reference products in the `/shop/perfumes` bridge; artifact slots must NOT. `GET /content/story/current` (public) returns the latest active story whose `launchDate <= now`. See Decision #29.
- `bridge-pages/*` — also carries the editorial slots for non-shop routes. `bridgePageSchema` accepts 26 additional nullable string fields: `homeCard1Image..homeCard4Image` (+ alt), `ritualVideo1Url` / `ritualVideo1Poster` / `ritualVideo2Url` / `ritualVideo2Poster`, `formCard1Image..formCard4Image` (+ alt), and `imageBreak1Image..imageBreak3Image` (+ alt). Records with slugs `home`, `our-story`, `seasonaldrops-hemanta` are read by the public editorial routes. See Decision #31.
- `bridge-pages/*`, `articles/*`, `retreats/*`, `programs/*`, `program-sessions/*`, `collections/*`
- `site-settings`
- `shipping-settings` — Shiprocket configuration singleton (SUPER_ADMIN). `GET /admin/shipping-settings`, `PUT /admin/shipping-settings`, `GET /admin/shipping-settings/pickup-locations` (live proxy to Shiprocket so admin picks from a dropdown), `POST /admin/shipping-settings/test-connection`. Decision #34.
- `leads/*` (order requests, newsletter subs, program reservations, retreat inquiries, product notifications). `POST /admin/lead/order-requests/:id/shiprocket/push` re-attempts a paid order's Shiprocket dispatch when the auto-push on PAID failed.

## Commands

```bash
# dev
npm run dev                               # tsx watch on :4001

# prisma
npm run prisma:generate                   # regen client
npm run prisma:migrate -- --name <name>   # new migration
npm run prisma:deploy                     # apply pending migrations (also runs in Render build)
npm run prisma:seed                       # run prisma/seed.ts

# build
npm run build                             # prisma generate + tsc → dist/
npm run start                             # node dist/server.js (what Render invokes)
```

## Render Deployment

- Service: `seijaku-backend` on Render Free tier
- Region: closest to Neon US-East
- Root Directory: `backend/`
- **Build Command**: `npm install && npm run build && npm run prisma:deploy`
  - Runs prisma generate, compiles TypeScript, applies pending migrations against prod Neon DB. A failed migration fails the deploy; the previous process keeps serving.
- **Start Command**: `npm start`
- **Auto-deploys on push to `main`**.
- **Free tier caveat**: sleeps after 15 min of inactivity; first request after idle waits 30-50s for wake-up. Public image reads go directly to Supabase (CDN) so they're unaffected; only backend-routed requests (admin, lead submissions, backend-fed content reads) feel the wake-up.

## Env Vars

Required: `DATABASE_URL`, `JWT_SECRET` (min 8 chars).

Common: `PORT` (auto-provided by Render), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGIN` (comma-separated), `PUBLIC_BASE_URL`.

Storage: `STORAGE_DRIVER` (`local` | `s3`), `LOCAL_UPLOAD_DIR`.
- When `s3` (current prod): `S3_BUCKET`, `S3_REGION`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_FORCE_PATH_STYLE`, `S3_PUBLIC_URL_BASE`.

Migrations: `prisma migrate deploy` uses Postgres advisory locks, which don't work over PgBouncer-pooled connections (Neon's default). The Prisma datasource declares `directUrl = env("DATABASE_URL_UNPOOLED")` so migrations route to the unpooled host while runtime queries continue to use the pooled `DATABASE_URL`. **`DATABASE_URL_UNPOOLED` must be set on Render** — it's the same connection string as `DATABASE_URL` with `-pooler` removed from the hostname (also available in Neon's dashboard → Connection Details with the "Pooled connection" toggle off). If unset, Prisma falls back to `url` for migrations and you'll see "Timed out trying to acquire a postgres advisory lock" on deploy.

Current prod wiring: `STORAGE_DRIVER=s3` pointing at Supabase; `CORS_ORIGIN=https://seijaku-kappa.vercel.app`.

Notify Me admin ping (all optional; feature opt-in): `ADMIN_NOTIFICATION_EMAIL`, `NOTIFIER_FROM_EMAIL`, `RESEND_API_KEY`. While unset, `src/lib/notifier.ts` silently skips dispatch and the `ProductNotification` row still surfaces in `/admin/leads`. See `DECISIONS.md#14` for the rationale on keeping the dispatcher stubbed.

Razorpay (all required at boot — Zod fail-fast, no soft mode): `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`. The first two come from the Razorpay Dashboard → API Keys (or Test Keys). The webhook secret is generated when you create the webhook in Settings → Webhooks (it's separate from key_secret). For local dev that doesn't exercise payments, any non-empty placeholder works (the `.env.example` ships test placeholder strings); just don't run a real transaction with placeholder values. See `DECISIONS.md#33`.

Shiprocket (both required at boot — Zod fail-fast): `SHIPROCKET_EMAIL`, `SHIPROCKET_PASSWORD`. Shiprocket has no API-key option; email + password exchange for a ~10-day JWT cached in `src/lib/shiprocket.ts`. Pickup-location name + default dimensions + auto-push toggle are admin-editable in the DB via `/admin/shipping` (DB-backed so admins change them without a redeploy). For local dev that doesn't exercise shipping, any non-empty placeholders work. See `DECISIONS.md#34`.

## Webhooks

Razorpay signs the **raw request body** for webhooks, so the global `express.json()` parser would mangle the bytes before signature verification. `src/app.ts` registers `express.raw({ type: "application/json" })` scoped to `/payments/webhook` BEFORE the json parser. The handler in `src/routes/payments.ts` reads `req.body` as a `Buffer` and passes it straight to `verifyWebhookSignature()`. If you add a new webhook route, follow the same pattern — never apply json parsing before signature verification.

## Patterns To Follow

- New route file → mount it in `src/app.ts`. Zod schemas live next to the route.
- New Prisma model → add to `schema.prisma`, run `prisma migrate dev`, add a serializer in `utils/serializers.ts`, update the relevant route.
- Throw `new HttpError(status, message)` for expected failures. The error middleware formats them. Don't `res.status(...).json(...)` your own errors — keep the shape consistent.
- Wrap async handlers with `asyncHandler()` so rejections hit the error middleware instead of hanging.
- Use `parseBody(schema, req)` for Zod-validated request bodies; it throws a 400 on validation error.
- Heavy dependencies (like `@aws-sdk/client-s3`) should be lazy-loaded inside the function that uses them, not imported at module top level, to keep startup fast.

## Common Gotchas

- `multer` runs in `memoryStorage()` with a 50 MB limit (bumped from 10 MB to accommodate short product-marketing video clips). If you need bigger uploads, adjust in `routes/admin.ts` and keep `AddMediaDialog`'s helper copy + the `LIMIT_FILE_SIZE` message in `utils/http.ts` in sync.
- CORS defaults to reflect any origin when `CORS_ORIGIN` is unset — lock this down in prod by setting the env var.
- Prisma client is excluded from the TS source tree but is required at runtime. `postinstall` generates it — don't remove that script.
- The seed is destructive-ish (upserts bootstrap admin, (re)creates structural records + editorial content like articles / retreats / programs / bridge-page metadata). It does NOT seed products — since Phase 4b.final (Decision #26) + Decision #27, products are created via the admin UI after seeding. Don't run against a populated prod DB without reading `prisma/seed.ts` first.
- Render Free sleeps on idle. If you care about first-request latency for real users, upgrade the Render instance OR add a keep-warm cron.
