'use client';

import React, { useState } from 'react';
import { ReusableDialog } from './Dialog';
import FolderForm from './FolderForm';
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
            <FolderForm folder={folder} parentId={parentId} onSuccess={handleSuccess} />
        </ReusableDialog>
    );
};