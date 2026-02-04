'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { FileUp, FolderSync, Trash2, FolderInput, FolderUp, FolderPlus } from "lucide-react";
import { ReusableDrawer } from '@/components/Admin/DocManagement/RightSideDrawer';
// Dynamic imports for heavy components
const UploadFileForm = dynamic(() => import('@/components/Admin/DocManagement/Dialogs/UploadFileForm'), { ssr: false });
const AddFolderDialog = dynamic(() => import('@/components/Admin/DocManagement/Dialogs/AddFolderDialog'), { ssr: false });
const ImportFolderDialog = dynamic(() => import('@/components/Admin/DocManagement/Dialogs/ImportFolderDialog').then(mod => mod.ImportFolderDialog), { ssr: false });

import { ActionButtonsProps } from '@/types/components';
import { BulkDeleteDialog } from "./Dialogs/BulkDeleteDialog";
import { BulkMoveDialog } from "./Dialogs/BulkMoveDialog";
import { BulkItem } from "@/types/documents";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";

const ActionButtons = ({ parentId, onRefresh, selectedItems = [] }: ActionButtonsProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [isAddFolderOpen, setIsAddFolderOpen] = useState(false);

    const handleUploadSuccess = () => {
        setIsDrawerOpen(false);
        onRefresh();
    };

    if (selectedItems.length > 0) {
        // Transform items for bulk actions
        const bulkItems: BulkItem[] = selectedItems.map(item => ({
            id: item.resourceId,
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
        <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" onClick={onRefresh} className="cursor-pointer">
                <FolderSync className="h-4 w-4" />
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="default" className="cursor-pointer ml-2">
                        <Plus className="mr-2 h-4 w-4" /> สร้างหรืออัปโหลด <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onSelect={() => setIsAddFolderOpen(true)} className="cursor-pointer">
                        <FolderPlus className="mr-2 h-4 w-4" /> สร้างโฟลเดอร์
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setIsDrawerOpen(true)} className="cursor-pointer">
                        <FileUp className="mr-2 h-4 w-4" /> อัปโหลดไฟล์
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setIsImportOpen(true)} className="cursor-pointer">
                        <FolderUp className="mr-2 h-4 w-4" /> อัปโหลดโฟลเดอร์
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialogs controlled by state */}
            <ImportFolderDialog
                parentId={parentId}
                onSuccess={onRefresh}
                open={isImportOpen}
                onOpenChange={setIsImportOpen}
                trigger={<span className="hidden"></span>} // Hidden trigger since we control open state
            />

            <AddFolderDialog
                parentId={parentId}
                onSuccess={onRefresh}
                open={isAddFolderOpen}
                onOpenChange={setIsAddFolderOpen}
            />

            <ReusableDrawer
                trigger={<span className="hidden"></span>} // Hidden trigger since we control open state
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                side="right"
                className="sm:max-w-[530px]"
            >
                <UploadFileForm parentId={parentId} onSuccess={handleUploadSuccess} />
            </ReusableDrawer>
        </div>
    );
};

export default ActionButtons;