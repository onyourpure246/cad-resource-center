'use client';

import { createColumnHelper } from '@/components/DataTable/columnHelper';
import { Announcement } from '@/types/announcement';
import { deleteAnnouncement, updateAnnouncementStatus } from '@/actions/announcement-actions';
import { Archive, Undo, FileX, Pencil, Trash2, Eye } from 'lucide-react';
import { ConfirmationDialog } from '@/components/Common/ConfirmationDialog';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const helper = createColumnHelper<Announcement>();

// --- Actions Generators ---

const getStatusActions = (item: Announcement) => {
    const status = item.status.toLowerCase();
    const isPublished = status === 'published';
    const isArchived = status === 'archived';
    const isDraft = !isPublished && !isArchived;

    const actions: any[] = [];

    if (isArchived) {
        actions.push({
            label: 'เรียกคืน',
            icon: <Undo className="h-4 w-4" />,
            render: (props: any) => (
                <ConfirmationDialog
                    trigger={
                        <DropdownMenuItem
                            className={cn("cursor-pointer", props.className)}
                            onSelect={(e) => e.preventDefault()}
                        >
                            {props.icon}
                            {props.label}
                        </DropdownMenuItem>
                    }
                    title="ยืนยันการเรียกคืน"
                    description="คุณต้องการเรียกคืนประกาศนี้สู่สถานะ 'ร่าง' ใช่หรือไม่?"
                    confirmLabel="ยืนยัน"
                    onConfirm={async () => {
                        const result = await updateAnnouncementStatus(Number(item.id), 'Draft');
                        if (result.success) {
                            toast.success('เรียกคืนประกาศสำเร็จ');
                        } else {
                            toast.error(result.message);
                        }
                    }}
                />
            )
        });
    } else if (isDraft) {
        actions.push({
            label: 'จัดเก็บ (Archive)',
            icon: <Archive className="h-4 w-4" />,
            render: (props: any) => (
                <ConfirmationDialog
                    trigger={
                        <DropdownMenuItem
                            className={cn("cursor-pointer", props.className)}
                            onSelect={(e) => e.preventDefault()}
                        >
                            {props.icon}
                            {props.label}
                        </DropdownMenuItem>
                    }
                    title="ยืนยันการจัดเก็บ"
                    description="คุณต้องการจัดเก็บประกาศนี้ใช่หรือไม่? ประกาศจะถูกซ่อนจากหน้าเว็บ"
                    confirmLabel="จัดเก็บ"
                    onConfirm={async () => {
                        const result = await updateAnnouncementStatus(Number(item.id), 'Archived');
                        if (result.success) {
                            toast.success('จัดเก็บประกาศสำเร็จ');
                        } else {
                            toast.error(result.message);
                        }
                    }}
                />
            )
        });
    } else if (isPublished) {
        actions.push({
            label: "ยกเลิกการเผยแพร่",
            icon: <FileX className="h-4 w-4" />,
            render: (props: any) => (
                <ConfirmationDialog
                    trigger={
                        <DropdownMenuItem
                            className={cn("cursor-pointer", props.className)}
                            onSelect={(e) => e.preventDefault()}
                        >
                            {props.icon}
                            {props.label}
                        </DropdownMenuItem>
                    }
                    title="ยืนยันการยกเลิกเผยแพร่"
                    description="คุณต้องการยกเลิกการเผยแพร่ประกาศนี้ใช่หรือไม่? ประกาศจะถูกเปลี่ยนสถานะเป็น 'ร่าง'"
                    confirmLabel="ยืนยัน"
                    variant="destructive"
                    onConfirm={async () => {
                        const result = await updateAnnouncementStatus(Number(item.id), 'Draft');
                        if (result.success) {
                            toast.success('ยกเลิกการเผยแพร่สำเร็จ');
                        } else {
                            toast.error(result.message);
                        }
                    }}
                />
            )
        });
    }

    return { actions, isPublished, isArchived, isDraft };
};

export const getAnnouncementColumns = (router: any) => [
    // ... (rest of the file)    // ... existing columns ...
    // 1. Title
    helper.text('title', 'หัวข้อ', {
        headerClassName: "text-left",
        className: "font-medium truncate max-w-[1px] text-left",
    }),

    // 2. Category
    helper.status('category', 'หมวดหมู่', {
        headerClassName: "w-[140px] text-left hidden lg:table-cell",
        className: "w-[140px] text-left hidden lg:table-cell",
    }),

    // 3. Status
    helper.status('status', 'สถานะ', {
        headerClassName: "w-[140px] text-left",
        className: "w-[140px] text-left", // helper.status might use flex internally, ensure centered
    }),

    // 4. Updated By
    helper.text('updated_by', 'ผู้แก้ไขล่าสุด', {
        headerClassName: "w-[140px] text-left hidden xl:table-cell",
        className: "w-[140px] text-left text-muted-foreground text-sm hidden xl:table-cell",
        cell: (item) => item.updated_by || "-"
    }),

    helper.date('updated_at', 'แก้ไขเมื่อ', {
        headerClassName: "w-[140px] text-left hidden sm:table-cell",
        className: "w-[140px] text-left text-muted-foreground text-sm hidden sm:table-cell",
    }),

    helper.text('view_count', 'ยอดเข้าชม', {
        headerClassName: "w-[140px] text-center",
        className: "w-[140px] text-center font-medium",
        cell: (item) => item.view_count?.toLocaleString() || '0'
    }),


    // 6. Actions
    helper.actions({
        headerClassName: "w-[50px]",
        className: "w-[50px] text-right",
        additionalActions: (item) => {
            const { actions, isPublished, isArchived, isDraft } = getStatusActions(item);

            // Edit / View Action
            actions.push({
                label: isPublished || isArchived ? "ดูรายละเอียด" : "แก้ไข",
                icon: isPublished || isArchived ? <Eye className="h-4 w-4" /> : <Pencil className="h-4 w-4" />,
                onClick: () => router.push(`/admin/announcement/${item.id}/edit`),
            });

            // Delete Action (Only for Draft)
            if (isDraft) {
                actions.push({
                    label: "ลบ",
                    icon: <Trash2 className="h-4 w-4" />,
                    className: "text-destructive focus:text-destructive",
                    render: (props: any) => (
                        <ConfirmationDialog
                            trigger={
                                <DropdownMenuItem
                                    className={cn("cursor-pointer", props.className)}
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    {props.icon}
                                    {props.label}
                                </DropdownMenuItem>
                            }
                            title="ยืนยันการลบ"
                            description={<span className='text-destructive'>คุณต้องการลบประกาศนี้ถาวรใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้</span>}
                            confirmLabel="ลบ"
                            variant="destructive"
                            onConfirm={async () => {
                                const result = await deleteAnnouncement(Number(item.id));
                                if (result.success) {
                                    toast.success('ลบประกาศสำเร็จ');
                                } else {
                                    toast.error(result.message);
                                }
                            }}
                        />
                    )
                });
            }

            return actions;
        }
    })
];
