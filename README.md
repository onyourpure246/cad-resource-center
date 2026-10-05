# 🏢 CAD Resource Center (ศูนย์บริการข้อมูลและทรัพยากร)

เว็บแอปพลิเคชัน **"Resource Center"** ของกลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์ (CAD) กรมตรวจบัญชีสหกรณ์ เป็นศูนย์รวมข้อมูล เอกสาร โปรแกรม/ชุดคำสั่ง และข่าวประชาสัมพันธ์ สำหรับเจ้าหน้าที่ภายในองค์กร มุ่งเน้นดีไซน์ที่ทันสมัย เรียบหรู ใช้งานง่าย และปลอดภัยสูง

---

## 🛠️ Technology Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org) (App Router, React Server Components, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com), [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), Material UI Icons (`MuiIconRenderer`), Lucide React
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (smooth GPU-accelerated transitions)
- **Authentication**: Auth.js v5 (NextAuth.js) ร่วมกับ Custom Provider เชื่อมต่อ **ThaID OAuth SSO** และ Mock Admin Mode
- **Backend API Service**: Node.js / Hono Framework (`farside_source`) รันบนพอร์ต `24991` ร่วมกับ MySQL/MariaDB (`casdu_fy2569`)
- **Process Manager**: PM2 (`frontend` พอร์ต 3000, `backend` พอร์ต 24991)

---

## ⚡ Key Features

1. **หน้าแรกรูปแบบใหม่ (Redesigned 50/50 Combined Home Section)**
   - **ฝั่งซ้าย (50% ข่าวประกาศ)**: สไลด์ข่าวประกาศรูปแบบ Single Card (สัดส่วน 16:9) มาพร้อม Auto-Slide 3.5 วินาที, แถบเวลา Progress Loader แบบ GPU-Accelerated ที่ซิงค์กับ `onAnimationEnd` อย่างแม่นยำ, ปุ่มลูกศรซ้าย-ขวาแบบ Overlay ทับบนภาพพร้อม Dark Fade Vignette Gradient เมื่อ Hover
   - **ฝั่งขวา (50% ชุดคำสั่ง CATS อัปเดตล่าสุด 3 หมวด)**: แสดงชุดคำสั่งล่าสุดแยก 3 หมวดหมู่ (`CATS สหกรณ์การเกษตร`, `CATS สหกรณ์ออมทรัพย์`, `ชุดคำสั่งโปรแกรมผู้อื่น`), ป้ายแสดงเวอร์ชันและป้าย `✨ NEW`, พร้อมปุ่ม Icon-Only โหลดคู่มือและดาวน์โหลดไฟล์ที่ออกแบบตามหลัก Responsive Design

2. **ระบบคลังดาวน์โหลดเอกสารและชุดคำสั่ง (Resource Downloads)**
   - จัดหมวดหมู่เอกสารและชุดคำสั่งย่อยตามสิทธิ์การเข้าถึง
   - รองรับการค้นหาเอกสารแบบเรียลไทม์ (Live Search & Highlight)
   - นับจำนวนการดาวน์โหลดและดาวน์โหลดไฟล์โดยตรงผ่าน Proxy API
   - **In-Context Admin / Inline Management**: จัดการเพิ่ม/แก้ไขหมวดหมู่และอัปโหลดไฟล์ได้โดยตรงจากหน้า Downloads ฝั่งผู้ใช้งานสำหรับ Admin

3. **ระบบสำรองและฟื้นฟูข้อมูล (Backup & Restore System)**
   - สำรองข้อมูลฐานข้อมูลและโครงสร้างระบบไฟล์ผ่านหน้า `/admin/backup`
   - บริหารจัดการไฟล์ Backup (ดาวน์โหลด, นำเข้า, ฟื้นฟูข้อมูล และลบไฟล์สำรอง)

