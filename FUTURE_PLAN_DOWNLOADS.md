# แผนงานในอนาคต: การปรับปรุงโครงสร้าง URL หน้าดาวน์โหลด

**เป้าหมาย:** สร้างโครงสร้าง URL ที่เป็นมาตรฐานสำหรับส่วนดาวน์โหลด (`/downloads/category/...`) และจัดการการ Redirect จาก `/downloads` ให้เหมาะสม

## 1. การปรับโครงสร้างโฟลเดอร์ (Folder Structure Refactoring)

โครงสร้างปัจจุบัน:
- `app/downloads/page.tsx` (หน้าเลือกหมวดหมู่)
- `app/downloads/[folderId]/page.tsx` (หน้าแสดงไฟล์ในหมวดหมู่ย่อย)

**สิ่งที่ต้องการเปลี่ยน:**
- `app/downloads/category/page.tsx` (ที่อยู่ใหม่สำหรับหน้าเลือกหมวดหมู่)
- `app/downloads/category/[folderId]/page.tsx` (ที่อยู่ใหม่สำหรับหน้าแสดงไฟล์)
- `app/downloads/page.tsx` (จะทำหน้าที่เป็นแค่ตัว Redirect เท่านั้น)

## 2. ขั้นตอนการดำเนินงาน

### ขั้นตอนที่ 2.1: ย้ายไฟล์
1. สร้างโฟลเดอร์ `app/downloads/category/`
2. ย้ายเนื้อหา (Code) จาก `app/downloads/page.tsx` เดิม ไปไว้ที่ `app/downloads/category/page.tsx`
3. ย้ายโฟลเดอร์ `app/downloads/[folderId]` เข้าไปซ้อนข้างในเป็น `app/downloads/category/[folderId]`

### ขั้นตอนที่ 2.2: สร้างตัว Redirect ที่หน้า Root
แก้ไขไฟล์ `app/downloads/page.tsx` ให้กลายเป็น Component เปล่าๆ ที่สั่ง Redirect อย่างเดียว:

```typescript
// app/downloads/page.tsx
import { redirect } from 'next/navigation'

export default function DownloadsRootRedirection() {
  redirect('/downloads/category')
}
```

### ขั้นตอนที่ 2.3: อัปเดตลิงก์ (Update Links)
แก้ไขไฟล์ `components/DownloadsPage/CategorySelection.tsx` (รวมถึงจุดอื่นๆ ที่มีการ Link มาหน้าดาวน์โหลด) ให้ชี้ไปยัง Path ใหม่

**ไฟล์:** `components/DownloadsPage/CategorySelection.tsx`
```typescript
// ของเดิม
href={`/downloads/${folder.id}`}

// แก้เป็น
href={`/downloads/category/${folder.id}`}
```

## 3. ทางเลือกเสริม: ใช้ Middleware Redirect (Optional)
หากต้องการจัดการ Redirect ที่ระดับ Middleware (Server Config) แทนการสร้างไฟล์ Page

**วิธีทำใน middleware.ts**
```typescript
if (req.nextUrl.pathname === '/downloads') {
  return NextResponse.redirect(new URL('/downloads/category', req.url))
}
```
*หมายเหตุ: ถ้าเลือกใช้วิธี Middleware เราสามารถลบไฟล์ `app/downloads/page.tsx` ทิ้งได้เลย เพราะ Middleware จะดักจับ Request ก่อน*
