# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A music producer marketplace (beats store) built with Next.js 16 (App Router), Clerk auth, TypeORM + PostgreSQL (Docker), PayPal payments, and Contentful CMS. Supports three languages: English, Spanish, Italian.

## Commands

```bash
npm run db:up        # Start PostgreSQL in Docker
npm run db:down      # Stop PostgreSQL
npm run db:reset     # Destroy volume and restart (fresh DB)
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
```

## Architecture

### Routing & i18n

All user-facing pages live under `src/app/[locale]/` with next-intl. The locale segment is dynamic (`en`, `es`, `it`). Translation files are in `/messages/{locale}.json`. The next-intl plugin is configured in `next.config.ts` pointing to `src/i18n/request.ts`.

**Middleware** (`src/middleware.ts`) chains Clerk auth + next-intl. It protects `/checkout` and `/order-confirmation` routes. API routes (`/api/*`) are excluded from i18n redirects to avoid breaking webhooks.

### Authentication (Clerk)

Users are synced to the `clients` table via two redundant mechanisms:
1. **Clerk webhooks** → `src/app/api/webhooks/clerk/route.ts` (uses svix for signature verification)
2. **Client-side fallback** → `src/components/UserSync.tsx` calls `/api/sync-user` on login

### Provider Nesting (layout.tsx)

`ClerkProvider` → `UserSync` → `NextIntlClientProvider` → `CartProvider` → `CartSidebar` → page content

### Data Layer (TypeORM + Docker PostgreSQL)

- **ORM**: TypeORM with `EntitySchema` (no decorators — compatible with Next.js SWC)
- **Entities**: `src/db/entities/` — `Client`, `Beat`, `Order`, `OrderItem`
- **DataSource**: `src/db/data-source.ts` — singleton connection via `getDB()`
- **Schema sync**: `synchronize: true` in dev (auto-creates/updates tables)
- **Docker**: `docker-compose.yml` runs PostgreSQL 16 on port 5432
- **Contentful CMS**: GraphQL queries in `src/lib/contentful.ts` (optional content source)
- **Cart**: React Context + localStorage (`src/context/CartContext.tsx`), client-side only

### Payment Flow

PayPal via `@paypal/react-paypal-js`. Two-step: create order (pending) → capture payment (mark paid). Server action in `src/actions/order.ts`.

### API Routes

| Route | Purpose |
|-------|---------|
| `POST /api/webhooks/clerk` | Clerk webhook (user.created/updated/deleted) |
| `POST /api/sync-user` | Client-side Clerk→DB user sync |
| `GET/POST /api/beats` | Fetch/create beats |
| `GET/POST /api/users` | List/upsert users |

### Key Patterns

- Pages under `[locale]/` use server components by default; interactive components use `'use client'`
- Server actions (`'use server'`) in `src/actions/` for sensitive DB operations
- All DB access goes through `getDB()` from `src/db/data-source.ts`

## Environment Variables

Required env vars (see `.env.example`):
- `DATABASE_URL` — PostgreSQL connection string (default: `postgresql://producer66:producer66@localhost:5432/producer66`)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`
- `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`
- `NEXT_PUBLIC_PAYPAL_ID`

## Webhook Development

Local webhook testing requires ngrok to tunnel to localhost. See README.md for setup steps.
