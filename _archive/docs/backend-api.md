# ข้อมูล Backend API และการเชื่อมต่อ

เอกสารนี้อธิบายโครงสร้างข้อมูลและการเชื่อมต่อกับ Backend API ภายนอก

## การเชื่อมต่อ (Integration)

Frontend เชื่อมต่อกับ Backend ผ่าน **Server Actions** (`actions/*.ts`) และ **Services** (`services/*.ts`) โดยใช้ `fetch` มาตรฐาน
ทุก Request ที่ส่งไป Backend จะต้องแนบ **Header** ดังนี้:

```json
{
  "Authorization": "Bearer <API_TOKEN_OR_USER_TOKEN>",
  "Content-Type": "application/json"
}
```

*   **API_TOKEN**: ใช้สำหรับการดึงข้อมูลทั่วไป (Public Data) ที่กำหนดใน `.env.local`
*   **USER_TOKEN**: ใช้สำหรับการกระทำที่ต้องการสิทธิ์ผู้ใช้ (Create, Update, Delete) ได้รับจากการ Login

## API Endpoints หลัก

### 1. Document Management (`/dl`)
*   `GET /dl/folder`: ดึงรายการโฟลเดอร์และไฟล์ (Root)
*   `GET /dl/folder/:id`: ดึงรายการในโฟลเดอร์ระบุ ID
*   `POST /dl/folder`: สร้างโฟลเดอร์ใหม่
*   `POST /dl/file`: อัพโหลดไฟล์ใหม่ (ใช้ FormData)
*   `PATCH /dl/file/:id`: แก้ไขข้อมูลไฟล์ (เช่น เปลี่ยนชื่อ, เปลี่ยนสีไอคอน)

### 2. User Management (`/users`)
*   `GET /users`: ดึงรายชื่อผู้ใช้ทั้งหมด
*   `PATCH /users/:id`: แก้ไขสิทธิ์ผู้ใช้ (Role) หรือสถานะ (Status)

### 3. Dashboard (`/dashboard`)
*   `GET /dashboard/stats`: ดึงสถิติรวม (จำนวนไฟล์, ผู้ใช้, การดาวน์โหลด)
*   `GET /dashboard/audit-logs`: ดึงประวัติการใช้งานระบบ

---

## 📢 แผนงานในอนาคต: ระบบไฟล์ส่วนตัว (Personal Files)

ฟีเจอร์นี้อยู่ระหว่างการเสนอแผน (Proposed) เพื่อให้ Admin สามารถฝากไฟล์ส่วนตัวได้

### การเปลี่ยนแปลงที่จำเป็น (Required Changes)

#### Database
ต้องเพิ่ม Column `is_personal` (Boolean) ในตาราง `dl_files` และ `dl_folders`

#### Backend Logic
API endpoint `/dl/folder` ต้องรองรับการกรองข้อมูล:
*   ถ้า `is_personal = 1`: จะต้องส่งคืนเฉพาะไฟล์ที่ `created_by` ตรงกับผู้เรียก API เท่านั้น
*   ถ้า `is_personal = 0`: ส่งคืนไฟล์สาธารณะตามปกติ

#### Frontend
*   เพิ่ม Checkbox **"ไฟล์ส่วนตัว"** ในหน้าอัพโหลด
*   เพิ่มเมนู **"ไฟล์ส่วนตัว (Personal)"** แยกออกมาในหน้า Admin
