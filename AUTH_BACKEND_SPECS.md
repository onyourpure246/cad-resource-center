# Auth.js Migration - Backend Requirements

เพื่อเปลี่ยนจาก Clerk มาใช้ Auth.js (NextAuth) โดยใช้ฐานข้อมูล Users ที่ฝั่ง Backend จำเป็นต้องมีการเตรียม API ดังต่อไปนี้ครับ:

## 1. Authentication Endpoints

สิ่งที่ Backend ต้องเตรียมเพิ่ม เพื่อให้ Next.js เรียกใช้งาน:

### 1.1 Login (Verify Credentials)
API สำหรับตรวจสอบ Username/Password และ Log in
-   **Method:** `POST`
-   **Path:** `/api/auth/login` (ตัวอย่าง)
-   **Request Body:**
    ```json
    {
      "username": "user",
      "password": "password123"
    }
    ```
-   **Response (Success - 200 OK):**
    คืนค่าข้อมูล User และ Token (ถ้ามี)
    ```json
    {
      "success": true,
      "user": {
        "id": "1",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "admin"
      },
      "accessToken": "jwt_token_here" // (Optional) ถ้าต้องการใช้ Token ยิง API อื่นต่อ
    }
    ```
-   **Response (Failure - 401 Unauthorized):**
    ```json
    {
      "success": false,
      "message": "Invalid credentials"
    }
    ```

### 1.2 Get User Profile (Optional / Recommended)
API สำหรับดึงข้อมูล User ปัจจุบัน (ใช้ตอน Refresh หน้าเว็บ)
-   **Method:** `GET`
-   **Path:** `/api/auth/me`
-   **Headers:** `Authorization: Bearer <accessToken>`
-   **Response:** ข้อมูล User ปัจจุบัน

### 1.3 SSO Login (กรณีมี Single Sign-On)
ถ้าจะให้ Login ด้วย Google, Microsoft หรือ Corporate SSO:
-   **หน้าที่ Next.js:** จะจัดการคุยกับ Identity Provider (IdP) จนได้ email/profile มา
-   **หน้าที่ Backend:** ต้องมี API มารับช่วงต่อ เพื่อสร้าง Session ในระบบเรา (หรือสร้าง User ใหม่ถ้ายังไม่มี)
-   **Method:** `POST`
-   **Path:** `/api/auth/external-login` (ตัวอย่าง)
-   **Request Body:**
    ```json
    {
      "email": "john@company.com",
      "provider": "google", // หรือ "microsoft-entra-id"
      "providerId": "1234567890",
      "accessToken": "..." // (Optional) เผื่อ Backend อยากเอาไป verify กับ IdP อีกรอบเพื่อความชัวร์
    }
    ```
-   **Response:** คืนค่า User Object รูปแบบเดียวกับข้อ 1.1

## 2. Discussion Points (สิ่งที่ต้องคุยกับ Backend)

1.  **Token Strategy:**
    -   *แบบเดิม:* ตอนนี้เราใช้ `API_TOKEN` (Static Token) ตัวเดียวสำหรับทั้งแอป
    -   *แบบใหม่:* จะให้ Next.js ส่ง **User Token** (ที่ได้จาก Login) ไปหา Backend ทุก request เลยไหม? หรือจะใช้ Static Token เหมือนเดิมแล้ว Next.js แค่จัดการ Login แยกต่างหาก? (แนะนำให้ส่ง User Token เพื่อความปลอดภัยและแยกสิทธิ์ User ได้จริง)

2.  **Session & JWT:**
    -   Auth.js จะจัดการ Session ฝั่ง Web ให้ (เก็บ Cookie)
    -   Backend ต้องมีหน้าที่ **Validate Token** หรือ verify credentials เท่านั้น ไม่ต้องจัดการ Session Cookie เอง

3.  **Role-Based Access Control (RBAC):**
    -   ส่ง `role` (เช่น `admin`, `user`) กลับมาใน Login Response ด้วย เพื่อให้ Next.js เอาไปกั้นหน้า `/admin` ได้ทันที

---
**สรุป:** หลักๆ คือขอ **API Login** ที่รับ username/password แล้วตอบกลับมาเป็น User Info ครับ!
