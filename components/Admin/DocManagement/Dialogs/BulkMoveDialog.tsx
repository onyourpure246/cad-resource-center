'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Folder, Check } from "lucide-react";
import { FolderTree } from './FolderTree';
import { toast } from 'sonner';
import { bulkMoveItems } from '@/actions/bulk-actions';
import { BulkItem } from "@/types/documents";
import { BulkMoveDialogProps } from '@/types/components';
import { useFolderTree } from '@/hooks/useFolderTree';

export const BulkMoveDialog = ({ items, currentParentId, trigger, onSuccess }: BulkMoveDialogProps) => {
    const [open, setOpen] = useState(false);
    const [isMoving, setIsMoving] = useState(false);

    // Use the custom hook for tree logic
    const {
        folders,
        selectedFolderId,
        setSelectedFolderId,
        isLoadingRoot,
        handleToggle
    } = useFolderTree({
        initialParentId: currentParentId,
        enableAutoFetch: open
    });

    const handleMove = async () => {
        if (selectedFolderId === currentParentId) {
            setOpen(false);
            return;
        }

        setIsMoving(true);
        try {
            const result = await bulkMoveItems(items, selectedFolderId);
            if (result.success) {
                toast.success(result.message);
                onSuccess();
                setOpen(false);
            } else {
                toast.error(result.message);
                if (result.successCount > 0) {
                    onSuccess();
                    setOpen(false);
                }
            }
        } catch (error) {
            console.error("Move error", error);
            toast.error("เกิดข้อผิดพลาดในการย้าย");
        } finally {
            setIsMoving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>ย้าย {items.length} รายการไปที่...</DialogTitle>
                    <DialogDescription className="sr-only">
                        เลือกโฟลเดอร์ที่ต้องการย้ายรายการไป
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 max-h-[400px] overflow-y-auto">
                    {isLoadingRoot ? (
                        <div className="text-center text-sm text-muted-foreground">กำลังโหลด...</div>
                    ) : (
                        <div className="space-y-1">
                            <div
                                className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-accent ${selectedFolderId === null ? 'bg-accent' : ''}`}
                                onClick={() => setSelectedFolderId(null)}
                            >
                                <div className="w-5 mr-1" />
                                <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="flex-1 text-sm">หน้าแรก (Root)</span>
                                {selectedFolderId === null && <Check className="h-4 w-4 text-primary" />}
                            </div>
                            <FolderTree
                                nodes={folders}
                                selectedFolderId={selectedFolderId}
                                itemId={-1} // Valid itemId required by FolderTree to disable self-selection, passing -1 as safely different from any real ID
                                itemType="file" // Dummy type to satisfy prop requirements, logic disabled by itemId=-1
                                onToggle={handleToggle}
                                onSelect={setSelectedFolderId}
                            />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isMoving}>ยกเลิก</Button>
                    <Button onClick={handleMove} disabled={isMoving || selectedFolderId === currentParentId}>
                        {isMoving ? 'กำลังย้าย...' : 'ย้าย'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
