# แผนงานในอนาคต: ระบบ Dashboard สำหรับ Admin

**เป้าหมาย:** สร้าง Dashboard เพื่อให้ผู้ดูและระบบสามารถติดตามสถานะการใช้งาน เอกสาร และสมาชิกในระบบได้อย่างมีประสิทธิภาพ

## 1. Overview Cards (ภาพรวมตัวเลข)
ส่วนสรุปข้อมูลสำคัญที่ต้องดูได้ทันที:
*   **Total Documents**: จำนวนไฟล์เอกสารทั้งหมดในระบบ (แยกตาม Status ได้ยิ่งดี)
*   **Total Users**: จำนวนผู้ใช้งานทั้งหมด (Active / Inactive)
*   **Total Downloads**: จำนวนการดาวน์โหลดทั้งหมด
*   **Today's Downloads**: จำนวนการดาวน์โหลดไฟล์ในวันนี้ (ถ้ามี API รองรับ)
*   **Storage Used**: ปริมาณพื้นที่จัดเก็บที่ใช้ไป

## 2. Charts & Analytics (กราฟวิเคราะห์)
*   **Documents by Category (Pie Chart)**: สัดส่วนไฟล์แบ่งตามประเภท (PDF, ZIP, Image) หรือตามหมวดหมู่ (ฝ่ายบริหาร, ฝ่ายบุคคล)
*   **Upload/Download Activity (Bar Chart)**: กราฟแสดงแนวโน้มการใช้งานระบบในรอบ 7-30 วัน

## 3. Recent Activity (ความเคลื่อนไหวล่าสุด)
*   **Recently Uploaded Files**: ตารางแสดง 5-10 ไฟล์ล่าสุดที่เพิ่งอัปโหลด (ระบุผู้อัปโหลด และเวลา)
*   **Latest User Logins**: ประวัติการเข้าใช้งานล่าสุด (ถ้าเชื่อมต่อกับ stats ของ Auth ได้)

## 4. System Health (สถานะระบบ)
*   **API Status**: ตรวจสอบการเชื่อมต่อกับ Backend (`casdu-backops`)
*   **External Services**: สถานะของบริการภายนอก เช่น ยืนยันตัวตน (Clerk) หรือ File Storage

## หมายเหตุทางเทคนิค
*   ควรพิจารณาสร้าง Endpoint `/api/stats/dashboard` ฝั่ง Backend เพื่อรวมข้อมูลเหล่านี้มาส่งให้ Frontend ในทีเดียว เพื่อลดจำนวน Request และภาระการประมวลผลหน้าบ้าน
