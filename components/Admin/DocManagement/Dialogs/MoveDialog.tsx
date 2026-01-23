'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Folder, Check } from "lucide-react";
import { MoveDialogProps } from '../../../types/MoveDialog.types';
import { useMoveDialog } from '../../../hooks/useMoveDialog';
import { FolderTree } from './FolderTree';

export const MoveDialog = ({ item, currentParentId, trigger, onMoveSuccess }: MoveDialogProps) => {
    const {
        open,
        setOpen,
        folders,
        selectedFolderId,
        setSelectedFolderId,
        isLoadingRoot,
        isMoving,
        handleToggle,
        handleMove
    } = useMoveDialog({ item, currentParentId, onMoveSuccess });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>ย้ายไปที่...</DialogTitle>
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
                                <div className="w-5 mr-1" /> {/* Spacer for chevron */}
                                <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="flex-1 text-sm">หน้าแรก (Root)</span>
                                {selectedFolderId === null && <Check className="h-4 w-4 text-primary" />}
                            </div>
                            <FolderTree
                                nodes={folders}
                                selectedFolderId={selectedFolderId}
                                itemId={item.id}
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
