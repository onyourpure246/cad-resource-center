# คู่มือแนวคิดการพัฒนา Web Application (Resource Center)

เอกสารฉบับนี้จัดทำขึ้นเพื่อเป็นแนวทางในการพัฒนาและดูแลรักษา Web Application "Resource Center" ของกลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์ เพื่อให้การพัฒนาเป็นไปในทิศทางเดียวกันและคงไว้ซึ่งเอกลักษณ์ของระบบ

## 1. ภาพรวมโครงการ (Project Overview)
**Resource Center** คือศูนย์รวมข้อมูล เอกสาร และเครื่องมือสำหรับเจ้าหน้าที่กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์ มุ่งเน้นการใช้งานที่ง่าย สะอาดตา และมีความทันสมัย

## 2. เทคโนโลยีที่ใช้ (Technology Stack)
ระบบถูกพัฒนาด้วยเทคโนโลยีที่ทันสมัย เพื่อประสิทธิภาพและการดูแลรักษาในระยะยาว:
-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **UI Library**: [React 19](https://react.dev/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Component Library**:
    -   [Radix UI](https://www.radix-ui.com/) (Headless UI)
    -   [DaisyUI](https://daisyui.com/) (Component Classes)
    -   [Lucide React](https://lucide.dev/) (Icons)
-   **Authentication**: [Clerk](https://clerk.com/)
-   **State/Data Management**: React Hooks, Server Actions

## 3. ระบบการออกแบบ (Design System)

### 3.1 ตัวอักษร (Typography)
โครงการใช้ฟอนต์ภาษาไทยจาก Google Fonts จำนวน 2 รูปแบบ:
-   **Sarabun**: ใช้เป็นฟอนต์หลักของเว็บไซต์ (Body Text) เพื่อความอ่านง่ายและเป็นทางการ
-   **Kanit**: ใช้สำหรับหัวข้อ (Headings) หรือจุดที่ต้องการความโดดเด่น

### 3.2 สี (Color Palette)
ระบบสีถูกกำหนดไว้ใน `app/globals.css` โดยใช้ระบบสี `oklch` เพื่อความสดใสและสม่ำเสมอ รองรับทั้ง **Light Mode** และ **Dark Mode**
-   **Primary**: สีหลักของปุ่มและจุดเน้น
-   **Background**: สีพื้นหลัง (ขาว/เทาอ่อน ใน Light Mode และ น้ำเงินเข้ม/ดำ ใน Dark Mode)
-   **Foreground**: สีตัวอักษรหลัก

### 3.3 โครงสร้างหน้าเว็บ (Layout Structure)
-   **Navbar**: แถบนำทางด้านบน (Fixed/Sticky)
-   **Main Content**: ส่วนเนื้อหาหลัก
-   **Footer**: ส่วนท้ายของหน้า (ถ้ามี)

## 4. โครงสร้างไฟล์ (Project Structure)
```
resource-center/
├── app/                 # Next.js App Router
│   ├── fonts.ts         # การตั้งค่า Font (Kanit, Sarabun)
│   ├── globals.css      # Global Styles & Tailwind Theme
│   ├── layout.tsx       # Root Layout (Navbar, Providers)
│   └── page.tsx         # หน้าแรก (Home Page)
├── components/          # React Components
│   ├── ui/              # Reusable UI Components (Button, Card, etc.)
│   └── Navbar/          # Navbar Component
├── assets/              # รูปภาพและไฟล์สื่อ
└── public/              # Static Files
```

## 5. แนวทางการพัฒนา (Development Guidelines)

### การสร้างหน้าใหม่ (Creating New Pages)
ให้สร้างโฟลเดอร์ใหม่ใน `app/` และสร้างไฟล์ `page.tsx` ภายในโฟลเดอร์นั้น เช่น `app/documents/page.tsx` จะเข้าถึงได้ผ่าน `/documents`

### การใช้งาน Components
-   ใช้ Components จาก `components/ui/` เป็นหลัก เพื่อความสม่ำเสมอของดีไซน์
-   หากต้องการสร้าง Component ใหม่ ให้พิจารณาว่าเป็น UI ทั่วไป (เก็บใน `ui/`) หรือเฉพาะเจาะจง (เก็บแยกตาม Feature)

### การจัดการ Style
-   ใช้ **Tailwind CSS Class** ในการตกแต่งเป็นหลัก
-   หลีกเลี่ยงการเขียน CSS แยกไฟล์ ยกเว้นกรณีจำเป็นจริงๆ ให้เขียนใน `globals.css` หรือใช้ CSS Modules

## 6. รายละเอียด Components (Component Details)

ส่วนนี้รวบรวมรายชื่อและหน้าที่ของ Components ทั้งหมดในโปรเจกต์ โดยแบ่งเป็น 2 กลุ่มหลัก คือ Components จาก Library (Shadcn UI) และ Components ที่พัฒนาขึ้นเอง (Custom)

### 6.1 Shadcn UI Components (`components/ui`)
เป็น Base UI Components ที่นำมาจาก Library Shadcn UI (Radix UI + Tailwind) ใช้เป็นพื้นฐานในการสร้างหน้าเว็บ
-   **Layout & Feedback**: `card`, `dialog`, `drawer`, `sheet`, `skeleton`, `sonner` (Toast), `table`
-   **Form Elements**: `button`, `input`, `checkbox`, `label`, `select`, `textarea`, `form`
-   **Navigation**: `breadcrumb`, `dropdown-menu`
-   **Others**: `badge`, `calendar`, `popover`, `command`

### 6.2 Custom Components
เป็น Components ที่พัฒนาขึ้นเฉพาะสำหรับโปรเจกต์นี้ โดยจัดเก็บตาม Feature:

#### **A. Layout & Navigation**
-   **Navbar** (`components/Navbar/`)
    -   `Navbar`: แถบเมนูหลักด้านบน
    -   `NavAuth`: ปุ่ม Login/Logout และแสดง Profile ผู้ใช้
    -   `ModeToggle`: ปุ่มสลับ Dark/Light Mode
    -   `DropDownMenu`: เมนูย่อยสำหรับ Admin หรือหมวดหมู่อื่นๆ
-   **Header** (`components/Header/`)
    -   `Header`: ส่วนหัวของหน้าเพจ (Page Title & Description)

#### **B. Home Page** (`components/HomePage/`)
-   `AnnounceSection`: ส่วนแสดงข่าวประชาสัมพันธ์หน้าแรก

#### **C. Downloads Page** (`components/DownloadsPage/`)
-   `CategorySelection`: ส่วนเลือกหมวดหมู่เอกสารหลัก
-   `CategoryCard`: การ์ดแสดงหมวดหมู่ย่อย
-   `DownloadLists`: รายการไฟล์ดาวน์โหลด (แสดงเป็นตารางหรือการ์ด)
-   `SubFolderBadges`: แถบนำทางโฟลเดอร์ย่อย (Breadcrumb แบบ Badge)

#### **D. Admin Dashboard** (`components/Admin/`)
ส่วนจัดการข้อมูลหลังบ้าน แบ่งเป็นกลุ่มย่อย:

**1. Document Management (`components/Admin/DocManagement/`)**
-   `DataManagementLayout`: Layout หลักของหน้าจัดการเอกสาร (มี Search, Breadcrumb)
-   `ItemsTable`: ตารางแสดงรายการโฟลเดอร์และไฟล์
-   `ActionButtons`: ปุ่มดำเนินการต่างๆ (เช่น สร้างโฟลเดอร์, อัปโหลดไฟล์)
-   `PaginationFooter`: ส่วนจัดการหน้า (Pagination)

**2. Announcement Management (`components/Admin/Announcement/`)**
-   `AnnouncementTable`: ตารางจัดการข่าวประชาสัมพันธ์
-   `AnnouncementCard`: การ์ดแสดงตัวอย่างข่าว
-   `CreateNewAnnouncement`: ฟอร์มสร้างประกาศใหม่

**3. Dialogs & Forms (`components/Admin/Dialog/`)**
-   `AddFolderDialog` / `AddFolderForm`: หน้าต่างสร้างโฟลเดอร์ใหม่
-   `EditFolderDialog` / `EditFolderForm`: หน้าต่างแก้ไขโฟลเดอร์
-   `CreateNewForm`: หน้าต่างอัปโหลดไฟล์ใหม่ (Drawer)
-   `DeleteConfirmationDialog`: หน้าต่างยืนยันการลบ
-   `MoveDialog`: หน้าต่างย้ายไฟล์/โฟลเดอร์
-   `FolderTree`: แสดงโครงสร้างโฟลเดอร์ (ใช้ใน MoveDialog)

#### **E. Shared Forms** (`components/Form/`)
Components สำหรับสร้างฟอร์มที่ใช้ซ้ำได้
-   `FormContainer`: Wrapper สำหรับ Server Actions Form
-   `TextInput`, `TextAreaInput`: ช่องกรอกข้อมูลพร้อม Error Handling
-   `Button`: ปุ่ม Submit ที่มีสถานะ Loading
-   `DateAndTime`, `DatePicker`: ตัวเลือกวันเวลา

#### **F. Utilities** (`components/DataTable/`)
-   `DataTable`: ตารางข้อมูลอเนกประสงค์ (Generic Table)

## 7. ข้อควรระวัง (Important Notes)
-   **Theme Consistency**: ตรวจสอบการแสดงผลทั้งใน Light Mode และ Dark Mode เสมอ
-   **Responsive Design**: ทดสอบการแสดงผลบนหน้าจอมือถือและแท็บเล็ต
-   **Performance**: ใช้ `<Image />` ของ Next.js เสมอสำหรับการแสดงรูปภาพเพื่อประสิทธิภาพที่ดีที่สุด

## 8. Data Model & Business Logic

### 8.1 Data Models (Type Definitions)
ระบบใช้ TypeScript Interfaces ในการกำหนดโครงสร้างข้อมูล โดยมีโมเดลหลักดังนี้:

#### **Folder (โฟลเดอร์)**
ใช้สำหรับจัดเก็บโครงสร้างหมวดหมู่เอกสาร (`types/documents.ts`)
-   `id`: รหัสโฟลเดอร์ (Number)
-   `name`: ชื่อโฟลเดอร์ (String)
-   `abbr`: ชื่อย่อ (String) - ใช้สำหรับการอ้างอิงหรือ URL
-   `description`: คำอธิบาย (String)
-   `parent`: รหัสโฟลเดอร์แม่ (Number | null) - ถ้าเป็น null คือ Root Folder
-   `created_at`, `updated_at`: วันที่สร้างและแก้ไข
-   `updated_by`: รหัสผู้แก้ไขล่าสุด

#### **File (ไฟล์เอกสาร)**
ใช้สำหรับจัดเก็บข้อมูลไฟล์ดาวน์โหลด (`types/documents.ts`)
-   `id`: รหัสไฟล์ (Number)
-   `name`: ชื่อที่แสดงผล (String)
-   `filename`: ชื่อไฟล์จริง (String)
-   `sysname`: ชื่อไฟล์ในระบบ (String)
-   `description`: คำอธิบาย (String)
-   `parent`: รหัสโฟลเดอร์ที่ไฟล์อยู่ (Number)
-   `isactive`: สถานะการใช้งาน (Number)
-   `created_at`, `updated_at`: วันที่สร้างและแก้ไข

#### **Announcement (ประกาศ)**
ใช้สำหรับข่าวประชาสัมพันธ์ (`types/announcement.ts`)
-   `id`: รหัสประกาศ
-   `title`: หัวข้อประกาศ
-   `description`: รายละเอียดโดยย่อ
-   `content`: เนื้อหาประกาศ
-   `status`: สถานะ ('Published' | 'Draft')
-   `category`: หมวดหมู่
-   `categoryVariant`: รูปแบบสีของหมวดหมู่ ("default" | "secondary" | "destructive" | "outline")
-   `date`: วันที่ประกาศ

### 8.2 Business Logic (Server Actions)
ระบบใช้ **Server Actions** (`actions/actions.ts`) ในการจัดการ Logic ฝั่ง Server และเชื่อมต่อกับ Backend API

#### **การจัดการข้อมูล (CRUD)**
-   **Fetching**: ดึงข้อมูลผ่าน API โดยใช้ `fetch` และส่ง `Authorization Header` (Bearer Token)
    -   `adminGetRootFolder()`: ดึงข้อมูล Root Folder
    -   `adminGetFolderById(id)`: ดึงข้อมูลภายในโฟลเดอร์ตาม ID
-   **Mutations**: การสร้าง/แก้ไข/ลบ ข้อมูล จะมีการตรวจสอบความถูกต้อง (Validation) ก่อนส่งไป API
    -   `createFolder`, `updateFolder`: จัดการโฟลเดอร์
    -   `uploadFile`, `updateFile`: จัดการไฟล์ (รองรับการส่ง FormData)
    -   `deleteItemById(id, type)`: ลบโฟลเดอร์หรือไฟล์

#### **Validation**
ใช้ library **Zod** ในการตรวจสอบความถูกต้องของข้อมูลที่รับมาจาก Form (FormData) ก่อนประมวลผล
-   ตรวจสอบฟิลด์ที่จำเป็น (Required fields)
-   ตรวจสอบรูปแบบข้อมูล (เช่น ชื่อย่อต้องเป็นภาษาอังกฤษ/ตัวเลข)
-   ตรวจสอบข้อมูลซ้ำ (Duplicate Check) เช่น ชื่อโฟลเดอร์ซ้ำในระดับเดียวกัน

#### **Error Handling & Revalidation**
-   มีการดักจับ Error จาก API และส่งกลับไปยัง Client
-   ใช้ `revalidatePath` ของ Next.js เพื่อทำการ Refresh ข้อมูลหน้าเว็บทันทีที่มีการเปลี่ยนแปลงข้อมูล (เช่น หลังสร้างโฟลเดอร์เสร็จ)

---
*เอกสารนี้ปรับปรุงล่าสุดเมื่อ: 1 ธันวาคม 2025*
