# คู่มือมาตรฐานการพัฒนา Web Application (Development Manual)

เอกสารฉบับนี้จัดทำขึ้นเพื่อเป็น **Technical Specification & Development Guideline** สำหรับการพัฒนาและดูแลรักษา Web Application "Resource Center" ของกลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์ เนื้อหาครอบคลุมตั้งแต่แนวคิดการออกแบบ สถาปัตยกรรมระบบ ไปจนถึงมาตรฐานการเขียนโค้ดและการ Deploy

---

## 1. ภาพรวมโครงการ (Project Overview)
**Resource Center** คือศูนย์รวมข้อมูล เอกสาร และเครื่องมือสำหรับเจ้าหน้าที่กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์ มุ่งเน้นการใช้งานที่ง่าย สะอาดตา และมีความทันสมัย รองรับการจัดการเนื้อหาโดย Admin และการเข้าถึงข้อมูลโดย User ทั่วไป

---

## 2. สถาปัตยกรรมและข้อตกลง (Architecture & Conventions)

### 2.1 Architecture Pattern
โครงการใช้สถาปัตยกรรมแบบ **Modular Monolith** บน **Next.js App Router** โดยเน้นการแยกส่วนตาม Feature (Feature-based) เพื่อให้ง่ายต่อการขยายระบบ

-   **Server Components by Default**: ใช้ Server Components เป็นหลักเพื่อประสิทธิภาพ (SEO, Initial Load) และใช้ Client Components (`'use client'`) เฉพาะเมื่อต้องการ Interactive (State, Effects) หรือใช้ Library ที่ต้องการ Browser APIs (เช่น `framer-motion`)
-   **Server Actions**: ใช้สำหรับ Logic การจัดการข้อมูล (Mutations) แทนการสร้าง API Route แยก เพื่อลดความซับซ้อนและ Type Safety ที่ดีกว่า
-   **Directory Oriented**: เก็บไฟล์ที่เกี่ยวข้องไว้ในโฟลเดอร์เดียวกัน (เช่น `components/Admin/Dialog` เก็บทั้ง UI และ Logic ของ Dialog นั้น)

### 2.2 Performance Patterns
-   **Lazy Loading Icons**: สำหรับ Component ที่มีการเรียกใช้ Icons จำนวนมาก (เช่น `MuiIconRenderer`) **ต้อง** ใช้ `next/dynamic` หรือ Dynamic Imports เพื่อลด Bundle Size เริ่มต้น
-   **Package Optimization**: กำหนด `optimizePackageImports` ใน `next.config.ts` สำหรับ heavy libraries เช่น `@mui/icons-material`, `@mui/material`, `lucide-react`
-   **Bundler**: ใช้ **Turbopack** (`next dev --turbo`) สำหรับ Development Environment เพื่อความรวดเร็ว

### 2.3 Naming Conventions
-   **Folders/Files**: `kebab-case` สำหรับ Route (เช่น `app/user-management/page.tsx`) และ `PascalCase` สำหรับ Components (เช่น `components/Navbar.tsx`)
-   **Variables/Functions**: `camelCase` (เช่น `fetchUserData`, `isLoading`)
-   **Types/Interfaces**: `PascalCase` (เช่น `UserResponse`, `FolderItem`)
-   **Constants**: `UPPER_SNAKE_CASE` (เช่น `MAX_UPLOAD_SIZE`)

---

