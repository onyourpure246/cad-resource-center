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

ส่วนนี้อธิบายรายละเอียดของ Component สำคัญที่ใช้งานบ่อย เพื่อให้เข้าใจวิธีการใช้งานและปรับแต่ง

### 6.1 UI Components (`components/ui`)
เป็น Component พื้นฐานที่ใช้ซ้ำได้ทั่วทั้งโปรเจกต์ (Reusable) ส่วนใหญ่สร้างจาก Radix UI และปรับแต่งด้วย Tailwind CSS

#### **Button** (`components/ui/button.tsx`)
ปุ่มกดมาตรฐาน รองรับหลายรูปแบบ
-   **Variants**:
    -   `default`: สีหลัก (Primary) สำหรับปุ่มสำคัญที่สุด
    -   `destructive`: สีแดง สำหรับการลบหรือยกเลิก
    -   `outline`: ขอบเส้น สำหรับปุ่มรอง
    -   `secondary`: สีรอง
    -   `ghost`: ไม่มีพื้นหลัง แสดงเมื่อเอาเมาส์ไปชี้
    -   `link`: ลักษณะเหมือนลิงก์
-   **Sizes**: `default`, `sm` (เล็ก), `lg` (ใหญ่), `icon` (สำหรับไอคอน)
-   **Usage**:
    ```tsx
    import { Button } from "@/components/ui/button"
    
    <Button variant="default">บันทึกข้อมูล</Button>
    <Button variant="destructive" size="sm">ลบ</Button>
    ```

#### **Card** (`components/ui/card.tsx`)
กล่องใส่เนื้อหา ประกอบด้วยส่วนหัว เนื้อหา และส่วนท้าย
-   **Sub-components**: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
-   **Usage**:
    ```tsx
    import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
    
    <Card>
      <CardHeader>
        <CardTitle>หัวข้อการ์ด</CardTitle>
      </CardHeader>
      <CardContent>
        <p>เนื้อหาภายในการ์ด...</p>
      </CardContent>
    </Card>
    ```

### 6.2 Layout Components

#### **Navbar** (`components/Navbar/Navbar.tsx`)
แถบเมนูด้านบนของเว็บไซต์ รองรับ Responsive Design
-   **Structure**:
    -   **Logo**: ลิงก์กลับหน้าแรก
    -   **Menu Items**: รายการเมนู (เว็บไซต์กรมฯ, ดาวน์โหลด, สำหรับผู้ดูแลระบบ)
    -   **Actions**: ปุ่มเปลี่ยน Theme (`ModeToggle`) และปุ่มเข้าสู่ระบบ (`NavAuth`)
-   **Sub-components**:
    -   `DropDownMenu`: เมนูแบบ Dropdown สำหรับเมนูย่อย (เช่น เมนูผู้ดูแลระบบ)
    -   `NavAuth`: จัดการสถานะการล็อกอิน (แสดงปุ่ม Sign In หรือ User Profile)

### 6.3 Feature Components
Component ที่สร้างขึ้นเพื่อใช้งานเฉพาะจุด (Specific Features) ควรเก็บแยกตามโฟลเดอร์ใน `components/` เช่น:
-   `components/Admin/`: สำหรับหน้า Admin Dashboard
-   `components/HomePage/`: สำหรับหน้า Landing Page (เช่น `AnnounceSection`)
-   `components/DownloadsPage/`: สำหรับหน้าดาวน์โหลดเอกสาร

## 7. ข้อควรระวัง (Important Notes)
-   **Theme Consistency**: ตรวจสอบการแสดงผลทั้งใน Light Mode และ Dark Mode เสมอ
-   **Responsive Design**: ทดสอบการแสดงผลบนหน้าจอมือถือและแท็บเล็ต
-   **Performance**: ใช้ `<Image />` ของ Next.js เสมอสำหรับการแสดงรูปภาพเพื่อประสิทธิภาพที่ดีที่สุด

---
*เอกสารนี้ปรับปรุงล่าสุดเมื่อ: 28 พฤศจิกายน 2025*
