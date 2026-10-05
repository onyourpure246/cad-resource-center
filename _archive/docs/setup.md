# การติดตั้งและตั้งค่าระบบ (Setup Guide)

คู่มือการติดตั้งโปรเจกต์ **Resource Center** สำหรับนักพัฒนา (Developer) เพื่อรันบนเครื่อง Local

## ความต้องการของระบบ (Prerequisites)

*   [Node.js](https://nodejs.org/) (รุ่น 18.17 ขึ้นไป)
*   [Git](https://git-scm.com/)

## ขั้นตอนการติดตั้ง (Installation Steps)

1.  **Clone โปรเจกต์**
    ```bash
    git clone https://github.com/onyourpure246/cad-resource-center.git
    cd cad-resource-center
    ```

2.  **ติดตั้ง Dependency**
    ```bash
    npm install
    ```

3.  **ตั้งค่า Environment Variables**
    สร้างไฟล์ `.env.local` ที่ root directory และกำหนดค่าดังนี้:

    ```env
    # --- General Config ---
    NEXT_PUBLIC_APP_URL=http://localhost:24990   # URL ของเว็บเรา
    AUTH_SECRET=changeme                        # สร้างด้วยคำสั่ง: npx auth secret

    # --- External API (ระบบจัดการข้อมูลหลังบ้าน) ---
    API_URL=http://localhost:64197/api/fy2569   # URL ของ Backend API
    API_TOKEN=dev-secret-key                    # Token สำหรับเชื่อมต่อ Backend (ต้องตรงกัน)

    # --- ThaID Service (ระบบยืนยันตัวตน) ---
    THAID_TOKEN_URL=https://...                 # URL ขอ Token
    THAID_USERINFO_URL=https://...              # URL ขอข้อมูลผู้ใช้
    THAID_BASIC_TOKEN=...                       # Basic Auth Token ของ Client
    # THAID_API_KEY=...                         # (ถ้ามี)

    # --- Internal Employee Verification (ตรวจสอบพนักงาน) ---
    EMPLOYEE_API_URL=https://...
    EMPLOYEE_API_KEY=...
    ```

4.  **รันโปรเจกต์ (Development Mode)**
    ```bash
    npm run dev
    ```
    เปิด Browser ไปที่ [http://localhost:24990](http://localhost:24990)

## โหมดทดสอบ (Mock Mode)

หากไม่มีบัญชี ThaID Sandbox หรือต้องการทดสอบระบบอย่างรวดเร็ว:
*   ในหน้า Login ให้กรอกรหัส `TEST_ADMIN` ในช่อง Code (ถ้ามี) หรือใช้ปุ่ม Bypass ที่เตรียมไว้ (ถ้าเปิดใช้งานใน Code)
*   ระบบจะ Login ให้เป็น Admin โดยอัตโนมัติ (แก้ไขตรรกะนี้ได้ใน `services/thaid-service.ts`)
