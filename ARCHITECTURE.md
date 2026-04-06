# Seijaku Architecture

## Overview

Seijaku is no longer just a frontend prototype. The repo now contains a split architecture:

1. a Next.js frontend for public pages and the embedded admin UI
2. a Next-side BFF layer for admin session handling and backend proxying
3. a standalone Express + Prisma backend as the system of record
4. a PostgreSQL database seeded from the current content set

The important nuance is that the migration is incomplete. Public rendering is still mostly frontend-driven, while admin and lead workflows are backend-driven.

## High-Level System

### Frontend App

Primary responsibilities:

- marketing and editorial pages
- shop browsing and detail pages
- ritual and collection UI
- checkout/order-request UI
- admin CMS under `/admin`

Key folders:

- `src/app`
- `src/components`
- `src/lib`
- `public/images`

### Next BFF Layer

The browser does not talk directly to the backend for admin work.

Key entrypoints:

- `src/app/api/admin/session/route.ts`
- `src/app/api/admin/proxy/[...path]/route.ts`
- `src/app/api/public/[...path]/route.ts`

Responsibilities:

- login/logout/session lookup
- storing the backend JWT inside a signed httpOnly cookie
- proxying admin API calls so browser code never handles raw bearer tokens
- proxying public lead submissions to the backend

### Backend Service

The backend lives in `backend/` and owns:

- admin authentication
- normalized catalog/content models
- media records and upload handling
- lead capture and lead workflow state
- admin dashboard aggregates

Key files:

- `backend/prisma/schema.prisma`
- `backend/prisma/seed.ts`
- `backend/src/routes/public.ts`
- `backend/src/routes/admin.ts`

### Database

PostgreSQL is the primary data store.

The backend schema includes:

- admins
- customers
- media assets
- products, categories, collections, bridge pages, options
- articles, retreats, programs, sessions, site settings
- order requests, newsletter subscriptions, program reservations, retreat inquiries
- schema-ready wishlist and ritual tables for later phases

## Top-Level Structure

- `backend`
  - API server, Prisma schema, migrations, seed logic
- `src/app`
  - public routes, admin route groups, and Next API routes
- `src/app/admin`
  - admin route tree and server-rendered admin pages
- `src/app/api`
  - BFF endpoints for admin session and backend proxies
- `src/components/admin`
  - admin shell, editors, inboxes, and shared admin UI
- `src/lib`
  - public content registries plus admin/backend/session helpers
- `public/images`
  - public bundled assets used by the live storefront

## Route Model

### Public Route Families

- `(marketing)` homepage
- `/shop` and `/shop/[slug]`
- `/our-story`
- `/seasonaldrops`
- `/a-seijaku-life`
- `/retreats` and `/retreats/[slug]`
- `/programs` and the program detail routes
- `/experiences`
- `/ritual`
- `/dashboard`
- `/collection`
- `/checkout`

### Admin Route Family

Admin lives inside the Next app under `/admin`, with its own route-group layout and shell.

Important routes:

- `/admin/login`
- `/admin`
- `/admin/products`
- `/admin/products/[id]`
- `/admin/bridge-pages`
- `/admin/articles`
- `/admin/retreats`
- `/admin/programs`
- `/admin/program-sessions`
- `/admin/collections`
- `/admin/categories`
- `/admin/media`
- `/admin/leads`
- `/admin/settings`
- `/admin/team`

### Compatibility Routes

These still exist, but they are not canonical:

- `/shop-all`
- `/lifestyle`
- `/categories/[slug]`

## App Shell

The root layout is still defined in `src/app/layout.tsx`, but the app now uses `src/components/AppShell.tsx` to avoid rendering the public marketing chrome inside `/admin`.

Current behavior:

- public routes receive the global navbar, footer, shop state, and route-transition behavior
- admin routes render inside a dedicated admin shell

This is a meaningful improvement over the earlier all-routes-share-the-marketing-shell model, but the root still wraps some shared providers globally.

## Data Flow

### Public Reads

Most public page reads still come from frontend files in `src/lib` and route-level components.

Current examples:

- shop/catalog structure from `src/lib/shopAllItems.ts`
- navigation from `src/lib/navigation.ts`
- retreats from `src/lib/retreats.ts`
- editorial from `src/lib/seijakuLifeArticles.ts`

