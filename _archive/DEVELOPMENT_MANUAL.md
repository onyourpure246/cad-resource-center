# คู่มือการพัฒนาระบบ Resource Center (Development Manual)

ยินดีต้อนรับสู่เอกสารคู่มือการพัฒนาระบบ **Resource Center**
เอกสารชุดนี้ได้ถูกรวบรวมและแปลเป็นภาษาไทยเพื่อให้ทีมพัฒนาเข้าใจตรงกันและทำงานได้สะดวกยิ่งขึ้น

## สารบัญ (Table of Contents)

กรุณาเลือกหัวข้อที่ต้องการศึกษา:

### 1. [สถาปัตยกรรมระบบ (Architecture)](docs/architecture.md)
เรียนรู้โครงสร้างภาพรวมของโปรเจกต์ Tech Stack ที่ใช้ และการไหลของข้อมูล (Data Flow) รวมถึงระบบ Authentication

### 2. [การติดตั้งและตั้งค่า (Setup Guide)](docs/setup.md)
ขั้นตอนการติดตั้งโปรเจกต์ลงในเครื่องคอมพิวเตอร์ (Local Machine) การตั้งค่า Environment Variables และการรันโปรเจกต์

### 3. [Backend API และการเชื่อมต่อ](docs/backend-api.md)
รายละเอียดเกี่ยวกับ API Endpoints ที่ Frontend เรียกใช้งาน และแผนการพัฒนาฟีเจอร์ใหม่ๆ เช่น **Personal Files (ไฟล์ส่วนตัว)**

### 4. [โครงสร้างฐานข้อมูล (Database Schema)](docs/database.md)
รายละเอียด Table ต่างๆ ในฐานข้อมูล ความสัมพันธ์ระหว่าง Table และความหมายของแต่ละ Column

### 5. [การนำขึ้นใช้งานจริง (Deployment)](docs/deployment.md)
ขั้นตอนการ Build และ Deploy ระบบขึ้นสู่ Production Server รวมถึง Checklist ความปลอดภัย

---

## หมายเหตุสำหรับผู้พัฒนา
*   โปรเจกต์นี้ใช้ **Next.js 15 (App Router)** ซึ่งมีวิธีการเขียนต่างจาก Page Router เดิม กรุณาศึกษา `docs/architecture.md` ก่อนเริ่มเขียนโค้ด
*   หากมีการแก้ไข Database หรือ API รบกวนอัพเดทเอกสารใน `docs/` ให้เป็นปัจจุบันด้วย
