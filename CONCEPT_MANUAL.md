# คู่มือแนวคิดและมาตรฐานการพัฒนา Web Application (Resource Center)

เอกสารฉบับนี้จัดทำขึ้นเพื่อเป็น **Technical Specification & Development Guideline** สำหรับการพัฒนาและดูแลรักษา Web Application "Resource Center" ของกลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์ เนื้อหาครอบคลุมตั้งแต่แนวคิดการออกแบบ สถาปัตยกรรมระบบ ไปจนถึงมาตรฐานการเขียนโค้ดและการ Deploy

---

## 1. ภาพรวมโครงการ (Project Overview)
**Resource Center** คือศูนย์รวมข้อมูล เอกสาร และเครื่องมือสำหรับเจ้าหน้าที่กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์ มุ่งเน้นการใช้งานที่ง่าย สะอาดตา และมีความทันสมัย รองรับการจัดการเนื้อหาโดย Admin และการเข้าถึงข้อมูลโดย User ทั่วไป

---

## 2. สถาปัตยกรรมและข้อตกลง (Architecture & Conventions)

### 2.1 Architecture Pattern
โครงการใช้สถาปัตยกรรมแบบ **Modular Monolith** บน **Next.js App Router** โดยเน้นการแยกส่วนตาม Feature (Feature-based) เพื่อให้ง่ายต่อการขยายระบบ

-   **Server Components by Default**: ใช้ Server Components เป็นหลักเพื่อประสิทธิภาพ (SEO, Initial Load) และใช้ Client Components (`'use client'`) เฉพาะเมื่อต้องการ Interactive (State, Effects)
-   **Server Actions**: ใช้สำหรับ Logic การจัดการข้อมูล (Mutations) แทนการสร้าง API Route แยก เพื่อลดความซับซ้อนและ Type Safety ที่ดีกว่า
-   **Directory Oriented**: เก็บไฟล์ที่เกี่ยวข้องไว้ในโฟลเดอร์เดียวกัน (เช่น `components/Admin/Dialog` เก็บทั้ง UI และ Logic ของ Dialog นั้น)

### 2.2 Naming Conventions
-   **Folders/Files**: `kebab-case` สำหรับ Route (เช่น `app/user-management/page.tsx`) และ `PascalCase` สำหรับ Components (เช่น `components/Navbar.tsx`)
-   **Variables/Functions**: `camelCase` (เช่น `fetchUserData`, `isLoading`)
-   **Types/Interfaces**: `PascalCase` (เช่น `UserResponse`, `FolderItem`)
-   **Constants**: `UPPER_SNAKE_CASE` (เช่น `MAX_UPLOAD_SIZE`)

---