### Public Writes

Public write flows now go through the backend via the Next proxy layer:

- footer newsletter signup
- checkout order requests
- program reservations
- retreat inquiries

Browser path:

1. public component submits to `/api/public/*`
2. Next route handler proxies to backend
3. backend validates and persists the lead

### Admin Reads And Writes

Admin pages are server-rendered in Next, but all durable data comes from the backend.

Flow:

1. admin logs in through `/api/admin/session`
2. Next stores a signed httpOnly session cookie
3. admin pages call backend-facing helpers on the server
4. client editors submit to `/api/admin/proxy/*`
5. Next forwards requests to backend `/admin/*` endpoints with bearer auth

## Admin Authentication

Session model:

- backend issues JWT on `POST /admin/auth/login`
- Next stores that JWT in a signed httpOnly cookie
- browser JavaScript never stores the raw admin token
- protected admin routes redirect to `/admin/login` when the cookie is missing or invalid

Roles:

- `SUPER_ADMIN`
- `EDITOR`

`SUPER_ADMIN` is intended to manage admins, settings, and destructive/publish-level actions. `EDITOR` handles day-to-day content, media, and leads.

## Commerce Architecture

There are currently two parallel commerce representations:

### Public storefront representation

Canonical today for storefront rendering:

- `src/lib/shopAllItems.ts`

This still drives:

- shop routes
- product cards and detail behavior
- filtering and sorting
- route-level metadata

### Backend normalized representation

Canonical for admin/API/database work:

- `backend/prisma/schema.prisma`
- seeded records imported by `backend/prisma/seed.ts`

This powers:

- admin product CRUD
- categories, collections, bridge pages
- product options and option values
- order-request item snapshots

### Main Architectural Risk

These two representations can drift.

Right now:

- public shop pages mostly trust `src/lib/shopAllItems.ts`
- admin edits update backend product records

Until storefront reads are migrated to backend APIs, backend catalog edits should be treated as admin/data groundwork rather than a complete public CMS.

## Content Architecture

The content model is now split:

- frontend-owned presentation content for the currently rendered storefront
- backend-owned normalized content for admin and future API-fed pages

See `CONTENT_MODEL.md` for the operational source-of-truth breakdown.

## Media Architecture

Two media systems currently coexist:

- bundled public assets in `public/images`
- backend `MediaAsset` records, with local upload storage in development and S3-compatible support in production

The bundled assets are still what most public pages render today. The backend media library is used by admin-managed records and future migration work.

## Legacy / Transitional Areas

`src/lib/categoryBridge.ts` remains the clearest legacy module. It reflects the older `/categories/*`, `/shop-all`, and `/lifestyle` model rather than the canonical `/shop/*` structure.

Going forward:

- treat `src/lib/shopAllItems.ts` as the storefront source of truth
- treat `categoryBridge.ts` as legacy
- do not add new logic to both systems

## Current Maturity Assessment

Strongest areas:

- admin authentication boundary
- backend schema breadth
- seeded data model
- public lead capture
- route-level separation between public and admin UI

Weakest areas:

- storefront still not reading from backend content
- duplicated source of truth between frontend registries and backend records
- incomplete end-to-end CMS effect for public pages
- production/offline build sensitivity because of hosted font fetching

## Recommended Source-Of-Truth Files

When working in this repo, start with:

- `src/app/layout.tsx`
- `src/components/AppShell.tsx`
- `src/lib/shopAllItems.ts`
- `src/lib/navigation.ts`
- `src/lib/admin-session.ts`
- `src/app/api/admin/session/route.ts`
- `src/app/api/admin/proxy/[...path]/route.ts`
- `src/app/api/public/[...path]/route.ts`
- `backend/prisma/schema.prisma`
- `backend/src/routes/public.ts`
- `backend/src/routes/admin.ts`

## Near-Term Architecture Gaps

The main follow-up work should be:

- migrate public catalog/content reads from `src/lib` to backend APIs
- consolidate the storefront and backend content sources
- decide whether public assets remain bundled or move behind the media library
- tighten bootstrap-admin handling beyond env-seeded defaults