4. **ระบบยืนยันตัวตนผ่าน ThaID (Identity & SSO)**
   - ถอดรหัสและยืนยันตัวตนเจ้าหน้าที่กับฐานข้อมูลบุคลากรองค์กร
   - มีระบบรีเฟรชและจัดการ Session JWT แบบไดนามิก

5. **ศูนย์ควบคุมสำหรับผู้ดูแลระบบ (Admin Dashboard `/admin/*`)**
   - **จัดการรายการดาวน์โหลด (`/admin/documents`)**: เพิ่ม/แก้ไข/ลบ และจัดลำดับโฟลเดอร์และไฟล์
   - **จัดการข้อมูลผู้ใช้งาน (`/admin/usermanagement`)**: ปรับเปลี่ยนบทบาท (`role`) และสถานะบัญชีแบบเรียลไทม์
   - **จัดการสำรองข้อมูล (`/admin/backup`)**: ระบบสำรองและกู้คืนข้อมูลแบบครบวงจร
   - **ข้อมูลการใช้งานระบบ (`/admin/dashboard`)**: สถิติการดาวน์โหลด กิจกรรมผู้ใช้งาน และเทรนด์การเข้าใช้งาน
   - **จัดการข้อมูลประชาสัมพันธ์ (`/admin/announcement`)**: สร้างและเผยแพร่ข่าวประกาศ

6. **ระบบแยกฟีเจอร์ทดลองสำหรับ Super Admin (SuperAdmin Feature Isolation)**
   - ซ่อนฟีเจอร์พรีวิว/ฟีเจอร์ที่กำลังพัฒนา ไม่ให้ Admin ปกติ และ User ทั่วไปมองเห็น
   - ทำงานผ่าน Wrapper Component (`<SuperAdminOnly>`, `<ServerSuperAdminOnly>`) และ Helper Utilities (`isSuperAdminRole`)

---

## 👥 Role & Permission Matrix (ตารางสิทธิ์การใช้งาน)

| บทบาท (Role) | การเข้าถึง `/admin/*` | ฟีเจอร์พรีวิว / ฟีเจอร์ใหม่ที่กำลังพัฒนา | จัดการเอกสาร / หมวดหมู่ / ผู้ใช้ | ดาวน์โหลดไฟล์ทั่วไป |
| :--- | :---: | :---: | :---: | :---: |
| 👑 **`superadmin`** | ✅ อนุญาต | ✅ **เห็นเฉพาะ Super Admin เท่านั้น** | ✅ ได้เต็มรูปแบบ | ✅ ได้ |
| 🛡️ **`admin`** | ✅ อนุญาต | ❌ ไม่เห็น (เห็นเฉพาะเวอร์ชันเสร็จสมบูรณ์) | ✅ ได้เต็มรูปแบบ | ✅ ได้ |
| ✏️ **`editor`** | ❌ ไม่อนุญาต | ❌ ไม่เห็น | ⚠️ แก้ไขเอกสารเฉพาะส่วน | ✅ ได้ |
| 👤 **`user`** | ❌ ไม่อนุญาต | ❌ ไม่เห็น | ❌ ไม่ได้ | ✅ ได้ |

---

## 🚀 Getting Started (การติดตั้งและเริ่มต้นใช้งาน)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/onyourpure246/cad-resource-center.git
cd cad-resource-center
npm install
```

### 2. Configure Environment Variables (`.env.local`)
คัดลอกไฟล์แม่แบบ `.env.example` ไปเป็น `.env.local` แล้วกรอกค่าคอนฟิกที่ต้องการ:
```bash
cp .env.example .env.local
```

```env
# --- Application Config ---
NEXT_PUBLIC_APP_URL="https://auditdocs.cad.go.th/casdu_cdm"
AUTH_SECRET="dev-secret-key-change-in-production"
AUTH_TRUST_HOST=true
TRUST_AUTH_PROXY=true

