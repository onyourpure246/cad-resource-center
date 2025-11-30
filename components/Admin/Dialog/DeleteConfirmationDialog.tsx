'use client';

import React, { useState, useTransition } from 'react';
import { ReusableDialog } from '../Dialog/Dialog';
import { Button } from '@/components/ui/button';
import { deleteItemById } from '@/actions/actions';
import { toast } from 'sonner';
import DialogFooter from '../Dialog/DialogFooter';
import { DeleteConfirmationDialogProps } from '@/types/documents';

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
        <ReusableDialog
            open={open}
            onOpenChange={setOpen}
            trigger={trigger}
            title="ยืนยันการลบ"
            description={`คุณแน่ใจหรือไม่ว่าต้องการลบ "${name}" ? การกระทำนี้ไม่สามารถย้อนกลับได้`}>
            <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                    ยกเลิก
                </Button>
                <Button onClick={handleDelete} disabled={isPending} type="button">
                    {isPending ? 'กำลังลบ...' : 'ลบ'}
                </Button>
            </DialogFooter>
        </ReusableDialog>
    );
};