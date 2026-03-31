'use client'

import React, { useState } from 'react'
import { ReusableDialog } from '@/components/Common/ReusableDialog'
import { Button } from '@/components/ui/button'
import { FolderPlus } from 'lucide-react'
import FolderForm from './FolderForm'
interface AddFolderDialogProps {
    parentId: number | null;
    onSuccess: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const AddFolderDialog = ({ parentId, onSuccess, open: constrainedOpen, onOpenChange: setConstrainedOpen }: AddFolderDialogProps) => {
    const [internalOpen, setInternalOpen] = useState(false);

    const isOpen = constrainedOpen !== undefined ? constrainedOpen : internalOpen;
    const onOpenChange = setConstrainedOpen || setInternalOpen;

    const handleSuccess = () => {
        onOpenChange(false);
        onSuccess();
    };

    return (
        <ReusableDialog
            trigger={constrainedOpen === undefined ? <Button className='cursor-pointer'><FolderPlus className="mr-2 h-4 w-4" /> สร้างโฟลเดอร์</Button> : undefined}
            title="สร้างโฟลเดอร์ใหม่"
            description="สร้างโฟลเดอร์ใหม่เพื่อจัดเก็บเอกสาร"
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <FolderForm parentId={parentId} onSuccess={handleSuccess} />
        </ReusableDialog>
    );
};

export default AddFolderDialog;