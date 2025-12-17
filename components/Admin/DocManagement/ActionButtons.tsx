'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { FileUp, FolderSync, Trash2, FolderInput } from "lucide-react";
import { ReusableDrawer } from '@/components/Admin/DocManagement/RightSideDrawer';
// Dynamic imports for heavy components
const CreateNewForm = dynamic(() => import('@/components/Admin/Dialog/CreateNewForm'), { ssr: false });
const AddFolderDialog = dynamic(() => import('@/components/Admin/Dialog/AddFolderDialog'), { ssr: false });
import { ActionButtonsProps } from '@/types/documents';
import { BulkDeleteDialog } from "../Dialog/BulkDeleteDialog";
import { BulkMoveDialog } from "../Dialog/BulkMoveDialog";
import { BulkItem } from "@/actions/bulk-actions";

const ActionButtons = ({ parentId, onRefresh, selectedItems = [] }: ActionButtonsProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleUploadSuccess = () => {
        setIsDrawerOpen(false);
        onRefresh();
    };

    if (selectedItems.length > 0) {
        // Transform items for bulk actions
        const bulkItems: BulkItem[] = selectedItems.map(item => ({
            id: item.id,
            type: item.type,
            name: item.name || '' // Ensure name is a string
        }));

        return (
            <div className="flex items-center gap-2">
                <BulkMoveDialog
                    items={bulkItems}
                    currentParentId={parentId}
                    trigger={
                        <Button size="default" variant="outline" className="cursor-pointer">
                            <FolderInput className="mr-2 h-4 w-4" /> ย้าย ({selectedItems.length})
                        </Button>
                    }
                    onSuccess={onRefresh}
                />

                <BulkDeleteDialog
                    items={bulkItems}
                    trigger={
                        <Button size="default" variant="destructive" className="cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" /> ลบ ({selectedItems.length})
                        </Button>
                    }
                    onSuccess={onRefresh}
                />

                <span className="text-sm text-muted-foreground ml-2">
                    เลือกแล้ว {selectedItems.length} รายการ
                </span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 justify-between">
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
        </div>
    );
};

export default ActionButtons;