## 3. เทคโนโลยีที่ใช้ (Technology Stack)
-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript (Strict Mode)
-   **UI Library**: [React 19](https://react.dev/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)
-   **Component Library**:
    -   [Radix UI](https://www.radix-ui.com/) (Headless Primitives)
    -   [Shadcn UI](https://ui.shadcn.com/) (Reusable Components)
    -   [Lucide React](https://lucide.dev/) (Icons)
-   **Authentication**: [Clerk](https://clerk.com/)
-   **Validation**: [Zod](https://zod.dev/)
-   **State Management**: React Hooks (`useActionState`, `useState`)

---

## 4. ระบบการออกแบบ (Design System)

### 4.1 Typography
ใช้ Google Fonts โดยกำหนดผ่าน `app/fonts.ts` และ `globals.css`:
-   **Body**: `Sarabun` (Variable) - อ่านง่าย เหมาะสำหรับเนื้อหาทั่วไป
-   **Headings**: `Kanit` (Variable) - ทันสมัย เหมาะสำหรับหัวข้อ
-   **Usage**: Font หลักถูก Apply ที่ `<body>` ใน `layout.tsx`

### 4.2 Color Palette (OKLCH)
ระบบสีใช้ **OKLCH** เพื่อความสดใสและรองรับ Dark Mode อย่างสมบูรณ์ (กำหนดใน `globals.css`)
-   **Primary**: `oklch(0.562 0.095 203.275)` (สีฟ้าคราม) - ปุ่มหลัก, Active State
-   **Destructive**: `oklch(0.573 0.190 25.541)` (สีแดง) - ปุ่มลบ, Error
-   **Background**:
    -   Light: `oklch(0.949 0.009 197.013)` (ขาวอมเทา)
    -   Dark: `oklch(0.207 0.025 224.453)` (น้ำเงินเข้ม)
-   **Surface/Card**: มีการแยกสี Card และ Popover เพื่อมิติที่ชัดเจน

### 4.3 Design Tokens
-   **Radius**: `1.55rem` (Rounded XL/2XL feel) ให้ความรู้สึกเป็นมิตรและทันสมัย
-   **Shadows**: Custom Shadows ตั้งแต่ `shadow-2xs` ถึง `shadow-2xl` โดยใช้สี `hsl(185 70% 30%)` เพื่อให้เงาดูมีสีสัน (Colored Shadows) ไม่ใช่แค่สีดำ
-   **Spacing**: ใช้ Standard Tailwind Spacing (0.25rem base)

---

## 5. โครงสร้างไฟล์ (Project Structure)
```
resource-center/
├── actions/             # Server Actions (Business Logic & API Calls)
│   └── actions.ts       # Centralized Actions
├── app/                 # Next.js App Router
│   ├── admin/           # Protected Routes (Admin)
│   ├── downloads/       # Protected Routes (User)
│   ├── api/             # API Routes (ถ้ามี)
│   ├── fonts.ts         # Font Configuration
│   ├── globals.css      # Global Styles & Tokens
│   └── layout.tsx       # Root Layout & Providers
├── components/          # React Components
│   ├── Admin/           # Admin-specific Components
│   ├── DownloadsPage/   # User-specific Components
│   ├── Form/            # Shared Form Components
│   ├── ui/              # Shadcn UI Base Components
│   └── Navbar/          # Navigation Components
├── hooks/               # Custom Hooks (Logic Reuse)
├── lib/                 # Utilities (cn, formatters)
├── types/               # TypeScript Definitions (Models)
└── middleware.ts        # Auth & Route Protection
```

---

## 6. Data Model & Business Logic

### 6.1 Data Models (`types/`)
-   **Folder**: `id`, `name`, `abbr`, `parent` (Recursive Structure)
-   **File**: `id`, `name`, `filename`, `parent`, `isactive`
-   **Announcement**: `id`, `title`, `content`, `status`, `category`

### 6.2 Business Logic (`actions/`)
-   **Server Actions**: ใช้ `actions.ts` เป็นตัวกลางในการคุยกับ Backend API
-   **Validation**: ทุก Action ที่มีการรับข้อมูล (Create/Update) **ต้อง** ผ่านการ Validate ด้วย `Zod` Schema เสมอ
-   **Error Handling**: Return object `{ success: boolean, message: string, errors?: object }` เพื่อให้ Client นำไปแสดงผลได้ง่าย

---

## 7. Security & Deployment

### 7.1 Security Guidelines
-   **Authentication**: ใช้ **Clerk** จัดการ Identity
-   **Authorization (RBAC)**:
    -   ตรวจสอบสิทธิ์ผ่าน `middleware.ts`
    -   `/admin/*`: เฉพาะผู้ที่มีสิทธิ์ Admin (ตรวจสอบผ่าน Clerk Role หรือ Metadata)
    -   `/downloads/*`: เฉพาะ Authenticated Users
-   **Input Validation**: ห้ามเชื่อข้อมูลจาก Client ต้อง Validate ฝั่ง Server เสมอ (Zod)
-   **Environment Variables**: ห้าม Hardcode Secret Key ในโค้ด ให้ใช้ `.env.local`

### 7.2 Deployment Strategy
-   **Build**: `npm run build` (Next.js Build)
-   **Environment**:
    -   `API_URL`: URL ของ Backend API
    -   `API_TOKEN`: Token สำหรับ Server-to-Server Communication
    -   `NEXT_PUBLIC_CLERK_...`: Clerk Keys
-   **CI/CD**: (แนะนำ) ใช้ GitHub Actions สำหรับ Run Test และ Deploy ไปยัง Vercel/Docker

---

## 8. UX & Interaction Guidelines

-   **Feedback**:
    -   **Success**: แสดง Toast สีเขียว/ปกติ เมื่อทำรายการสำเร็จ
    -   **Error**: แสดง Toast สีแดง หรือ Inline Error ใต้ Input เมื่อเกิดข้อผิดพลาด
-   **Loading State**:
    -   ปุ่ม Submit ต้องมีสถานะ `Disabled` และแสดง `Spinner` ขณะกำลังประมวลผล (`useFormStatus` หรือ `isPending`)
    -   หน้าโหลดข้อมูลใช้ `Skeleton` หรือ `Loading Spinner`
-   **Responsive**: ออกแบบโดยยึดหลัก **Mobile-First** (ใช้ `md:`, `lg:` สำหรับหน้าจอใหญ่)

---

## 9. Glossary & Role Definition

### 9.1 บทบาท (Roles)
| Role | Permissions |
| :--- | :--- |
| **User** | เข้าสู่ระบบ, ดูรายการดาวน์โหลด, ดาวน์โหลดไฟล์, แก้ไข Profile ตนเอง |
| **Admin** | จัดการโฟลเดอร์/ไฟล์ (CRUD), จัดการประกาศ, จัดการผู้ใช้งาน, เข้าถึง Dashboard |

### 9.2 คำศัพท์ (Glossary)
-   **Root Folder**: โฟลเดอร์ระดับสูงสุด (`parent = null`)
-   **Sub-folder**: โฟลเดอร์ที่อยู่ภายใต้โฟลเดอร์อื่น
-   **Active**: สถานะไฟล์ที่พร้อมให้ User ดาวน์โหลด
-   **Draft**: สถานะประกาศที่ยังไม่เผยแพร่

---
*เอกสารนี้ปรับปรุงล่าสุดเมื่อ: 1 ธันวาคม 2025 (Updated to Technical Spec)*
