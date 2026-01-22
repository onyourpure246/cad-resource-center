# Project Structure

## Root
-   `.env.local`
-   `auth.config.ts`, `auth.ts` (Authentication)
-   `middleware.ts`
-   `next.config.ts`
-   `package.json`, `tsconfig.json`

## Directories
-   `actions/`: Server actions.
-   `app/`: Next.js App Router pages and layouts.
-   `components/`: Reusable UI components.
    -   `Admin/`: Admin-specific components (Announcement, UserManagement, DocManagement).
    -   `Common/`: Shared components (`StatusBadge`, etc.).
    -   `DataTable/`: Table components (`ActionsCell`, `DataTable`).
    -   `Form/`: Form inputs (`SelectInput`, `TextInput`).
    -   `ui/`: Shadcn UI components.
-   `hooks/`: Custom React hooks (`useTableData`, etc.).
-   `lib/`: libraries (utils, db, etc.).
-   `types/`: TypeScript type definitions.
-   `utils/`: Utility functions (`columnHelper`, constants).

## Key Files
-   `utils/columnHelper.tsx`: Factory for simplifying table column definitions.
-   `components/Common/StatusBadge.tsx`: Standard status display.
-   `components/DataTable/ActionsCell.tsx`: Standard row actions.
