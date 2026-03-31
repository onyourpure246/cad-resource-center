# Resource Center (Internal Web Application)

Web Application "Resource Center" ของกลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์ (CAD) เป็นศูนย์รวมข้อมูล เอกสาร และเครื่องมือสำหรับเจ้าหน้าที่ภายในองค์กร มุ่งเน้นการใช้งานที่ง่าย สะอาดตา และมีความทันสมัย

This project is built with [Next.js 15](https://nextjs.org) (App Router) and [Tailwind CSS v4](https://tailwindcss.com).

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/onyourpure246/cad-resource-center.git
cd cad-resource-center
```

### 2. Install dependencies

Install the necessary packages using npm:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory. This project requires several environment variables for external services.

**General Config**
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000   # URL of the web app
AUTH_SECRET=...                             # Generate using: npx auth secret
```

**External API (Resource Backend)**
```env
# Backend URL (Local/Remote)
API_URL=http://localhost:64197/api/fy2569

# Service Token (Must match AUTH_SECRET in Backend)
API_TOKEN=dev-secret-key-change-in-production
```

**ThaID Service (Identity Provider)**
```env
THAID_TOKEN_URL=https://...                 # OAuth Token URL
THAID_USERINFO_URL=https://...              # OAuth UserInfo URL
THAID_BASIC_TOKEN=...                       # Basic Auth Token for Client Credentials
THAID_API_KEY=...                           # (Optional) API Key if required
```

**Internal Employee Verification**
```env
# If using Real Mode in backend-api-mock.ts
EMPLOYEE_API_URL=https://...
EMPLOYEE_API_KEY=...
```

### 4. Run the development server

```bash
npm run dev
# or with Turbopack
# npm run dev --turbo
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Mock Mode**: In `dev` mode, you can enter the code `TEST_ADMIN` in the login page to bypass ThaID using the sandbox admin account (Configured in `lib/thaid-service.ts`).

---

## 🏗️ Architecture & Conventions

### Architecture Pattern
The project uses a **Modular Monolith** architecture on **Next.js App Router**:
-   **Frontend as a Gateway**: Next.js serves as both Frontend and BFF (Backend for Frontend).
-   **Helper Services (`lib/`)**: Logic for external services is isolated in modules (e.g., `thaid-service.ts`).
-   **Server Actions**: Used for data mutations and proxying requests to the backend API to secure tokens.

### Authentication Flow (Custom Provider)
Using **Auth.js (NextAuth v5)** with a Custom Credentials Provider:
1.  **Frontend**: Receives `code` from ThaID redirect.
2.  **NextAuth**: Exchanges `code` for Token & PID via `thaid-service`.
3.  **Verification**: Checks PID against Internal DB via `backend-api-mock` (or real API).
4.  **Session**: Creates a session binding `PID`, `Role`, and `Name`.

### Tech Stack
-   **Framework**: Next.js 15 (App Router), TypeScript
-   **Styling**: Tailwind CSS v4, Framer Motion (Animations)
-   **UI Components**: Radix UI, Shadcn UI, Sonner (Toast), Vaul (Drawer), Lucide React (Icons)
-   **Backend Integration**: Native `fetch` with Server Actions, Zod (Validation)

---

## 📂 Project Structure

```
.
├── actions/                  # Server Actions (Backend Proxy Logic)
│   ├── folder-actions.ts     # Manage Folders
│   ├── file-actions.ts       # Manage Files
│   └── ...
├── app/                      # Next.js App Router
│   ├── admin/                # Admin Routes (Protected)
│   ├── api/                  # API Routes (Auth Handlers)
│   ├── auth/                 # Auth Callback Pages
│   ├── downloads/            # Public/User Routes
│   ├── login/                # Login Page
│   └── ...
├── components/               # React Components
│   ├── Admin/                # Admin-specific Components
│   ├── DownloadsPage/        # User-facing Components
│   └── ...
├── lib/                      # Business Logic & Service Integrations
│   ├── thaid-service.ts      # ThaID API Integration
│   ├── backend-api-mock.ts   # Internal Employee API Interface
│   └── utils.ts              # Helper Functions
├── types/                    # TypeScript Entities
├── auth.config.ts            # Auth.js Configuration
├── middleware.ts             # Route Protection Middleware
└── next.config.ts            # Next.js Config
```

---

## 📝 Development Guidelines

### Adding a New Page
1.  Create a folder in `app/` using `kebab-case`.
2.  Create `page.tsx`.
3.  Add `'use client'` at the top if client interactivity is needed.
4.  For data fetching, create an async function in `actions/` and call it from the Server Component.

### Adding an Action (Mutation)
1.  Create a function in `actions/` marked with `'use server'`.
2.  Validate input using `zod`.
3.  Use `try/catch` and return `{ success: boolean, message: string }`.
4.  Use `useActionState` hook in Client Components to connect to the action.

### Engineering Standards
-   **TypeScript**: Define types/interfaces in `types/` folder. Avoid declaring them inside components.
-   **Styling**: Use Tailwind utility classes. For complex animations, use `framer-motion`.

---

## 📦 Deployment (Operations)

This project builds as a Standalone Application.

```bash
npm run build
npm start
```

**Security Checklist before Deploy:**
- [ ] Check `API_TOKEN` is for Production.
- [ ] Disable Mock Logic in `lib/thaid-service.ts` or `backend-api-mock.ts`.
- [ ] Set `AUTH_TRUST_HOST=true` if deploying behind a Reverse Proxy.

---

## 💾 Data Model Concept

Since the Frontend connects to an external API, the data model follows the API response:

-   **Folder (Virtual)**: Metadata in DB to organize files. Recursive structure (`parent_id`).
-   **File**: Stores Physical Link to Backend. Frontend handles Metadata (Name, Size, Type) and ID.
-   **User**: `id` mapped to PID. `role` ('admin' | 'user') verified via API.

---

## Learn More

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
