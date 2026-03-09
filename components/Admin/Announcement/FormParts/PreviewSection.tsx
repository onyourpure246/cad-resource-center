import React from 'react';
import { Label } from '@/components/ui/label';
import AnnouncementCard from '@/app/_components/AnnouncementCard';
import { Announcement, AnnouncementStatus, PreviewSectionProps } from '@/types/announcement';

export const PreviewSection = ({
    announcement,
    title,
    contentHTML,
    category,
    previewImage,
    currentStatus
}: PreviewSectionProps) => {
    return (
        <div>
            <div className='mb-0 flex flex-col gap-1'>
                <Label className='text-2xl'>ตัวอย่างการแสดงผล (Preview)</Label>
                <p className="text-muted-foreground text-sm mb-4">
                    นี่คือรูปแบบที่ผู้ใช้งานทั่วไปจะเห็นบนหน้าเว็บไซต์
                </p>
            </div>

            <div className="border rounded-xl p-6 bg-muted/30 flex justify-center items-center min-h-[400px]">
                <div className="w-full max-w-[350px] relative pointer-events-none sm:pointer-events-auto">
                    <AnnouncementCard
                        announcement={{
                            id: announcement?.id || -1,
                            title: title || "หัวข้อประกาศตัวอย่าง...",
                            content: contentHTML || "<p>เนื้อหาตัวอย่าง...</p>",
                            category: category,
                            cover_image: previewImage || undefined,
                            status: currentStatus,
                            publish_date: announcement?.publish_date || new Date().toISOString(),
                            created_at: announcement?.created_at || new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                            created_by: announcement?.created_by || 'Admin',
                        }}
                    />
                </div>
            </div>
            <div className="mt-4 text-center">
                <span className="text-xs text-muted-foreground">
                    *สามารถคลิกที่การ์ดเพื่อดูรายละเอียดฉบับเต็ม (Pop-up)
                </span>
            </div>
        </div>
    );
};
