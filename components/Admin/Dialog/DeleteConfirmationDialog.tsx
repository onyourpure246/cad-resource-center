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

import { DeleteConfirmationDialogProps } from '@/types/components';
import { deleteItemById } from '@/actions/common-actions';
import { toast } from 'sonner';

export const DeleteConfirmationDialog = ({
    id,
    name,
    type,
    trigger,
    onSuccess
}: DeleteConfirmationDialogProps) => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        startTransition(async () => {
            const result = await deleteItemById(id, type);
            if (result.success) {
                toast.success(result.message);
                setOpen(false);
                onSuccess();
            } else {
                toast.error(result.message);
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
                    <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
                    <AlertDialogDescription>
                        คุณแน่ใจหรือไม่ว่าต้องการลบ "{name}" ? <br />
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