# สถาปัตยกรรมระบบ (System Architecture)

ระบบ **Resource Center** ถูกออกแบบโดยใช้สถาปัตยกรรมแบบ **Modular Monolith** บน **Next.js App Router** เพื่อให้ง่ายต่อการดูแลรักษาและขยายผลในอนาคต

## ภาพรวม (Overview)

1.  **Frontend (Next.js)**: ทำหน้าที่เป็นทั้ง User Interface และ Backend-for-Frontend (BFF)
2.  **External Services**: เชื่อมต่อกับระบบภายนอกผ่าน Server Actions
    *   **Resource Backend API**: ระบบจัดเก็บข้อมูลหลัก (Files, Folders, User Metadata)
    *   **ThaID (Identity Provider)**: ระบบยืนยันตัวตนกลาง
    *   **Internal Employee API**: ระบบตรวจสอบสถานะเจ้าหน้าที่ภายใน

## โครงสร้างโปรเจกต์ (Project Structure)

```
.
├── actions/                  # Server Actions (ตัวกลางเชื่อมต่อ Backend)
│   ├── folder-actions.ts     # จัดการ Folder
│   ├── file-actions.ts       # จัดการ File
│   ├── auth.ts               # จัดการ Authentication
│   └── ...
├── app/                      # Next.js App Router (หน้าเว็บ)
│   ├── admin/                # ส่วนของผู้ดูแลระบบ (ต้อง Login)
│   ├── api/                  # API Routes (เช่น auth callback)
│   ├── auth/                 # หน้าจอ Login / Error
│   ├── downloads/            # หน้าดาวน์โหลดสำหรับผู้ใช้ทั่วไป
│   └── ...
├── components/               # React Components ที่ใช้ซ้ำ
│   ├── Admin/                # Components สำหรับหน้า Admin
│   ├── HomePage/             # Components หน้าแรก/ดาวน์โหลด
│   └── ui/                   # Shadcn UI Components (Button, Input, etc.)
├── lib/                      # Logic และ Service Integrations
│   ├── thaid-service.ts      # เชื่อมต่อ ThaID System
│   ├── backend-api.ts        # เชื่อมต่อ Resource Backend
│   └── utils.ts              # ฟังก์ชันช่วยเหลือต่างๆ
├── types/                    # TypeScript Type Definitions
└── auth.config.ts            # การตั้งค่า NextAuth.js
```

## เทคโนโลยีที่ใช้ (Tech Stack)

*   **Framework**: [Next.js 15](https://nextjs.org) (App Router)
*   **Language**: TypeScript
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com) & [Framer Motion](https://www.framer.com/motion/)
*   **UI Library**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
*   **Authentication**: [Auth.js (NextAuth v5)](https://authjs.dev/)
*   **Icons**: [Lucide React](https://lucide.dev/)

## กระบวนการยืนยันตัวตน (Authentication Flow)

ระบบใช้ **Custom Credentials Provider** ร่วมกับ ThaID:

1.  ผู้ใช้กด "เข้าสู่ระบบด้วย ThaID"
2.  ระบบพาไปหน้า Login ของ ThaID
3.  เมื่อ Login สำเร็จ ThaID ส่ง `code` กลับมาที่ Frontend
4.  Frontend ส่ง `code` ไปที่ Server Action (`signIn`)
5.  Server แลก `code` เป็น `PID` (เลขบัตรประชาชน) ผ่าน `thaid-service`
6.  Server ตรวจสอบ `PID` กับฐานข้อมูลพนักงาน (`verifyEmployee`)
7.  หากเป็นพนักงานจริง -> สร้าง Session (User, Role) และอนุญาตให้เข้าใช้งาน
