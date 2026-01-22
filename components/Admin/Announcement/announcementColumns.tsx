'use client';
import { createColumnHelper } from '@/utils/columnHelper';
import { Announcement } from '@/types/announcement';
import { deleteAnnouncement, updateAnnouncementStatus } from '@/actions/announcement-actions';
import { Archive, Undo, FileX, Pencil } from 'lucide-react';

const helper = createColumnHelper<Announcement>();

export const getAnnouncementColumns = (router: any) => [
    helper.text('title', 'หัวข้อ', {
        headerClassName: "",
        className: "font-medium truncate max-w-[1px]", // max-w-[1px] forces fluid column to respect truncation in table-fixed
    }),
    helper.status('category', 'หมวดหมู่', {
        headerClassName: "w-[150px] hidden lg:table-cell",
        className: "w-[150px] hidden lg:table-cell",
    }),
    helper.status('status', 'สถานะ', {
        headerClassName: "w-[100px]",
        className: "w-[100px]",
    }),
    helper.text('created_by', 'สร้างโดย', {
        headerClassName: "w-[150px] hidden lg:table-cell",
        className: "w-[150px] text-muted-foreground text-sm hidden lg:table-cell",
    }),
    helper.date('created_at', 'สร้างเมื่อ', {
        headerClassName: "w-[180px] hidden sm:table-cell",
        className: "w-[180px] hidden sm:table-cell",
    }),
    helper.actions({
        onDelete: async (item) => {
            if (confirm('คุณต้องการลบประกาศนี้ใช่หรือไม่?')) {
                await deleteAnnouncement(Number(item.id));
            }
        },
        additionalActions: (item) => [
            ...(item.status.toLowerCase() !== 'published' ? [{
                label: item.status.toLowerCase() === 'archived' ? 'คืนสู่สถานะร่าง' : 'จัดเก็บ',
                icon: item.status.toLowerCase() === 'archived' ? <Undo className="h-4 w-4" /> : <Archive className="h-4 w-4" />,
                onClick: async () => {
                    const newStatus = item.status.toLowerCase() === 'archived' ? 'Draft' : 'Archived';
                    await updateAnnouncementStatus(Number(item.id), newStatus);
                },
            }] : []),
            ...(item.status.toLowerCase() === 'published' ? [{
                label: "ยกเลิกการเผยแพร่",
                icon: <FileX className="h-4 w-4" />,
                onClick: async () => {
                    if (confirm('ต้องการยกเลิกการเผยแพร่ใช่หรือไม่?')) {
                        await updateAnnouncementStatus(Number(item.id), 'Draft');
                    }
                },
            }] : []),
            {
                label: "แก้ไข",
                icon: <Pencil className="h-4 w-4" />,
                onClick: () => {
                    // Use router.push for client-side navigation
                    router.push(`/admin/announcement/${item.id}/edit`);
                },
            }
        ]
    })
];
