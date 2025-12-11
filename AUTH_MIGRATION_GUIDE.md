# Auth.js Migration Guide

เมื่อได้ API จาก Backend แล้ว ขั้นตอนการพัฒนา (Migration Steps) เพื่อเปลี่ยนจาก Clerk เป็น Auth.js มีดังนี้ครับ:

## Phase 1: Setup & Configuration

### 1. Environment Variables
เพิ่มตัวแปรใน `.env.local`:
```bash
AUTH_SECRET="your-generated-secret" # รัน npx auth secret เพื่อสร้าง
AUTH_URL="http://localhost:3000" # URL ของเว็บเรา

# Backend API URLs
BACKEND_API_URL="http://your-backend-api.com"
```

### 2. Configure Auth.js (`auth.ts`)
สร้างไฟล์ `auth.ts` ที่ Root Directory (ระดับเดียวกับ `middleware.ts`)
-   ตั้งค่า **Credentials Provider**:
    -   ในฟังก์ชัน `authorize`: เขียนโค้ดส่ง `username`, `password` ไปหา Backend API (`/api/auth/login`)
    -   ถ้า Backend ตอบกลับมาสำเร็จ (200) -> Return User Object
    -   ถ้าไม่สำเร็จ -> Return `null`
-   ตั้งค่า **Callbacks**:
    -   `jwt`: เอาข้อมูล User/Token ที่ได้จาก Backend มาเก็บใส่ลงใน JWT ของ NextAuth
    -   `session`: เอาข้อมูลจาก JWT มาใส่ลงใน Session เพื่อให้ฝั่ง Client เรียกใช้ได้ผ่าน `useSession`

### 3. API Route Handler
สร้างไฟล์ `app/api/auth/[...nextauth]/route.ts`:
```typescript
import { handlers } from "@/auth" // import จาก auth.ts
export const { GET, POST } = handlers
```

## Phase 2: Frontend Implementation

### 4. Replace Middleware
แก้ไข `middleware.ts`:
-   ลบ Clerk Middleware ออก
-   ใส่ `auth` middleware ของ v5 แทน
-   กำหนด Route ที่ต้อง Protect (เช่น `/admin/*`) ให้ redirect ไปหน้า Login ถ้ายังไม่มี Session

### 5. Create Login Page
สร้างหน้า `app/login/page.tsx` ใหม่ (เพราะเราจะไม่ใช้หน้า Login ของ Clerk แล้ว):
-   สร้าง Form รับ Username/Password
-   เมื่อกด Submit -> เรียก `signIn("credentials", { username, password })`
-   จัดการ Error case (เช่น รหัสผิด)

### 6. Replace Providers & Hooks
ไล่เปลี่ยนโค้ดทั่วทั้งโปรเจค:
-   **`app/layout.tsx`**: เอา `<ClerkProvider>` ออก -> ใส่ `<SessionProvider>` ของ Auth.js แทน (ถ้าจำเป็นต้องใช้ Client Session แบบ Global) หรือจัดการ Session ใน Server Component
-   **User Button / Profile**:
    -   เปลี่ยนจาก `<UserButton />` ของ Clerk -> สร้าง Component ใหม่เอง (เช่น Dropdown ที่มี Avatar + ปุ่ม Logout)
    -   ปุ่ม Logout -> เรียก `signOut()`
-   **Data Fetching**:
    -   เปลี่ยนจาก `auth()` ของ Clerk -> `auth()` ของ NextAuth (Server Side) หรือ `useSession()` (Client Side) เพื่อดึง User ID / Token

## Phase 3: Cleanup
-   ลบ package `@clerk/nextjs`
-   ลบ Environment Variables ของ Clerk

---
**Tip:** เริ่มทำจาก Phase 1 -> 2 -> 3 ทีละสเต็ปครับ เราจะได้ไม่หลงทาง!
