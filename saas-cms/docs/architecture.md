# Architecture

This document describes the high-level architecture of the SaaS CMS.

## Core Concepts

The application is a multi-tenant SaaS platform where users (tenants) can sign up to create and manage their own websites using AI-powered tools.

- **Public Website:** A main marketing/landing site that explains the product, shows pricing, and includes pages like "About Us", "Contact", etc.
- **Tenant Dashboard:** A protected area where authenticated users manage their sites, content, and settings.
- **Tenant Websites:** The actual websites generated and served by the CMS for each tenant, under their own domain or a subdomain.

## Directory Structure

```
/
├── app/
│   ├── (marketing)/          # Group for public-facing pages
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Landing page (Home)
│   │   ├── nosotros/
│   │   ├── servicios/
│   │   ├── contacto/
│   │   └── ... (other public pages based on sitemap)
│   ├── (dashboard)/          # Group for authenticated user dashboard
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Main dashboard overview
│   │   ├── sites/            # Manage sites
│   │   └── settings/         # User settings
│   ├── api/                  # API routes for backend logic
│   └── [domain]/             # Dynamic route to serve tenant websites
├── components/
│   ├── layout/               # Main layout components (Header, Footer)
│   ├── sections/             # Reusable page sections
│   └── ui/                   # Generic UI components (Button, Card, etc.)
├── db/
│   ├── schema.ts             # Drizzle ORM schema definitions
│   └── migrate.ts            # Drizzle migration script
├── docs/
├── lib/
│   ├── auth.ts               # Clerk authentication helpers
│   ├── db.ts                 # Database connection
│   └── utils.ts              # Utility functions
└── public/
```

## Page Routing (based on sitemap.xml)

The public marketing site will be structured under the `(marketing)` route group.

- `/` -> `app/(marketing)/page.tsx` (Home)
- `/nosotros` -> `app/(marketing)/nosotros/page.tsx` (About Us, History)
- `/servicios` -> `app/(marketing)/servicios/page.tsx` (Services)
- `/prevision` -> `app/(marketing)/prevision/page.tsx` (Pre-need)
- `/necesidad-inmediata` -> `app/(marketing)/necesidad-inmediata/page.tsx` (Immediate Need)
- `/cobertura` -> `app/(marketing)/cobertura/page.tsx` (Coverage)
- `/obituario` -> `app/(marketing)/obituario/page.tsx` (Obituary)
- `/contacto` -> `app/(marketing)/contacto/page.tsx` (Contact)
- `/sucursales/[slug]` -> `app/(marketing)/sucursales/[slug]/page.tsx` (For locations like Aragon, Tlalpan, etc.)

This structure provides a clear separation between the public-facing marketing content and the core SaaS application logic.
