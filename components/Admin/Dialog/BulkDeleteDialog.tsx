'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { bulkDeleteItems, BulkItem } from '@/actions/bulk-actions'; // Ensure this path is correct

interface BulkDeleteDialogProps {
    items: BulkItem[];
    trigger: React.ReactNode;
    onSuccess: () => void;
}

export const BulkDeleteDialog = ({
    items,
    trigger,
    onSuccess
}: BulkDeleteDialogProps) => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await bulkDeleteItems(items);
            if (result.success) {
                toast.success(result.message);
                setOpen(false);
                onSuccess();
            } else {
                toast.error(result.message);
                if (result.successCount > 0) {
                    // If some succeeded, still close and refresh
                    setOpen(false);
                    onSuccess();
                }
            }
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>ยืนยันการลบ {items.length} รายการ</AlertDialogTitle>
                    <AlertDialogDescription>
                        คุณแน่ใจหรือไม่ว่าต้องการลบรายการที่เลือกทั้งหมด {items.length} รายการ? <br />
                        การกระทำนี้ไม่สามารถย้อนกลับได้
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" disabled={isPending}>ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isPending}
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        className="cursor-pointer bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isPending ? 'กำลังลบ...' : 'ลบ'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
