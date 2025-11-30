'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileUp, FolderSync } from "lucide-react";
import { ReusableDrawer } from '@/components/Admin/DocManagement/RightSideDrawer';
import CreateNewForm from '@/components/Admin/Dialog/CreateNewForm';
import AddFolderDialog from '@/components/Admin/Dialog/AddFolderDialog';
import { ActionButtonsProps } from '@/types/documents';

const ActionButtons = ({ parentId, onRefresh }: ActionButtonsProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleUploadSuccess = () => {
        setIsDrawerOpen(false);
        onRefresh();
    };

    return (
        <>
            <Button size="default" variant="outline" onClick={onRefresh} className="cursor-pointer">
                <FolderSync className="mr-2 h-4 w-4" /> รีเฟรช
            </Button>
            {parentId !== null && (
                <>
                    <AddFolderDialog parentId={parentId} onSuccess={onRefresh} />
                    <ReusableDrawer
                        trigger={
                            <Button size="default" className='cursor-pointer' variant="secondary" onClick={() => setIsDrawerOpen(true)}>
                                <FileUp className="mr-2 h-4 w-4" /> อัปโหลดไฟล์
                            </Button>
                        }
                        open={isDrawerOpen}
                        onOpenChange={setIsDrawerOpen}
                        side="right"
                        className="sm:max-w-[530px]"
                    >
                        <CreateNewForm parentId={parentId} onSuccess={handleUploadSuccess} />
                    </ReusableDrawer>
                </>
            )}
        </>
    );
};

export default ActionButtons;