## 3. เทคโนโลยีที่ใช้ (Technology Stack)
-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript (Strict Mode)
-   **UI Library**: [React 19](https://react.dev/)
-   **Styling**: 
    -   [Tailwind CSS 4](https://tailwindcss.com/) (Utility-first)
    -   [Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)
    -   [tw-animate-css](https://www.npmjs.com/package/tw-animate-css)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/) (Complex Animations, Gestures, Spring Physics)
-   **Icons**: 
    -   [Lucide React](https://lucide.dev/) (Primary Icons)
    -   [@mui/icons-material](https://mui.com/material-ui/material-icons/) (Specific Folder Icons - Loaded Dynamically)
-   **Date Handling**: [date-fns](https://date-fns.org/) (with `th` locale for Buddhist Era formatting)
-   **Component Library**:
    -   [Radix UI](https://www.radix-ui.com/) (Headless Primitives)
    -   [Shadcn UI](https://ui.shadcn.com/) (Reusable Components Base)
    -   [Vaul](https://vaul.emilkowal.ski/) (Drawer Component)
    -   [Sonner](https://sonner.emilkowal.ski/) (Toast Notifications)
-   **Authentication**: [Clerk](https://clerk.com/) (Current), [NextAuth.js](https://authjs.dev/) (Planned Migration)
-   **Validation**: [Zod](https://zod.dev/)
-   **State Management**: React Hooks (`useActionState`, `useState`)

---

## 4. ระบบการออกแบบ (Design System)

### 4.1 Typography
ใช้ Google Fonts โดยกำหนดผ่าน `app/fonts.ts` และ `globals.css`:
-   **Body**: `Sarabun` (Variable) - อ่านง่าย เหมาะสำหรับเนื้อหาทั่วไป
-   **Headings**: `Kanit` (Variable) - ทันสมัย เหมาะสำหรับหัวข้อ (Titles, Buttons, Badges)
-   **Indentation**: สำหรับเนื้อหาย่อหน้ายาวๆ (เช่นใน Announcement Card) ให้ใช้ `indent-4` เพื่อความเป็นระเบียบ

### 4.2 Color Palette (OKLCH)
ระบบสีใช้ **OKLCH** เพื่อความสดใสและรองรับ Dark Mode อย่างสมบูรณ์ (กำหนดใน `globals.css`)
-   **Primary**: `oklch(0.562 0.095 203.275)` (สีฟ้าคราม) - ปุ่มหลัก, Active State
-   **Destructive**: `oklch(0.573 0.190 25.541)` (สีแดง) - ปุ่มลบ, Error
-   **Background**:
    -   Light: `oklch(0.949 0.009 197.013)` (ขาวอมเทา)
    -   Dark: `oklch(0.207 0.025 224.453)` (น้ำเงินเข้ม)
-   **Surface/Card**: มีการแยกสี Card และ Popover เพื่อมิติที่ชัดเจน โดยใช้ `backdrop-blur` ร่วมกับ `bg-opacity`

### 4.3 Design Tokens
-   **Radius**: `1.55rem` (Custom Value) - ใช้สำหรับ Cards, Modal และ Container หลัก เพื่อให้ความรู้สึก Soft & Modern
-   **Shadows**: ใช้ **Colored Shadows** (`hsl(185 70% 30%)`) ไล่ระดับตั้งแต่ `shadow-2xs` ถึง `shadow-2xl` เพื่อให้เงามีความลึกและกลมกลืนกับ Theme ไม่ใช่แค่สีดำทึบ
-   **Spacing**: 
    -   เน้นความกระชับ (Compact) ในส่วนของ Card Content
    -   สามารถใช้ **Negative Margin** (เช่น `-mt-1.5`) เพื่อปรับระยะห่างระหว่าง Element ให้ชิดกันมากกว่าค่ามาตรฐานได้ หากต้องการ Visual Hierarchy ที่แนบเนียน
-   **Visual Effects**:
    -   **Glassmorphism**: ใช้ `backdrop-blur-sm/md` สำหรับ Card Background
    -   **Hover Effects**: ใช้ `framer-motion` (`whileHover={{ y: -5 }}`) พร้อม `spring` transition (`stiffness: 300`) เพื่อความนุ่มนวล

---

## 5. โครงสร้างไฟล์ (Project Structure)
```
.
├─ actions
│  └─ actions.ts
├─ app
│  ├─ admin
│  │  ├─ announcement
│  │  │  ├─ create
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ dashboard
│  │  │  └─ page.tsx
│  │  ├─ documents
│  │  │  ├─ [folderId]
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ usermanagement
│  │  │  └─ page.tsx
│  │  └─ layout.tsx
│  ├─ downloads
│  │  ├─ [folderId]
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ error.tsx
│  ├─ favicon.ico
│  ├─ fonts.ts
│  ├─ global-error.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ provider.tsx
│  └─ theme-provider.tsx
├─ assets
│  └─ img
│     └─ clients
├─ components
│  ├─ Admin
│  │  ├─ Announcement
│  │  │  ├─ AnnouncementCard.tsx
│  │  │  ├─ AnnouncementTable.tsx
│  │  │  └─ CreateNewAnnouncement.tsx
│  │  ├─ Dialog
│  │  │  ├─ AddFolderDialog.tsx
│  │  │  ├─ CreateNewForm.tsx
│  │  │  ├─ DeleteConfirmationDialog.tsx
│  │  │  ├─ DialogFooter.tsx
│  │  │  ├─ Dialog.tsx
│  │  │  ├─ EditFolderDialog.tsx
│  │  │  ├─ FolderForm.tsx
│  │  │  ├─ FolderTree.tsx
│  │  │  └─ MoveDialog.tsx
│  │  ├─ DocManagement
│  │  │  ├─ ActionButtons.tsx
│  │  │  ├─ DataManagementLayout.tsx
│  │  │  ├─ ItemsTable.tsx
│  │  │  ├─ PaginationFooter.tsx
│  │  │  ├─ RightSideDrawer.tsx
│  │  │  └─ TableSkeleton.tsx
│  │  ├─ SidebarContext.tsx
│  │  ├─ Sidebar.tsx
│  │  └─ UserManagement.tsx
│  ├─ DataTable
│  │  └─ DataTable.tsx
│  ├─ DownloadsPage
│  │  ├─ CategoryCard.tsx
│  │  ├─ CategorySelection.tsx
│  │  ├─ DownloadCard.tsx
│  │  ├─ DownloadLists.tsx
│  │  ├─ HeroBackground.tsx
│  │  ├─ HeroSection.tsx
│  │  └─ SubFolderBadges.tsx
│  ├─ Footer
│  │  └─ Footer.tsx
│  ├─ Form
│  │  ├─ Button.tsx
│  │  ├─ CategorySelect.tsx
│  │  ├─ DateAndTime.tsx
│  │  ├─ DatePicker.tsx
│  │  ├─ FormContainer.tsx
│  │  ├─ TextAreaInput.tsx
│  │  └─ TextInput.tsx
│  ├─ Header
│  │  └─ Header.tsx
│  ├─ HomePage
│  │  ├─ AnnounceSection.tsx
│  │  └─ ContactSection.tsx
│  ├─ Navbar
│  │  ├─ DropDownMenu.tsx
│  │  ├─ ModeToggle.tsx
│  │  ├─ NavAuth.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ Search.tsx
│  │  └─ ThemeLogo.tsx
│  └─ ui
├─ data
│  ├─ announceData.ts
│  ├─ contactData.ts
│  └─ footerData.ts
├─ hooks
│  ├─ useAnnouncementColumns.tsx
│  ├─ useFolderContents.ts
│  ├─ useFormSubmission.ts
│  ├─ useItemsTableColumns.tsx
│  ├─ useMoveDialog.ts
│  ├─ useRootDocuments.ts
│  └─ useTableData.ts
├─ lib
│  └─ utils.ts
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ types
│  ├─ announcement.ts
│  ├─ common.ts
│  ├─ documents.ts
│  ├─ footer.ts
│  └─ MoveDialog.types.ts
├─ utils
│  ├─ download-page-utils.ts
│  └─ newcdm_types.ts
├─ components.json
├─ CONCEPT_MANUAL.md
├─ .env.local
├─ eslint.config.mjs
├─ .gitignore
├─ middleware.ts
├─ next.config.ts
├─ next-env.d.ts
├─ package.json
├─ package-lock.json
├─ postcss.config.mjs
├─ README.md
└─ tsconfig.json

```

---

## 6. Data Model & Business Logic

### 6.1 Data Models (`types/`)
-   **Folder**: `id`, `name`, `abbr`, `parent` (Recursive Structure)
-   **File**: `id`, `name`, `filename`, `parent`, `isactive`, `mui_icon`, `mui_colour`
-   **Announcement**: 
    -   `id`, `title`, `content` (Main Description), `status`, `category`
    -   `categoryVariant` (Theme styling), `createdBy`, `createdAt`, `updatedAt`
    -   **Note**: Model ไม่ใช้ field `description` แล้ว ให้ใช้ `content` เป็นหลักเพื่อลดความซ้ำซ้อน

### 6.2 Business Logic (`actions/`)
-   **Separation of Concerns**: แยกไฟล์ Actions ตาม Domain เพื่อความชัดเจน (`actions/`)
    -   `file-actions.ts`: จัดการไฟล์ (Upload, Update, Delete)
    -   `folder-actions.ts`: จัดการโฟลเดอร์ (Create, Move, Delete Structure)
    -   `announcement-actions.ts`: จัดการประกาศ
    -   `common-actions.ts`: Shared Logic
-   **Validation**: ทุก Action ที่มีการรับข้อมูล (Create/Update) **ต้อง** ผ่านการ Validate ด้วย `Zod` Schema เสมอ
-   **Error Handling**: Return object `State` (`{ success: boolean, message: string, errors?: object }`) เพื่อให้ Client นำไปแสดงผลได้ง่ายผ่าน `useActionState`

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
-   **Build**: `npm run build` (Next.js Build) - **ต้อง** ตรวจสอบ `next.config.ts` ให้แน่ใจว่าเปิด options `optimizePackageImports` เพื่อลดขนาด Build
-   **Environment**:
    -   `API_URL`: URL ของ Backend API
    -   `API_TOKEN`: Token สำหรับ Server-to-Server Communication
    -   `NEXT_PUBLIC_CLERK_...`: Clerk Keys

---

## 8. UX & Interaction Guidelines

-   **Feedback**:
    -   **Success**: แสดง Toast สีเขียว/ปกติ เมื่อทำรายการสำเร็จ
    -   **Error**: แสดง Toast สีแดง หรือ Inline Error ใต้ Input เมื่อเกิดข้อผิดพลาด
-   **Loading State**:
    -   ปุ่ม Submit ต้องมีสถานะ `Disabled` และแสดง `Spinner` ขณะกำลังประมวลผล (`useFormStatus` หรือ `isPending`)
    -   หน้าโหลดข้อมูลใช้ `Skeleton` หรือ `Loading Spinner`
-   **Responsive**: 
    -   ออกแบบโดยยึดหลัก **Mobile-First** (ใช้ `md:`, `lg:` สำหรับหน้าจอใหญ่)
    -   **Grid Layout**: ปรับ Column อัตโนมัติ (เช่น 1 col on Mobile -> 3 cols on Desktop)
-   **Component States**:
    -   **Hover**: ปุ่มและการ์ดต้องมี Hover State ที่ชัดเจน (Shadow Increase, Lift Up)
    -   **Active**: แสดงสีเข้มขึ้นเมื่อถูกกด

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
*เอกสารนี้ปรับปรุงล่าสุดเมื่อ: 16 ธันวาคม 2025 (Updated to Development Manual, removed DaisyUI)*
