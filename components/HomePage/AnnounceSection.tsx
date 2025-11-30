import React from 'react'
import AnnouncementCard from '../Admin/Announcement/AnnouncementCard'
import { Announcement } from '@/types/announcement'

const mockAnnouncements: Announcement[] = [
    {
        id: '1',
        title: 'เปิดตัว Resource Center V1.0',
        description: 'เว็บไซต์ศูนย์รวมข้อมูลสำหรับกลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์ได้เปิดตัวอย่างเป็นทางการแล้ว',
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
        description: 'เพื่อปรับปรุงประสิทธิภาพ จะมีการปิดปรับปรุงระบบจัดการเอกสารในวันที่ 20 ส.ค.',
        content: 'ระบบจะปิดให้บริการตั้งแต่เวลา 02:00 - 04:00 น. ขออภัยในความไม่สะดวก',
        category: 'อัปเดตระบบ',
        categoryVariant: 'destructive',
        status: 'Draft',
        createdBy: 'Admin',
        createdAt: '2025-11-24T00:00:00.000Z',
        updatedAt: '2025-11-24T00:00:00.000Z',
    }
]

const AnnounceSection = () => {
    return (
        <section className="py-10 md:py-10">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold">ข่าวประกาศ</h2>
                    <p className="text-muted-foreground mt-2">
                        ติดตามข่าวสารและอัปเดตล่าสุดจากเรา
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {mockAnnouncements.map((announcement) => (
                        <AnnouncementCard key={announcement.id} announcement={announcement} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AnnounceSection