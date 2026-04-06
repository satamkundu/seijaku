# Seijaku Backend

Standalone REST API and database layer for Seijaku.

## Responsibilities

The backend currently owns:

- admin authentication
- admin dashboard aggregates
- normalized catalog and content records
- media asset records and upload handling
- newsletter subscriptions
- order requests
- program reservations
- retreat inquiries

The public storefront is not fully API-driven yet, but the backend is already the system of record for admin and lead workflows.

## Stack

- Express
- Prisma
- PostgreSQL
- Zod
- JWT
- local or S3-compatible media storage

## Setup

1. Copy `.env.example` to `.env`
2. Set `DATABASE_URL`
3. Install dependencies
4. Generate Prisma client
5. Run migrations
6. Seed the database
7. Start the server

## Commands

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

Build for type-safe server output:

```bash
npm run build
```

## Default Local Config

`.env.example` defaults:

- `PORT=4001`
- `ADMIN_EMAIL=admin@seijaku.local`
- `ADMIN_PASSWORD=password123`

Treat the admin email and password as bootstrap values only.

## Environment Variables

Required:

- `DATABASE_URL`
- `JWT_SECRET`

Common local config:

- `PORT`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CORS_ORIGIN`

Storage config:

- `STORAGE_DRIVER=local|s3`
- `LOCAL_UPLOAD_DIR`
- `PUBLIC_BASE_URL`
- `S3_BUCKET`
- `S3_REGION`
- `S3_ENDPOINT`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `S3_FORCE_PATH_STYLE`
- `S3_PUBLIC_URL_BASE`

## Health Check

```bash
curl -sS http://localhost:4001/health
```

## Key Endpoint Families

Public read endpoints:

- `GET /catalog/products`
- `GET /catalog/products/:slug`
- `GET /catalog/bridge-pages/:slug`
- `GET /content/articles`
- `GET /content/articles/:slug`
- `GET /content/retreats`
- `GET /content/retreats/:slug`
- `GET /content/programs`
- `GET /content/programs/:slug`
- `GET /content/site-settings`

Public write endpoints:

- `POST /lead/order-requests`
- `POST /lead/newsletter-subscriptions`
- `POST /lead/program-reservations`
- `POST /lead/retreat-inquiries`

Admin auth:

- `POST /admin/auth/login`
- `GET /admin/auth/me`

Admin management under `/admin`:

- dashboard
- admins
- media
- categories
- products
- product options and option values
- bridge pages
- articles
- retreats
- programs
- program sessions
- collections
- site settings
- lead queues and lead status updates

## Database

Core schema lives in:

- `prisma/schema.prisma`

Initial migration lives in:

- `prisma/migrations/0001_init/migration.sql`

Seed import lives in:

- `prisma/seed.ts`

The seed currently imports the existing Seijaku frontend content into the normalized backend schema so the admin and APIs start with realistic data.

## Relationship To The Frontend

Current split:

- admin UI and lead forms already use this backend
- most public content rendering still comes from frontend files in `src/lib`

So backend content changes are authoritative for admin and API work, but they do not yet fully control the public storefront.
