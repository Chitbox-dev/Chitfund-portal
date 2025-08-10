# Changes Log

Date: 2025-08-10

This file summarizes the recent changes made to enable static deployment on Netlify without altering existing app functionality.

## Summary
- Consolidated login at `/auth/login`; removed the legacy `/login` page.
- Added safe redirects for `/login` → `/auth/login` compatible with static hosting.
- Ensured static export works for dynamic scheme routes by adding minimal shims.
- Added Netlify configuration and deployment documentation.

## Details

### 1) Routing & Login
- Updated navbar links to point to `/auth/login` (desktop and mobile).
  - Edited: `components/landing/navbar.tsx`
- Added redirects:
  - Added (Next.js config): `/login` → `/auth/login` (permanent)
    - Edited: `next.config.mjs`
  - Added (Netlify/static): `/login` → `/auth/login` and SPA fallback `/* → /index.html`
    - Edited: `public/_redirects`
- Removed old `/login` page along with its demo table component.
  - Removed: `app/login/page.tsx`
  - Removed: `components/auth/demo-accounts.tsx`

### 2) Static Export Compatibility (no behavior change)
To keep `output: "export"` while supporting dynamic scheme pages, added empty `generateStaticParams` shims:
- Added: `app/admin/schemes/[schemeId]/layout.tsx` (exports `generateStaticParams`, marks route static)
- Added: `app/foreman/schemes/[schemeId]/publish/generateStaticParams.ts`
- Added: `app/foreman/schemes/[schemeId]/manage/generateStaticParams.ts`

These files satisfy Next.js static export requirements; UI and logic remain unchanged.

### 3) Netlify Configuration & Docs
- Added Netlify build config for static site:
  - Added: `netlify.toml`
    - `build.command = "npm run build"`
    - `build.publish = "out"`
    - `NODE_VERSION = "20"` (stable for this project; can be overridden in Netlify UI if needed)
- Added deployment guide:
  - Added: `DEPLOYING.md`

## Affected Files (by status)

Added:
- `app/admin/schemes/[schemeId]/layout.tsx`
- `app/foreman/schemes/[schemeId]/publish/generateStaticParams.ts`
- `app/foreman/schemes/[schemeId]/manage/generateStaticParams.ts`
- `netlify.toml`
- `DEPLOYING.md`

Edited:
- `components/landing/navbar.tsx`
- `next.config.mjs`
- `public/_redirects`

Removed:
- `app/login/page.tsx`
- `components/auth/demo-accounts.tsx`

## Verification
- Local build: `npm run build` → succeeds and outputs static site in `out/`
- Key routes verified locally: `/auth/login`, `/admin/schemes`, `/admin/schemes/<id>/reports`, `/foreman/schemes/<id>/manage`, `/foreman/schemes/<id>/publish`, `/user/*`
- `/login` now redirects to `/auth/login` via `public/_redirects` (Netlify-compatible)

## Netlify UI Settings (for reference)
- Remove plugin: `@netlify/plugin-nextjs` (not required for static export)
- Build command: `npm run build`
- Publish directory: `out`
- Functions directory: (leave blank)
- Node version: 20 (or set to your preferred version; if using 22.x and you see build issues, revert to 20)

## Rollback
- Revert the commit(s) introducing the changes above, or restore removed files from version control.

---
No functional features were changed; modifications were limited to routing cleanup, static-export shims, and deployment configuration.

