# CLAUDE.md — backend workspace

Complements the repo-root `CLAUDE.md`. Read that first.

## Stack

Express 4, Prisma 6, PostgreSQL (Neon in prod), Zod, JWT, bcryptjs, multer, morgan. TypeScript ESM with `"module": "NodeNext"`. Runs via `tsx watch` in dev, compiled to `dist/` for prod. Deploys to Vercel as a single serverless function (`api/index.ts`).

## Key Paths

- `src/server.ts` — entry; starts Express on `PORT` (default 4001)
- `src/app.ts` — middleware chain (cors → json → morgan → optional `/uploads` static → `/health` → public router → `/admin` router → error middleware)
- `src/config.ts` — Zod-validated env loader; fail-fast on missing `DATABASE_URL` or short `JWT_SECRET`
- `src/routes/public.ts` — unauthenticated catalog/content reads + lead writes
- `src/routes/admin.ts` — JWT-guarded admin CRUD; 1400+ lines; organized by resource
- `src/middleware/requireAdmin.ts` — verifies JWT, attaches admin to `req`, exports `requireAdmin` and `requireAdminRole`
- `src/lib/auth.ts` — `signAdminToken`, `verifyPassword`, `hashPassword` (bcrypt)
- `src/lib/prisma.ts` — shared Prisma client (singleton)
- `src/lib/storage.ts` — upload handling, local vs S3 driver switch
- `src/utils/http.ts` — `asyncHandler`, `HttpError`, `parseBody`, error middleware
- `src/utils/serializers.ts` — Prisma record → API payload shape (keep admin and public shapes in sync)
- `prisma/schema.prisma` — enums + models
- `prisma/migrations/0001_init/` — initial SQL
- `prisma/seed.ts` — imports current frontend content into the DB so admin starts with realistic data
- `api/index.ts` — Vercel serverless entry; re-exports the Express app

## ESM Rules (important)

- `tsconfig.json` uses `"module": "NodeNext"`. All **local** imports MUST use the `.js` extension even though the source is `.ts`:
  ```ts
  import { prisma } from "../lib/prisma.js";  // ✓
  import { prisma } from "../lib/prisma";     // ✗ fails at runtime
  ```
- `package.json` has `"type": "module"`. No CommonJS `require()`.
- Prisma is excluded from the TS build (`prisma/**/*.ts` in `tsconfig.exclude`); `seed.ts` runs through `tsx`, not `tsc`.

## Auth Flow

1. `POST /admin/auth/login` validates email/password, returns `{ token, admin }`.
2. Tokens are 7-day JWTs signed with `JWT_SECRET`. The Next BFF wraps them in a signed httpOnly cookie — backend never sees the cookie.
3. `requireAdmin` decodes the bearer token and loads the admin. `requireAdminRole("SUPER_ADMIN")` additionally enforces role.
4. `GET /admin/auth/me` returns the current admin — used by the Next session route to populate the admin identity.

## Routes At A Glance

Public:
- `GET  /health`
- `GET  /catalog/products`, `/catalog/products/:slug`, `/catalog/bridge-pages/:slug`
- `GET  /content/articles`, `/content/articles/:slug`, `/content/retreats`, `/content/retreats/:slug`, `/content/programs`, `/content/programs/:slug`, `/content/site-settings`
- `POST /lead/order-requests`, `/lead/newsletter-subscriptions`, `/lead/program-reservations`, `/lead/retreat-inquiries`

Admin (all under `/admin`, all JWT-guarded):
- `auth/login`, `auth/me`
- `admins/*` (SUPER_ADMIN only)
- `media/*`, `categories/*`, `products/*`, `product-options/*`
- `bridge-pages/*`, `articles/*`, `retreats/*`, `programs/*`, `program-sessions/*`, `collections/*`
- `site-settings`
- `leads/*` (order requests, newsletter subs, program reservations, retreat inquiries)

## Commands

