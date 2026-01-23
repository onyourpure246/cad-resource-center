'use client';
import { createColumnHelper } from '@/utils/columnHelper';
import { Announcement } from '@/types/announcement';
import { deleteAnnouncement, updateAnnouncementStatus } from '@/actions/announcement-actions';
import { Archive, Undo, FileX, Pencil, Trash2, Eye } from 'lucide-react';
import { ConfirmationDialog } from '@/components/Common/ConfirmationDialog';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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
        additionalActions: (item) => {
            const status = item.status.toLowerCase();
            const isPublished = status === 'published';
            const isArchived = status === 'archived';
            const isDraft = !isPublished && !isArchived;

            const actions = [];

            // 1. Status Transition Actions
            if (isArchived) {
                actions.push({
                    label: 'คืนสู่สถานะร่าง',
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
                            title="ยืนยันการคืนค่า"
                            description="คุณต้องการคืนค่าประกาศนี้สู่สถานะ 'ร่าง' ใช่หรือไม่?"
                            confirmLabel="ยืนยัน"
                            onConfirm={async () => {
                                await updateAnnouncementStatus(Number(item.id), 'Draft');
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
                                await updateAnnouncementStatus(Number(item.id), 'Archived');
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
                                await updateAnnouncementStatus(Number(item.id), 'Draft');
                            }}
                        />
                    )
                });
            }

            // 2. Navigation Actions
            actions.push({
                label: isPublished || isArchived ? "ดูรายละเอียด" : "แก้ไข",
                icon: isPublished || isArchived ? <Eye className="h-4 w-4" /> : <Pencil className="h-4 w-4" />,
                onClick: () => {
                    router.push(`/admin/announcement/${item.id}/edit`);
                },
            });

            // 3. Destructive Actions (Only for Draft)
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
                                await deleteAnnouncement(Number(item.id));
                            }}
                        />
                    )
                });
            }

            return actions;
        }
    })
];