# --- Backend API Service ---
API_URL="http://127.0.0.1:24991/casdu_cdm_backend/api/fy2569"
NEXT_PUBLIC_API_URL="https://auditdocs.cad.go.th/casdu_cdm_backend/api/fy2569"
API_TOKEN="dev-secret-key-change-in-production"

# --- ThaID SSO Integration ---
THAID_ISSUER="https://imauth.bora.dopa.go.th"
NEXT_PUBLIC_THAID_AUTH_URL="https://imauth.bora.dopa.go.th/api/v2/oauth2/auth/"
THAID_TOKEN_URL="https://imauth.bora.dopa.go.th/api/v2/oauth2/token/"
THAID_USERINFO_URL="https://imauth.bora.dopa.go.th/api/v2/oauth2/userinfo/"
NEXT_PUBLIC_THAID_CLIENT_ID="..."
THAID_CLIENT_SECRET="..."
THAID_BASIC_TOKEN="..."
THAID_API_KEY="..."
```

### 3. Run Development Server
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

> 💡 **Mock Admin Mode**: สำหรับสภาพแวดล้อม Development สามารถใช้รหัสเข้าใช้งาน `MOCK_ADMIN` ในหน้า Login เพื่อทดสอบล็อกอินด้วยสิทธิ์ Super Admin โดยไม่ต้องผ่าน ThaID จริง

---

## 📂 Project Structure (โครงสร้างโปรเจกต์)

```
cad-resource-center/
├── actions/                  # Server Actions (การทำ Mutation และติดต่อ Backend)
│   ├── backup-actions.ts     # คำสั่งสำรองและกู้คืนข้อมูล
│   ├── file-actions.ts       # จัดการไฟล์และหมวดหมู่ (getNewScriptFilesGrouped)
│   ├── search-actions.ts     # ค้นหาเอกสารแบบครอบคลุม
│   ├── user-actions.ts       # จัดการข้อมูลและสิทธิ์ผู้ใช้งาน
│   └── common-actions.ts     # คำสั่งทั่วไป
├── app/                      # Next.js App Router
│   ├── _components/          # Component เฉพาะของหน้าแรก (Redesigned Combined Layout)
│   │   ├── CombinedPreviewClient.tsx   # Master 50/50 Wrapper Layout
│   │   ├── HomeAnnounceColumn.tsx      # ฝั่งซ้าย: สไลด์ข่าวประกาศ & Auto Loader
│   │   ├── HomeLatestScriptsColumn.tsx # ฝั่งขวา: การ์ด 3 หมวดหมู่ชุดคำสั่ง CATS
│   │   ├── AnnouncementCard.tsx        # การ์ดแสดงข่าวพร้อม Overlay Controls
│   │   ├── HeroVideoBanner.tsx         # วิดีโอและภาพแบนเนอร์ส่วนหัว
│   │   └── HomePreviewCombinedSection.tsx # Server Component ดึงข้อมูลข่าวและชุดคำสั่ง
│   ├── admin/                # เส้นทางระบบบริหารจัดการ (Protected Routes)
│   │   ├── announcement/     # จัดการข่าวประกาศ
│   │   ├── backup/           # ระบบสำรองและกู้คืนข้อมูล
│   │   ├── dashboard/        # แดชบอร์ดสถิติ
│   │   ├── documents/        # จัดการเอกสารและหมวดหมู่
│   │   └── usermanagement/   # จัดการผู้ใช้งาน
│   ├── api/                  # API Routes (NextAuth / File Upload Proxy / Backup)
│   ├── downloads/            # เส้นทางดาวน์โหลดฝั่งผู้ใช้งานทั่วไป
│   ├── login/                # หน้าเข้าสู่ระบบ
│   ├── layout.tsx            # Root Layout หลัก
│   └── page.tsx              # หน้าแรก (Homepage)
├── components/               # React UI Components
│   ├── Admin/                # Component สำหรับฝั่งผู้ดูแลระบบ (Backup, DocManagement, UserManagement)
│   ├── Auth/                 # Component เช็คสิทธิ์และ Session (SuperAdminOnly, ServerSuperAdminOnly)
│   ├── Layout/               # Navbar, Header, Footer
│   └── ui/                   # Shadcn UI primitives (Button, Card, Dialog ฯลฯ)
├── lib/                      # Helper Functions & Utilities
│   ├── auth-helpers.ts       # ฟังก์ชันเช็คสิทธิ์ (isSuperAdminRole, isAdminRole)
│   ├── thaid-service.ts      # ระบบเชื่อมต่อ ThaID OAuth
│   └── utils.ts              # ฟังก์ชันทั่วไป
├── services/                 # API Clients สำหรับเรียกไปยัง Backend Hono
│   ├── auth-api.ts           # ยืนยันบุคลากรผ่าน Backend
│   ├── backup-service.ts     # บริการจัดการไฟล์ Backup
│   └── document-service.ts   # ดึงข้อมูลโฟลเดอร์/ไฟล์/หมวดหมู่
├── types/                    # TypeScript Type Definitions
├── auth.config.ts            # การตั้งค่า NextAuth v5 & JWT Callbacks
├── middleware.ts             # Interceptor ป้องกันการเข้าถึงเส้นทางแบบดักรหัส
└── next.config.ts            # การตั้งค่า Next.js
```

---

## 🔐 Super Admin Feature Isolation Guide (คู่มือพัฒนาฟีเจอร์สำหรับ Super Admin)

เพื่อความปลอดภัยและการทดสอบฟีเจอร์ใหม่ที่ยังไม่ปล่อยให้ผู้ใช้ทั่วไปหรือ Admin ทั่วไปใช้งาน (Unreleased / Experimental Features) ระบบถูกออกแบบให้จำกัดการแสดงผลเฉพาะผู้ใช้งานสิทธิ์ **`superadmin`** (`role === 'superadmin'`) เท่านั้น

### เครื่องมือหลัก (Core Utilities)

| เครื่องมือ | ตำแหน่งไฟล์ | คำอธิบาย |
| :--- | :--- | :--- |
| **`isSuperAdminRole(session)`** | [`lib/auth-helpers.ts`](file:///home/cdmoper/cad-resource-center/lib/auth-helpers.ts) | ฟังก์ชันเช็คว่าผู้ใช้เป็น `superadmin` หรือไม่ (คืนค่า `true`/`false`) |
| **`<SuperAdminOnly>`** | [`components/Auth/SuperAdminOnly.tsx`](file:///home/cdmoper/cad-resource-center/components/Auth/SuperAdminOnly.tsx) | Wrapper Component สำหรับใช้ใน **Client Components** (`'use client'`) |
| **`<ServerSuperAdminOnly>`** | [`components/Auth/ServerSuperAdminOnly.tsx`](file:///home/cdmoper/cad-resource-center/components/Auth/ServerSuperAdminOnly.tsx) | Wrapper Component สำหรับใช้ใน **Server Components** (App Router) |

---

## 📦 Operations & Environment Management

### การแยกสภาพแวดล้อม (Environment Setup)
- **Production**: `/home/cdmoper/cad-resource-center` | PM2: `frontend` (Port 3000) | DB: `casdu_fy2569`
- **Development**: `/home/cdmoper/cad-resource-center-dev` | PM2: `frontend-dev` (Port 3001) | DB: `casdu_cdm_db_dev`

### คำสั่ง Build และ Restart Process บน PM2
```bash
# สั่ง Build และ Restart บน Production
cd /home/cdmoper/cad-resource-center
npm run build
npx pm2 restart frontend

# สั่ง Sync ข้อมูลจาก Production ไปยัง Dev Environment
./scripts/sync-prod-to-dev.sh
```

---

## 📜 License & Ownership
สงวนลิขสิทธิ์ © กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์ (CAD) กรมตรวจบัญชีสหกรณ์