```bash
# dev
npm run dev                               # tsx watch on :4001

# prisma
npm run prisma:generate                   # regen client
npm run prisma:migrate -- --name <name>   # new migration
npm run prisma:deploy                     # apply pending migrations (manual, usually not needed — see vercel-build)
npm run prisma:seed                       # run prisma/seed.ts

# build
npm run build                             # local: prisma generate + tsc → dist/ (NEVER touches a remote DB)
npm run vercel-build                      # Vercel-only: generate + tsc + (on production) prisma migrate deploy
npm run start                             # node dist/server.js
```

## Vercel Build Hook

`scripts/vercel-build.sh` is wired as `npm run vercel-build` and runs on every Vercel build. It:

1. Runs `prisma generate` (needed for the bundled client).
2. Runs `tsc -p tsconfig.json`.
3. **On Production only** (`VERCEL_ENV=production`): runs `prisma migrate deploy` using `DATABASE_URL_UNPOOLED` → `POSTGRES_URL_NON_POOLING` → `DATABASE_URL` (first one set). Preview and Development builds skip this step.

Rules:
- A failed migration fails the build. Vercel keeps serving the previous function. Fix forward with a new migration.
- Long-running / locking DDL should be audited before merge — the Vercel build will block on it against live prod traffic.
- Do **not** remove the `VERCEL_ENV=production` guard. Running migrations from a feature-branch Preview would migrate the shared prod DB without a merge to `main`.

## Env Vars

Required: `DATABASE_URL`, `JWT_SECRET` (min 8 chars).

Common: `PORT`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGIN` (comma-separated), `PUBLIC_BASE_URL`.

Storage: `STORAGE_DRIVER` (`local` | `s3` | `vercel-blob`), `LOCAL_UPLOAD_DIR`.
- When `s3`: `S3_BUCKET`, `S3_REGION`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_FORCE_PATH_STYLE`, `S3_PUBLIC_URL_BASE`.
- When `vercel-blob`: `BLOB_READ_WRITE_TOKEN` (auto-injected by the Vercel Blob store connection — do not set manually in prod).

Prod (Neon integration): adds `POSTGRES_*` and `PG*` variants automatically; the app reads `DATABASE_URL` for runtime and `DATABASE_URL_UNPOOLED` / `POSTGRES_URL_NON_POOLING` for migrations during the build hook.

Current prod wiring: `STORAGE_DRIVER=vercel-blob`, `CORS_ORIGIN=https://seijaku-kappa.vercel.app`.

## Vercel Deployment

- Project `seijaku-backend`, Root Directory `backend/`.
- `backend/vercel.json` builds `api/index.ts` with `@vercel/node` and routes every request to it. That means the entire Express app runs inside one serverless function.
- Cold starts are noticeable. Don't add top-level sync filesystem work in `app.ts` beyond what's there.
- In prod, `STORAGE_DRIVER=local` is unusable because the filesystem is ephemeral. Production uses `vercel-blob`; keep it that way unless consciously switching providers.
- Migrations are auto-applied on Production deploys via `vercel-build` (see "Vercel Build Hook" above). Run `prisma:deploy` manually only when bypassing Vercel (e.g., emergency migration from a local machine against the prod URL).

## Patterns To Follow

- New route file → mount it in `src/app.ts`. Zod schemas live next to the route.
- New Prisma model → add to `schema.prisma`, run `prisma migrate dev`, add a serializer in `utils/serializers.ts`, update the relevant route.
- Throw `new HttpError(status, message)` for expected failures. The error middleware formats them. Don't `res.status(...).json(...)` your own errors — keep the shape consistent.
- Wrap async handlers with `asyncHandler()` so rejections hit the error middleware instead of hanging.
- Use `parseBody(schema, req)` for Zod-validated request bodies; it throws a 400 on validation error.

## Common Gotchas

- `multer` runs in `memoryStorage()` with a 10MB limit. If you need bigger uploads, adjust in `routes/admin.ts`.
- CORS defaults to reflect any origin when `CORS_ORIGIN` is unset — lock this down in prod by setting the env var.
- Prisma client is excluded from the TS source tree but is required at runtime. `postinstall` generates it — don't remove that script.
- The seed is destructive-ish (upserts bootstrap admin, (re)creates content). Don't run it against a populated prod DB without reading `prisma/seed.ts` first.
