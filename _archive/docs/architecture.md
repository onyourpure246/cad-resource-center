# สถาปัตยกรรมระบบ (System Architecture)

ระบบ **Resource Center** ถูกออกแบบโดยใช้สถาปัตยกรรมแบบ **Modular Monolith** บน **Next.js App Router** เพื่อให้ง่ายต่อการดูแลรักษาและขยายผลในอนาคต

## ภาพรวม (Overview)

1.  **Frontend (Next.js)**: ทำหน้าที่เป็นทั้ง User Interface และ Backend-for-Frontend (BFF)
2.  **External Services**: เชื่อมต่อกับระบบภายนอกผ่าน Server Actions และ Services API
    *   **Resource Backend API**: ระบบจัดเก็บข้อมูลหลัก (Files, Folders, User Metadata, Announcements)
    *   **ThaID (Identity Provider)**: ระบบยืนยันตัวตนกลาง
    *   **Internal Employee API**: ระบบตรวจสอบสถานะเจ้าหน้าที่ภายใน

## โครงสร้างโปรเจกต์ (Project Structure)

โครงสร้างโฟลเดอร์ในแอพพลิเคชันฝั่งหน้าบ้านถูกจัดเรียงตาม Feature และหน้าที่รับผิดชอบอย่างชัดเจน:

```
.
├── actions/                  # Server Actions (ตัวกลางเชื่อมต่อและเรียกใช้ Backend APIs)
│   ├── folder-actions.ts     # จัดการ Folder (Create, Edit, Delete)
│   ├── file-actions.ts       # จัดการ File (Upload, Delete, Restore)
│   ├── auth.ts               # จัดการ Authentication เบื้องต้น
│   ├── search-actions.ts     # จัดการค้นหาข้อมูล
│   └── announcement-actions.ts # จัดการข่าวประกาศ
├── app/                      # Next.js App Router (ระบบจัดการ Routing หน้าเว็บ)
│   ├── admin/                # ส่วนของผู้ดูแลระบบ (ต้องเข้าสู่ระบบและ Role เป็น Admin)
│   ├── downloads/            # หน้าสำหรับการดาวน์โหลดไฟล์ของ User (ต้องเข้าสู่ระบบ)
│   ├── login/                # หน้าเข้าสู่ระบบ
│   ├── api/                  # API Routes ฝั่ง Next.js (เช่น auth callback, download proxy)
│   └── _components/          # Components พิเศษที่ใช้ร่วมกันระดับ App Directory
├── components/               # React Components ที่ใช้ซ้ำในหลายๆ หน้า
│   ├── Admin/                # UI Components สำหรับหน้า Admin
│   ├── Form/                 # คอมโพเนนต์ฟอร์มกรอกข้อมูล และ Dialogs
│   ├── DataTable/            # คอมโพเนนต์ตารางแสดงข้อมูลที่ผูก Logic ซับซ้อน
│   ├── editor/               # คอมโพเนนต์ Rich Text Editor (Lexical)
│   └── ui/                   # Shadcn UI Base Components (Button, Input, Select, etc.)
├── lib/                      # Logic กลาง, Constants, และ Helper functions
│   ├── utils.ts              # ฟังก์ชัน Utilities รวม (เช่น cn ของ Tailwind)
│   └── *-utils.ts            # ฟังก์ชันช่วยทำงานย่อยอื่นๆ 
├── services/                 # Service Integration (เรียกใช้ Backend ภายนอกต่างๆ)
│   ├── auth-api.ts           # Service ตรวจสอบผู้ใช้และรับ Token จากระบบข้อมูลหลังบ้าน
│   ├── document-service.ts   # Service จัดการไฟล์เอกสาร
│   ├── backend-api.ts        # ฟังก์ชันพื้นฐานเพื่อเชื่อมต่อกับ Backend
│   └── thaid-service.ts      # ดึงข้อมูลจาก ThaID System
├── types/                    # TypeScript Type Definitions
└── auth.config.ts            # การตั้งค่า Auth.js (NextAuth) สำหรับจัดการ Session/JWT
```

## เทคโนโลยีที่ใช้ (Tech Stack)

*   **Framework**: [Next.js 15.5](https://nextjs.org) (App Router)
*   **Language**: TypeScript
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com), [Emotion](https://emotion.sh/) & [Framer Motion](https://www.framer.com/motion/)
*   **UI Libraries**:
    *   [Shadcn UI](https://ui.shadcn.com/) (Radix UI) - คอมโพเนนต์พื้นฐานแบบ Accessible
    *   [MUI (Material UI)](https://mui.com/) - สำหรับคอมโพเนนต์ที่ต้องการรูปแบบเฉพาะ
*   **Table Management**: [@tanstack/react-table v8](https://tanstack.com/table/latest) - จัดการตารางข้อมูล (Pagination, Sorting, Filtering)
*   **Rich Text Editor**: [Lexical](https://lexical.dev/) - สำหรับเขียนประกาศหรือเนื้อหา
*   **Authentication**: [Auth.js (NextAuth v5 Beta)](https://authjs.dev/) - ระบบจัดการ Session และ JWT
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Form & Validation**: [Zod](https://zod.dev/) - ใช้ร่วมกับ React Server Actions ในการตรวจสอบข้อมูล

## กระบวนการยืนยันตัวตน (Authentication Flow)

ระบบใช้ **Custom Credentials Provider** ใน NextAuth ร่วมกับ ThaID Provider และ Resource Backend API:

1.  ผู้ใช้กด "เข้าสู่ระบบด้วย ThaID" ในหน้า `/login`
2.  ระบบพุ่งไปหน้ากระบวนการเข้าสู่ระบบของแอพ ThaID 
3.  มื่อยืนยันตัวตนสำเร็จ ThaID จะตอบกลับพร้อมรหัสคำขอ (`code`) มาที่แอปพลีเคชัน (Callback)
4.  Frontend นำส่ง `code` ไปให้ Server Action ภายใต้กรอบการทำงานของ Auth.js (`signIn`)
5.  Server นำ `code` ไปแลกเป็นรายละเอียดบัญชีชั่วคราวและ **`PID`** (เลขบัตรประชาชน 13 หลัก) ผ่าน `thaid-service`
6.  นำ `PID` ไปตรวจสอบสิทธิ์กับ Resource Backend API เพื่อเช็คสาขาพนักงงาน (`verifyEmployee`)
7.  หากเป็นพนักงานและมีสถานะ `active`:
    * Backend จะส่งชุดคำตอบข้อมูลผู้ใช้พร้อมสิทธิ์ (`role`) และ `accessToken` กลับมาให้
    * NextAuth จะสร้าง Session และจัดเก็บข้อมูลอย่าง `id`, `name`, `role` และผูก `accessToken` ไว้ในรูปแบบ JWT 
8.  Session ใน JWT จะถูกตรวจสอบตามระยะเวลาและ Route Levels (Middleware) เพื่อทำ Role-based Access Control ป้องกันไม่ให้แอดมินหรือยูสเซอร์เข้าถึงหน้าเพจในสิทธิ์ที่ไม่ได้รับอนุญาตได้ นอกเหนือจากนี้ยังรวมถึงกรณี Token หมดอายุ (AccessTokenExpired)
