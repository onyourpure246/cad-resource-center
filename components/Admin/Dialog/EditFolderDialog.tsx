'use client';

import React, { useState } from 'react';
import { ReusableDialog } from './Dialog';
import EditFolderForm from './EditFolderForm';
import { EditFolderDialogProps } from '@/types/documents';

export const EditFolderDialog = ({ folder, parentId, trigger, onSuccess }: EditFolderDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false);
        onSuccess();
    };

    return (
        <ReusableDialog
            trigger={trigger}
            title="แก้ไขโฟลเดอร์"
            description="แก้ไขข้อมูลโฟลเดอร์"
            open={open}
            onOpenChange={setOpen}
        >
            <EditFolderForm folder={folder} parentId={parentId} onSuccess={handleSuccess} />
        </ReusableDialog>
    );
};