'use client';
import { createColumnHelper } from '@/utils/columnHelper';
import { Announcement } from '@/types/announcement';
import { deleteAnnouncement } from '@/actions/announcement-actions';

const helper = createColumnHelper<Announcement>();

export const getAnnouncementColumns = () => [
    helper.text('title', 'หัวข้อ', {
        headerClassName: "flex-1 min-w-[200px]",
        className: "flex-1 min-w-[200px] font-medium",
    }),
    helper.status('category', 'หมวดหมู่', {
        headerClassName: "w-[150px]",
        className: "w-[150px]",
    }),
    helper.status('status', 'สถานะ', {
        headerClassName: "w-[100px]",
        className: "w-[100px]",
    }),
    helper.text('created_by', 'สร้างโดย', {
        headerClassName: "w-[150px]",
        className: "w-[150px] text-muted-foreground text-sm",
    }),
    helper.date('created_at', 'สร้างเมื่อ', {
        headerClassName: "w-[180px]",
        className: "w-[180px]",
    }),
    helper.actions({
        onDelete: async (item) => {
            if (confirm('คุณต้องการลบประกาศนี้ใช่หรือไม่?')) {
                await deleteAnnouncement(Number(item.id));
            }
        },
        additionalActions: () => [{
            label: "แก้ไข (Coming Soon)",
            onClick: () => { },
        }]
    })
];
