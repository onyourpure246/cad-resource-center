import { Announcement } from "@/types/announcement";

export const announceData: Announcement[] = [
    {
        id: '1',
        title: 'เปิดตัว Resource Center V1.0',
        content: 'ขอเชิญทุกท่านเข้าใช้งานและร่วมแสดงความคิดเห็นเพื่อการพัฒนาต่อไป...',
        category: 'ทั่วไป',
        categoryVariant: 'default',
        status: 'Draft',
        createdBy: 'Admin',
        createdAt: '2025-11-24T00:00:00.000Z',
        updatedAt: '2025-11-24T00:00:00.000Z',
    },
    {
        id: '2',
        title: 'ปิดปรับปรุงระบบเอกสารชั่วคราว',
        content: 'ระบบจะปิดให้บริการตั้งแต่เวลา 02:00 - 04:00 น. ขออภัยในความไม่สะดวก',
        category: 'อัปเดตระบบ',
        categoryVariant: 'destructive',
        status: 'Draft',
        createdBy: 'Admin',
        createdAt: '2025-11-24T00:00:00.000Z',
        updatedAt: '2025-11-24T00:00:00.000Z',
    },
    {
        id: '3',
        title: 'การใช้งานระบบ Login ใหม่',
        content: 'คู่มือการใช้งานระบบ Login ผ่าน Clerk Authentication สำหรับผู้ใช้งานใหม่',
        category: 'คู่มือ',
        categoryVariant: 'secondary',
        status: 'Published',
        createdBy: 'Admin',
        createdAt: '2025-12-01T00:00:00.000Z',
        updatedAt: '2025-12-01T00:00:00.000Z',
    }
];