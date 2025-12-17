'use client'

import React, { useState } from 'react'
import { ReusableDialog } from './Dialog'
import { Button } from '@/components/ui/button'
import { FolderPlus } from 'lucide-react'
import FolderForm from './FolderForm'
import { AddFolderDialogProps } from '@/types/documents'

const AddFolderDialog = ({ parentId, onSuccess }: AddFolderDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false);
        onSuccess();
    };

    return (
        <ReusableDialog
            trigger={<Button className='cursor-pointer'><FolderPlus className="mr-2 h-4 w-4" /> สร้างโฟลเดอร์</Button>}
            title="สร้างโฟลเดอร์ใหม่"
            description="สร้างโฟลเดอร์ใหม่เพื่อจัดเก็บเอกสาร"
            open={open}
            onOpenChange={setOpen}
        >
            <FolderForm parentId={parentId} onSuccess={handleSuccess} />
        </ReusableDialog>
    );
};

export default AddFolderDialog;