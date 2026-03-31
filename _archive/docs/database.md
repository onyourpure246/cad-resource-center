# โครงสร้างฐานข้อมูล (Database Schema)

ระบบใช้ฐานข้อมูล **MySQL/MariaDB** โดยมีตารางหลักดังนี้ (อ้างอิงจาก `casdu_internalis.sql`)

## 1. File System
ตารางจัดเก็บข้อมูลเอกสารและโฟลเดอร์

### `dl_folders` (โฟลเดอร์)
| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | รหัสโฟลเดอร์ |
| `name` | VARCHAR | ชื่อโฟลเดอร์ |
| `parent` | INT (FK) | รหัสโฟลเดอร์แม่ (NULL = Root) |
| `mui_icon` | VARCHAR | ชื่อไอคอน (Material UI Name) |
| `mui_colour` | VARCHAR | สีของไอคอน (Hex Code) |
| `isactive` | TINYINT | สถานะ (1=Active, 0=Inactive) |
| `is_personal` | TINYINT | (Proposed) 1=ส่วนตัว, 0=สาธารณะ |

### `dl_files` (ไฟล์)
| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | รหัสไฟล์ |
| `filename` | VARCHAR | ชื่อไฟล์จริง (Display Name) |
| `sysname` | VARCHAR | ชื่อไฟล์ในระบบ (UUID) |
| `parent` | INT (FK) | รหัสโฟลเดอร์ที่อยู่ |
| `mui_icon` | VARCHAR | ชื่อไอคอน (Material UI Name) |
| `mui_colour` | VARCHAR | สีของไอคอน |
| `isactive` | TINYINT | สถานะ (1=Active, 0=Inactive) |
| `is_personal` | TINYINT | (Proposed) 1=ส่วนตัว, 0=สาธารณะ |

## 2. User Management
ตารางข้อมูลผู้ใช้งาน

### `common_users`
| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | รหัสผู้ใช้ |
| `username` | VARCHAR | ชื่อผู้ใช้ (มักใช้ PID) |
| `displayname` | VARCHAR | ชื่อที่แสดงผล |
| `isadmin` | TINYINT | 1=Admin, 0=User |
| `role` | VARCHAR | บทบาท (admin, user, editor) |
| `status` | ENUM | สถานะ (active, inactive, suspended) |

## 3. Logs & Analytics
ตารางเก็บประวัติการใช้งาน

### `common_activity_logs`
เก็บ Log การกระทำต่างๆ ของ User เช่น Login, Upload, Download
*   `action`: ชื่อการกระทำ (e.g., `LOGIN`, `DOWNLOAD_FILE`)
*   `details`: รายละเอียดเพิ่มเติม (JSON)
*   `user_id`: ผู้กระทำ (NULL ถ้าเป็น Anonymous)

### `search_logs`
เก็บคำค้นหาเพื่อนำไปวิเคราะห์ความนิยม
*   `query`: คำค้นหา
*   `ip_address`: IP ผู้ค้นหา
