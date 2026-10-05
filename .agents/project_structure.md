# Project Structure

## Root
- `.env.local`
- `auth.config.ts`, `auth.ts` (NextAuth v5 Authentication & ThaID SSO)
- `middleware.ts`
- `next.config.ts`
- `package.json`, `tsconfig.json`

## Directories
- `actions/`: Server actions for mutations and backend integrations.
  - `backup-actions.ts`: Backup & restore database/storage mutations.
  - `file-actions.ts`: File and category operations.
  - `search-actions.ts`: Document search actions.
  - `user-actions.ts`: User management actions.
- `app/`: Next.js App Router pages and layouts.
  - `_components/`: Homepage redesigned 50/50 section components.
    - `CombinedPreviewClient.tsx`: Master 50/50 container layout.
    - `HomeAnnounceColumn.tsx`: Left column announcement slider with progress loader & overlay controls.
    - `HomeLatestScriptsColumn.tsx`: Right column CATS script categories (3 grid cards layout).
    - `AnnouncementCard.tsx`: Single announcement card view with dialog modal.
    - `HomePreviewCombinedSection.tsx`: Server component data fetcher.
    - `HeroVideoBanner.tsx`: Top video banner.
  - `admin/`: Admin protected routes (`announcement`, `backup`, `dashboard`, `documents`, `usermanagement`).
  - `api/`: API Proxy & Auth routes (`/api/auth/*`, `/api/backup/*`, `/api/proxy-download/*`).
  - `downloads/`: End-user download page with inline admin controls.
- `components/`: Reusable UI components.
  - `Admin/`: Admin components (`Backup`, `DocManagement`, `UserManagement`, `Dashboard`).
  - `Auth/`: Security & role wrappers (`SuperAdminOnly.tsx`, `ServerSuperAdminOnly.tsx`).
  - `Layout/`: App navigation (`Navbar`, `Footer`, `MobileNav`).
  - `ui/`: Shadcn UI primitives (`Button`, `Badge`, `Dialog`, etc.).
- `lib/`: Helper libraries (`auth-helpers.ts`, `thaid-service.ts`, `utils.ts`).
- `services/`: Backend API clients (`auth-api.ts`, `backup-service.ts`, `document-service.ts`).
- `types/`: TypeScript definitions (`announcement.ts`, `components.ts`, `models.ts`, `user.ts`).

## Key Files & Helpers
- `lib/auth-helpers.ts`: Role privilege helpers (`isSuperAdminRole`, `isAdminRole`).
- `components/Auth/ServerSuperAdminOnly.tsx`: Server Component SuperAdmin isolation wrapper.
- `components/Auth/SuperAdminOnly.tsx`: Client Component SuperAdmin isolation wrapper.
